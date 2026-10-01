import nodemailer, { type Transporter } from "nodemailer";

export interface InquiryEmailData {
  referenceId: string;
  receivedAt: Date;
  name: string;
  email: string;
  phone: string;
  organization: string;
  orgType?: string;
  service: string;
  timeline: string;
  projectScope: string;
}

const BRAND = {
  navy: "#0B2B45",
  navyDark: "#061D30",
  blue: "#16769C",
  sky: "#DCECF2",
  ice: "#F4F8FC",
  ink: "#102435",
  muted: "#5B6A73",
  line: "#D8E0E4",
  gold: "#B89556",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const multiline = (value: string) => esc(value).replace(/\r?\n/g, "<br/>");

const siteUrl = () => (process.env.SITE_URL || "https://pulconsulting.com").replace(/\/$/, "");

function formatDate(d: Date) {
  return d.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/New_York",
  }) + " ET";
}

function shell(opts: { preheader: string; eyebrow: string; title: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="color-scheme" content="light"/>
<title>${esc(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.ice};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.ice};padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:6px;overflow:hidden;">
    <tr><td style="background:${BRAND.navy};padding:28px 36px 24px;">
      <div style="font-family:${SERIF};font-size:22px;line-height:1.2;font-weight:bold;color:#ffffff;letter-spacing:0.3px;">PUL Consulting Services</div>
      <div style="font-family:${SANS};font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:${BRAND.gold};margin-top:6px;">Bridging the Gap</div>
    </td></tr>
    <tr><td style="background:${BRAND.gold};height:3px;line-height:3px;font-size:0;">&nbsp;</td></tr>
    <tr><td style="padding:36px 36px 8px;">
      <div style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.blue};font-weight:bold;">${esc(opts.eyebrow)}</div>
      <h1 style="font-family:${SERIF};font-size:26px;line-height:1.25;color:${BRAND.ink};margin:10px 0 0;font-weight:bold;">${opts.title}</h1>
    </td></tr>
    <tr><td style="padding:8px 36px 36px;font-family:${SANS};font-size:15px;line-height:1.65;color:${BRAND.ink};">
      ${opts.body}
    </td></tr>
    <tr><td style="background:${BRAND.navyDark};padding:24px 36px;font-family:${SANS};font-size:12px;line-height:1.7;color:#a9bccb;">
      <strong style="color:#ffffff;">PUL Consulting Services</strong><br/>
      Kabul, Afghanistan &nbsp;·&nbsp; Stafford &amp; Fairfax, Virginia, USA<br/>
      <a href="mailto:info@pulconsulting.com" style="color:${BRAND.sky};text-decoration:none;">info@pulconsulting.com</a>
      &nbsp;·&nbsp;
      <a href="${siteUrl()}" style="color:${BRAND.sky};text-decoration:none;">pulconsulting.com</a>
    </td></tr>
  </table>
  <div style="font-family:${SANS};font-size:11px;color:${BRAND.muted};padding:16px 24px;max-width:560px;line-height:1.6;">
    Sent from a monitored mailbox. Information you share with us is treated as confidential.
  </div>
</td></tr>
</table>
</body>
</html>`;
}

function refBadge(ref: string) {
  return `<span style="display:inline-block;font-family:'Courier New',monospace;font-size:13px;font-weight:bold;color:${BRAND.navy};background:${BRAND.sky};border:1px solid #b9d6e2;border-radius:999px;padding:6px 14px;">${esc(ref)}</span>`;
}

function detailRows(rows: Array<[string, string]>) {
  return rows
    .map(
      ([k, v], i) => `<tr>
  <td style="padding:11px 14px;width:38%;font-family:${SANS};font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:${BRAND.muted};vertical-align:top;border-top:${i ? `1px solid ${BRAND.line}` : "0"};">${esc(k)}</td>
  <td style="padding:11px 14px;font-family:${SANS};font-size:14px;color:${BRAND.ink};vertical-align:top;border-top:${i ? `1px solid ${BRAND.line}` : "0"};">${v}</td>
</tr>`
    )
    .join("");
}

function button(href: string, label: string, bg = BRAND.blue) {
  return `<a href="${href}" style="display:inline-block;background:${bg};color:#ffffff;font-family:${SANS};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:13px 26px;border-radius:4px;">${esc(label)}</a>`;
}

/** Email sent to the client confirming their submission. */
export function clientConfirmationEmail(d: InquiryEmailData) {
  const first = d.name.trim().split(/\s+/)[0] || d.name;
  const body = `
<p style="margin:14px 0 18px;">Dear ${esc(first)},</p>
<p style="margin:0 0 18px;">Thank you for contacting PUL Consulting Services. We have received your inquiry on behalf of <strong>${esc(d.organization)}</strong> and it has been registered with our program management office.</p>
<p style="margin:0 0 22px;">${refBadge(d.referenceId)}<br/><span style="font-size:12px;color:${BRAND.muted};">Please quote this reference in any correspondence.</span></p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.ice};border:1px solid ${BRAND.line};border-radius:4px;margin:0 0 26px;">
  ${detailRows([
    ["Practice area", esc(d.service)],
    ["Timeline", esc(d.timeline)],
    ["Submitted", esc(formatDate(d.receivedAt))],
  ])}
