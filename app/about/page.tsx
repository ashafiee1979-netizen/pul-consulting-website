"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import InstitutionalSeniority from "@/components/InstitutionalSeniority";
import EcosystemSection from "@/components/EcosystemSection";
import ClientsMarquee from "@/components/ClientsMarquee";
import { ShieldCheck, ArrowRight, ChevronRight, Globe2, Building2 } from "lucide-react";

export default function AboutPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleOpenConsultation = (serviceName?: string) => {
    setSelectedService(serviceName || "");
    setIsConsultationOpen(true);
  };

  React.useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) {
        const navOffset = 96;
        const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }
    };

    scrollToHash();
    const t1 = setTimeout(scrollToHash, 150);
    const t2 = setTimeout(scrollToHash, 400);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-corp-ink">
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-1">
        {/* About & Partners Page Hero - Bright Panoramic Executive Banner */}
        <section className="relative bg-corp-navyDark text-white py-12 sm:py-16 lg:py-18 overflow-hidden border-b border-corp-navySubtle">
          {/* Panoramic Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/photos/about-hero.jpg"
              alt="PUL Consulting Institutional Governance & Global Partner Synergies"
              fill
              className="object-cover object-center filter brightness-[1.05] contrast-[1.02]"
              priority
            />
            {/* Lighter Gradient Overlays preserving sunlight and vista */}
            <div className="absolute inset-0 bg-gradient-to-r from-corp-navyDark/85 via-corp-navyDark/60 to-corp-navyDark/25 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-corp-navyDark/65 via-transparent to-black/20" />
          </div>

          {/* Hero Content with Animated Typography */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              {/* Animated Badge */}
              <div className="animate-solutions-badge">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-corp-navy/80 backdrop-blur-md border border-slate-500/70 text-sky-200 text-xs font-semibold uppercase tracking-wider mb-4 shadow-md">
                  <ShieldCheck className="w-4 h-4 text-corp-blue" />
                  <span>Institutional Heritage • Global Partner Synergies</span>
                </div>
              </div>

              {/* Animated Headline - Slow Speed Animation */}
              <div className="animate-solutions-title">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                  About PUL Consulting &amp; Partners
                </h1>
                <p className="mt-2.5 text-base sm:text-lg font-medium text-sky-200 font-serif italic drop-shadow-sm">
                  14+ Years of Continuous Operational Governance &amp; Dual-Continent Reach
                </p>
              </div>

              {/* Animated Subtitle with responsive spacing & high contrast */}
              <div className="animate-solutions-subtext mt-6 sm:mt-8 md:mt-[3cm]">
                <p className="text-sm sm:text-base text-white leading-relaxed max-w-2xl bg-corp-navyDark/90 backdrop-blur-md p-4 sm:p-5 rounded-lg border border-white/20 shadow-md">
                  Established in Kabul in 2010, PUL Consulting Services is the parent advisory and operational delivery enterprise combining rigorous PMP® project governance with an international partner ecosystem across the United States, Europe, and Central Asia.
                </p>
              </div>

              {/* Animated Interactive Actions */}
              <div className="animate-solutions-actions mt-5 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => handleOpenConsultation("Corporate Partnership Inquiry")}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md bg-corp-blue hover:bg-corp-blueHover text-white font-bold text-xs uppercase tracking-wider shadow-executive transition-all active:scale-98"
                >
                  <span>Inquire About Partnership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#partners"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-md bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/25 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Explore Partner Companies</span>
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional Seniority & 5-Gate Delivery Governance Framework */}
        <InstitutionalSeniority />

        {/* Global Partner Companies (PUL Global, Linguist Point, Quantu Tech) */}
        <EcosystemSection />

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
