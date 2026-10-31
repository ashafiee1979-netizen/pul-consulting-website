export function GET() { return Response.json({ error: "Website account access has been retired." }, { status: 410 }); }
export const POST = GET;
