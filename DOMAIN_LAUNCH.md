# Custom domain launch

Prepared 31 October 2026 for `pulconsulting.com`.

The verified public release is currently hosted at https://pul-consulting-website.vercel.app. The custom domain has not been connected or switched. Its current web A record is `46.30.215.83` at One.com; nameservers are `ns01.one.com` and `ns02.one.com`. Keep these values as the rollback reference and recheck before making changes.

## Cutover procedure

1. Resolve the observed One.com SMTP 535 authentication failure from pre-launch inquiry PUL-RFP-2026-39908: verify the current mailbox login and update Vercel production SMTP credentials, then redeploy and verify email delivery with authorization. Confirm OPEN_TASKS T2 is complete: rotate the previously exposed One.com mailbox password, update the production SMTP password and mailbox devices, and revoke the old Resend key. Do not put credentials in this document or Git.
2. Add `pulconsulting.com` and `www.pulconsulting.com` to the existing Vercel project `pul-consulting-website`, team `pul6`. Choose the apex as primary and redirect www to it with HTTP 308.
3. Recheck the domain-specific instructions shown by Vercel after adding the domains. Its configuration API on 31 October recommended apex A targets `216.198.79.1` and `64.29.17.1` (rank 1) and the www CNAME `48cbd441a99ef618.vercel-dns-017.com.`. Use the actual records Vercel assigns at launch; do not combine alternate/rank-2 recommendations.
4. At One.com change only the web A/CNAME records required above, replacing conflicting web records. Add an ownership TXT record only if Vercel requests it. Preserve nameservers, MX records, SPF, DKIM, DMARC and other email records. The mailbox remains hosted by One.com.
5. Set the Vercel production `SITE_URL` to `https://pulconsulting.com` and redeploy. Metadata, sitemap, robots and email links use this shared setting. Keep the required One.com SMTP variables; the website no longer requires database or authentication variables.
6. Verify Vercel ownership and automatic HTTPS for both domains, then test apex pages, www redirect, all service anchors, profile download, canonical URLs, sitemap, robots, the inquiry dialog, direct email links and retired admin redirects.
7. Run `node scripts/check-site.mjs https://pulconsulting.com output/domain-site-qa.json`. Arrange authorization for another real inquiry if needed: the single pre-launch inquiry approval does not cover repeated test messages. Confirm actual receipt in the mailbox, including Spam.

If web cutover fails, restore the previous One.com web records and the prior SITE_URL, then redeploy. Leave email DNS unchanged throughout.

## Remaining owner checks

- Confirmation that T2 credential rotation and old key revocation are complete.
- Final approval of published terms and privacy wording, including the retention policy.
- Authorized live email delivery test on the custom domain. There is no longer a website admin login.
