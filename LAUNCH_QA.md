# Final pre-launch QA

31 October 2026 — PUL Consulting Services

## Changes

Extended the existing Home/About sky, teal, indigo, amber and emerald accents to service, project, client, partner, policy and admin cards. Typography, photography, page structure and the established brand palette are retained.

Corrected inner-page canonical URLs, policy contact details and inquiry-storage wording. Added legal pages to the sitemap, excluded admin/auth routes from indexing, unified the configured site origin, added a branded 404 and basic security headers. Improved keyboard navigation and inquiry dialog behavior, including optional phone entry and correct general/partnership service selection. Admin authentication now fails closed without a real cookie secret; a server-side sign-out action is provided.

## Verification

- ESLint: passed with zero errors and three non-blocking state-in-effect warnings in existing modal/counter patterns.
- Production build: passed with Next.js 16.4.3, including TypeScript and static generation.
- Clean lockfile install: `npm ci --ignore-scripts --no-fund` passed without legacy peer-dependency flags; the production build is checked separately.
- Ten isolated inquiry tests: passed. Validation, malformed JSON, honeypot, throttling, reference generation/collision retry, database and SMTP failures, email HTML escaping, and missing auth configuration are covered. Database and SMTP are mocked.
- Local HTTP audit: eight pages, 34 internal links (including service anchors, profile download, sitemap and robots), three external partner sites, and 35 image URLs passed. Required-field/invalid-email requests returned 400; honeypot returned a synthetic receipt without writing or emailing. Unauthenticated admin requests redirect to sign-in. Automated output is under ignored `output/`.
- Browser responsive checks: all eight pages at 320×740, 768×1024 and 1280×900 had no document overflow or broken loaded images.
- Browser interactions: project search for Asia Foundation returned three related entries; selection updated details, no-result state rendered, and Telecom Operations filtering returned six entries. Mobile menu and service submenu worked, a service anchor navigated correctly and closed the menu. Mobile consultation fields/footer remained accessible; Escape closed the dialog. Desktop service and partner cards and policy presentation were visually reviewed.
- Existing project reconciliation remains intact: 34 source entries, owner-supplied dates, Asia Foundation assignments, and the downloadable company profile.

## Security and limitations

Updated Next.js, Nodemailer, Sharp and vulnerable auth dependencies. Production npm audit now reports seven low-severity advisory entries through `deepmerge` in the Neon SDK's unused bundled authentication UI/email-rendering dependencies. There are no production critical, high or moderate findings. This app uses its own auth form and email templates. The full audit additionally reports 16 moderate entries through minimatch in development-only lint dependencies; these are excluded from the production dependency audit. No forced breaking SDK or lint dependency downgrade was applied. [Deepmerge advisory](https://github.com/advisories/GHSA-gcqx-w48m-w2h4).

Authenticated admin sign-in/sign-out was not exercised with an owner account during this QA. Inbox placement and visual email rendering require checking the received messages; SMTP acceptance alone does not prove inbox placement. This is an engineering/content consistency review, not legal approval of the published policies.

## Domain launch

See [DOMAIN_LAUNCH.md](DOMAIN_LAUNCH.md) for the prepared cutover records, verification and rollback steps. The custom domain is not attached or switched yet. Confirm previously exposed credentials have been rotated (OPEN_TASKS T2) before domain launch. Existing One.com email DNS must remain intact.

## Live release evidence

Application commit: 9952d00cd2b057a05724fc51c9088007165d0579. Vercel production deployment dpl_AH4GF6hqJjoXabaCoCDT56YLxJJ9 reached READY. The live HTTP audit passed all eight pages, 34 internal links, three external links and 35 image URLs, plus validation/honeypot checks, admin redirect, branded 404 and security headers.

Exactly one authorized live inquiry was submitted through the public API: PUL-RFP-2026-39908, with the name PUL Consulting pre-launch QA and info@pulconsulting.com as the contact. The API returned HTTP 200, success true and a valid reference; Vercel runtime logs confirm the record was stored. Both confirmationSent and notificationSent were false. Runtime logs identify One.com SMTP 535 5.7.8 Authentication failed for both attempts. No additional inquiry or retry was sent.

**Domain launch is blocked on SMTP credential correction.** The mailbox owner must verify the current One.com mailbox credentials, update production SMTP_USER/SMTP_PASS in Vercel as appropriate, and redeploy. Do not paste passwords in chat or Git. Confirm T2 rotation/revocation at the same time. After correction, arrange a narrowly authorized retry of this existing test record or a new internal test and confirm actual receipt. The form correctly retains the inquiry when email fails, but email delivery has not passed QA.
