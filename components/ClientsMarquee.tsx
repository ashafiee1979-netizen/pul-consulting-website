"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CLIENTS_LIST } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

export default function ClientsMarquee() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "International Donor", "Global Enterprise", "Government Agency", "Academic & NGO"];

  const filteredClients = selectedCategory === "All" 
    ? CLIENTS_LIST 
    : CLIENTS_LIST.filter(c => c.category === selectedCategory);

  return (
    <section id="clients" className="py-14 sm:py-16 bg-corp-ice border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
              Institutional Heritage &amp; Client Trust
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-corp-ink mt-1.5">
              Selected Institutional Partners &amp; Clients
            </h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-corp-muted leading-relaxed">
              Over a decade of audited project execution for bilateral donor programs, multilateral institutions, and global corporations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-corp-navy text-white shadow-xs"
                    : "bg-white text-corp-muted hover:text-corp-ink border border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Client Logos Grid - Fortune 500 clean presentation with hover reveal */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredClients.map((client) => (
            <div
              key={client.name}
              className="group bg-white rounded-md p-4 border border-slate-200 hover:border-corp-blue hover:shadow-xs transition-all duration-200 flex flex-col items-center justify-center text-center h-28"
            >
              {/* Logo box */}
              <div className="relative w-full h-12 flex items-center justify-center filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={130}
                  height={44}
                  className="max-h-10 w-auto object-contain"
                />
              </div>

              {/* Client name */}
              <span className="mt-2 text-[11px] font-bold text-corp-ink group-hover:text-corp-blue transition-colors line-clamp-1">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* Fiduciary compliance footnote */}
        <div className="mt-8 flex items-center justify-between text-xs text-corp-muted pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-corp-blue" />
            <span>Audited financial and contractual performance across past donor and prime contracts (USAID, GIZ, World Bank).</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px]">
            TIN: 9000010281 • MoCI Reg: 21679
          </span>
        </div>
      </div>
    </section>
  );
}
