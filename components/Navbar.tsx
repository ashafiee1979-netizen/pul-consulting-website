"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  FileText, 
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Layers
} from "lucide-react";
import { SERVICE_CARDS_15 } from "@/lib/data";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (typeof window !== "undefined") {
      if (window.location.pathname === "/" || window.location.pathname === "") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    }
  };

  const handleServiceNavigation = (e: React.MouseEvent, serviceId: string) => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (typeof window !== "undefined" && window.location.pathname.startsWith("/services")) {
      e.preventDefault();
      window.history.pushState(null, "", `/services#${serviceId}`);
      const el = document.getElementById(serviceId);
      if (el) {
        const navOffset = 96;
        const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }
    }
  };

  const handleProjectsNavigation = (e: React.MouseEvent) => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (typeof window !== "undefined" && window.location.pathname === "/projects") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/projects");
    }
  };

  const handleAboutNavigation = (e: React.MouseEvent) => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (typeof window !== "undefined" && window.location.pathname === "/about") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/about");
    }
  };

  const handlePartnersNavigation = (e: React.MouseEvent) => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (typeof window !== "undefined" && window.location.pathname.startsWith("/about")) {
      e.preventDefault();
      window.history.pushState(null, "", `/about#partners`);
      const el = document.getElementById("partners");
      if (el) {
        const navOffset = 96;
        const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top Utility Bar - Deep Executive Navy */}
      <div className="bg-corp-navyDark border-b border-corp-navySubtle text-slate-300 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-corp-navySubtle text-sky-200 font-medium text-[11px] border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-corp-blue" />
              <span>Founded 2010 • Kabul, Afghanistan</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              Ministry of Commerce Reg # 21679 • AISA License # D-34532 • TIN 9000010281
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-300 text-xs">
            <a 
              href="tel:+93786199696" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-corp-blue" />
              <span>+93 (786) 19 96 96</span>
            </a>
            <a 
              href="mailto:info@pulconsulting.com" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-corp-blue" />
              <span>info@pulconsulting.com</span>
            </a>
            <a 
              href="https://pulglobal.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-corp-blue transition-colors"
            >
              <span>U.S. Partner: PUL Global</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar - Clean Fortune 500 White */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-corp-line py-2.5"
            : "bg-white border-b border-corp-line py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo with Slogan Directly Underneath */}
          <Link href="/" onClick={handleHomeClick} className="flex flex-col items-center justify-center group py-0.5">
            <div className="relative h-14 sm:h-16 w-auto flex items-center justify-center">
              <Image
                src="/assets/brand/pul-consulting-logo.jpg"
                alt="PUL Consulting Logo"
                width={190}
                height={64}
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-[1.01]"
                priority
              />
            </div>
            {/* Slogan directly underneath the logo as in official corporate documents */}
            <span className="text-[11px] sm:text-xs font-serif italic text-corp-blue font-semibold tracking-wide -mt-0.5">
              &ldquo;Bridging the Gap&rdquo;
            </span>
          </Link>

          {/* Desktop Navigation Links: Home, Solutions, Projects, About, Corporate Partners, Contact */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Home */}
            <Link
              href="/"
              onClick={handleHomeClick}
              className="text-[15px] xl:text-base font-semibold text-corp-ink hover:text-corp-blue transition-colors py-1"
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <Link
                href="/services"
                onClick={() => setSolutionsDropdownOpen(false)}
                className="flex items-center gap-1.5 text-[15px] xl:text-base font-semibold text-corp-ink hover:text-corp-blue transition-colors py-1 group/sol"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-slate-400 group-hover/sol:text-corp-blue ${
                  solutionsDropdownOpen ? "rotate-180 text-corp-blue" : ""
                }`} />
              </Link>

              {/* Mega Dropdown Menu - Perfectly Aligned & Structured */}
              {solutionsDropdownOpen && (
                <div className="absolute top-full -left-36 lg:-left-44 xl:-left-40 w-[840px] xl:w-[880px] bg-white rounded-lg shadow-executive border border-slate-200 p-5 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-corp-blue" />
                      <span className="text-xs font-bold uppercase tracking-wider text-corp-ink">
                        All Practice Solutions
                      </span>
                    </div>
                    <Link
                      href="/services"
                      onClick={() => setSolutionsDropdownOpen(false)}
                      className="text-xs font-bold text-corp-blue hover:text-corp-blueHover inline-flex items-center gap-1"
                    >
                      <span>View Full Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* 3-Column Symmetrical Services Grid (5 Items per Column) */}
                  <div className="grid grid-cols-3 gap-x-4 gap-y-2.5">
                    {SERVICE_CARDS_15.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services#${service.id}`}
                        onClick={(e) => handleServiceNavigation(e, service.id)}
                        className="group/item flex items-start gap-2.5 p-2 rounded-md hover:bg-corp-ice border border-transparent hover:border-slate-200 transition-all text-left"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-corp-blue/40 group-hover/item:bg-corp-blue flex-shrink-0 mt-1.5 transition-colors" />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-corp-ink group-hover/item:text-corp-blue transition-colors leading-snug">
                            {service.title}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Dropdown Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 px-5 py-3 rounded-b-lg flex items-center justify-between">
                    <span className="text-[11px] text-corp-muted">
                      14+ Years Audited Delivery • PMO, Technology, Workforce &amp; Regulatory Solutions
                    </span>
                    <button
                      onClick={() => {
                        setSolutionsDropdownOpen(false);
                        onOpenConsultation();
                      }}
                      className="text-xs font-bold text-corp-blue hover:underline"
                    >
                      Request Consultation →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Projects */}
            <Link
              href="/projects"
              onClick={handleProjectsNavigation}
              className="text-[15px] xl:text-base font-semibold text-corp-ink hover:text-corp-blue transition-colors py-1"
            >
              Projects
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={handleAboutNavigation}
              className="text-[15px] xl:text-base font-semibold text-corp-ink hover:text-corp-blue transition-colors py-1"
            >
              About
            </Link>

            {/* Corporate Partners */}
            <Link
              href="/about#partners"
              onClick={handlePartnersNavigation}
              className="text-[15px] xl:text-base font-semibold text-corp-ink hover:text-corp-blue transition-colors py-1"
            >
              Corporate Partners
            </Link>

            {/* Contact */}
            <button
              onClick={onOpenConsultation}
              className="text-[15px] xl:text-base font-semibold text-corp-ink hover:text-corp-blue transition-colors py-1"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Button - Request Consultation */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-corp-blue hover:bg-corp-blueHover text-white font-semibold text-xs sm:text-[13px] uppercase tracking-wider shadow-xs transition-all active:scale-98"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Request Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="px-3 py-1.5 rounded bg-corp-blue text-white font-semibold text-xs"
            >
              Consultation
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-slate-200 text-corp-ink hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-corp-line px-6 py-6 shadow-lg max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="flex items-center justify-between text-[15px] font-semibold text-corp-ink hover:text-corp-blue py-2.5 border-b border-slate-100"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Mobile Solutions Accordion & Link */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100">
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-[15px] font-semibold text-corp-ink hover:text-corp-blue py-2.5"
                  >
                    Solutions
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="p-2 text-slate-400 hover:text-corp-blue"
                    aria-label="Toggle practice capabilities list"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      mobileSolutionsOpen ? "rotate-180 text-corp-blue" : ""
                    }`} />
                  </button>
                </div>
                {mobileSolutionsOpen && (
                  <div className="pl-3 py-2 space-y-2 bg-corp-ice/50 rounded my-1 border border-slate-100">
                    {SERVICE_CARDS_15.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services#${s.id}`}
                        onClick={(e) => handleServiceNavigation(e, s.id)}
                        className="flex items-center gap-2 text-xs sm:text-sm text-corp-ink hover:text-corp-blue py-1.5 px-2 rounded hover:bg-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-corp-blue/50 flex-shrink-0" />
                        <span className="font-medium line-clamp-1">{s.title}</span>
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs sm:text-sm font-bold text-corp-blue pt-2 px-2 hover:underline"
                    >
                      View All Solutions →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/projects"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleProjectsNavigation(e);
                }}
                className="flex items-center justify-between text-[15px] font-semibold text-corp-ink hover:text-corp-blue py-2.5 border-b border-slate-100"
              >
                <span>Projects</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/about"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleAboutNavigation(e);
                }}
                className="flex items-center justify-between text-[15px] font-semibold text-corp-ink hover:text-corp-blue py-2.5 border-b border-slate-100"
              >
                <span>About</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/about#partners"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handlePartnersNavigation(e);
                }}
                className="flex items-center justify-between text-[15px] font-semibold text-corp-ink hover:text-corp-blue py-2.5 border-b border-slate-100"
              >
                <span>Corporate Partners</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="flex items-center justify-between text-[15px] font-semibold text-corp-ink hover:text-corp-blue py-2.5 border-b border-slate-100 text-left"
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-corp-blue text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Consultation</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
