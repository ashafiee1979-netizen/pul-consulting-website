import { NextResponse } from "next/server";

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

    // Optional automated email dispatch via Resend if RESEND_API_KEY environment variable is configured
    let emailDispatched = false;
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "info@pulconsulting.com";

    if (resendApiKey) {
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
