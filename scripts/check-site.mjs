import fs from 'node:fs/promises';

const base = new URL(process.argv[2] || 'http://localhost:3010');
const output = process.argv[3] || 'output/site-qa.json';
const routes = ['/', '/services', '/projects', '/about', '/privacy', '/terms', '/auth/sign-in', '/auth/sign-up'];
const report = { base: base.origin, checkedAt: new Date().toISOString(), pages: [], internalLinks: [], externalLinks: [], assets: [], apiChecks: [], failures: [] };
const pages = new Map();
const anchors = new Map();
const externals = new Set();
const assets = new Set();
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const attrs = (html, tag, attr) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]+)"`, 'gi'))].map(m => decode(m[1]));
async function request(url, options = {}) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000), ...options });
  const body = await response.text();
  return { status: response.status, url: response.url, headers: response.headers, body };
}
async function pool(items, job) {
  const queue = [...items];
  await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await job(queue.shift()); }));
}
for (const route of routes) {
  try {
    const r = await request(new URL(route, base));
    const html = r.body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    pages.set(route, html);
    const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] || '');
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    report.pages.push({ route, status: r.status, title, canonical, h1Count });
    if (r.status !== 200 || !title || h1Count !== 1) report.failures.push(`Page ${route}: status ${r.status}, h1 count ${h1Count}`);
    if (!route.startsWith('/auth/') && (!canonical || new URL(decode(canonical)).pathname !== route)) report.failures.push(`Canonical mismatch: ${route}`);
    for (const href of attrs(html, 'a', 'href')) {
      const u = new URL(href, new URL(route, base));
      if (u.protocol === 'mailto:') { if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(u.pathname)) report.failures.push(`Invalid email link ${href}`); continue; }
      if (u.protocol === 'tel:') { if (!/^\+?[\d\s()-]+$/.test(u.pathname)) report.failures.push(`Invalid phone link ${href}`); continue; }
      if (!['http:', 'https:'].includes(u.protocol)) { report.failures.push(`Unsupported link ${href}`); continue; }
      if (u.origin === base.origin) anchors.set(u.pathname + u.search + u.hash, u);
      else externals.add(u.href);
    }
    for (const src of attrs(html, 'img', 'src')) assets.add(new URL(src, base).href);
  } catch (e) { report.failures.push(`Page ${route}: ${e.message}`); }
}
await pool(anchors, async ([label, url]) => {
  try {
    let html = pages.get(url.pathname);
    let status = 200;
    if (!html) { const r = await request(url); html = r.body; status = r.status; }
    let fragment = true;
    if (url.hash && !url.pathname.endsWith('.pdf')) {
      const id = decodeURIComponent(url.hash.slice(1));
      fragment = [...html.matchAll(/\bid="([^"]+)"/g)].some(m => decode(m[1]) === id);
    }
    report.internalLinks.push({ path: label, status, fragment });
    if (status !== 200 || !fragment) report.failures.push(`Internal link ${label}: ${status}, fragment=${fragment}`);
  } catch (e) { report.failures.push(`Internal link ${label}: ${e.message}`); }
});
await pool(externals, async url => {
  try { const r = await request(url); report.externalLinks.push({ url, status: r.status, finalUrl: r.url }); if (r.status >= 400) report.failures.push(`External link ${url}: ${r.status}`); }
  catch (e) { report.externalLinks.push({ url, error: e.message }); report.failures.push(`External link ${url}: ${e.message}`); }
});
await pool(assets, async url => {
  try { const r = await fetch(url, { signal: AbortSignal.timeout(20000) }); await r.arrayBuffer(); const type = r.headers.get('content-type'); report.assets.push({ url, status: r.status, type }); if (r.status !== 200 || !type?.startsWith('image/')) report.failures.push(`Asset ${url}: ${r.status} ${type}`); }
  catch (e) { report.failures.push(`Asset ${url}: ${e.message}`); }
});
// These payloads are rejected before database or email calls. No live inquiry is created.
for (const [name, payload, expected] of [['Missing fields', {}, 400], ['Invalid email', { name: 'QA', email: 'invalid', organization: 'QA' }, 400], ['Honeypot', { website: 'bot.example' }, 200]]) {
  const r = await request(new URL('/api/consultation', base), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  report.apiChecks.push({ name, status: r.status, expected });
  if (r.status !== expected) report.failures.push(`API ${name}: ${r.status}`);
}
const missing = await request(new URL('/prelaunch-qa-page-not-found', base));
report.notFound = {status:missing.status, branded:missing.body.includes('Page not found')};
if(missing.status!==404 || !report.notFound.branded) report.failures.push('Branded 404 did not render correctly');
const security = await request(base);
report.securityHeaders = Object.fromEntries(['x-content-type-options','x-frame-options','referrer-policy','permissions-policy'].map(key=>[key,security.headers.get(key)]));
if(report.securityHeaders['x-content-type-options']!=='nosniff' || report.securityHeaders['x-frame-options']!=='DENY') report.failures.push('Missing security headers');
const admin = await request(new URL('/admin', base), { redirect: 'manual' });
report.admin = { status: admin.status, location: admin.headers.get('location') };
if (![302, 303, 307, 308].includes(admin.status) || !report.admin.location?.includes('/auth/sign-in')) report.failures.push('Unauthenticated admin did not redirect to sign-in');
for (const path of ['/robots.txt', '/sitemap.xml']) { const r = await request(new URL(path, base)); report.internalLinks.push({ path, status: r.status }); if (r.status !== 200) report.failures.push(`Metadata route ${path}: ${r.status}`); }
await fs.mkdir('output', { recursive: true });
await fs.writeFile(output, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pages: report.pages.length, internalLinks: report.internalLinks.length, externalLinks: report.externalLinks.length, images: report.assets.length, apiChecks: report.apiChecks, admin: report.admin, failures: report.failures, output }, null, 2));
if (report.failures.length) process.exitCode = 1;
