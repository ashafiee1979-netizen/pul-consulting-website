import { authConfigured, getAuth } from "@/lib/auth/server";

type Context = { params: Promise<{ path: string[] }> };

export async function GET(request: Request, context: Context) {
  if (!authConfigured()) return Response.json({ error: "Admin authentication is not configured." }, { status: 503 });
  return getAuth().handler().GET(request, context);
}

export async function POST(request: Request, context: Context) {
  if (!authConfigured()) return Response.json({ error: "Admin authentication is not configured." }, { status: 503 });
  return getAuth().handler().POST(request, context);
}
