import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createHash, randomBytes } from 'node:crypto';

function load(file, dependencies, env = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require(name) { if (!(name in dependencies)) throw Error(`Unexpected dependency ${name}`); return dependencies[name]; }, process: { env }, console: { log() {}, warn() {}, error() {} }, Response, Request, URL, Date, setTimeout, clearTimeout }, { filename: file });
  return module.exports;
}
function fixture({ configured = true, failNotification = false, failConfirmation = false } = {}) {
  const messages = [];
  const route = load('app/api/consultation/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => Response.json(body, options) } },
    'node:crypto': { createHash, randomBytes },
    '@/lib/email': {
      mailConfigured: () => configured,
      clientConfirmationEmail: () => ({ subject: 'confirmation', html: '<p>test</p>' }),
      internalNotificationEmail: () => ({ subject: 'notification', html: '<p>test</p>' }),
      sendMail: async message => { messages.push(message); if ((failNotification && message.subject === 'notification') || (failConfirmation && message.subject === 'confirmation')) throw Error('simulated SMTP failure'); },
    },
  });
  return { ...route, messages };
}
const valid = { name: 'QA contact', email: 'qa@example.invalid', organization: 'PUL QA', service: 'General inquiry', projectScope: 'Internal mocked QA test' };
const request = (payload, headers = {}) => new Request('https://qa.example.invalid/api/consultation', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(payload) });

test('missing required fields and invalid email do not send mail', async () => {
  const f=fixture(); assert.equal((await f.POST(request({}))).status,400); assert.equal((await f.POST(request({...valid,email:'bad'}))).status,400); assert.equal(f.messages.length,0);
});
test('malformed JSON and array bodies are rejected', async () => {
  const f=fixture(); assert.equal((await f.POST(new Request('https://qa.example.invalid',{method:'POST',body:'{'}))).status,400); assert.equal((await f.POST(request([]))).status,400); assert.equal(f.messages.length,0);
});
test('oversized payload is rejected', async () => {
  const f=fixture(); assert.equal((await f.POST(request({...valid,projectScope:'x'.repeat(21000)}))).status,413); assert.equal(f.messages.length,0);
});
test('honeypot is accepted without email', async () => {
  const f=fixture();const r=await f.POST(request({...valid,website:'bot.example'}));assert.equal((await r.json()).referenceId,'PUL-RFP-0000-00000');assert.equal(f.messages.length,0);
});
test('missing SMTP configuration fails before attempting delivery', async () => {
  const f=fixture({configured:false});assert.equal((await f.POST(request(valid))).status,503);assert.equal(f.messages.length,0);
});
test('successful inquiry uses fixed mailbox, reply-to and unique reference without database', async () => {
  const f=fixture();const r=await f.POST(request({...valid,to:'attacker@example.invalid'}));const body=await r.json();assert.equal(r.status,200);assert.match(body.referenceId,/^PUL-RFP-\d{4}-[A-F0-9]{12}$/);assert.equal(body.notificationSent,true);assert.equal(body.confirmationSent,true);assert.equal(f.messages[0].to,'info@pulconsulting.com');assert.equal(f.messages[0].replyTo,valid.email);assert.equal(f.messages[1].to,valid.email);
});
test('notification failure returns failure and never sends a false acknowledgement', async () => {
  const f=fixture({failNotification:true});const r=await f.POST(request(valid));assert.equal(r.status,502);assert.equal((await r.json()).success,false);assert.equal(f.messages.length,1);
});
test('acknowledgement failure preserves successful notification result', async () => {
  const f=fixture({failConfirmation:true});const r=await f.POST(request(valid));const body=await r.json();assert.equal(r.status,200);assert.equal(body.notificationSent,true);assert.equal(body.confirmationSent,false);
});
test('email rate limit blocks a sixth request', async () => {
  const f=fixture();for(let i=0;i<5;i++)assert.equal((await f.POST(request(valid))).status,200);assert.equal((await f.POST(request(valid))).status,429);assert.equal(f.messages.length,10);
});
test('IP rate limit blocks a seventh request across email addresses', async () => {
  const f=fixture();for(let i=0;i<6;i++)assert.equal((await f.POST(request({...valid,email:`qa${i}@example.invalid`},{'x-real-ip':'192.0.2.1'}))).status,200);assert.equal((await f.POST(request({...valid,email:'seventh@example.invalid'},{'x-real-ip':'192.0.2.1'}))).status,429);
});
test('real email templates escape user HTML and do not link to retired dashboard', () => {
  const email=load('lib/email.ts',{nodemailer:{createTransport(){throw Error('Must not send live email');}},'./site-url':{SITE_URL:'https://qa.example.invalid'}});
  const dangerous='<script>alert("qa")</script>';const data={referenceId:'PUL-RFP-2026-ABC123ABC123',receivedAt:new Date('2026-10-31T12:00:00Z'),name:dangerous,email:'qa@example.invalid',phone:dangerous,organization:dangerous,orgType:dangerous,service:dangerous,timeline:dangerous,projectScope:dangerous};
  for(const render of [email.clientConfirmationEmail,email.internalNotificationEmail]){const {html}=render(data);assert.ok(!html.includes(dangerous));assert.ok(html.includes('&lt;script&gt;'));assert.ok(!html.includes('/admin'));}
});
