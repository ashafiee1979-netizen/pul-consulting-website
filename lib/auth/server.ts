import { createNeonAuth } from "@neondatabase/auth/next/server";

let auth: ReturnType<typeof createNeonAuth> | undefined;

export function authConfigured() {
  return Boolean(process.env.NEON_AUTH_BASE_URL && (process.env.NEON_AUTH_COOKIE_SECRET?.length || 0) >= 32);
}

export function getAuth() {
  if (!authConfigured()) throw new Error("Admin authentication is not configured.");
  auth ??= createNeonAuth({
    baseUrl: process.env.NEON_AUTH_BASE_URL!,
    cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
  });
  return auth;
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}
