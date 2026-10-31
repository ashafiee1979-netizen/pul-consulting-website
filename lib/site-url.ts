// One server-side origin for canonical URLs, the sitemap, robots, and emails.
export const SITE_URL = new URL(
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://pul-consulting-website.vercel.app"
).origin;
