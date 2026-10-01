"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Scale, ChevronRight, FileCheck, ShieldAlert } from "lucide-react";

export default function TermsOfServicePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white text-corp-ink">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1">
        {/* Header Banner */}
        <section className="bg-corp-navyDark text-white py-14 sm:py-16 border-b border-corp-navySubtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corp-navy/60 border border-white/20 text-sky-200 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Scale className="w-3.5 h-3.5 text-corp-blue" />
              <span>Legal &amp; Institutional Governance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              These terms govern access to the digital properties and informational resources of PUL Consulting Services.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span>Last updated: January 2026</span>
              <span>•</span>
              <span>Effective: Ongoing</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-corp-muted mb-8 pb-4 border-b border-slate-100">
              <Link href="/" className="hover:text-corp-blue transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-corp-ink font-semibold">Terms of Service</span>
            </div>

            <div className="space-y-10 text-sm sm:text-[15px] text-corp-ink/90 leading-relaxed">
              {/* Section 1 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">01.</span>
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing or utilizing the website, digital portals, or electronic communications operated by <strong>PUL Consulting Services</strong> (&quot;PUL Consulting&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a corporation, donor agency, or public entity, you represent that you possess the authority to bind such entity.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">02.</span>
                  Nature of Online Materials &amp; Informational Scope
                </h2>
                <p className="mb-3">
                  The information presented on this website—including capability summaries, service pillar outlines, project case studies, and partner affiliations—is provided for general informational and preliminary procurement reference only.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-corp-muted">
                  <li>Nothing on this website constitutes a binding contractual offer, warranty of performance, or financial commitment.</li>
                  <li>Formal consulting engagements, field deployments, and subcontracts are executed exclusively via signed bilateral Master Services Agreements (MSAs), Statements of Work (SOWs), or donor-approved sub-awards.</li>
                  <li>Historical project descriptions and metric summaries reflect documented past performance and audit-cleared deliverables on file.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">03.</span>
                  Intellectual Property &amp; Trademarks
                </h2>
                <p className="mb-3">
                  All content, branding, logos, methodology frameworks (including the 5-Gate Delivery Lifecycle), text, photography, and graphic assets on this website are the property of PUL Consulting Services or its consortium partners, protected under applicable domestic and international intellectual property laws.
                </p>
                <p className="text-corp-muted">
                  Client, donor, and prime contractor trademarks (such as USAID, World Bank, GIZ, and commercial logos) displayed across historical past performance registers remain the exclusive property of their respective owners. Their display indicates verified historical contractual or project delivery relationship and does not imply ongoing official endorsement unless explicitly affirmed in bilateral agreements.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">04.</span>
                  Permitted &amp; Prohibited Use
                </h2>
                <p className="mb-3">
                  Users agree to use our website and consultation forms solely for lawful business inquiries. You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-corp-muted">
                  <li>Submit false, misleading, fraudulent, or defamatory communications or RFPs.</li>
                  <li>Attempt to compromise the security, integrity, or availability of the website or underlying infrastructure.</li>
                  <li>Scrape, reproduce, or redistribute proprietary methodology documentation without prior written authorization from PUL Consulting leadership.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">05.</span>
                  Limitation of Liability &amp; Disclaimers
                </h2>
                <p>
                  This website and its contents are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. To the fullest extent permissible by applicable law, PUL Consulting Services disclaims all liability for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use this website.
                </p>
              </div>

              {/* Section 6 */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">06.</span>
                  Governing Law &amp; Inquiries
                </h2>
                <p className="mb-4">
                  These Terms of Service are governed by and construed in accordance with the applicable laws of Afghanistan, and where international consortium transactions apply, relevant state and federal commercial laws of the United States. For any inquiries regarding these terms:
                </p>
                <div className="bg-corp-ice border border-slate-200 rounded-lg p-5 text-sm space-y-2">
                  <p className="font-bold text-corp-ink">PUL Consulting Services — Office of the General Counsel / Compliance Desk</p>
                  <p className="text-corp-muted">Email: <a href="mailto:info@pulconsulting.com" className="text-corp-blue hover:underline font-semibold">info@pulconsulting.com</a></p>
                  <p className="text-corp-muted">Main Operations: 4th Street, Qala-e-Fatullah, Kabul, Afghanistan</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
