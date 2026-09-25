"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ClientsMarquee from "@/components/ClientsMarquee";
import { ShieldCheck, ArrowRight, ChevronRight } from "lucide-react";

export default function ProjectsPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleOpenConsultation = (serviceName?: string) => {
    setSelectedService(serviceName || "");
    setIsConsultationOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-corp-ink">
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-1">
        {/* Projects Page Hero - Bright, Elegant Panoramic Executive Banner */}
        <section className="relative bg-corp-navyDark text-white py-12 sm:py-16 lg:py-18 overflow-hidden border-b border-corp-navySubtle">
          {/* Panoramic Background Image - 20% Brighter & Aligned */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/photos/projects-hero.jpg"
              alt="PUL Consulting Audited Program Execution and Project Delivery"
              fill
              className="object-cover object-center filter brightness-[1.22] contrast-[1.03]"
              priority
            />
            {/* Soft Balanced Gradient Overlays preserving sunlight and vista */}
            <div className="absolute inset-0 bg-gradient-to-r from-corp-navyDark/90 via-corp-navyDark/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-corp-navyDark/60 via-transparent to-transparent" />
          </div>

          {/* Hero Content with Animated Typography in Unified Executive Panel */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
            <div className="max-w-2xl bg-corp-navyDark/90 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/20 shadow-2xl space-y-4">
              {/* Animated Badge */}
              <div className="animate-solutions-badge">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-corp-navy/90 border border-slate-500/70 text-sky-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-corp-blue" />
                  <span>Verified Past Performance • Audit-Ready Registry</span>
                </div>
              </div>

              {/* Animated Headline */}
              <div className="animate-solutions-title">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                  Track Record &amp; Evidence
                </h1>
                <p className="mt-2 text-base sm:text-lg font-medium text-sky-200 font-serif italic">
                  14+ Years of Audited Program Execution Across Afghanistan
                </p>
              </div>

              {/* Subtext with high contrast */}
              <div className="animate-solutions-subtext">
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                  Comprehensive archive of multi-year operational contracts, capacity building initiatives, nationwide telecom management, and strategic PMO programs executed for multilateral donors and global contractors.
                </p>
              </div>

              {/* Interactive Actions */}
              <div className="animate-solutions-actions pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => handleOpenConsultation("Audit & Compliance Inquiries")}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md bg-corp-blue hover:bg-corp-blueHover text-white font-bold text-xs uppercase tracking-wider shadow-executive transition-all active:scale-98"
                >
                  <span>Request RFP / Compliance Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-md bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/25 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Explore Project Registry</span>
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Full Interactive Projects Database with Search & Filters */}
        <ProjectsShowcase onOpenConsultation={() => handleOpenConsultation()} />

        {/* Institutional Heritage & Client Trust Logos */}
        <ClientsMarquee />
      </main>

      {/* Executive Footer */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* Fast Consultation & RFP Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
