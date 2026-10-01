# PUL Consulting Website — Open Tasks

Last updated: 2026-10-01. Context: personal project. Owner: Rahman. See `SETUP_NEON_EMAIL.md` for what is already built and `AGENTS.md` for rules agents must follow.

**Legend** — Owner: `USER` = needs account access, a password, or a decision the user must make; `ANY` = safe to give to Codex or Claude. Size: S (<1h), M (half day), L (day+).

## A. Must-do before going live

| ID | Owner | Size | Task | Done when |
|----|-------|------|------|-----------|
| T1 ✅ | USER | S | Completed locally on 2026-10-01: configured SMTP_PASS and submitted an authorized test inquiry. Hosting env remains part of T5. | Both emails arrived; `/admin` shows both as "sent" for `PUL-RFP-2026-62309`. PMO message initially went to Spam and was moved to Inbox. |
| T2 | USER | S | Change the `info@pulconsulting.com` password in One.com and revoke the old Resend API key. Both were hardcoded in the old `app/api/consultation/route.ts`, so treat them as exposed. Update Outlook and phones that use the mailbox. | Old password no longer works; new one is only in `.env.local` and the host's env settings. |
| T3 ✅ | USER | S | Completed 2026-10-01 with explicit deletion approval: removed Frankfurt project `orange-frost-91558829`. | Neon console shows only `pul-consulting-va` (Virginia, id `still-wave-08718121`). |
| T4 ✅ | USER | S | User created the allow-listed admin account on 2026-10-01. Authenticated access to `/admin` verified. | Test inquiry visible at `/admin` as `ashafiee1979@gmail.com`. |
| T5 | USER + ANY | M | Choose hosting (suggest Vercel, region `iad1`/N. Virginia to sit next to Neon), add every variable from `.env.example`, set `SITE_URL=https://pulconsulting.com`, deploy. | Live form submission works end to end on the real domain. |
| T6 ✅ | USER (ANY can draft the records) | M | Verified existing SPF, automatic DKIM, and DMARC `p=reject` on 2026-10-01. No DNS changes needed. | Gmail test landed in Primary Inbox and "Show original" reports SPF/DKIM/DMARC PASS. One.com's internal notification initially went to Spam; test moved to Inbox, future placement still needs monitoring. |

## B. Engineering tasks (good for Codex)

| ID | Size | Task | Acceptance criteria |
|----|------|------|---------------------|
| T7 | S | **Sign-out button** on `/admin` (none exists). Use `authClient.signOut()` from `lib/auth/client.ts` (needs creating; see Neon Auth Next.js docs) or a server action. | Clicking it ends the session and returns to `/auth/sign-in`. |
| T8 | M | **Inquiry status workflow.** Add `status` (`new`, `contacted`, `won`, `closed`) and `notes` columns via a new idempotent migration script; edit them from `/admin`. Never edit the existing `CREATE TABLE`; add `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`. | Status persists, filter by status works, no data loss on re-running the migration. |
| T9 | M | **Resend failed emails.** Where `confirmation_sent` or `notification_sent` is false, add a "Resend" button in `/admin` (server action, admin-only) that rebuilds the email from the stored row and updates the flags. | A row with SMTP failure can be fixed after the fact; non-admins cannot call it. |
| T10 | S | **Search and CSV export** in `/admin` (organization, name, email, reference; export respects filters). Escape CSV formula injection (cells starting `= + - @`). | Export opens cleanly in Excel with no formula execution. |
| T11 | M | **Tests.** Add Vitest. Cover: field validation, email-format check, honeypot, 5-per-hour throttle, HTML escaping in `lib/email.ts` (e.g. `<script>` in name/scope), reference-id format. Mock `sql()` and `sendMail`. Add `npm test`. | `npm test` passes in CI/locally; escaping test fails if `esc()` is removed. |
| T12 | S | **Fix `npm run lint`.** `next lint` was removed in Next 16. Add ESLint (`eslint-config-next`) and change the script to `eslint .`. | `npm run lint` runs and passes (or only reports real issues). |
| T13 | S | **Use a Neon dev branch for local work.** `.env.local` currently points at the `production` branch. Create a `dev` branch in Neon (free plan allows 10), point `.env.local` at it, keep production credentials only in the host's env. | Local testing no longer writes to production data. |
| T14 | M | **Stronger anti-spam** beyond honeypot + per-email throttle: per-IP throttle (store a hashed IP + timestamp, never raw IPs) and optional Cloudflare Turnstile (free). | Scripted flood from one IP is rejected with HTTP 429; real users unaffected. |
| T15 | S | **Admin password reset.** Add "Forgot password" using Neon Auth's reset flow (the sign-in form has none). | An admin who forgets the password can recover access by email. |
| T16 | S | **Clean the modal.** `components/ConsultationModal.tsx` still builds unused `mailtoSubject`/`mailtoBody` strings from the old "send it yourself by email" flow. Remove dead code. Add a visible consent line linking `/privacy`. | No unused variables; consent text shown above the submit button. |
| T17 | S | **Pin versions** — add `"engines": {"node": ">=20"}` to `package.json`; confirm `npm ci && npm run build` works on a clean checkout. | Clean install builds without `--legacy-peer-deps`. |

