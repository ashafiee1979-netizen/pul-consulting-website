"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_CARDS_15 } from "@/lib/data";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";

interface Services15GridProps {
  onOpenConsultation: () => void;
}

const CORE_PUL_PRACTICES = [
  "pmo-management",
  "training-capacity",
  "hr-workforce",
  "monitoring-evaluation",
  "call-center-operations",
  "events-management",
];

export default function Services15Grid({ onOpenConsultation }: Services15GridProps) {
  const [viewScope, setViewScope] = useState<"core" | "synergies" | "all">("core");

  const filteredCards = SERVICE_CARDS_15.filter((card) => {
    if (viewScope === "core") {
      return CORE_PUL_PRACTICES.includes(card.id);
    }
    if (viewScope === "synergies") {
      return !CORE_PUL_PRACTICES.includes(card.id);
    }
    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-corp-line">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
              Core Capabilities &amp; Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-corp-ink mt-1.5">
              Practice Capabilities &amp; Services
            </h2>
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-[15px] text-corp-muted leading-relaxed">
              Prioritizing PUL Consulting&apos;s direct flagship competencies in project governance, workforce operations, and institutional capacity, complemented by global partner synergies.
            </p>
          </div>

          {/* Scope selection tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewScope("core")}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                viewScope === "core"
                  ? "bg-corp-navy text-white shadow-xs"
                  : "bg-corp-ice text-corp-muted hover:text-corp-ink border border-slate-200 hover:border-slate-300"
              }`}
            >
              Core Flagship Practices (6 Core)
            </button>
            <button
              onClick={() => setViewScope("synergies")}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                viewScope === "synergies"
                  ? "bg-corp-navy text-white shadow-xs"
                  : "bg-corp-ice text-corp-muted hover:text-corp-ink border border-slate-200 hover:border-slate-300"
              }`}
            >
              Consortium Synergies (Tech &amp; Languages)
            </button>
            <button
              onClick={() => setViewScope("all")}
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                viewScope === "all"
                  ? "bg-corp-navy text-white shadow-xs"
                  : "bg-corp-ice text-corp-muted hover:text-corp-ink border border-slate-200 hover:border-slate-300"
              }`}
            >
              All 15 Capabilities
            </button>
          </div>
        </div>

        {/* 4 Strategic Pillars Overview Bar */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg bg-corp-ice/70 border border-slate-200">
            <span className="text-[10px] font-bold text-corp-blue uppercase tracking-wider block">Pillar I</span>
            <h4 className="text-xs sm:text-sm font-bold text-corp-ink mt-0.5">Strategic PMO &amp; Governance</h4>
            <span className="text-[11px] text-corp-muted mt-1 block">Delivered by PUL Consulting HQ</span>
          </div>
          <div className="p-3.5 rounded-lg bg-corp-ice/70 border border-slate-200">
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">Pillar II</span>
            <h4 className="text-xs sm:text-sm font-bold text-corp-ink mt-0.5">Technology &amp; Enterprise AI</h4>
            <span className="text-[11px] text-corp-muted mt-1 block">In Synergy with Quantu Tech LLC</span>
          </div>
          <div className="p-3.5 rounded-lg bg-corp-ice/70 border border-slate-200">
            <span className="text-[10px] font-bold text-corp-blue uppercase tracking-wider block">Pillar III</span>
            <h4 className="text-xs sm:text-sm font-bold text-corp-ink mt-0.5">Workforce &amp; Operations</h4>
            <span className="text-[11px] text-corp-muted mt-1 block">Delivered by PUL Consulting HQ</span>
          </div>
          <div className="p-3.5 rounded-lg bg-corp-ice/70 border border-slate-200">
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">Pillar IV</span>
            <h4 className="text-xs sm:text-sm font-bold text-corp-ink mt-0.5">Language &amp; Austere Logistics</h4>
            <span className="text-[11px] text-corp-muted mt-1 block">Synergy: Linguist Point Int&apos;l</span>
          </div>
        </div>

        {/* Filter status banner */}
        <div className="mt-8 flex items-center justify-between text-xs text-corp-muted bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200">
          <span>
            Showing <strong className="text-corp-ink font-semibold">{filteredCards.length}</strong> {viewScope === "core" ? "Flagship Core Practices (Direct PUL HQ Delivery)" : viewScope === "synergies" ? "Consortium & Technology Partner Synergies" : "Total Capabilities"}
          </span>
          <Link href="/services" className="text-corp-blue font-semibold hover:underline inline-flex items-center gap-1">
            <span>Explore Full 15-Practice Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 
          Modern, Spacious Executive Card Grid
          - Split-card design: Top photo window + bottom pristine white content base
          - Clear delivery lead tag differentiating Core vs. Partner capabilities
          - Ample breathing room across a clean 3-column responsive layout
        */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCards.map((service) => {
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 hover:border-corp-blue hover:shadow-card transition-all duration-300 flex flex-col justify-between shadow-xs hover:-translate-y-0.5"
              >
                {/* TOP: Dedicated Photo Frame with subtle tone & category badge */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={`${service.title}`}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                  />
                  {/* Subtle soft gradient scrim for image depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                  {/* Floating Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-corp-navy shadow-xs border border-slate-200/60">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* BOTTOM: Pristine Corporate White Space with Clear Typography */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue mb-1">
                      {service.kicker}
                    </p>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-corp-ink group-hover:text-corp-blue transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs text-corp-muted leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Distinct Delivery Ownership Badge */}
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80 text-[11px] text-corp-navy font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-corp-blue flex-shrink-0" />
                      <span className="truncate">{service.deliveryBy}</span>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-corp-blue group-hover:text-corp-navy transition-colors">
                    <span>Explore Detailed Deliverables</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner directing to full Services catalog */}
        <div className="mt-12 p-6 rounded-md bg-corp-ice border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-corp-ink">
              Looking for Detailed Scope, Deliverables &amp; Methodology on Our Capabilities?
            </h4>
            <p className="text-xs text-corp-muted mt-0.5">
              Explore in-depth technical specifications, past execution models, and compliance standards on our dedicated Services page.
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-corp-navy hover:bg-corp-navyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Explore Full Services Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
