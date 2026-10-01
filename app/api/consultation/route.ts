import { NextResponse } from "next/server";
import { randomInt } from "node:crypto";
import { sql } from "@/lib/db";
import {
  clientConfirmationEmail,
  internalNotificationEmail,
  mailConfigured,
  sendMail,
  type InquiryEmailData,
} from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";

const fail = (error: string, status: number) =>
  NextResponse.json({ success: false, error }, { status });

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return fail("Invalid request.", 400);

    // Honeypot: real users never fill this hidden field
    if (clean(body.website, 200)) {
      return NextResponse.json({ success: true, referenceId: "PUL-RFP-0000-00000", receivedAt: new Date().toISOString() });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const phone = clean(body.phone, 60);
    const organization = clean(body.organization, 200);
    const orgType = clean(body.orgType, 120);
    const service = clean(body.service, 200) || "General inquiry";
    const timeline = clean(body.timeline, 120) || "Not specified";
    const projectScope = clean(body.projectScope, 5000);

    if (!name || !email || !organization) {
      return fail("Required fields missing. Please provide your Contact Name, Official Email, and Organization.", 400);
    }
    if (!EMAIL_RE.test(email)) {
      return fail("Invalid email format. Please provide a valid organizational email address.", 400);
    }

    const db = sql();

    // Throttle: max 5 submissions per email per hour
    const recent = (await db`
      SELECT count(*)::int AS n FROM inquiries
      WHERE lower(email) = ${email} AND created_at > now() - interval '1 hour'`) as Array<{ n: number }>;
    if ((recent[0]?.n ?? 0) >= 5) {
      return fail("Too many submissions from this address. Please email info@pulconsulting.com directly.", 429);
    }

    const receivedAt = new Date();
    let referenceId = "";
    for (let attempt = 0; attempt < 5 && !referenceId; attempt++) {
      const candidate = `PUL-RFP-${receivedAt.getFullYear()}-${randomInt(10000, 100000)}`;
      const inserted = (await db`
        INSERT INTO inquiries
          (reference_id, name, email, phone, organization, org_type, service, timeline, project_scope)
        VALUES
          (${candidate}, ${name}, ${email}, ${phone || null}, ${organization}, ${orgType || null},
           ${service}, ${timeline}, ${projectScope || null})
        ON CONFLICT (reference_id) DO NOTHING
        RETURNING reference_id`) as Array<{ reference_id: string }>;
      if (inserted.length) referenceId = candidate;
    }
    if (!referenceId) throw new Error("Could not allocate a reference id");

    // Telemetry without personal data
    console.log("[PUL CONSULTATION] stored", { referenceId, service, timeline, emailDomain: email.split("@")[1] });

    const data: InquiryEmailData = {
      referenceId, receivedAt, name, email, phone, organization, orgType, service, timeline, projectScope,
    };

    let notificationSent = false;
    let confirmationSent = false;

    if (mailConfigured()) {
      const notifyTo = process.env.NOTIFICATION_EMAIL || "info@pulconsulting.com";
      const [internal, client] = await Promise.allSettled([
        sendMail({ to: notifyTo, replyTo: email, ...internalNotificationEmail(data) }),
        sendMail({ to: email, ...clientConfirmationEmail(data) }),
      ]);
      notificationSent = internal.status === "fulfilled";
      confirmationSent = client.status === "fulfilled";
      if (internal.status === "rejected") console.warn("[PUL CONSULTATION] notification email failed:", internal.reason?.message);
      if (client.status === "rejected") console.warn("[PUL CONSULTATION] confirmation email failed:", client.reason?.message);

      await db`UPDATE inquiries SET notification_sent = ${notificationSent}, confirmation_sent = ${confirmationSent}
               WHERE reference_id = ${referenceId}`;
    } else {
      console.warn("[PUL CONSULTATION] SMTP_PASS not set — inquiry stored but no emails sent");
    }

    return NextResponse.json({
      success: true,
      referenceId,
      receivedAt: receivedAt.toISOString(),
      confirmationSent,
      notificationSent,
    });
  } catch (error) {
    console.error("[PUL CONSULTATION ERROR]", error instanceof Error ? error.message : error);
    return fail(
      "We could not process your inquiry right now. Please contact us at info@pulconsulting.com or +93 (786) 19 96 96.",
      500
    );
  }
}
