"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";

export default function LinkcoreSection() {
  const { dict, t } = useLanguage();
  const info = siteData.linkcore;

  return (
    <section id="dlc-stream" className="relative py-20 px-6 sm:px-10 md:px-14 lg:px-16 max-w-7xl mx-auto w-full">
      <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0d] p-6 sm:p-14 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white font-condensed text-[10px] tracking-widest uppercase font-bold">
                {dict.linkcore.badge}
              </span>
              <span className="font-condensed text-xs text-[#E50914] font-semibold tracking-wider">
                LINKCORE / TUNECORE JAPAN
              </span>
            </div>

            <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-normal">
              {t(info.headline)}
            </h2>

            <p className="font-sans-jp text-sm text-white/70 font-light leading-relaxed max-w-lg">
              {t(info.subheadline)}
            </p>

            <div className="pt-4">
              <a
                href={info.linkcoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#E50914] hover:bg-[#d01025] text-white font-condensed text-xs tracking-[0.2em] uppercase font-semibold transition-all min-h-[44px]"
              >
                <span>{dict.linkcore.openHub}</span>
              </a>
            </div>
          </div>

          {/* Right Platforms Grid (Clean, Borderless) */}
          <div className="lg:col-span-5 bg-black/60 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="font-condensed text-[10px] text-white/40 tracking-[0.25em] uppercase">
                {dict.linkcore.availableChannels}
              </span>
              <span className="font-condensed text-[10px] text-[#E50914] tracking-widest uppercase">
                {dict.linkcore.hiResTag}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {info.platforms.map((p) => (
                <div
                  key={p.name}
                  className="px-3 py-2.5 rounded-xl bg-white/[0.03] flex items-center justify-between hover:bg-white/[0.07] transition-colors"
                >
                  <span className="font-syne text-xs font-semibold text-white/90">
                    {p.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-col items-center">
              <div className="font-mono text-[8px] tracking-[6px] text-white/20 uppercase select-none">
                ||| | ||||| || ||| |||| ||| ||||| | ||
              </div>
              <span className="font-mono text-[8px] text-white/20 mt-1">
                {dict.linkcore.platformsNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
