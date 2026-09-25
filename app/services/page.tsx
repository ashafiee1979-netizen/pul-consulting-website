"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { SERVICE_CARDS_15 } from "@/lib/data";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Building2,
  ChevronRight,
  Briefcase
} from "lucide-react";

const DETAILED_CAPABILITIES: Record<string, { deliverables: string[]; methodology: string; pastClient: string }> = {
  "pmo-management": {
    deliverables: [
      "PMO Governance Charter & Work Breakdown Structures (WBS)",
      "Concept Paper, Proposal & Business Feasibility Formulations",
      "Inter-Ministerial & Municipal Regulatory Liaison Clearance",
      "Result-Based Management (RBM) Program Tracking & Milestones",
    ],
    methodology: "Integrated PMI/PMP® frameworks combined with deep local knowledge of Afghan government administrative channels and donor procurement guidelines.",
    pastClient: "National Export Strategy (EPAA), MRRD, Peace Jirga",
  },
  "ai-transformation": {
    deliverables: [
      "Enterprise AI Workflow Automation & Knowledge Discovery Systems",
      "Automated Document Processing (Bilingual Dari/Pashto/English)",
      "Secure Private LLM Implementations with Role-Based Access Controls",
      "Digital Operational Maturity Assessments & Tool Modernization",
    ],
    methodology: "Partner-enabled implementations engineered with Quantu Tech LLC adhering to strict privacy, data governance, and verifiable human-in-the-loop oversight.",
    pastClient: "PUL Group & Quantu Tech Enterprise Systems",
  },
  "training-capacity": {
    deliverables: [
      "Master Training of Trainers (MToT) Programs across Private Sector",
      "Intensive Construction Management & Safety Certification (USAID/ASMED)",
      "Public Policy & Parliamentary Administration Seminars for Staff",
      "Soft Skills, Conflict Mediation & Time Management Training (GIZ)",
    ],
    methodology: "Adult-learning methodology combining interactive workshops, field simulations, pre/post competency testing, and accredited certification.",
    pastClient: "GIZ (6,800+ trained), USAID/ASMED (300 engineers), USAID/AWDP",
  },
  "hr-workforce": {
    deliverables: [
      "Full-Cycle Technical & Ancillary Staff Recruitment Nationwide",
      "Nationwide Monthly Payroll Processing & Direct Bank Deposit",
      "Ministry of Finance Tax Withholding & Official Clearances",
      "Work Permits, Visas, and Afghan Labor Law Compliance Oversight",
    ],
    methodology: "Proven over a 9+ year master service agreement with Huawei Technologies Ltd, handling multi-department staffing with zero labor disputes.",
    pastClient: "Huawei Technologies Ltd (2014–2022+), Etisalat Afghanistan",
  },
  "monitoring-evaluation": {
    deliverables: [
      "Third-Party Independent Project Monitoring & Verification",
      "Quantitative Household & Business Surveys across 15+ Provinces",
      "Anti-Corruption & Fiduciary Risk Audits for Donor Programs",
      "USAID & World Bank Standard Indicator Performance Reporting",
    ],
    methodology: "Strict segregation of duties, field GPS geotagging, randomized callback verification, and robust data hygiene protocols.",
    pastClient: "Building Afghan Markets, AIR Consulting, Donor Missions",
  },
  "it-infrastructure": {
    deliverables: [
      "Structured LAN/WAN Cabling & High-Density Wi-Fi Infrastructure",
      "Managed Enterprise Firewalls, VPNs & Endpoint Security",
      "Private Email Servers & Cloud Collaboration Migration",
      "Hardware Sourcing, Server Room Setup & 24/7 IT Support",
    ],
    methodology: "Leveraging Asia Network Services lineage with direct peering agreements across Afghanistan's Tier-1 national and satellite ISPs.",
    pastClient: "Government Media & Information Center (GMIC), ACKU, Mirzad",
  },
  "translation-interpretation": {
    deliverables: [
      "Official Certified Document Translation in Dari, Pashto & English",
      "Simultaneous Interpretation Booths & Multi-Channel Wireless Audio",
      "Legal, Technical, Engineering, and Medical Terminology Localization",
      "High-Volume Turnaround (100,000+ words/week) with Multi-Tier Proofreading",
    ],
    methodology: "Powered by Linguist Point International, utilizing accredited subject-matter linguists and stringent ISO 17100 translation workflows.",
    pastClient: "AUAF, ADB, The Asia Foundation, Tetra Tech, British Council",
  },
  "events-management": {
    deliverables: [
      "Ministerial Conferences, International Summits & Diplomatic Forums",
      "Loya Jirga & National Consultative Peace Jirga Logistical Support",
      "Simultaneous Interpretation Booths, AV Systems & Sound Engineering",
      "VIP Protocol, Media Center Logistics & Security Zoning",
    ],
    methodology: "Turnkey event architecture demonstrated during the Kabul International Conference and national consultative assemblies.",
    pastClient: "Kabul International Conference (Dr. Ashraf Ghani Office), OAA",
  },
  "call-center-operations": {
    deliverables: [
      "Turnkey Contact Center Setup, IVR Logic & Workforce Deployment",
      "Hiring, Training & Managing 500+ Trilingual Customer Agents",
      "24/7 Multi-Shift Scheduling, Supervision & KPI Tracking",
      "Quality Assurance Call Audits & Escalation Governance",
    ],
    methodology: "Established the benchmark for outsourced customer care in Afghanistan through multi-year contracts with Etisalat Afghanistan.",
    pastClient: "Etisalat Afghanistan (500+ Customer Care Agents)",
  },
  "business-registration": {
    deliverables: [
      "Ministry of Commerce & Industries (MoCI) Business Registration",
      "Afghanistan Investment Support Agency (AISA) Licensing",
      "Tax Identification Number (TIN) Issuance & Corporate Structuring",
      "Commercial Banking Setup & Turnkey Office Mobilization",
    ],
    methodology: "Direct administrative guidance navigating complex government processes to achieve operating readiness in the shortest legal timeframe.",
    pastClient: "International Investors, Contractors, and Startups",
  },
  "financial-tax-compliance": {
    deliverables: [
      "Standardized Chart of Accounts & Financial Management Systems",
      "Cloud ERP Accounting Software Deployment",
      "Ministry of Finance Annual Tax Filing & Clearance Certificates",
      "US GAAP & IFRS Preparation for Independent Financial Audits",
    ],
    methodology: "Led by former senior telecommunications and banking financial directors with deep knowledge of Afghan tax statutes.",
    pastClient: "Kabul Skyscraper Services, Private Enterprises, NGOs",
  },
  "supply-chain-logistics": {
    deliverables: [
      "Armored & Non-Armored Transportation Fleet Management",
      "Office Furniture, IT Hardware, Connex Units & Heavy Machinery",
      "Warehouse Storage & Secured In-Country Distribution",
      "Turnkey Camp Supplies & Emergency Procurement Sourcing",
    ],
    methodology: "Extensive established trading corridors connecting Kabul with suppliers in USA, UAE, Turkey, China, and Central Asia.",
    pastClient: "International Camps, GIZ Logistics Support, Embassy Annex",
  },
  "empowerment-initiatives": {
    deliverables: [
      "Vocational Apprenticeships for Young Professionals",
      "Women-Led Small Enterprise Incubation & Mentorship",
      "Corporate Diversity, Equity & Safe Workplace Policies",
      "Job Placement Assistance in Private & Development Sectors",
    ],
    methodology: "Targeted capacity building focused on marketable technical and managerial competencies that deliver immediate economic self-sufficiency.",
    pastClient: "AWDP Job Seekers, Community Programs, GIZ",
  },
  "media-communications": {
    deliverables: [
      "Civic Education, Public Awareness & Social Marketing Campaigns",
      "High-Definition Project Documentary & Video Case Studies",
      "Professional 3D Animation & Explainer Content (A2FG Partner)",
      "Broadcast TV & Radio Spots with Distribution Monitoring",
    ],
    methodology: "Creative messaging tailored to Afghanistan's diverse linguistic and cultural landscape, ensuring maximum audience resonance.",
    pastClient: "National Public Awareness Campaigns, Commercial Brands",
  },
  "secure-facilities": {
    deliverables: [
      "Expatriate Compound & Guesthouse Management (Kabul Green Zone)",
      "24/7 Generator Power Backup, Life Support & Protocol Services",
      "HKIA Airport Reception & Protected Corridor Transfers",
      "Facility Maintenance, HVAC, Plumbing & Secured Access Controls",
    ],
    methodology: "International-standard hospitality coupled with strict compound security measures near Kabul's diplomatic enclave and airport.",
    pastClient: "Visiting International Delegations, Investors, Expatriates",
  },
};

