import nodemailer from "nodemailer";

// Run with: node --env-file=.env.local scripts/verify-smtp.mjs
// Authenticates only: it does not send email or display credentials.
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error("SMTP_USER and SMTP_PASS must be configured.");
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT || 465);
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "send.one.com",
  port,
  secure: port === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

try {
  await transport.verify();
  console.log("SMTP connection and authentication verified. No email sent.");
} catch (error) {
  console.error("SMTP verification failed.", {
    code: error.code || "UNKNOWN",
    responseCode: error.responseCode || null,
  });
  process.exitCode = 1;
} finally {
  transport.close();
}
