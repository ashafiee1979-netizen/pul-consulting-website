import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-corp-ice px-4 py-20 flex items-center justify-center text-corp-ink">
      <div className="max-w-xl w-full rounded-lg border border-slate-200 border-t-4 border-t-sky-500 bg-gradient-to-br from-white to-sky-50/60 p-8 sm:p-12 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wider text-corp-blue">PUL Consulting Services · 404</p>
        <h1 className="mt-4 text-3xl font-serif font-bold">Page not found</h1>
        <p className="mt-4 text-corp-muted leading-relaxed">The page may have moved or the address may be incorrect. Explore our services or return to the Home page.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/" className="rounded bg-corp-blue px-5 py-3 text-sm font-semibold text-white hover:bg-corp-blueHover">Return Home</Link>
          <Link href="/services" className="rounded border border-corp-line bg-white px-5 py-3 text-sm font-semibold text-corp-navy hover:bg-corp-ice">Explore Services</Link>
        </div>
      </div>
    </main>
  );
}