## C. Content / compliance

| ID | Owner | Size | Task |
|----|-------|------|------|
| T18 | USER decides, ANY drafts | M | Update `app/privacy/page.tsx`: inquiries are stored in a Postgres database (Neon, N. Virginia, USA), who can access them, retention period, and how to request deletion. Add a deletion/export path (even a documented manual SQL step in this repo). |
| T19 | ANY | S | Add the logo image to the emails (`/assets/brand/pul-consulting-logo.jpg`, served from `SITE_URL`) with the text wordmark kept as fallback; check rendering in Gmail, Outlook (desktop) and Apple Mail, including dark mode. Templates are in `lib/email.ts`. |
| T20 | ANY | S | Refresh stale docs: `ANTIGRAVITY_FOLLOW_UP.md` and `CODEX_REVIEW_RESPONSE.md` say the form relies on `mailto:`/WhatsApp fallbacks and "no delivery path"; that is no longer true. Add a dated note, don't rewrite history. |

## Suggested split for Codex
Hand over **T7, T8, T9, T10, T11, T12, T16, T17** first (self-contained, no credentials). **T13, T14, T15** next. Keep **T1–T6** with the user; they need account access or the mailbox password.

## Rules for whoever picks up a task
- Do not print, commit, or paste secrets. `.env.local` is git-ignored; use `.env.example` for new variable names.
- Don't send real emails to real clients while testing; use your own address.
- Don't test against production data once T13 is done.
- Run `npm run build` before declaring a task finished, and record it in the table below.

## Task log
| Date | ID | Who | Result |
|------|----|-----|--------|
| 2026-10-01 | — | Claude | Neon DB + Auth, branded emails, admin page built. Build passes. See `SETUP_NEON_EMAIL.md`. |
| 2026-10-01 | T1 (partial), T2–T4 (prepared), T6 (DNS verified) | Codex | SMTP_PASS configured locally; SMTP authentication and database connectivity verified; build passed. Added a credential-safe SMTP check. Test-email approval, credential rotation, Frankfurt deletion confirmation, and user admin sign-up remain pending. SPF and DMARC already exist; inbox authentication still requires a received test message. |
| 2026-10-01 | T1, T3, T4, T6 | Codex/User | Completed: approved Frankfurt deletion verified; user-created admin reaches dashboard; browser-submitted test `PUL-RFP-2026-62309` stored with both sent flags. Both emails arrived; Gmail Primary Inbox with SPF/DKIM/DMARC PASS. PMO message recovered from Spam to Inbox. Final build passed. T2 credential rotation/Resend revocation and T5 hosting remain open. |
