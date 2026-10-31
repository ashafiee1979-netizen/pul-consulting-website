"use client";

import React from "react";
import { 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Clock, 
  MapPin, 
  Globe2, 
  CheckCircle2,
  Compass,
  Users,
  Activity,
  ClipboardCheck,
  BadgeCheck
} from "lucide-react";
import { INSTITUTIONAL_STRENGTHS } from "@/lib/data";
import { CARD_ACCENTS } from "@/lib/card-accents";

const STRENGTH_ICONS: Record<string, React.ElementType> = {
  Clock,
  Award,
  GraduationCap,
  ShieldCheck,
  MapPin,
  Globe2,
};

export default function InstitutionalSeniority() {
  const deliveryGates = [
    {
      gate: "Gate 01",
      title: "Understand",
      desc: "Scope alignment, regulatory parameters, local operating context, and risk mitigation.",
      badge: "Aligned Scope",
      icon: Compass,
    },
    {
      gate: "Gate 02",
      title: "Mobilize",
      desc: "Rapid deployment of vetted personnel, partner resources, work plan, and compliance readiness.",
      badge: "Ready to Execute",
      icon: Users,
    },
    {
      gate: "Gate 03",
      title: "Govern",
      desc: "Controlled on-the-ground action, quality assurance, daily supervision, and issue resolution.",
      badge: "Controlled Action",
      icon: Activity,
    },
    {
      gate: "Gate 04",
      title: "Evidence",
      desc: "Rigorous milestone tracking, M&E data verification, cost controls, and donor reporting.",
      badge: "Decision Visibility",
      icon: ClipboardCheck,
    },
    {
      gate: "Gate 05",
      title: "Validate",
      desc: "Systematic review, knowledge transfer, audit clearance, and responsible closeout.",
      badge: "Lasting Value",
      icon: BadgeCheck,
    },
  ];

  return (
    <section id="governance" className="py-20 bg-corp-ice border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header with comfortable spacing */}
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
            Governance &amp; Operational Rigor
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-corp-ink mt-1.5">
            A Disciplined Approach to Complex Assignments
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-[15px] text-corp-muted leading-relaxed">
            Our approach combines PMI-informed project management, Agile and Scrum practices, and local operational experience to support accountable delivery.
          </p>
        </div>

        {/* 6 Institutional Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTITUTIONAL_STRENGTHS.map((item, index) => {
            const Icon = STRENGTH_ICONS[item.icon] || ShieldCheck;
            const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

            return (
              <div
                key={item.title}
                className={`bg-gradient-to-br from-white ${accent.wash} rounded-md p-6 border border-slate-200 border-t-4 ${accent.border} hover:shadow-card transition-shadow duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-10 h-10 rounded border flex items-center justify-center mb-4 ${accent.icon}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-corp-ink leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-[13px] text-corp-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold ${accent.text}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Our Delivery Foundation</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-Gate Delivery Governance Framework - Inspried by PUL Global Partners */}
        <div id="lifecycle" className="scroll-mt-28 mt-16 pt-12 border-t border-slate-200">
          <div className="max-w-2xl mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
              Operating Methodology
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-corp-ink mt-1.5">
              Our Five-Stage Delivery Framework
            </h3>
            <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm text-corp-muted leading-relaxed">
              Five stages establish clear responsibilities, regular progress reviews, and a documented handover from initial scope to closeout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {deliveryGates.map((gate, index) => {
              const GateIcon = gate.icon;
              const accent = CARD_ACCENTS[index];
              return (
                <div
                  key={gate.gate}
                  className={`bg-gradient-to-br from-white ${accent.wash} rounded-md p-5 border-t-4 ${accent.border} border-x border-b border-slate-200 flex flex-col justify-between shadow-xs hover:shadow-card transition-shadow`}
                >
                  <div>
                    <div className={`flex items-center justify-between text-xs ${accent.text} font-bold uppercase tracking-wider mb-3`}>
                      <span>{gate.gate}</span>
                      <GateIcon className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-serif font-bold text-corp-ink mb-1.5">
                      {gate.title}
                    </h4>
                    <p className="text-xs text-corp-muted leading-relaxed">
                      {gate.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <span className={`inline-block rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${accent.icon}`}>
                      {gate.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
