"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  Globe2, 
  ArrowRight, 
  ChevronRight,
  Compass,
  Users,
  Activity,
  ClipboardCheck,
  BadgeCheck,
  CheckCircle2
} from "lucide-react";
import { PARTNER_COMPANIES } from "@/lib/data";

interface GateDetail {
  step: string;
  phase: string;
  action: string;
  desc: string;
  deliverable: string;
  status: string;
  icon: React.ElementType;
  gradient: string;
  pillBg: string;
  pillText: string;
  iconBg: string;
  iconColor: string;
  borderHover: string;
}

export default function AboutPartnersHomePreview() {
  const deliveryGates: GateDetail[] = [
    {
      step: "01",
      phase: "Understand",
      action: "Scope & Risk Charter",
      desc: "Stakeholder alignment, regulatory compliance checks, and PMO governance formulation.",
      deliverable: "PMO Charter & WBS",
      status: "Aligned Scope",
      icon: Compass,
      gradient: "from-sky-500 to-blue-600",
      pillBg: "bg-sky-50 text-sky-700 border-sky-200",
      pillText: "text-sky-700",
      iconBg: "bg-sky-50 text-sky-600 border-sky-200",
      iconColor: "text-sky-600",
      borderHover: "hover:border-sky-400 hover:shadow-sky-100",
    },
    {
      step: "02",
      phase: "Mobilize",
      action: "Workforce & Logistics",
      desc: "Rapid field team assembly, secure logistics corridors, and IT equipment deployment.",
      deliverable: "72-Hr Rapid Mobilization",
      status: "Ready to Execute",
      icon: Users,
      gradient: "from-teal-500 to-emerald-600",
      pillBg: "bg-teal-50 text-teal-700 border-teal-200",
      pillText: "text-teal-700",
      iconBg: "bg-teal-50 text-teal-600 border-teal-200",
      iconColor: "text-teal-600",
      borderHover: "hover:border-teal-400 hover:shadow-teal-100",
    },
    {
      step: "03",
      phase: "Govern",
      action: "Sprint & RBM Controls",
      desc: "Daily operational governance, milestone sprints, quality assurance, and KPI tracking.",
      deliverable: "RBM Sprint Controls",
      status: "Controlled Action",
      icon: Activity,
      gradient: "from-indigo-500 to-violet-600",
      pillBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      pillText: "text-indigo-700",
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
      iconColor: "text-indigo-600",
      borderHover: "hover:border-indigo-400 hover:shadow-indigo-100",
    },
    {
      step: "04",
      phase: "Evidence",
      action: "Verification & Audit",
      desc: "Third-party audit logging, GPS geotagged deliverables, and transparent donor reporting.",
      deliverable: "Audited Milestones & GPS",
      status: "Audit Verified",
      icon: ClipboardCheck,
      gradient: "from-amber-500 to-orange-600",
      pillBg: "bg-amber-50 text-amber-700 border-amber-200",
      pillText: "text-amber-700",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      iconColor: "text-amber-600",
      borderHover: "hover:border-amber-400 hover:shadow-amber-100",
    },
    {
      step: "05",
      phase: "Validate",
      action: "Closeout & Institutional Value",
      desc: "Final compliance handover, knowledge institutionalization, and audited program closeout.",
      deliverable: "Handover & Lasting Value",
      status: "Lasting Impact",
      icon: BadgeCheck,
      gradient: "from-emerald-500 to-teal-700",
      pillBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pillText: "text-emerald-700",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      iconColor: "text-emerald-600",
      borderHover: "hover:border-emerald-400 hover:shadow-emerald-100",
    },
  ];

  return (
    <section id="about-preview" className="py-20 bg-white border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
              Institutional Heritage &amp; Global Network
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-corp-ink mt-1.5">
              Governed Delivery &amp; Partner Synergies
            </h2>
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-[15px] text-corp-muted leading-relaxed">
              PUL Consulting Services combines certified management governance (PMP®, Scrum, MBAs) with an international partner ecosystem across the United States, Europe, and Central Asia.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-corp-navy hover:bg-corp-navyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex-shrink-0"
          >
            <span>Learn About Us &amp; Partners</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 
          Infographic & Colorful 5-Gate Execution Lifecycle Section
          Modern, high-contrast, multi-color milestone lifecycle
        */}
        <div className="mt-12 bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          {/* Infographic Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-5 border-b border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-corp-navy text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
                <Award className="w-3.5 h-3.5 text-corp-blue" />
                <span>PMP® &amp; Scrum-Certified Methodology</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink">
                Governed 5-Gate Execution Lifecycle
              </h3>
              <p className="text-xs sm:text-sm text-corp-muted mt-1">
                Rigorous operational gating from initial scope clearance to verified closeout audit.
              </p>
            </div>
            
            <Link
              href="/about#lifecycle"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-corp-blue hover:text-corp-navy transition-colors shrink-0 bg-white px-3.5 py-2 rounded-md border border-slate-200 shadow-xs hover:shadow-sm"
            >
              <span>Explore Detailed Methodology</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Connected Infographic 5-Gate Cards Pipeline */}
          <div className="relative">
            {/* Desktop continuous timeline connector ribbon behind cards */}
            <div 
              aria-hidden="true" 
              className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-gradient-to-r from-sky-400 via-indigo-400 via-amber-400 to-emerald-400 rounded-full z-0 opacity-40" 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
              {deliveryGates.map((gate) => {
                const Icon = gate.icon;
                return (
                  <div
                    key={gate.step}
                    className={`bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${gate.borderHover} group relative overflow-hidden`}
                  >
                    {/* Top Signature Gradient Accent Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gate.gradient}`} />

                    <div>
                      {/* Gate Step Header & Circular Icon Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3.5 pt-1">
                        <span className="inline-flex items-center justify-center text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-corp-navy group-hover:text-white transition-colors">
                          GATE {gate.step}
                        </span>
                        
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${gate.iconBg} shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Phase Title & Sub-action */}
                      <h4 className="text-base font-serif font-bold text-corp-ink group-hover:text-corp-blue transition-colors">
                        {gate.phase}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                        {gate.action}
                      </p>

                      {/* Description */}
                      <p className="mt-2.5 text-xs text-corp-muted leading-relaxed">
                        {gate.desc}
                      </p>
                    </div>

                    {/* Infographic Milestone Deliverable Tag at Bottom */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border ${gate.pillBg} shadow-xs w-full justify-start`}>
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span className="truncate">{gate.deliverable}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Partner Companies Preview */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-corp-blue">
                International Corporate Network
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mt-1">
                Collaborative Partner Companies
              </h3>
            </div>
            <Link
              href="/about#partners"
              className="text-xs font-bold text-corp-blue hover:underline hidden sm:inline-flex items-center gap-1"
            >
              <span>Explore All Partners</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTNER_COMPANIES.map((partner) => {
              const partnerAnchorId = partner.name.toLowerCase().includes("pul global")
                ? "partner-pul-global"
                : partner.name.toLowerCase().includes("linguist")
                ? "partner-linguist-point"
                : "partner-quantu-tech";

              return (
                <Link
                  key={partner.name}
                  href={`/about#${partnerAnchorId}`}
                  className="group bg-white rounded-lg p-5 border border-slate-200 hover:border-corp-blue hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Logo and Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="h-14 w-44 flex items-center justify-start px-2.5 py-1 bg-slate-50/70 border border-slate-200/80 rounded-lg group-hover:border-corp-blue/40 transition-colors">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={160}
                          height={44}
                          className={`${partner.logoClassName || "h-8 w-auto"} object-contain object-left`}
                        />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-corp-ice text-corp-navy border border-slate-200 shrink-0">
                        {partner.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-corp-ink group-hover:text-corp-blue transition-colors">
                      {partner.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-corp-blue font-semibold">
                      <Globe2 className="w-3 h-3" />
                      <span>{partner.location}</span>
                    </div>
                    <p className="mt-2 text-xs text-corp-muted leading-relaxed line-clamp-2">
                      {partner.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-corp-blue group-hover:text-corp-navy transition-colors">
                    <span>View Partner Profile &amp; Capabilities</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner directing to full About & Partners Page */}
        <div className="mt-10 p-6 rounded-lg bg-corp-ice border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-corp-blue">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-corp-ink">
                Learn More About Our Institutional Governance &amp; Executive Leadership
              </h4>
              <p className="text-xs text-corp-muted mt-0.5">
                Explore our full corporate history, certified compliance frameworks, and global partner ecosystem.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-corp-navy hover:bg-corp-navyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Read Institutional Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
