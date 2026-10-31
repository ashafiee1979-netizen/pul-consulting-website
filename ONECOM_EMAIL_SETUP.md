# One.com contact and consultation delivery

The Contact and Request Consultation controls use the shared ConsultationModal and POST /api/consultation. The server sends the inquiry directly to info@pulconsulting.com through One.com authenticated SMTP, then attempts an acknowledgement to the visitor. There is no inquiry database, Neon SDK, third-party form service or website admin account. Replies to the internal notification address the visitor.

## Production configuration

In the existing Vercel project pul-consulting-website, configure:

- SMTP_USER: info@pulconsulting.com
- SMTP_PASS: the current password for this One.com mailbox (Secret; never paste into chat or Git).
- SMTP_PORT: 465 (implicit TLS), or 587 if specifically needed (STARTTLS is required).
- SITE_URL: the currently public website origin; change to https://pulconsulting.com at domain cutover.

The application fixes SMTP host to send.one.com and recipient to info@pulconsulting.com. It does not accept SMTP hosts or recipient addresses from visitors. SMTP_HOST and NOTIFICATION_EMAIL are no longer required. DATABASE_URL, NEON_AUTH_BASE_URL, NEON_AUTH_COOKIE_SECRET and ADMIN_EMAILS were removed from the project's Vercel environment configuration with owner approval on 31 October 2026. Existing Neon data/resources have not been deleted.

The last live test of the previous implementation returned SMTP 535 authentication failed. Confirm the current mailbox password with One.com and replace the Vercel production SMTP_PASS; redeploy after changing it. Being signed into One.com's control panel does not reveal the mailbox password. No mailbox password is reset automatically.

## Behavior and verification

The form only displays success after the inquiry email is accepted by SMTP. If internal delivery fails it returns HTTP 502, keeps entered fields available and directs the visitor to email PUL directly. If only the acknowledgement fails, it reports that the inquiry was sent but the visitor copy failed. SMTP acceptance is not proof of inbox placement; inspect Inbox and Spam after an authorized test.

Honeypot, field validation, payload limit, and bounded per-instance email/IP rate limits protect the route without another service. Rate limits are best effort across multiple serverless instances and reset on deployment; they are not a shared durable abuse store. Raw IP addresses and inquiry contents are not retained by the route. Hosting request logs may still be maintained by the host.

Run npm test, npm run lint and npm run build. Tests use mocked SMTP and must never send live mail. The retired /admin and /auth pages redirect to the public contact section; old auth API requests return 410. scripts/check-site.mjs checks public pages, links, images and safe validation/honeypot requests without sending mail.

The website remains hosted on Vercel; One.com is the only email delivery provider. Domain/DNS cutover is a separate task. Preserve One.com MX, SPF, DKIM and DMARC records.

## Migration verification, 31 October 2026

Application commit 4119b85062501a9f70438f83beb4d57ef71b1b55 was deployed to production. All six public pages, 30 internal links, three external sites, 35 image URLs, safe validation/honeypot checks, retired admin redirect, 404 and security-header checks passed. Both Contact and Request Consultation opened the same dialog in the browser. The four unused Neon/admin Vercel entries were removed and confirmed absent through metadata-only inspection. The owner explicitly asked us not to send a test email. The owner entered the updated SMTP_PASS privately in Vercel and production deployment dpl_2STd45ARu7hRhA7WjZuRarmwvSYB is READY with that environment revision. The six-page production crawl, 30 internal links, three external sites, 35 images and 11 mocked tests passed. Email receipt remains unverified by design.
