"use client";

import React, { useState } from "react";
import { COMPREHENSIVE_PROJECT_DATABASE, DetailedProject } from "@/lib/data";
import { 
  Building, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Search, 
  FileText,
  Layers
} from "lucide-react";

interface ProjectsShowcaseProps {
  onOpenConsultation: () => void;
}

export default function ProjectsShowcase({ onOpenConsultation }: ProjectsShowcaseProps) {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "Telecom Operations", "International Donors", "Capacity Building", "Linguistics & IT", "Diplomatic & Governance"];

  const filteredProjects = COMPREHENSIVE_PROJECT_DATABASE.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "All") return matchesSearch;
    if (selectedFilter === "Telecom Operations") return matchesSearch && p.category.includes("Telecom");
    if (selectedFilter === "International Donors") return matchesSearch && (p.client.includes("USAID") || p.client.includes("GIZ") || p.client.includes("World Bank") || p.client.includes("DAI") || p.client.includes("British Council") || p.client.includes("Harakat"));
    if (selectedFilter === "Capacity Building") return matchesSearch && (p.category.includes("Capacity") || p.category.includes("Training") || p.category.includes("Workforce"));
    if (selectedFilter === "Linguistics & IT") return matchesSearch && (p.category.includes("Linguistic") || p.category.includes("IT") || p.category.includes("Translation") || p.category.includes("Networking"));
    if (selectedFilter === "Diplomatic & Governance") return matchesSearch && (p.category.includes("Diplomatic") || p.category.includes("Governance") || p.category.includes("Events") || p.category.includes("Trade") || p.client.includes("Embassy") || p.client.includes("Ministry") || p.client.includes("OAA") || p.client.includes("ISAF"));
    return matchesSearch;
  });

  const current = filteredProjects[activeProject] || filteredProjects[0];

  return (
    <section id="projects" className="py-20 bg-corp-ice border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
              Track Record &amp; Evidence
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-corp-ink mt-1.5">
              Audited Performance Registry
            </h2>
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-[15px] text-corp-muted leading-relaxed">
              Curated portfolio of 17 landmark programs representing over 14 years and 30+ cumulative contracts across 15+ provinces. Complete completion certificates and audit documentation available on file.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedFilter(cat);
                  setActiveProject(0);
                }}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  selectedFilter === cat
                    ? "bg-corp-navy text-white shadow-xs"
                    : "bg-white text-corp-muted hover:text-corp-ink border border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar & Result Counter */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-md w-full relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client, sector, program name, or province..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveProject(0);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded border border-slate-300 bg-white text-corp-ink focus:outline-none focus:border-corp-blue shadow-xs"
            />
          </div>
          <span className="text-xs text-corp-muted font-medium">
            Showing <strong className="text-corp-ink">{filteredProjects.length}</strong> of {COMPREHENSIVE_PROJECT_DATABASE.length} audited engagements
          </span>
        </div>

        {/* Master-Detail Layout or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 bg-white rounded-lg p-12 text-center border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-corp-ink">No matching project records found</h4>
            <p className="text-xs text-corp-muted mt-1.5 max-w-sm mx-auto">
              No audited programs matched &quot;{searchQuery}&quot; under the &quot;{selectedFilter}&quot; category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("All");
                setActiveProject(0);
              }}
              className="mt-4 px-4 py-2 bg-corp-navy text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-corp-navyDark transition-colors shadow-xs"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: List of Projects */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {filteredProjects.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(idx)}
                  className={`w-full text-left p-4 rounded-md border transition-all duration-200 flex items-start justify-between gap-3 ${
                    activeProject === idx
                      ? "bg-white border-corp-blue shadow-xs ring-1 ring-corp-blue/20"
                      : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-corp-ice text-corp-navy border border-slate-200">
                        {project.period}
                      </span>
                      <span className="text-[11px] font-semibold text-corp-muted line-clamp-1">
                        {project.client}
                      </span>
                    </div>
                    <h3 className={`text-xs font-bold leading-snug ${
                      activeProject === idx ? "text-corp-blue" : "text-corp-ink"
                    }`}>
                      {project.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-3 transition-transform ${
                    activeProject === idx ? "text-corp-blue translate-x-0.5" : "text-slate-300"
                  }`} />
                </button>
              ))}
            </div>

            {/* Right Column: In-Depth Selected Project Dossier */}
            <div className="lg:col-span-7">
              {current && (
                <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                {/* Header Badge & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <span className="px-2.5 py-1 rounded bg-corp-ice text-corp-navy text-xs font-bold border border-slate-200">
                    {current.badge || "Verified Delivery"}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    Contract Status: {current.status}
                  </span>
                </div>

                {/* Title & Metadata */}
                <div className="mt-5">
                  <h3 className="text-xl font-serif font-bold text-corp-ink leading-snug">
                    {current.title}
                  </h3>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-corp-muted bg-slate-50 p-3.5 rounded border border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                      <span>Client: <strong className="text-corp-ink">{current.client}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                      <span>Period: <strong className="text-corp-ink">{current.period}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                      <span>Scope: <strong className="text-corp-ink">{current.location}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                      <span>Sector: <strong className="text-corp-ink">{current.category}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Scope & Methodology */}
                <div className="mt-4 p-4 rounded bg-corp-ice text-xs text-corp-ink leading-relaxed border border-slate-200">
                  <strong className="text-corp-navy block mb-1">Contract Scope &amp; Implementation:</strong>
                  {current.description}
                </div>

                {/* Detailed Deliverables */}
                <div className="mt-5">
                  <h4 className="text-[11px] font-bold text-corp-muted uppercase tracking-wider mb-2.5">
                    Measurable Outputs &amp; Performance Audit Results
                  </h4>
                  <div className="space-y-2">
                    {current.keyOutputs.map((output, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-corp-ink">
                        <CheckCircle2 className="w-3.5 h-3.5 text-corp-blue flex-shrink-0 mt-0.5" />
                        <span>{output}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[11px] text-corp-muted flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-corp-blue" />
                    Formal completion certificates and reference contacts on file.
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-corp-navy hover:bg-corp-navyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>Request Project Reference</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </section>
);
}
