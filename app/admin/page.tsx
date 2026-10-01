import { redirect } from "next/navigation";
import { auth, isAdminEmail } from "@/lib/auth/server";
import { sql, type InquiryRow } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Inquiries | PUL Consulting", robots: { index: false } };

export default async function AdminPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");
  if (!isAdminEmail(session.user.email)) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-corp-ink">
        <p>This account does not have access to the dashboard.</p>
      </main>
    );
  }

  const rows = (await sql()`
    SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 200`) as InquiryRow[];

  return (
    <main className="min-h-screen bg-corp-ice">
      <header className="bg-corp-navy text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-lg font-bold">Client inquiries</h1>
          <p className="text-xs text-sky-200">{rows.length} most recent · signed in as {session.user.email}</p>
        </div>
      </header>
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-3">
        {rows.length === 0 && <p className="text-corp-muted text-sm">No inquiries yet.</p>}
        {rows.map((r) => (
          <article key={r.id} className="bg-white border border-corp-line rounded-md p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold bg-sky-100 text-corp-navy border border-sky-300 rounded-full px-3 py-1">
                {r.reference_id}
              </span>
              <span className="text-xs text-corp-muted">
                {new Date(r.created_at).toLocaleString("en-US", { timeZone: "America/New_York" })} ET
              </span>
            </div>
            <h2 className="mt-2 font-serif font-bold text-corp-ink">{r.organization}</h2>
            <p className="text-sm text-corp-ink">
              {r.name} ·{" "}
              <a className="text-corp-blue underline" href={`mailto:${r.email}`}>{r.email}</a>
              {r.phone ? ` · ${r.phone}` : ""}
            </p>
            <p className="text-xs text-corp-muted mt-1">
              {r.service} · {r.timeline}
              {r.org_type ? ` · ${r.org_type}` : ""}
            </p>
            {r.project_scope && (
              <p className="mt-2 text-sm whitespace-pre-wrap border-l-2 border-corp-gold pl-3 text-corp-ink">
                {r.project_scope}
              </p>
            )}
            <p className="mt-2 text-[11px] text-corp-muted">
              Notification email: {r.notification_sent ? "sent" : "not sent"} · Client confirmation:{" "}
              {r.confirmation_sent ? "sent" : "not sent"}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
