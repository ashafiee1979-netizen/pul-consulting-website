"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_CARDS_15 } from "@/lib/data";
import { serviceCardAccent } from "@/lib/card-accents";
import { ArrowRight, ChevronRight } from "lucide-react";

interface Services15GridProps {
  onOpenConsultation: () => void;
}

type CapabilityGroupId = "program-delivery" | "people-engagement" | "technology-communications" | "business-operations" | "all";
type CapabilityGroup = {
  id: Exclude<CapabilityGroupId, "all">;
  label: string;
  description: string;
  capabilityIds: readonly string[];
  accent: string;
  selected: string;
};

const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: "program-delivery",
    label: "Program Delivery & Learning",
    description: "Project leadership, training, and results measurement.",
    capabilityIds: ["pmo-management", "training-capacity", "monitoring-evaluation"],
    accent: "border-t-sky-500",
    selected: "border-sky-500 bg-sky-50/70",
  },
  {
    id: "people-engagement",
    label: "People & Public Engagement",
    description: "Workforce services, language access, and inclusive outreach.",
    capabilityIds: ["hr-workforce", "call-center-operations", "translation-interpretation", "empowerment-initiatives"],
    accent: "border-t-teal-500",
    selected: "border-teal-500 bg-teal-50/70",
  },
  {
    id: "technology-communications",
    label: "Technology & Communications",
    description: "Digital transformation, secure IT, and media production.",
    capabilityIds: ["ai-transformation", "it-infrastructure", "media-communications"],
    accent: "border-t-indigo-500",
    selected: "border-indigo-500 bg-indigo-50/70",
  },
  {
    id: "business-operations",
    label: "Business & Field Operations",
    description: "Market entry, finance, logistics, events, and facilities.",
    capabilityIds: ["events-management", "business-registration", "financial-tax-compliance", "supply-chain-logistics", "secure-facilities"],
    accent: "border-t-amber-500",
    selected: "border-amber-500 bg-amber-50/70",
  },
];

export default function Services15Grid(_props: Services15GridProps) {
  const [activeGroup, setActiveGroup] = useState<CapabilityGroupId>("program-delivery");
  const selectedGroup = CAPABILITY_GROUPS.find((group) => group.id === activeGroup);
  const filteredCards = selectedGroup
    ? SERVICE_CARDS_15.filter((card) => selectedGroup.capabilityIds.includes(card.id))
    : SERVICE_CARDS_15;

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl pb-7 border-b border-corp-line">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
              Our Expertise
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-corp-ink mt-1.5">
              Expertise That Supports Delivery
            </h2>
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-[15px] text-corp-muted leading-relaxed">
              From project management and workforce operations to training and technology, our services combine PUL Consulting’s local delivery experience with specialist partner expertise.
            </p>
          </div>
        </div>

        {/* Capability category filters */}
        <div className="mt-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-corp-muted">Browse capabilities by area</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CAPABILITY_GROUPS.map((group) => {
              const isSelected = activeGroup === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveGroup(group.id)}
                  className={`min-h-32 text-left p-4 rounded-lg border border-t-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corp-blue focus-visible:ring-offset-2 ${group.accent} ${
                    isSelected
                      ? `${group.selected} shadow-sm`
                      : "border-slate-200 bg-gradient-to-br from-white to-corp-ice hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-corp-blue">{SERVICE_CARDS_15.filter((card) => group.capabilityIds.includes(card.id)).length} capabilities</span>
                  <span className="mt-1 block text-sm font-bold leading-snug text-corp-ink">{group.label}</span>
                  <span className="mt-1.5 block text-[11px] leading-relaxed text-corp-muted">{group.description}</span>
                </button>
              );
            })}
            <button
              type="button"
              aria-pressed={activeGroup === "all"}
              onClick={() => setActiveGroup("all")}
              className={`min-h-32 p-4 rounded-lg border border-t-4 border-t-corp-navy text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corp-blue focus-visible:ring-offset-2 ${
                activeGroup === "all"
                  ? "border-corp-navy bg-corp-ice shadow-sm"
                  : "border-slate-200 bg-gradient-to-br from-white to-corp-ice hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-corp-blue">Full catalogue</span>
              <span className="mt-1 block text-sm font-bold leading-snug text-corp-ink">All 15 Capabilities</span>
              <span className="mt-1.5 block text-[11px] leading-relaxed text-corp-muted">View every service area in one place.</span>
            </button>
          </div>
        </div>

        {/* Filter status banner */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-corp-muted bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200">
          <span>
            Showing <strong className="text-corp-ink font-semibold">{filteredCards.length}</strong> {filteredCards.length === 1 ? "capability" : "capabilities"}
            {selectedGroup && <> in <strong className="text-corp-ink font-semibold">{selectedGroup.label}</strong></>}
          </span>
          <Link href="/services" className="text-corp-blue font-semibold hover:underline inline-flex items-center gap-1 shrink-0">
            <span>Explore All Services</span>
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
            const accent = serviceCardAccent(service.category);
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className={`group bg-white rounded-xl overflow-hidden border border-slate-200/90 border-t-4 ${accent.border} hover:shadow-card transition-all duration-300 flex flex-col justify-between shadow-xs hover:-translate-y-0.5`}
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
                <div className={`p-5 flex-1 flex flex-col justify-between bg-gradient-to-br from-white ${accent.wash}`}>
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-wider ${accent.text} mb-1`}>
                      {service.kicker}
                    </p>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-corp-ink group-hover:text-corp-blue transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-corp-muted leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Distinct Delivery Ownership Badge */}
                    <div className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium ${accent.icon}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-corp-blue flex-shrink-0" />
                      <span className="truncate">{service.deliveryBy}</span>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold ${accent.text} group-hover:text-corp-navy transition-colors`}>
                    <span>View Scope & Deliverables</span>
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
              Find the Right Support for Your Project
            </h4>
            <p className="text-xs text-corp-muted mt-0.5">
              Review service scopes, delivery approaches, and relevant experience to plan your next assignment.
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-corp-navy hover:bg-corp-navyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
