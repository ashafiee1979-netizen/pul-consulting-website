import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, service, timeline, projectScope } = body;

    // Strict field validation
    if (!name || !email || !organization) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Required fields missing. Please provide your Contact Name, Official Email, and Organization." 
        },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid email format. Please provide an authentic organizational email address." 
        },
        { status: 400 }
      );
    }

    // Generate unique verified reference number
    const referenceId = `PUL-RFP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const receivedAt = new Date().toISOString();

    // Redacted server telemetry: never log raw personal names, phone numbers, or confidential project scopes
    const emailDomain = email.includes("@") ? email.split("@")[1] : "unknown";
    console.log(`[PUL CONSULTATION LOG] RFP Reference Created:`, {
      referenceId,
      receivedAt,
      service,
      timeline,
      emailDomain,
    });

    // Email dispatch: Check for one.com SMTP configuration or Resend API key
    let emailDispatched = false;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "info@pulconsulting.com";

    // 1. Prioritize direct One.com SMTP (send.one.com:465)
    const smtpHost = process.env.SMTP_HOST || "send.one.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || "info@pulconsulting.com";
    const smtpPass = process.env.SMTP_PASS || "0786199696";

    let smtpErrorDetails: string | null = null;
    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
          connectionTimeout: 10000,
        });

        await transporter.sendMail({
          from: `"PUL Consulting PMO" <${smtpUser}>`,
          to: notificationEmail,
          replyTo: email,
          subject: `[NEW RFP INQUIRY] ${referenceId} - ${organization} (${service})`,
          html: `
            <h2>New Project RFP / Consultation Request</h2>
            <p><strong>Tracking Reference:</strong> ${referenceId}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Contact Name:</strong> ${name}</p>
            <p><strong>Official Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not specified"}</p>
            <p><strong>Practice / Service Line:</strong> ${service}</p>
            <p><strong>Anticipated Timeline:</strong> ${timeline || "Not specified"}</p>
            <hr />
            <h3>Project Scope &amp; Objectives:</h3>
            <p>${(projectScope || "No additional scope details provided").replace(/\n/g, "<br/>")}</p>
            <hr />
            <p style="font-size: 11px; color: #64748b;">Received at: ${receivedAt} via PUL Consulting Services Portal</p>
          `,
        });

        emailDispatched = true;
      } catch (smtpErr: any) {
        smtpErrorDetails = smtpErr?.message || String(smtpErr);
        console.warn("[PUL CONSULTATION] One.com SMTP dispatch warning:", smtpErr);
      }
    }

    // 2. Fallback to Resend API if configured and SMTP not sent
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!emailDispatched && resendApiKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "PUL PMO Inquiries <onboarding@resend.dev>",
            to: [notificationEmail],
            reply_to: email,
            subject: `[NEW RFP INQUIRY] ${referenceId} - ${organization} (${service})`,
            html: `
              <h2>New Project RFP / Consultation Request</h2>
              <p><strong>Tracking Reference:</strong> ${referenceId}</p>
              <p><strong>Organization:</strong> ${organization}</p>
              <p><strong>Contact Name:</strong> ${name}</p>
              <p><strong>Official Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not specified"}</p>
              <p><strong>Practice / Service Line:</strong> ${service}</p>
              <p><strong>Anticipated Timeline:</strong> ${timeline || "Not specified"}</p>
              <hr />
              <h3>Project Scope &amp; Objectives:</h3>
              <p>${(projectScope || "No additional scope details provided").replace(/\n/g, "<br/>")}</p>
              <hr />
              <p style="font-size: 11px; color: #64748b;">Received at: ${receivedAt} via PUL Consulting Services Portal</p>
            `,
          }),
        });

        if (emailRes.ok) {
          emailDispatched = true;
        }
      } catch (err) {
        console.warn("[PUL CONSULTATION] Resend auto-email dispatch warning:", err);
      }
    }

    return NextResponse.json({
      success: true,
      referenceId,
      receivedAt,
      emailDispatched,
      smtpError: smtpErrorDetails,
      message: `RFP inquiry dossier prepared under reference ${referenceId}.`,
      dispatchContacts: {
        kabulPmoPhone: "+93 (786) 19 96 96",
        kabulPmoAltPhone: "+93 (786) 600 597",
        executiveEmail: "info@pulconsulting.com",
        whatsApp: "https://wa.me/93786199696"
      }
    });
  } catch (error) {
    console.error("[PUL CONSULTATION ERROR] Submission processing failure:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server processing error. Please contact direct institutional channels at info@pulconsulting.com or +93 (786) 19 96 96." 
      },
      { status: 500 }
    );
  }
}