</table>

<h2 style="font-family:${SERIF};font-size:18px;color:${BRAND.navy};margin:0 0 12px;">What happens next</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 26px;">
  <tr><td style="width:34px;vertical-align:top;padding:0 0 12px;"><div style="width:24px;height:24px;border-radius:12px;background:${BRAND.navy};color:#fff;font-weight:bold;font-size:12px;line-height:24px;text-align:center;">1</div></td>
      <td style="padding:2px 0 12px;font-size:14px;"><strong>Review</strong> — a senior member of our team reads your inquiry and scope.</td></tr>
  <tr><td style="vertical-align:top;padding:0 0 12px;"><div style="width:24px;height:24px;border-radius:12px;background:${BRAND.navy};color:#fff;font-weight:bold;font-size:12px;line-height:24px;text-align:center;">2</div></td>
      <td style="padding:2px 0 12px;font-size:14px;"><strong>Response</strong> — we will contact you within <strong>24 business hours</strong>.</td></tr>
  <tr><td style="vertical-align:top;padding:0;"><div style="width:24px;height:24px;border-radius:12px;background:${BRAND.navy};color:#fff;font-weight:bold;font-size:12px;line-height:24px;text-align:center;">3</div></td>
      <td style="padding:2px 0 0;font-size:14px;"><strong>Consultation</strong> — we agree scope, terms of reference and next steps.</td></tr>
</table>

<p style="margin:0 0 22px;">Need to add information or reach us sooner? Simply reply to this email, or contact us directly:</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 6px;"><tr>
  <td style="padding:0 10px 10px 0;">${button("mailto:info@pulconsulting.com?subject=" + encodeURIComponent("Re: " + d.referenceId), "Reply to PMO")}</td>
  <td style="padding:0 0 10px;">${button("https://wa.me/93786199696?text=" + encodeURIComponent("Hello PUL Consulting, I submitted inquiry " + d.referenceId + "."), "WhatsApp", "#1f8f5f")}</td>
