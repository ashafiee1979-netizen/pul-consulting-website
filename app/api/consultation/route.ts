import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { clientConfirmationEmail, internalNotificationEmail, mailConfigured, sendMail, type InquiryEmailData } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

// Best-effort per-instance protection; no database or external form service.
const attempts = new Map<string, { count: number; expires: number }>();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => typeof v === "string"
  ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";
const fail = (error: string, status: number) => NextResponse.json({ success: false, error }, { status });

function allowed(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  for (const [key, entry] of Array.from(attempts)) if (entry.expires <= now) attempts.delete(key);
  const current = attempts.get(key);
  if (current) {
    if (current.count >= limit) return false;
    current.count++;
  } else {
    if (attempts.size >= 5000) return false;
    attempts.set(key, { count: 1, expires: now + windowMs });
  }
  return true;
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 20000) return fail("The submitted message is too large.", 413);
    const body = (() => { try { return JSON.parse(raw); } catch { return null; } })();
    if (!body || typeof body !== "object" || Array.isArray(body)) return fail("Invalid request.", 400);
    if (clean(body.website, 200)) return NextResponse.json({ success: true, referenceId: "PUL-RFP-0000-00000", receivedAt: new Date().toISOString() });

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const organization = clean(body.organization, 200);
    if (!name || !email || !organization) return fail("Please provide your Contact Name, Official Email, and Organization.", 400);
    if (!EMAIL_RE.test(email)) return fail("Please provide a valid email address.", 400);
    if (!mailConfigured()) return fail("Online delivery is temporarily unavailable. Please email info@pulconsulting.com directly.", 503);

    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const digest = (value: string) => createHash("sha256").update(value).digest("hex");
    if ((ip && !allowed(`ip:${digest(ip)}`, 6, 10 * 60 * 1000)) || !allowed(`email:${digest(email)}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json({ success: false, error: "Too many inquiries. Please wait or email info@pulconsulting.com directly." }, { status: 429, headers: { "Retry-After": "600" } });
    }

    const receivedAt = new Date();
    const referenceId = `PUL-RFP-${receivedAt.getFullYear()}-${randomBytes(6).toString("hex").toUpperCase()}`;
    const data: InquiryEmailData = {
      referenceId, receivedAt, name, email, organization,
      phone: clean(body.phone, 60), orgType: clean(body.orgType, 120),
      service: clean(body.service, 200) || "General inquiry",
      timeline: clean(body.timeline, 120) || "Not specified",
      projectScope: clean(body.projectScope, 5000),
    };

    // Fixed destination: visitors cannot redirect inquiries to another mailbox.
    try {
      await sendMail({ to: "info@pulconsulting.com", replyTo: email, ...internalNotificationEmail(data) });
    } catch (error) {
      console.error("[PUL CONSULTATION] One.com delivery failed", { referenceId, code: (error as { code?: string }).code || "SMTP_ERROR" });
      return fail("Your inquiry could not be emailed. Please try again later or contact info@pulconsulting.com directly.", 502);
    }
    let confirmationSent = false;
    try {
      await sendMail({ to: email, replyTo: "info@pulconsulting.com", ...clientConfirmationEmail(data) });
      confirmationSent = true;
    } catch {
      console.warn("[PUL CONSULTATION] acknowledgement failed", { referenceId });
    }
    console.log("[PUL CONSULTATION] accepted by One.com", { referenceId, confirmationSent });
    return NextResponse.json({ success: true, referenceId, receivedAt: receivedAt.toISOString(), confirmationSent, notificationSent: true });
  } catch {
    return fail("We could not send your inquiry. Please email info@pulconsulting.com directly.", 500);
  }
}
