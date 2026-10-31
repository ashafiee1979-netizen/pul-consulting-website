import { NextResponse, type NextRequest } from "next/server";
import { authConfigured, getAuth } from "@/lib/auth/server";

export default function proxy(request: NextRequest) {
  if (!authConfigured()) return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  return getAuth().middleware({ loginUrl: "/auth/sign-in" })(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