export default function ServicesPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  React.useEffect(() => {
    const scrollToCurrentHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const element = document.getElementById(hash);
      if (element) {
        const navOffset = 96;
        const targetY = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }
    };

    // Staggered attempts to ensure alignment across Next.js hydration & image loads
    scrollToCurrentHash();
    const t1 = setTimeout(scrollToCurrentHash, 100);
    const t2 = setTimeout(scrollToCurrentHash, 300);
    const t3 = setTimeout(scrollToCurrentHash, 650);

    window.addEventListener("hashchange", scrollToCurrentHash);
    window.addEventListener("popstate", scrollToCurrentHash);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("hashchange", scrollToCurrentHash);
      window.removeEventListener("popstate", scrollToCurrentHash);
    };
  }, []);

  const handleInquire = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsConsultationOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-corp-ink">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      <main className="flex-1">
        {/* Solutions Page Hero - Bright, Shorter Panoramic Executive Visual & Animated Typography */}
        <section className="relative min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] flex items-center bg-corp-navyDark text-white py-12 sm:py-16 lg:py-18 overflow-hidden border-b border-corp-navySubtle">
          {/* Panoramic Background Image - Bright, Luminous & Clear */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/services/solutions-hero.jpg"
              alt="PUL Consulting Strategic Advisory & Field Operations"
              fill
              className="object-cover object-center filter brightness-[1.25] contrast-[1.02]"
              priority
            />
            {/* Soft, Transparent Gradient Overlays: Preserving bright natural light and executive boardroom */}
            <div className="absolute inset-0 bg-gradient-to-r from-corp-navyDark/55 via-corp-navyDark/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-corp-navyDark/35 via-transparent to-transparent" />
          </div>

          {/* Hero Content with Animated Typography in Semi-Transparent Frosted Box */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
            <div className="w-full max-w-2xl bg-corp-navyDark/40 backdrop-blur-xs p-6 sm:p-7 rounded-xl border border-white/20 shadow-lg space-y-4">
              {/* Animated Badge */}
              <div className="animate-solutions-badge">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-corp-navy/60 border border-white/25 text-sky-200 text-xs font-semibold uppercase tracking-wider shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-corp-blue" />
                  <span>The Big Picture • Enterprise Practice Catalog</span>
                </div>
              </div>

              {/* Animated Headline */}
              <div className="animate-solutions-title">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                  Our Core Practice Capabilities
                </h1>
                <p className="mt-2 text-base sm:text-lg font-medium text-sky-200 font-serif italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Bridging Strategic Advisory &amp; Field Execution Nationwide
                </p>
              </div>

              {/* Subtext */}
              <div className="animate-solutions-subtext">
                <p className="text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  Full-spectrum consulting, enterprise AI enablement, nationwide workforce mobilization, and mission-critical operations anchored by 14+ years of verified past performance for bilateral donors and global corporations.
                </p>
              </div>

              {/* Interactive Actions */}
              <div className="animate-solutions-actions pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md bg-corp-blue hover:bg-corp-blueHover text-white font-bold text-xs uppercase tracking-wider shadow-executive transition-all active:scale-98"
                >
                  <span>Request Practice Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#practice-catalog"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-md bg-white/15 hover:bg-white/25 backdrop-blur-xs text-white border border-white/25 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Explore Practice Lines</span>
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services In-Depth List with Dedicated Imagery */}
        <section id="practice-catalog" className="py-16 sm:py-20 bg-corp-ice">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            {SERVICE_CARDS_15.map((service) => {
              const details = DETAILED_CAPABILITIES[service.id] || {
                deliverables: [
                  "Comprehensive technical scope execution",
                  "Turnkey project monitoring and daily milestone supervision",
                  "Verified closeout and performance documentation",
                ],
                methodology: "Standardized operating procedures governed under Result-Based Management.",
                pastClient: "PUL Consulting Institutional Engagements",
              };

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28 sm:scroll-mt-32 bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-corp-blue transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Dedicated Service Thumbnail Photo - Clean & Unobstructed */}
                    <div className="lg:col-span-4 relative h-56 sm:h-64 w-full rounded overflow-hidden border border-slate-200 shadow-xs bg-slate-900">
                      <Image
                        src={service.image}
                        alt={`${service.title} illustration`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority={service.id === "financial-tax-compliance"}
                      />
                    </div>

                    {/* Middle: Title, Description & Methodology */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-corp-blue uppercase tracking-wider bg-corp-ice px-2.5 py-0.5 rounded border border-slate-200">
                          {service.pillar}
                        </span>
                        <span className="text-[11px] font-medium text-corp-navy bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {service.deliveryBy}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink">
                        {service.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-corp-muted leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Infographic Operating Methodology Callout */}
                      <div className="p-3.5 rounded-lg bg-gradient-to-r from-sky-50/80 via-corp-ice to-white border-l-4 border-l-corp-blue border-y border-r border-slate-200 text-xs sm:text-[13px] text-corp-ink shadow-xs">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-corp-blue text-white">
                            Operating Methodology
                          </span>
                          <span className="text-[10px] font-semibold text-corp-muted">5-Gate Delivery Aligned</span>
                        </div>
                        <p className="leading-relaxed text-corp-ink font-medium">
                          {details.methodology}
                        </p>
                      </div>

                      {/* Documented Reference */}
                      <div className="text-xs sm:text-[13px] text-slate-500 pt-1">
                        <strong>Proven Track Record: </strong>
                        <span className="text-corp-ink font-semibold">{details.pastClient}</span>
                      </div>
                    </div>

                    {/* Right: Key Deliverables & RFP Trigger */}
                    <div className="lg:col-span-3 bg-slate-50 p-4 sm:p-5 rounded border border-slate-200 flex flex-col justify-between h-full">
                      <div>
                        <h4 className="text-[11px] font-bold text-corp-ink uppercase tracking-wider mb-2.5">
                          Key Deliverables
                        </h4>
                        <div className="space-y-2">
                          {details.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-corp-muted">
                              <CheckCircle2 className="w-3.5 h-3.5 text-corp-blue flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleInquire(service.title)}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded bg-corp-navy hover:bg-corp-navyDark text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors"
                        >
                          <span>Request Proposal</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
