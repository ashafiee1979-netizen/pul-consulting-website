"use client";

import React from "react";
import Image from "next/image";
import { PARTNER_COMPANIES } from "@/lib/data";
import { Globe2, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function EcosystemSection() {
  return (
    <section id="partners" className="py-20 bg-white border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
            Global Corporate Synergies
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-corp-ink mt-1.5">
            Partner Companies &amp; International Affiliates
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-[15px] text-corp-muted leading-relaxed">
            As the parent enterprise established in 2010, PUL Consulting Services collaborates with dedicated 
            partner companies across federal government contracting, global language solutions, and advanced technology.
          </p>
        </div>

        {/* 3 Partner Companies Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARTNER_COMPANIES.map((partner) => {
            const partnerAnchorId = partner.name.toLowerCase().includes("pul global")
              ? "partner-pul-global"
              : partner.name.toLowerCase().includes("linguist")
              ? "partner-linguist-point"
              : "partner-quantu-tech";

            return (
              <div
                key={partner.name}
                id={partnerAnchorId}
                className="scroll-mt-28 bg-white rounded-md p-6 sm:p-7 border border-slate-200 hover:border-corp-blue hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Header with Logo and Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="h-14 w-44 flex items-center justify-start px-2.5 py-1 bg-slate-50/70 border border-slate-200/80 rounded-lg">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={160}
                        height={44}
                        className={`${partner.logoClassName || "h-8 w-auto"} object-contain object-left`}
                      />
                    </div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-corp-ice text-corp-navy border border-slate-200 shrink-0">
                      {partner.badge}
                    </span>
                  </div>

                {/* Name, Role & Location */}
                <h3 className="text-lg font-serif font-bold text-corp-ink">
                  {partner.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-corp-blue font-semibold">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{partner.location}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-corp-muted font-normal">Est. {partner.established}</span>
                </div>

                <p className="mt-2 text-xs font-semibold text-corp-ink">
                  {partner.role}
                </p>

                {/* Description */}
                <p className="mt-2 text-xs text-corp-muted leading-relaxed">
                  {partner.description}
                </p>

                {/* Core Capabilities List */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Specializations
                  </h4>
                  {partner.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-corp-ink">
                      <CheckCircle2 className="w-3.5 h-3.5 text-corp-blue flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                {partner.link ? (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-corp-blue hover:text-corp-blueHover transition-colors"
                  >
                    <span>Visit {partner.link.replace("https://", "")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] text-corp-muted font-medium">
                    Integrated Group Partner
                  </span>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
