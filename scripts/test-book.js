const sharp = require('sharp');
const path = require('path');

async function testBookPlacement() {
  const inputPath = path.join(__dirname, '..', 'public', 'assets', 'services', 'test-crop.jpg');
  const outputPath = path.join(__dirname, '..', 'public', 'assets', 'services', 'book-test.jpg');

  // Let's create an overlay positioned precisely on the top book
  // In test-crop (1122x750):
  // Book cover top surface:
  // (x: 780, y: 605) to (x: 1040, y: 620)
  // Let's place a clean, prestigious gold-foil label on the book cover:
  const svg = `
<svg width="1122" height="750" viewBox="0 0 1122 750" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2A3" />
      <stop offset="40%" stop-color="#E2B13C" />
      <stop offset="70%" stop-color="#FFEAA7" />
      <stop offset="100%" stop-color="#A67C1E" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="1" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Precise Gold Foil Label on the Book Cover -->
  <g transform="translate(805, 608) rotate(-2.2) skewX(-16)">
    <!-- Label background plate blending with book cover leather -->
    <rect x="0" y="0" width="220" height="34" rx="2" fill="#181b22" opacity="0.95" />
    <rect x="2" y="2" width="216" height="30" rx="1.5" fill="none" stroke="url(#gold)" stroke-width="0.7" opacity="0.85" />
    
    <text x="110" y="15" text-anchor="middle" font-family="'Georgia', serif" font-size="9" font-weight="bold" fill="url(#gold)" letter-spacing="1.5">
      TAX LAW &amp; COMPLIANCE
    </text>
    <line x1="20" y1="19" x2="200" y2="19" stroke="url(#gold)" stroke-width="0.5" opacity="0.7" />
    <text x="110" y="27" text-anchor="middle" font-family="'Arial', sans-serif" font-size="7.5" font-weight="bold" fill="#F1F5F9" letter-spacing="1">
      FINANCIAL AUDIT • MoF 2026
    </text>
  </g>
</svg>
`;

  await sharp(inputPath)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log('Book test generated');
}

testBookPlacement().catch(console.error);
