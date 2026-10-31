"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck,
  Globe2,
  Building,
  ArrowUp
} from "lucide-react";
import { COMPANY_INFO, SERVICE_CARDS_15 } from "@/lib/data";

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact-section" className="bg-corp-navyDark text-slate-300 border-t border-corp-navySubtle">
      {/* Executive Call to Action Strip */}
      <div className="border-b border-corp-navySubtle bg-corp-navy px-4 py-7 sm:px-8 sm:py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Discuss your project with our team
            </h3>
          </div>
          <button
            onClick={() => onOpenConsultation?.()}
            className="flex-shrink-0 px-6 py-3 rounded-md bg-corp-blue hover:bg-corp-blueHover text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98"
          >
            Request Consultation
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-8">
          {/* Col 1: Identity & Official Compliance (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-auto bg-white p-1 rounded">
                <Image
                  src="/assets/brand/pul-consulting-logo.jpg"
                  alt="PUL Consulting Services Logo"
                  width={150}
                  height={44}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              PUL Consulting Services provides management consulting, workforce services, and project delivery support across Afghanistan.
            </p>
          </div>

          {/* Col 2: Practice Capabilities (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Practice Capabilities
            </h4>
            <ul className="space-y-1.5 text-xs">
              {SERVICE_CARDS_15.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-slate-600">›</span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sky-300 font-semibold hover:underline">
                  + View all services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Partner Companies (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Partner Companies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://pulglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>PUL Global Partners</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://linguistpoint.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Linguist Point Int&apos;l</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://quantutech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Quantu Tech LLC</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li className="pt-2 border-t border-slate-700/60">
                <Link href="/about" className="text-sky-300 font-semibold hover:underline block">
                  › About Us &amp; Partners
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sky-300 font-semibold hover:underline block">
                  › Featured Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Offices (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Offices &amp; Contact
            </h4>

            {/* Kabul HQ */}
            <div className="text-xs space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <span>Kabul Headquarters</span>
              </div>
              <p className="text-slate-400 pl-5 text-[11px] leading-relaxed">
                {COMPANY_INFO.contacts.kabulAddress}
              </p>
            </div>

            {/* Shahr-e-Naw Branch */}
            <div className="text-xs space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <span>Marketing &amp; Events Office</span>
              </div>
              <p className="text-slate-400 pl-5 text-[11px]">
                {COMPANY_INFO.contacts.kabulBranch}
              </p>
            </div>

            {/* USA Partner Office */}
            <div className="text-xs space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <span>U.S. Partner Office</span>
              </div>
              <p className="text-slate-400 pl-5 text-[11px]">
                {COMPANY_INFO.contacts.usaAddress}
              </p>
            </div>

            {/* Direct Lines */}
            <div className="pt-2 border-t border-corp-navySubtle space-y-1 text-xs">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <a href="tel:+93786600597" className="hover:text-white transition-colors">+93 (786) 600 597</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <a href="mailto:info@pulconsulting.com" className="hover:text-white transition-colors">info@pulconsulting.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Identity & Regulatory Information Bar */}
        <div className="mt-8 pt-5 border-t border-corp-navySubtle flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-center lg:text-left text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-corp-navy text-sky-200 font-medium border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-corp-blue" />
              <span>Established 2010 • Kabul, Afghanistan</span>
            </span>
            <span className="text-slate-300">
              MoCI Reg. #21679 <span className="text-slate-600">•</span> AISA License #D-34532 <span className="text-slate-600">•</span> TIN 9000010281
            </span>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-6 pt-5 border-t border-corp-navySubtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} PUL Consulting Services. All rights reserved.
            </p>
            <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
              <span className="hidden sm:inline text-slate-600">|</span>
              <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
              <span className="text-slate-600">•</span>
              <Link href="/terms" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-corp-blue" />
          </button>
        </div>
      </div>
    </footer>
  );
}
