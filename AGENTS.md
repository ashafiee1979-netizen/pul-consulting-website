# Agent guide - PUL Consulting website

Next.js App Router, React, Tailwind and Nodemailer. Both Contact and Request Consultation use components/ConsultationModal.tsx and app/api/consultation/route.ts. Email goes directly through One.com to info@pulconsulting.com; there is no database or admin authentication dependency.

- Read ONECOM_EMAIL_SETUP.md for the active delivery setup. SETUP_NEON_EMAIL.md and older task logs are historical.
- Never read, print or commit .env.local values. Use .env.example for variable names.
- Keep brand colors in tailwind.config.js and the shared card accent system.
- Escape every user-controlled HTML value in lib/email.ts.
- Never show inquiry success before SMTP accepts the internal notification.
- Do not send test emails to clients. A live test requires authorization and an owner-controlled address.
- Do not delete old Neon data or other external resources without explicit approval.
- Run npm test, npm run lint and npm run build before finishing.
- Read relevant guides in node_modules/next/dist/docs before changing Next.js code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
