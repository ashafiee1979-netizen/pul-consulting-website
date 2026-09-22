const sharp = require('sharp');
const path = require('path');

async function processImage() {
  const inputPath = path.join(__dirname, '..', 'public', 'assets', 'services', 'service-finance.jpg');
  const outputPath = path.join(__dirname, '..', 'public', 'assets', 'services', 'service-finance-enhanced.jpg');

  // We crop from y=110 to y=870 (760 height, 1122 width) so the team, documents, and desk are in natural view
  const croppedBuffer = await sharp(inputPath)
    .extract({ left: 0, top: 110, width: 1122, height: 760 })
    .toBuffer();

  const svg = `
<svg width="1122" height="760" viewBox="0 0 1122 760" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <linearGradient id="pageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F1F5F9" />
      <stop offset="48%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#CBD5E1" />
      <stop offset="52%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>

    <filter id="deskDropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- 1. Authentic Gold Foil Embossed Label on the Hardcover Books Stack at Right (x: 770, y: 595) -->
  <g transform="translate(830, 615) rotate(-3.5) skewX(-14)">
    <rect x="0" y="0" width="235" height="46" fill="#111827" rx="3" opacity="0.92" />
    <rect x="3" y="3" width="229" height="40" fill="none" stroke="url(#gold)" stroke-width="1" opacity="0.8" rx="2" />
    <text x="117" y="21" text-anchor="middle" font-family="'Georgia', serif" font-size="11.5" font-weight="bold" fill="url(#gold)" letter-spacing="1.8">
      TAX CODE &amp; AUDIT LAW
    </text>
    <line x1="20" y1="26" x2="215" y2="26" stroke="url(#gold)" stroke-width="0.8" opacity="0.7" />
    <text x="117" y="38" text-anchor="middle" font-family="'Arial', sans-serif" font-size="8.5" font-weight="700" fill="#F8FAFC" letter-spacing="1.2">
      MINISTRY OF FINANCE • COMPLIANCE
    </text>
  </g>

  <!-- 2. Open Tax & Financial Accounting Ledger Book Flat on the Table (x: 230, y: 550) -->
  <g transform="translate(230, 545) rotate(4) skewX(14)" filter="url(#deskDropShadow)">
    <!-- Shadow under book -->
    <rect x="-4" y="-3" width="268" height="176" rx="6" fill="#000000" opacity="0.35" />

    <!-- Open Hardcover Base -->
    <rect x="0" y="0" width="260" height="170" rx="4" fill="#0F172A" stroke="#334155" stroke-width="1.5" />

    <!-- Pages spread -->
    <rect x="8" y="8" width="244" height="154" rx="2" fill="url(#pageGrad)" stroke="#CBD5E1" stroke-width="0.8" />
    <!-- Center Crease / Spine -->
    <line x1="130" y1="8" x2="130" y2="162" stroke="#94A3B8" stroke-width="1.5" />

    <!-- LEFT PAGE: Afghanistan MoF Tax Clearance & Assessment -->
    <text x="18" y="24" font-family="'Arial', sans-serif" font-size="8" font-weight="bold" fill="#0F172A">
      ANNUAL CORPORATE TAX FILING
    </text>
    <text x="18" y="34" font-family="'Arial', sans-serif" font-size="6.5" font-weight="600" fill="#64748B">
      MoF TIN: 9000010281 • Kabul HQ
    </text>
    <line x1="18" y1="38" x2="120" y2="38" stroke="#0284C7" stroke-width="1" />

    <!-- Table Grid Rows -->
    <rect x="18" y="44" width="60" height="7" rx="1" fill="#E2E8F0" />
    <rect x="84" y="44" width="36" height="7" rx="1" fill="#BAE6FD" />

    <rect x="18" y="55" width="50" height="7" rx="1" fill="#E2E8F0" />
    <rect x="84" y="55" width="36" height="7" rx="1" fill="#E2E8F0" />

    <rect x="18" y="66" width="55" height="7" rx="1" fill="#E2E8F0" />
    <rect x="84" y="66" width="36" height="7" rx="1" fill="#BAE6FD" />

    <rect x="18" y="77" width="45" height="7" rx="1" fill="#E2E8F0" />
    <rect x="84" y="77" width="36" height="7" rx="1" fill="#E2E8F0" />

    <line x1="18" y1="90" x2="120" y2="90" stroke="#0F172A" stroke-width="0.8" />
    <text x="18" y="101" font-family="'Arial', sans-serif" font-size="7" font-weight="bold" fill="#0F172A">
      TAX CLEARANCE CERTIFICATE
    </text>
    <text x="18" y="112" font-family="'Arial', sans-serif" font-size="7.5" font-weight="bold" fill="#16A34A">
      STATUS: VERIFIED &amp; PAID ✓
    </text>

    <!-- RIGHT PAGE: Balance Sheet & Profit/Loss Audit -->
    <text x="140" y="24" font-family="'Arial', sans-serif" font-size="8" font-weight="bold" fill="#0F172A">
      STATUTORY AUDIT LEDGER
    </text>
    <text x="140" y="34" font-family="'Arial', sans-serif" font-size="6.5" font-weight="600" fill="#64748B">
      US GAAP / IFRS Compliance
    </text>
    <line x1="140" y1="38" x2="242" y2="38" stroke="#0284C7" stroke-width="1" />

    <!-- Table Grid Rows -->
    <rect x="140" y="44" width="55" height="7" rx="1" fill="#E2E8F0" />
    <rect x="202" y="44" width="40" height="7" rx="1" fill="#BAE6FD" />

    <rect x="140" y="55" width="48" height="7" rx="1" fill="#E2E8F0" />
    <rect x="202" y="55" width="40" height="7" rx="1" fill="#E2E8F0" />

    <rect x="140" y="66" width="52" height="7" rx="1" fill="#E2E8F0" />
    <rect x="202" y="66" width="40" height="7" rx="1" fill="#BAE6FD" />

    <!-- Official Seal Stamp -->
    <g transform="translate(162, 92) rotate(-6)">
      <rect x="0" y="0" width="76" height="24" rx="3" fill="none" stroke="#0284C7" stroke-width="1.4" stroke-dasharray="3,1.5" />
      <text x="38" y="15" text-anchor="middle" font-family="'Arial', sans-serif" font-size="8" font-weight="bold" fill="#0284C7" letter-spacing="0.5">
        AUDITED 2026
      </text>
    </g>

    <!-- Satin Gold Ribbon Bookmark -->
    <path d="M 130 162 L 126 186 L 130 180 L 134 186 Z" fill="url(#gold)" />
  </g>

  <!-- 3. Sleek Executive Metal Stylus / Pen beside the ledger -->
  <g transform="translate(205, 560) rotate(12)">
    <rect x="0" y="0" width="5" height="95" rx="2" fill="#E2E8F0" stroke="#475569" stroke-width="0.6" />
    <rect x="0" y="15" width="5" height="8" fill="url(#gold)" />
    <path d="M 0 95 L 2.5 105 L 5 95 Z" fill="#0F172A" />
  </g>
</svg>
`;

  await sharp(croppedBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 94 })
    .toFile(outputPath);

  console.log('Successfully created:', outputPath);
}

processImage().catch(console.error);
