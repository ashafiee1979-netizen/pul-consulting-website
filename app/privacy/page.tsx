"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { ShieldCheck, ChevronRight, Lock, FileText, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white text-corp-ink">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1">
        {/* Header Banner */}
        <section className="bg-corp-navyDark text-white py-14 sm:py-16 border-b border-corp-navySubtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corp-navy/60 border border-white/20 text-sky-200 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-corp-blue" />
              <span>Corporate Governance &amp; Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              PUL Consulting Services is committed to transparency, institutional confidentiality, and safeguarding all personal and professional information shared through our platforms.
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
              <span className="text-corp-ink font-semibold">Privacy Policy</span>
            </div>

            <div className="space-y-10 text-sm sm:text-[15px] text-corp-ink/90 leading-relaxed">
              {/* Section 1 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">01.</span>
                  Institutional Overview &amp; Scope
                </h2>
                <p>
                  This Privacy Policy applies to all digital properties operated by <strong>PUL Consulting Services</strong> (&quot;PUL Consulting&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), including 
                  the website located at <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">pulconsulting.com</code> and related consultation inquiry workflows. 
                  This statement outlines our protocols for gathering, storing, protecting, and processing professional inquiries and donor-related communications.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">02.</span>
                  Information We Collect
                </h2>
                <p className="mb-3">
                  We gather only the information necessary to evaluate procurement requirements, process partnership inquiries, and maintain secure institutional operations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-corp-muted">
                  <li>
                    <strong className="text-corp-ink">Consultation &amp; Inquiries:</strong> When submitting an RFP or consultation request, we collect your full name, official email address, organization or institutional affiliation, telephone number, selected service domain, and scope descriptions.
                  </li>
                  <li>
                    <strong className="text-corp-ink">Technical Metadata:</strong> Standard web server logs collect IP addresses, browser types, referring pages, and access timestamps to ensure firewall integrity, detect denial-of-service attempts, and optimize content delivery performance.
                  </li>
                  <li>
                    <strong className="text-corp-ink">No Sensitive Payment Information:</strong> We do not process commercial consumer credit cards or store personal financial credentials through this promotional website. All contract billings proceed through audited institutional wire transfers and formal escrow mechanisms.
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">03.</span>
                  Purpose and Legal Basis of Processing
                </h2>
                <p className="mb-3">
                  We process submitted data exclusively for legitimate institutional purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-corp-muted">
                  <li>To review procurement proposals, technical solicitations, and subcontractor expressions of interest.</li>
                  <li>To verify organizational identity and prevent unauthorized or fraudulent inquiries.</li>
                  <li>To comply with regulatory compliance disclosures, donor fiduciary requirements, and applicable national laws.</li>
                  <li>To dispatch targeted operational proposals, capability statements, or corporate communications explicitly requested by the user.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">04.</span>
                  Confidentiality, Non-Disclosure &amp; Information Sharing
                </h2>
                <p className="mb-3">
                  <strong>We do not sell, rent, monetize, or trade contact information or institutional client data to any third-party marketing entities.</strong>
                </p>
                <p className="text-corp-muted">
                  Information may be shared only under the following strict conditions: (a) with authorized consortium affiliates (such as PUL Global Partners LLC, USA) solely for fulfilling client project requirements; (b) with trusted infrastructure providers (such as encrypted transactional email delivery systems and cloud hosting providers) operating under strict data processing agreements; or (c) when required by binding legal process, court order, or international compliance mandates.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">05.</span>
                  Information Security &amp; Data Safeguards
                </h2>
                <p>
                  PUL Consulting implements technical and administrative security controls, including TLS/SSL encryption for data in transit, strict role-based access restrictions, and secure server environments. While no digital communication protocol can guarantee absolute security, we continuously review our security posture to prevent unauthorized access, alteration, or disclosure.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">06.</span>
                  Cross-Border Data Transfers
                </h2>
                <p>
                  Given our dual-continent presence connecting Kabul headquarters with consortium operations in the United States and partner hubs globally, communications submitted through this website may be routed through international hosting infrastructure adhering to standard data protection frameworks.
                </p>
              </div>

              {/* Section 7 */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mb-3 flex items-center gap-2">
                  <span className="text-corp-blue font-sans text-base">07.</span>
                  Institutional Inquiries &amp; Contact
                </h2>
                <p className="mb-4">
                  For questions regarding this policy, data protection requests, or to update information previously submitted, please direct official inquiries to our compliance desk:
                </p>
                <div className="bg-corp-ice border border-slate-200 rounded-lg p-5 text-sm space-y-2">
                  <p className="font-bold text-corp-ink">PUL Consulting Services — Compliance &amp; Governance Desk</p>
                  <p className="text-corp-muted">Email: <a href="mailto:info@pulconsulting.com" className="text-corp-blue hover:underline font-semibold">info@pulconsulting.com</a></p>
                  <p className="text-corp-muted">Kabul HQ: 4th Street, Qala-e-Fatullah, District 10, Kabul, Afghanistan</p>
                  <p className="text-corp-muted">North America Liaison: PUL Global Partners LLC, Reston, VA, USA</p>
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
