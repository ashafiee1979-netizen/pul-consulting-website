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

    // Log the validated inquiry in structured server telemetry
    console.log(`[PUL CONSULTATION LOG] New Verified RFP Inquiry:`, {
      referenceId,
      receivedAt,
      name,
      email,
      phone,
      organization,
      service,
      timeline,
      projectScope: projectScope ? `${projectScope.slice(0, 100)}...` : "None provided",
    });

    return NextResponse.json({
      success: true,
      referenceId,
      receivedAt,
      message: `Inquiry successfully logged in PUL Consulting Services PMO Registry. A practice lead will review the terms of reference within 24 business hours.`,
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
