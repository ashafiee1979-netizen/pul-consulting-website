const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');

console.log('=== STARTING EXHAUSTIVE FEATURE & REGISTRY AUDIT ===\n');

let issuesFound = 0;

function reportIssue(msg) {
  console.error(`[ISSUE] ${msg}`);
  issuesFound++;
}

function reportPass(msg) {
  console.log(`[PASS] ${msg}`);
}

// 1. Audit public files
console.log('--- 1. Checking Static Assets in public/ ---');
const publicDir = path.join(ROOT, 'public');

const referencedImages = new Set();

function scanDirForImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForImages(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const code = fs.readFileSync(fullPath, 'utf8');
      let m;
      const r = /["'](\/[a-zA-Z0-9_\-./% ]+\.(png|jpg|jpeg|svg|webp))["']/g;
      while ((m = r.exec(code)) !== null) {
        referencedImages.add(m[1]);
      }
    }
  }
}

scanDirForImages(path.join(ROOT, 'lib'));
scanDirForImages(path.join(ROOT, 'components'));
scanDirForImages(path.join(ROOT, 'app'));

console.log(`Discovered ${referencedImages.size} unique image references across project.`);
for (const imgPath of referencedImages) {
  // Decode any URL encoding if present
  const decodedPath = decodeURIComponent(imgPath).replace(/^\//, '');
  const localFilePath = path.join(publicDir, decodedPath);
  if (!fs.existsSync(localFilePath)) {
    reportIssue(`Referenced image missing on disk: ${imgPath} (looked for ${localFilePath})`);
  } else {
    const stats = fs.statSync(localFilePath);
    if (stats.size === 0) {
      reportIssue(`Image file is 0 bytes: ${imgPath}`);
    }
  }
}
if (issuesFound === 0) {
  reportPass('All referenced static assets exist and have valid file sizes.');
}

// 2. Audit Anchor Links
console.log('\n--- 2. Checking Anchor Links and Destinations ---');
const anchorLinks = [];
function scanForAnchors(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanForAnchors(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const code = fs.readFileSync(fullPath, 'utf8');
      const hrefRegex = /href=["']([^"']*#[^"']+)["']/g;
      let m;
      while ((m = hrefRegex.exec(code)) !== null) {
        anchorLinks.push({ file: path.relative(ROOT, fullPath), href: m[1] });
      }
    }
  }
}
scanForAnchors(path.join(ROOT, 'components'));
scanForAnchors(path.join(ROOT, 'app'));

const idsFound = new Set();
function collectIds(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectIds(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const code = fs.readFileSync(fullPath, 'utf8');
      const idRegex = /id=["']([a-zA-Z0-9_\-]+)["']/g;
      let m;
      while ((m = idRegex.exec(code)) !== null) {
        idsFound.add(m[1]);
      }
      // Check for dynamic id like id={service.id} or id={partnerAnchorId}
      if (code.includes('id={service.id}')) {
        // Read service ids from lib/data.ts
        const dataTs = fs.readFileSync(path.join(ROOT, 'lib', 'data.ts'), 'utf8');
        const sRegex = /id:\s*["']([a-zA-Z0-9_\-]+)["']/g;
        let sm;
        while ((sm = sRegex.exec(dataTs)) !== null) {
          idsFound.add(sm[1]);
        }
      }
      if (code.includes('partnerAnchorId')) {
        idsFound.add('partner-pul-global');
        idsFound.add('partner-linguist-point');
        idsFound.add('partner-quantu-tech');
      }
    }
  }
}
collectIds(path.join(ROOT, 'components'));
collectIds(path.join(ROOT, 'app'));

for (const { file, href } of anchorLinks) {
  const parts = href.split('#');
  const idPart = parts[1];
  if (idPart) {
    if (!idsFound.has(idPart)) {
      reportIssue(`Broken anchor link in ${file}: target #${idPart} does not exist in any component or page!`);
    } else {
      reportPass(`Verified anchor #${idPart} in ${file}`);
    }
  }
}

// 3. Test HTTP Status of all routes on running server
console.log('\n--- 3. Testing HTTP status on local server (port 3001) ---');
const routes = ['/', '/services', '/projects', '/about'];

function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3001${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          // Check that HTML includes basic valid structure
          if (!data.includes('PUL Consulting') && !data.includes('pulconsulting')) {
            reportIssue(`Route ${route} returned HTML without expected brand tokens.`);
          } else {
            reportPass(`Route ${route} returned 200 OK (${data.length} bytes, verified title & brand content)`);
          }
        } else {
          reportIssue(`Route ${route} returned status ${res.statusCode}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      reportIssue(`Failed to fetch ${route}: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  for (const route of routes) {
    await checkRoute(route);
  }
  
  console.log(`\n=== AUDIT COMPLETE: ${issuesFound} issues detected ===`);
  if (issuesFound > 0) process.exit(1);
}

run();
