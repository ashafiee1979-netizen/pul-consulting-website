"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

interface CounterStat {
  id: string;
  start: number;
  target: number;
  suffix?: string;
  formatComma?: boolean;
  label: string;
  description: string;
}

const STATS_DATA: CounterStat[] = [
  {
    id: "years",
    start: 1,
    target: 16,
    suffix: "+",
    label: "Years in Operation",
    description: "Management consulting and field operations since 2010",
  },
  {
    id: "projects",
    start: 10,
    target: 34,
    label: "Project Register Entries",
    description: "Individual historical assignments in our latest company profile",
  },
  {
    id: "personnel",
    start: 100,
    target: 300,
    formatComma: true,
    label: "Engineering Graduates",
    description: "200 trained in Kabul, 50 in Nangarhar, and 50 in Kandahar",
  },
  {
    id: "agents",
    start: 50,
    target: 200,
    label: "Call Center Team (Approx.)",
    description: "About 200 Etisalat personnel under the 2013–2015 agreement",
  },
  {
    id: "provinces",
    start: 1,
    target: 15,
    label: "Provinces Reached",
    description: "Provinces covered by the July–December 2019 GIZ assignment",
  },
];

function AnimatedStat({
  start,
  target,
  suffix = "",
  formatComma = false,
  isVisible,
}: {
  start: number;
  target: number;
  suffix?: string;
  formatComma?: boolean;
  isVisible: boolean;
}) {
  const [current, setCurrent] = useState<number>(start);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }

    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 3800; // Graceful, slowed-down animation speed (3.8s) for smooth number roll
    let animationFrameId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const val = Math.round(start + (target - start) * easedProgress);
      setCurrent(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, start, target]);

  const formattedNumber = formatComma
    ? current.toLocaleString("en-US")
    : current.toString();

  return (
    <span>
      {formattedNumber}
      {suffix}
    </span>
  );
}

export default function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  const statsSectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    // Trigger on initial mount if already visible
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 400);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Extra height and responsive framing keep the tabletop flags visible. */}
      <section 
        id="hero" 
        className="relative min-h-[640px] sm:min-h-[660px] lg:min-h-[680px] flex items-start bg-slate-900 overflow-hidden text-white py-12 sm:py-16 lg:py-20 border-b border-corp-navySubtle"
      >
        {/* Full-bleed Panoramic Background Image - 20% Brighter & Aligned */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/photos/kabul-executive-hero.jpg"
            alt="Illustration of a consulting team overlooking Kabul and the Hindu Kush mountains"
            fill
            className="object-cover object-[56%_center] sm:object-[center_60%] transform scale-100 transition-transform duration-1000 ease-out filter brightness-[1.20] contrast-[1.04]"
            priority
            quality={95}
          />
          
          {/* Balanced soft gradient scrims preserving clarity, sunlight and mountain vista */}
          <div className="absolute inset-0 bg-gradient-to-r from-corp-navyDark/65 via-corp-navyDark/35 to-transparent/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-corp-navyDark/50 via-transparent to-black/10" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl">
            {/* Enlarged & Animated Headline with unhurried, stately speed */}
            <h1 className="text-[28px] xs:text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-serif font-normal tracking-tight text-white leading-[1.15] sm:leading-[1.1] animate-hero-headline">
              Bridging Strategy and <br className="hidden sm:inline" />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-sky-100 animate-gradient-text drop-shadow-[0_2px_10px_rgba(56,189,248,0.2)]">
                Field Execution
              </span> in Fragile Environments
            </h1>

            {/* Subtitle & Action Group with balanced spacing */}
            <div className="mt-5 sm:mt-8 animate-solutions-subtext">
              <p className="text-sm sm:text-base text-slate-100 font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                Established in Kabul in 2010, PUL Consulting Services brings local knowledge and disciplined project management to complex assignments. We help development partners and businesses build capable teams, manage operations, and deliver projects across Afghanistan.
              </p>

              {/* Request Consultation Button */}
              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded bg-corp-blue hover:bg-corp-blueHover text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-98"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        Key Performance Indicators Strip
        - Mobile-optimized grid: 2 columns on mobile, 5th item cleanly spanning both columns
        - Responsive typography
      */}
      <section 
        ref={statsSectionRef}
        className="bg-white border-b border-corp-line py-6 sm:py-10" 
        aria-label="Key performance indicators"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:divide-x lg:divide-slate-200">
            {STATS_DATA.map((stat, idx) => (
              <div
                key={stat.id}
                className={`${idx > 0 ? "lg:pl-6" : ""} ${idx === 4 ? "col-span-2 md:col-span-1 pt-2 sm:pt-0 border-t border-slate-100 sm:border-0" : ""}`}
              >
                <div className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-corp-navy tracking-tight">
                  <AnimatedStat
                    start={stat.start}
                    target={stat.target}
                    suffix={stat.suffix}
                    formatComma={stat.formatComma}
                    isVisible={hasAnimated}
                  />
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-corp-ink">
                  {stat.label}
                </div>
                <p className="mt-1 text-xs text-corp-muted leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
