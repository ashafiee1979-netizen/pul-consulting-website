"use client";

import React from "react";
import Link from "next/link";
import { 
  Building, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  FileText,
  Layers,
  ChevronRight
} from "lucide-react";
import { COMPREHENSIVE_PROJECT_DATABASE } from "@/lib/data";

interface ProjectsHomePreviewProps {
  onOpenConsultation: () => void;
}

export default function ProjectsHomePreview({ onOpenConsultation }: ProjectsHomePreviewProps) {
  // Select 3 premier flagship programs representing diverse capabilities
  const featuredProjects = [
    COMPREHENSIVE_PROJECT_DATABASE[0], // Huawei MSA
    COMPREHENSIVE_PROJECT_DATABASE[2], // USAID/ASMED
    COMPREHENSIVE_PROJECT_DATABASE[4]  // EPAA / NES
  ];

  return (
    <section id="projects" className="py-20 bg-corp-ice border-b border-corp-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header with Direct Link to Dedicated Projects Page */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-corp-blue">
              Track Record &amp; Evidence Preview
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-corp-ink mt-1.5">
              Audited Past Performance Highlights
            </h2>
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-[15px] text-corp-muted leading-relaxed">
              14+ years of verified program execution, nationwide workforce mobilization, and technical operations for multilateral donors and global contractors.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-corp-navy hover:bg-corp-navyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex-shrink-0"
          >
            <span>View Full Projects Registry (30+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Featured Flagship Program Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href="/projects"
              className="bg-white rounded-lg p-6 border border-slate-200 hover:border-corp-blue hover:shadow-card transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Client & Period */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-corp-ice text-corp-navy border border-slate-200">
                    {project.client}
                  </span>
                  <span className="text-xs text-corp-muted font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {project.period}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-corp-ink leading-snug group-hover:text-corp-blue transition-colors">
                  {project.title}
                </h3>

                {/* Location & Scope */}
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-corp-muted">
                  <MapPin className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                  <span>{project.location}</span>
                </div>

                <p className="mt-3 text-xs sm:text-[13px] text-corp-muted leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Verified Deliverable Highlight */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold text-corp-ink uppercase tracking-wider block">
                    Key Performance Outcome:
                  </span>
                  <div className="flex items-start gap-1.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{project.keyOutputs[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-corp-blue">
                <span>Audited Program Scope</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner directing to full Registry & Case Studies */}
        <div className="mt-10 p-6 rounded-lg bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-md bg-corp-ice border border-slate-200 flex items-center justify-center flex-shrink-0 text-corp-blue">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-corp-ink">
                Need Complete Project Deliverables, Client Verifications &amp; RFP Evidence?
              </h4>
              <p className="text-xs text-corp-muted mt-0.5">
                Explore our full searchable catalog with 30+ multi-year programs delivered across 15+ provinces.
              </p>
            </div>
          </div>
          <Link
            href="/projects"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-corp-blue hover:bg-corp-blueHover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Explore Complete Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
