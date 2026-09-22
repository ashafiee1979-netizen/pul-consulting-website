const sharp = require('sharp');
const path = require('path');

async function testBalancedComposite() {
  const inputPath = path.join(__dirname, '..', 'public', 'assets', 'services', 'service-finance.jpg');
  const outputPath = inputPath;
  const fs = require('fs');
  const inputBuffer = fs.readFileSync(inputPath);

  // SVG overlay for the book and financial elements
  const svg = `
<svg width="1122" height="860" viewBox="0 0 1122 860" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2A3" />
      <stop offset="35%" stop-color="#E2B13C" />
      <stop offset="70%" stop-color="#FFEAA7" />
      <stop offset="100%" stop-color="#A67C1E" />
    </linearGradient>

    <linearGradient id="docShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>

    <filter id="deskDropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- 1. Gold-embossed Tax Code & Financial Audit text on the book cover (x: 825, y: 700) -->
  <g transform="translate(825, 698) rotate(-1.5) skewX(-14)">
    <rect x="0" y="0" width="225" height="34" rx="2" fill="#14171d" opacity="0.94" />
    <rect x="2" y="2" width="221" height="30" rx="1.5" fill="none" stroke="url(#gold)" stroke-width="0.8" opacity="0.85" />
    <text x="112" y="15" text-anchor="middle" font-family="'Georgia', serif" font-size="9" font-weight="bold" fill="url(#gold)" letter-spacing="1.5">
      TAX LAW &amp; COMPLIANCE
    </text>
    <line x1="25" y1="19" x2="200" y2="19" stroke="url(#gold)" stroke-width="0.6" opacity="0.7" />
    <text x="112" y="27" text-anchor="middle" font-family="'Arial', sans-serif" font-size="7.5" font-weight="bold" fill="#F1F5F9" letter-spacing="1">
      STATUTORY FINANCIAL AUDIT
    </text>
  </g>

  <!-- 2. Professional Tax Clearance & Audit Badge on the document ledger in center -->
  <g transform="translate(530, 680) rotate(-4) skewX(8)" filter="url(#deskDropShadow)">
    <rect x="0" y="0" width="135" height="38" rx="3" fill="#0F172A" opacity="0.9" stroke="#38BDF8" stroke-width="0.8"/>
    <text x="67" y="15" text-anchor="middle" font-family="'Arial', sans-serif" font-size="7.5" font-weight="bold" fill="#38BDF8" letter-spacing="0.8">
      MoF TAX CLEARANCE
    </text>
    <text x="67" y="26" text-anchor="middle" font-family="'Arial', sans-serif" font-size="6.5" font-weight="600" fill="#94A3B8" letter-spacing="0.5">
      AUDITED &amp; CERTIFIED ✓
    </text>
  </g>
</svg>
`;

  const result = await sharp(inputBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toBuffer();

  fs.writeFileSync(outputPath, result);

  console.log('Final service-finance.jpg written without numbers!');
}

testBalancedComposite().catch(console.error);
