# Database, Auth & Form Email — Setup Notes (2026-10-01)

- **Database:** Neon Postgres, project `pul-consulting-va` (id `still-wave-08718121`), AWS US East 1 (N. Virginia), free plan. Table `inquiries` (see `scripts/migrate.mjs`).
- **Auth:** Neon Auth (managed Better Auth) on the same project. `/admin` is protected by `proxy.ts` and an `ADMIN_EMAILS` allow-list. Sign-up (`/auth/sign-up`) only works for allow-listed emails.
- **Email:** One.com mailbox `info@pulconsulting.com` via `send.one.com:465`. Each submission sends (1) a branded confirmation to the client and (2) a branded notification to `NOTIFICATION_EMAIL`. Templates: `lib/email.ts`.
- **Env vars:** see `.env.example`; real values live in `.env.local` (git-ignored) and must be added to the hosting provider.
- **Stack change:** upgraded Next 14 -> 16 and React 18 -> 19 (required by `@neondatabase/auth`).

## Still to do (full tracked list: OPEN_TASKS.md)
1. Put the info@ mailbox password in `SMTP_PASS` (local + hosting env). Until set, inquiries are saved but no emails are sent.
2. Rotate that password: the old one was hardcoded in `app/api/consultation/route.ts` (now removed) and so is exposed in any copy of the old source. Also revoke the old Resend key that was in that file.
3. Open `/auth/sign-up` once to create the admin account, then sign in at `/auth/sign-in`.
4. Delete the unused Frankfurt Neon project `pul-consulting-website` (empty; created before the region was corrected to Virginia).
5. Set `SITE_URL` on the live host.

## Codex verification — 2026-10-01

- Used the signed-in Chrome profile for `ashafiee1979@gmail.com` and confirmed both Neon projects and the One.com `info@pulconsulting.com` mailbox.
- Configured `SMTP_PASS` locally from the user-provided credential. SMTP TLS connection and authentication passed; this does not prove inbox delivery. The exposed credential still needs rotation by the user.
- Added `scripts/verify-smtp.mjs`: run `node --env-file=.env.local scripts/verify-smtp.mjs` to verify authentication without sending email or displaying credentials.
- The configured database is reachable and `inquiries` exists with zero rows at the time of verification. Virginia Neon Auth has no users yet.
- Frankfurt project `orange-frost-91558829` has zero tables in the `public` schema. Its permanent deletion is awaiting explicit confirmation.
- Public DNS: nameservers `ns01.one.com` / `ns02.one.com`, One.com MX records, SPF `v=spf1 include:_custspf.one.com ~all`, DMARC `v=DMARC1; p=reject`. Do not replace the existing stronger DMARC policy with `p=none`. One.com documents automatic DKIM with its nameservers; a received test message is still required to verify SPF/DKIM/DMARC results and inbox placement.
- `npm run build` passed. Local preview is available at `http://localhost:3001`; admin sign-up has been opened for user password entry.
- No deployment, DNS change, resource deletion, or test email was performed during this initial verification.

### Completed account steps after user confirmation

- User explicitly approved deleting Frankfurt project `orange-frost-91558829`. Neon confirmed successful deletion and now lists only `pul-consulting-va` in N. Virginia.
- User created the admin account. `/admin` shows the signed-in allow-listed user and the stored inquiry.
- User explicitly approved one test inquiry to their Gmail address plus the PMO mailbox. Submitted through the Chrome UI; reference `PUL-RFP-2026-62309`. Both email sent flags are true and both messages arrived.
- Gmail confirmation landed in Primary Inbox within two seconds. "Show original" reports SPF PASS, DKIM PASS (`rsa1`), and DMARC PASS. One.com also adds an `ed1` signature that Gmail reports as neutral; the RSA signature passes and DMARC alignment succeeds.
- PMO notification arrived in One.com Spam. Moved only this test message to Inbox and verified its location. Spam protections remain enabled; future notifications may still require receiver-side tuning.
- Final `npm run build` passed. Evidence screenshots are in `output/setup-verification/`.
- T2 is still open: the existing exposed mailbox credential was used, not rotated; the old Resend key was not revoked. T5 production hosting, hosting environment variables, and domain cutover are still open. Email links currently use the local preview URL and must use the production `SITE_URL` when deployed.
