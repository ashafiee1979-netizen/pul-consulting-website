# Agent guide — PUL Consulting website

Personal project of Rahman Shafiee. Start with `OPEN_TASKS.md` (pick a task by ID) and `SETUP_NEON_EMAIL.md` (what exists).

## Stack
Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 3 · Neon Postgres via `@neondatabase/serverless` · Neon Auth (`@neondatabase/auth`) · Nodemailer over One.com SMTP (`send.one.com:465`).

## Map
- `app/api/consultation/route.ts` — form endpoint: validate, save to `inquiries`, send 2 emails.
- `lib/email.ts` — both branded email templates + SMTP sender. `esc()` must wrap every user-supplied value.
- `lib/db.ts` — `sql()` helper. `scripts/migrate.mjs` — idempotent schema setup (`node scripts/migrate.mjs`).
- `lib/auth/server.ts`, `proxy.ts`, `app/auth/*`, `app/admin/page.tsx` — admin login and dashboard. Access is limited by `ADMIN_EMAILS`.
- `components/ConsultationModal.tsx` — the public form.

## Rules
- Never read, print, or commit `.env.local` values; add new variable names to `.env.example`.
- Database changes: new idempotent migration steps only; never drop or rewrite existing tables without asking.
- Don't send test emails to real clients; don't create or delete Neon/One.com resources without the user's approval.
- Keep brand colors from `tailwind.config.js` (`corp.*`); email colors are mirrored in `lib/email.ts`.
- Verify with `npm run build` before finishing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
