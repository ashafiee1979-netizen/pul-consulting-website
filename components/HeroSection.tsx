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
    target: 14,
    suffix: "+",
    label: "Years in Operation",
    description: "Delivering continuous management consulting and operational programs since 2010",
  },
  {
    id: "projects",
    start: 10,
    target: 30,
    suffix: "+",
    label: "Flagship Programs",
    description: "Multidisciplinary projects delivered for USAID, World Bank, GIZ, and telecom operators",
  },
  {
    id: "personnel",
    start: 100,
    target: 1000,
    suffix: "+",
    formatComma: true,
    label: "Workforce Deployed",
    description: "Specialized consultants, field personnel, and engineering cadres managed nationwide",
  },
  {
    id: "agents",
    start: 50,
    target: 500,
    suffix: "+",
    label: "Call Center Personnel",
    description: "Trained, scheduled, and supervised for major telecom operators including Etisalat & Huawei",
  },
  {
    id: "provinces",
    start: 1,
    target: 15,
    suffix: "+",
    label: "Provinces Reached",
    description: "Field deployment capability spanning central, northern, southern, and eastern Afghanistan",
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
    if (!isVisible) {
      setCurrent(start);
      return;
    }

    // Check if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }

    let startTime: number | null = null;
    const duration = 2400; // 2.4s unhurried speed aligned with headline and subtext animations
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
      {/* 
        Deloitte & CGI Inspired Cinematic Hero Banner
        - Shorter, balanced hero height (min-h-[460px] sm:min-h-[490px] lg:min-h-[520px])
          so it is larger than subpages but comfortably contained.
        - Optimal headline-to-subtext spacing (mt-6 sm:mt-8).
      */}
      <section 
        id="hero" 
        className="relative min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] flex items-center bg-slate-900 overflow-hidden text-white py-12 sm:py-16 lg:py-18 border-b border-corp-navySubtle"
      >
        {/* Full-bleed Panoramic Background Image - 20% Brighter & Aligned */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/photos/kabul-executive-hero.jpg"
            alt="PUL Consulting executive strategy center overlooking Kabul valley and the Hindu Kush mountains"
            fill
            className="object-cover object-[center_35%] transform scale-100 transition-transform duration-1000 ease-out filter brightness-[1.20] contrast-[1.04]"
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
              <p className="text-xs sm:text-base text-slate-100 font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                Operating continuously from Kabul since 2010. PUL Consulting Services delivers 
                institutional governance, nationwide workforce mobilization, and audited project delivery 
                for multilateral donors, global contractors, and industry leaders.
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
                <p className="mt-1 text-xs text-corp-muted leading-relaxed line-clamp-2">
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
