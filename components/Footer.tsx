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
import { COMPANY_INFO, SERVICE_CARDS_15, PARTNER_COMPANIES } from "@/lib/data";

interface FooterProps {
  onOpenConsultation: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact-section" className="bg-corp-navyDark text-slate-300 border-t border-corp-navySubtle">
      {/* Executive Call to Action Strip */}
      <div className="border-b border-corp-navySubtle bg-corp-navy py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Ready to Execute in High-Complexity Operating Environments?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Partner with Afghanistan&apos;s established consultancy firm. 14+ years of audited field delivery 
              for USAID, The World Bank, GIZ, and global telecommunications operators.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="flex-shrink-0 px-6 py-3.5 rounded-md bg-corp-blue hover:bg-corp-blueHover text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98"
          >
            Request Consultation
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
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
              Parent enterprise founded in Kabul in 2010. Delivering specialized management consulting, 
              workforce outsourcing, and project supervision across Afghanistan with rigorous institutional integrity.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Legal Registration:</strong> MoCI Reg # 21679</div>
              <div><strong className="text-slate-200">AISA Operating License:</strong> # D-34532</div>
              <div><strong className="text-slate-200">Tax Identification (TIN):</strong> 9000010281</div>
            </div>
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
                  + View all service practice lines
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
                  › Audited Projects Registry (17 Featured)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Offices (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
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
            <div className="text-xs space-y-1 pt-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <span>Marketing &amp; Events Office</span>
              </div>
              <p className="text-slate-400 pl-5 text-[11px]">
                {COMPANY_INFO.contacts.kabulBranch}
              </p>
            </div>

            {/* USA Partner Office */}
            <div className="text-xs space-y-1 pt-1">
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
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <span>+93 (786) 19 96 96 / +93 (786) 600 597</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-corp-blue flex-shrink-0" />
                <span>info@pulconsulting.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-14 pt-8 border-t border-corp-navySubtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; 2010 – {new Date().getFullYear()} PUL Consulting Services. All rights reserved. 
            Registered under the laws of Afghanistan.
          </p>

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