</tr></table>
<p style="margin:12px 0 0;font-size:13px;color:${BRAND.muted};">Phone: +93 (786) 19 96 96</p>
<p style="margin:26px 0 0;">With regards,<br/><strong style="font-family:${SERIF};">PUL Consulting Services</strong><br/><span style="font-size:13px;color:${BRAND.muted};">Program Management Office</span></p>`;

  const html = shell({
    preheader: `We received your inquiry — reference ${d.referenceId}. We'll respond within 24 business hours.`,
    eyebrow: "Inquiry received",
    title: "Thank you — we have your inquiry",
    body,
  });

  const text = `Dear ${first},

Thank you for contacting PUL Consulting Services. We have received your inquiry on behalf of ${d.organization}.

Reference: ${d.referenceId}
Practice area: ${d.service}
Timeline: ${d.timeline}
Submitted: ${formatDate(d.receivedAt)}

What happens next: our team reviews your inquiry and will contact you within 24 business hours.

Reply to this email, write to info@pulconsulting.com, or call +93 (786) 19 96 96.

PUL Consulting Services — Program Management Office`;

  return {
    subject: `We received your inquiry — ${d.referenceId}`,
    html,
    text,
  };
}

/** Email sent to the PMO inbox for every new submission. */
export function internalNotificationEmail(d: InquiryEmailData) {
  const adminUrl = `${siteUrl()}/admin`;
  const body = `
<p style="margin:14px 0 18px;">A new inquiry was submitted through the website.</p>
<p style="margin:0 0 22px;">${refBadge(d.referenceId)}</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.ice};border:1px solid ${BRAND.line};border-radius:4px;margin:0 0 24px;">
  ${detailRows([
    ["Contact", `<strong>${esc(d.name)}</strong>`],
    ["Organization", esc(d.organization) + (d.orgType ? `<br/><span style="color:${BRAND.muted};font-size:12px;">${esc(d.orgType)}</span>` : "")],
    ["Email", `<a href="mailto:${esc(d.email)}" style="color:${BRAND.blue};text-decoration:none;">${esc(d.email)}</a>`],
    ["Phone / WhatsApp", esc(d.phone || "Not provided")],
    ["Practice area", esc(d.service)],
    ["Timeline", esc(d.timeline)],
    ["Received", esc(formatDate(d.receivedAt))],
  ])}
</table>

<h2 style="font-family:${SERIF};font-size:17px;color:${BRAND.navy};margin:0 0 10px;">Project scope</h2>
<div style="border-left:3px solid ${BRAND.gold};background:${BRAND.ice};padding:14px 16px;font-size:14px;margin:0 0 26px;">${
    d.projectScope ? multiline(d.projectScope) : `<span style="color:${BRAND.muted};">No scope details provided.</span>`
  }</div>

<table role="presentation" cellpadding="0" cellspacing="0"><tr>
  <td style="padding:0 10px 10px 0;">${button("mailto:" + esc(d.email) + "?subject=" + encodeURIComponent("Re: your inquiry " + d.referenceId), "Reply to client")}</td>
  <td style="padding:0 0 10px;">${button(adminUrl, "Open dashboard", BRAND.navy)}</td>
</tr></table>
<p style="margin:8px 0 0;font-size:12px;color:${BRAND.muted};">Replying to this email also reaches the client directly. Target response: 24 business hours.</p>`;

  const html = shell({
    preheader: `${d.name} · ${d.organization} · ${d.service}`,
    eyebrow: "New website inquiry",
    title: esc(d.organization),
    body,
  });

  const text = `New website inquiry ${d.referenceId}

Contact: ${d.name}
Organization: ${d.organization}${d.orgType ? ` (${d.orgType})` : ""}
Email: ${d.email}
Phone: ${d.phone || "Not provided"}
Practice area: ${d.service}
Timeline: ${d.timeline}
Received: ${formatDate(d.receivedAt)}

Scope:
${d.projectScope || "No scope details provided."}`;

  return {
    subject: `[New inquiry] ${d.referenceId} — ${d.organization}`,
    html,
    text,
  };
}

let transporter: Transporter | null = null;

export function mailConfigured() {
  return Boolean(process.env.SMTP_PASS);
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "send.one.com",
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER || "info@pulconsulting.com",
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return transporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const from = process.env.SMTP_USER || "info@pulconsulting.com";
  await getTransporter().sendMail({
    from: `"PUL Consulting Services" <${from}>`,
    to: opts.to,
    replyTo: opts.replyTo || from,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });
}
