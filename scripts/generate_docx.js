const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
} = require("docx");
const fs = require("fs");
const path = require("path");

function createCell(text, isHeader = false, widthPercent = 25, isBold = false) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: isHeader
      ? { type: ShadingType.CLEAR, fill: "0B2545", color: "FFFFFF" }
      : undefined,
    margins: { top: 120, bottom: 120, left: 150, right: 150 },
    children: [
      new Paragraph({
        alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: [
          new TextRun({
            text: text,
            bold: isHeader || isBold,
            color: isHeader ? "FFFFFF" : "1E293B",
            size: isHeader ? 20 : 19,
            font: "Arial",
          }),
        ],
      }),
    ],
  });
}

async function generate() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "PUL CONSULTING SERVICES • EXECUTIVE DEPLOYMENT PLAN",
                    size: 16,
                    color: "64748B",
                    font: "Arial",
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Page ",
                    size: 16,
                    color: "64748B",
                    font: "Arial",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: "64748B",
                    font: "Arial",
                  }),
                  new TextRun({
                    text: " of ",
                    size: 16,
                    color: "64748B",
                    font: "Arial",
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: "64748B",
                    font: "Arial",
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // Document Header / Title
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "PUL CONSULTING SERVICES",
                bold: true,
                size: 22,
                color: "0284C7",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Production Go-Live & Custom Domain Deployment Plan",
                bold: true,
                size: 38,
                color: "0B2545",
                font: "Georgia",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 360 },
            children: [
              new TextRun({
                text: "Standard Operating Procedure for Custom Domain Configuration, Automated Order/Inquiry Reception, SEO Discovery & Public Launch",
                italics: true,
                size: 21,
                color: "475569",
                font: "Arial",
              }),
            ],
          }),

          // Divider Line
          new Paragraph({
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "_________________________________________________________________________________",
                color: "CBD5E1",
                size: 18,
              }),
            ],
          }),

          // Section 1: Executive Readiness Summary
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 140 },
            children: [
              new TextRun({
                text: "1. Executive Readiness Status",
                bold: true,
                size: 28,
                color: "0B2545",
                font: "Georgia",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "The website codebase has undergone rigorous institutional validation, responsive testing across mobile/tablet viewports, and automated build verification. It is currently running in staging on Vercel at ",
                size: 20,
                font: "Arial",
                color: "1E293B",
              }),
              new TextRun({
                text: "https://pul-consulting-website.vercel.app",
                bold: true,
                color: "0284C7",
                size: 20,
                font: "Arial",
              }),
              new TextRun({
                text: " and is ready for instantaneous domain attachment.",
                size: 20,
                font: "Arial",
                color: "1E293B",
              }),
            ],
          }),

          // Status Bullet List
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Production Build Status: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Compiled with 0 errors across 10 static and dynamic routes.", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Visual Alignment: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Hero banners on Projects, About, and Solutions are calibrated to an identical 600px scale with frosted semi-transparent cards and enhanced brightness.", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Mobile & iPad Optimization: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Includes responsive grid adaptations for 4 Pillars and automated smooth-scrolling to the project dossier when selected on phone and tablet screens.", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Version Control: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Committed and pushed to GitHub main branch (commit f21b3d3).", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 260 },
            children: [
              new TextRun({ text: "SEO Assets: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Dynamic XML Sitemap (sitemap.xml) and crawler rules (robots.txt) are live.", size: 20, font: "Arial" }),
            ],
          }),

          // Section 2: Phase 1 Domain Setup
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 140 },
            children: [
              new TextRun({
                text: "2. Connecting Your Custom Domain (5-Minute Procedure)",
                bold: true,
                size: 28,
                color: "0B2545",
                font: "Georgia",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "Step 2.1 — Register Domain in Vercel Dashboard:",
                bold: true,
                size: 21,
                color: "0284C7",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "1. Log into your Vercel account at https://vercel.com\n2. Open your project: pul-consulting-website\n3. Navigate to Settings > Domains\n4. Type your domain name (for example: pulconsulting.com) and click Add\n5. Select the recommended option to add both the apex domain (pulconsulting.com) and the www subdomain (www.pulconsulting.com).",
                size: 20,
                font: "Arial",
                color: "334155",
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "Step 2.2 — Update DNS Records at Your Domain Registrar:",
                bold: true,
                size: 21,
                color: "0284C7",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "Log into where you purchased your domain (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.), navigate to DNS Management, and configure the following two records:",
                size: 20,
                font: "Arial",
                color: "334155",
              }),
            ],
          }),

          // DNS Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("RECORD TYPE", true, 20),
                  createCell("HOST / NAME", true, 25),
                  createCell("POINTS TO / VALUE", true, 35),
                  createCell("TTL", true, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("A", false, 20, true),
                  createCell("@ (or blank)", false, 25),
                  createCell("76.76.21.21", false, 35, true),
                  createCell("Automatic / 300s", false, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("CNAME", false, 20, true),
                  createCell("www", false, 25),
                  createCell("cname.vercel-dns.com.", false, 35, true),
                  createCell("Automatic / 300s", false, 20),
                ],
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 140, after: 260 },
            children: [
              new TextRun({
                text: "SSL / HTTPS Provisioning: ",
                bold: true,
                size: 19,
                color: "0B2545",
                font: "Arial",
              }),
              new TextRun({
                text: "Once the DNS records propagate (typically 5 to 15 minutes), Vercel automatically creates a free, trusted Let's Encrypt SSL certificate. You will see a green checkmark indicating 'Valid Configuration'.",
                size: 19,
                color: "475569",
                font: "Arial",
              }),
            ],
          }),

          // Section 3: Receiving Client Inquiries & Orders
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 140 },
            children: [
              new TextRun({
                text: "3. Receiving Client Inquiries & Orders",
                bold: true,
                size: 28,
                color: "0B2545",
                font: "Georgia",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "The website incorporates a dual-tier intake architecture to ensure zero inquiries or procurement RFPs are ever dropped:",
                size: 20,
                font: "Arial",
                color: "1E293B",
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Channel 1 — Instant 1-Click Client Dispatch (Active Immediately):",
                bold: true,
                size: 21,
                color: "0284C7",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "• Tracking Code Generation: When a client submits the 'Request Consultation' form, the server issues a validated institutional tracking reference (e.g. PUL-RFP-2026-48219).\n• Email Dispatch Button: Generates a pre-filled email in the client's mail application directly addressed to info@pulconsulting.com containing their complete scope, timeline, organization, and contact details.\n• WhatsApp PMO Button: Generates a direct mobile/desktop WhatsApp conversation with the Kabul Executive Desk at +93 786 19 96 96 pre-filled with the inquiry reference.",
                size: 20,
                font: "Arial",
                color: "334155",
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Channel 2 — Hands-Free Automated Server Email (Via Resend):",
                bold: true,
                size: 21,
                color: "0284C7",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "The server route (/api/consultation) is already pre-configured to send an automated executive alert to your inbox without requiring the user to open any mail app. To enable this:\n1. Create a free account at https://resend.com (grants 3,000 free emails/month).\n2. Obtain your API key (starts with re_...).\n3. In Vercel, go to Settings > Environment Variables and enter:\n   - RESEND_API_KEY = your_key_here\n   - NOTIFICATION_EMAIL = info@pulconsulting.com\n4. Save. From that moment onward, every form submission will trigger an instantaneous email notification to info@pulconsulting.com automatically.",
                size: 20,
                font: "Arial",
                color: "334155",
              }),
            ],
          }),

          // Section 4: Public Go-Live Checklist
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 140 },
            children: [
              new TextRun({
                text: "4. Public Launch & Verification Checklist",
                bold: true,
                size: 28,
                color: "0B2545",
                font: "Georgia",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "Perform these 5 quick verification checks once your DNS is configured:",
                size: 20,
                font: "Arial",
                color: "1E293B",
              }),
            ],
          }),

          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "[  ] SSL & Apex Check: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Visit https://yourdomain.com and ensure the secure padlock is present and www redirects seamlessly.", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "[  ] Inquiry Form Test: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Click 'Request Consultation', submit a test RFP, and verify the reference code is generated.", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "[  ] WhatsApp Integration: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Tap the WhatsApp PMO button from a phone to ensure it routes to +93 786 19 96 96.", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "[  ] Phone & Email Links: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Test the phone number (+93 786 19 96 96) and email links in the top utility bar and footer.", size: 20, font: "Arial" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 240 },
            children: [
              new TextRun({ text: "[  ] Search Console Registration: ", bold: true, size: 20, font: "Arial" }),
              new TextRun({ text: "Submit https://yourdomain.com/sitemap.xml to Google Search Console to speed up ranking.", size: 20, font: "Arial" }),
            ],
          }),

          // Sign-off Box
          new Paragraph({
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({
                text: "Institutional Governance & Executive Inquiries",
                bold: true,
                size: 20,
                color: "0B2545",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: "PUL Consulting Services — Parent Advisory & Operations Firm\nKabul Headquarters: House # 12, Street 3, Qala-e-Fatullah, Kabul, Afghanistan\nPhone: +93 (786) 19 96 96 / +93 (786) 600 597 • Email: info@pulconsulting.com\nRegistration: MoCI Reg # 21679 • AISA License # D-34532 • TIN: 9000010281",
                size: 18,
                color: "64748B",
                font: "Arial",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  
  // Output locations
  const targetPath1 = "e:/PUL Consulting Services 2010 - Present/PUL_Consulting_Website_Go_Live_Plan.docx";
  const targetPath2 = "e:/PUL Consulting Services 2010 - Present/pul-consulting-website/public/PUL_Consulting_Website_Go_Live_Plan.docx";

  fs.writeFileSync(targetPath1, buffer);
  fs.writeFileSync(targetPath2, buffer);

  console.log(`Document successfully generated at:`);
  console.log(`1) ${targetPath1}`);
  console.log(`2) ${targetPath2}`);
}

generate().catch(console.error);
