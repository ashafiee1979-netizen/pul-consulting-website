import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { randomInt } from 'node:crypto';

function load(file, dependencies, env = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require(name) { if (!(name in dependencies)) throw Error(`Unexpected dependency ${name}`); return dependencies[name]; }, process: { env }, console: { log() {}, warn() {}, error() {} }, Response, Request, URL, Date, setTimeout, clearTimeout }, { filename: file });
  return module.exports;
}

function fixture({ recent = 0, collision = false, failConfirmation = false, databaseFailure = false } = {}) {
  const calls = []; const messages = []; let inserts = 0;
  const db = async (strings, ...values) => {
    const query = strings.join('?'); calls.push({ query, values });
    if (databaseFailure) throw Error('simulated database failure');
    if (query.includes('count(*)')) return [{ n: recent }];
    if (query.includes('INSERT INTO')) { inserts++; return collision && inserts === 1 ? [] : [{ reference_id: values[0] }]; }
    return [];
  };
  const route = load('app/api/consultation/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => Response.json(body, options) } },
    'node:crypto': { randomInt },
    '@/lib/db': { sql: () => db },
    '@/lib/email': {
      mailConfigured: () => true,
      clientConfirmationEmail: () => ({ subject: 'confirmation', html: '<p>test</p>' }),
      internalNotificationEmail: () => ({ subject: 'notification', html: '<p>test</p>' }),
      sendMail: async message => { messages.push(message); if (failConfirmation && message.subject === 'confirmation') throw Error('simulated SMTP failure'); },
    },
  }, { NOTIFICATION_EMAIL: 'notifications@example.invalid' });
  return { ...route, calls, messages };
}
const valid = { name: 'QA contact', email: 'qa@example.invalid', organization: 'PUL QA', service: 'General inquiry', projectScope: 'Internal mocked QA test' };
const request = payload => new Request('https://qa.example.invalid/api/consultation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

test('missing fields and invalid email are rejected before data or mail calls', async () => {
  const f = fixture();
  assert.equal((await f.POST(request({}))).status, 400);
  assert.equal((await f.POST(request({ ...valid, email: 'bad' }))).status, 400);
  assert.equal(f.calls.length, 0); assert.equal(f.messages.length, 0);
});
test('malformed JSON is rejected without side effects', async () => {
  const f = fixture(); const r = await f.POST(new Request('https://qa.example.invalid', { method: 'POST', body: '{' }));
  assert.equal(r.status, 400); assert.equal(f.calls.length, 0);
});
test('honeypot returns a synthetic receipt without storing or sending', async () => {
  const f = fixture(); const r = await f.POST(request({ ...valid, website: 'bot.example' }));
  assert.equal((await r.json()).referenceId, 'PUL-RFP-0000-00000'); assert.equal(f.calls.length, 0); assert.equal(f.messages.length, 0);
});
test('five-per-hour throttle prevents insert and email', async () => {
  const f = fixture({ recent: 5 }); assert.equal((await f.POST(request(valid))).status, 429);
  assert.equal(f.calls.length, 1); assert.equal(f.messages.length, 0);
});
test('valid submission stores once, creates reference, and updates mocked delivery flags', async () => {
  const f = fixture(); const r = await f.POST(request(valid)); const body = await r.json();
  assert.equal(r.status, 200); assert.match(body.referenceId, /^PUL-RFP-\d{4}-\d{5}$/);
  assert.equal(body.notificationSent, true); assert.equal(body.confirmationSent, true);
  assert.equal(f.calls.filter(c => c.query.includes('INSERT INTO')).length, 1);
  assert.equal(f.messages.length, 2); assert.ok(f.calls.some(c => c.query.includes('UPDATE inquiries')));
});
test('reference collision retries without duplicate email', async () => {
  const f = fixture({ collision: true }); assert.equal((await f.POST(request(valid))).status, 200);
  assert.equal(f.calls.filter(c => c.query.includes('INSERT INTO')).length, 2); assert.equal(f.messages.length, 2);
});
test('SMTP failure preserves saved inquiry and reports the failed confirmation', async () => {
  const f = fixture({ failConfirmation: true }); const r = await f.POST(request(valid)); const body = await r.json();
  assert.equal(r.status, 200); assert.equal(body.notificationSent, true); assert.equal(body.confirmationSent, false);
  const update = f.calls.find(c => c.query.includes('UPDATE inquiries')); assert.equal(update.values[1], false);
});
test('database failure returns a generic error and does not send email', async () => {
  const f = fixture({ databaseFailure: true }); const r = await f.POST(request(valid));
  assert.equal(r.status, 500); assert.equal(f.messages.length, 0); assert.ok(!(await r.text()).includes('simulated database failure'));
});
test('real email templates escape user-controlled HTML', () => {
  const email = load('lib/email.ts', { nodemailer: { createTransport() { throw Error('Email transport must not be used in tests'); } }, './site-url': { SITE_URL: 'https://qa.example.invalid' } });
  const dangerous = '<script>alert("qa")</script>';
  const data = { referenceId: 'PUL-RFP-2026-12345', receivedAt: new Date('2026-10-31T12:00:00Z'), name: dangerous, email: 'qa@example.invalid', phone: dangerous, organization: dangerous, orgType: dangerous, service: dangerous, timeline: dangerous, projectScope: dangerous };
  for (const render of [email.clientConfirmationEmail, email.internalNotificationEmail]) {
    const { html } = render(data); assert.ok(!html.includes(dangerous)); assert.ok(html.includes('&lt;script&gt;')); assert.ok(html.includes('https://qa.example.invalid'));
  }
});
test('admin configuration fails closed without a real secret', () => {
  const auth = load('lib/auth/server.ts', { '@neondatabase/auth/next/server': { createNeonAuth() { throw Error('Must not initialize with missing credentials'); } } }, { ADMIN_EMAILS: 'admin@example.invalid' });
  assert.equal(auth.authConfigured(), false); assert.throws(() => auth.getAuth(), /not configured/);
  assert.equal(auth.isAdminEmail('ADMIN@example.invalid'), true); assert.equal(auth.isAdminEmail('outsider@example.invalid'), false);
});
