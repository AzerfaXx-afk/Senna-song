"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";

export default function ProfileSection() {
  const { lang, dict, t, toggleLang } = useLanguage();

  return (
    <section id="profile" className="relative py-24 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Header (Borderless) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <span className="font-condensed text-xs text-[#E50914] tracking-[0.25em] uppercase block mb-1 font-semibold">
            {dict.profile.sectionNum} / {dict.profile.badge}
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-normal">
            {dict.profile.title}{" "}
            <span className="font-serif-jp text-lg sm:text-2xl text-white/40 ml-2 font-normal">
              {dict.profile.subtitle}
            </span>
          </h2>
        </div>

        <button
          onClick={toggleLang}
          className="self-start sm:self-auto py-1 text-xs font-condensed tracking-widest text-white/50 hover:text-[#E50914] transition-colors cursor-pointer"
        >
          {lang === "ja" ? "READ IN ENGLISH ↗" : "日本語で読む ↗"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-28">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group bg-[#09090c]">
              <Image
                src="/images/hero-artistic-cover.jpg"
                alt="Senna portrait"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-[center_30%] filter grayscale contrast-115 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-condensed text-[10px] tracking-[0.3em] text-[#E50914] uppercase block font-semibold">
                  {dict.profile.role}
                </span>
                <span className="font-bebas text-3xl text-white tracking-wider">
                  SENNA
                </span>
                <span className="font-serif-jp text-xs text-white/50 ml-2">
                  千奈 • TOKYO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statement, Bio & Career Milestones */}
        <div className="lg:col-span-7 space-y-8 sm:space-y-10">
          {/* Poetic Statement / Quote (Pure Typography, No harsh border-l) */}
          <div className="relative pl-6 space-y-2">
            <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#E50914]" />
            <blockquote className="font-serif-jp text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed italic">
              {t(siteData.profile.statement)}
            </blockquote>
            <p className="font-condensed text-xs text-white/40 tracking-widest uppercase">
              SENNA • {dict.profile.badge}
            </p>
          </div>

          {/* Biography Body */}
          <div className="space-y-4 font-sans-jp text-white/70 leading-relaxed font-light text-sm sm:text-base">
            <p>{t(siteData.profile.bioParagraph1)}</p>
            <p>{t(siteData.profile.bioParagraph2)}</p>
          </div>

          {/* Career Milestones Timeline (Clean, Borderless) */}
          <div className="space-y-6 pt-4">
            <h3 className="font-condensed text-xs text-[#E50914] tracking-[0.25em] uppercase font-semibold">
              {dict.profile.milestonesTitle}
            </h3>

            <div className="space-y-6">
              {siteData.profile.milestones.map((item) => (
                <div key={item.year} className="group flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#E50914] mt-1.5 shrink-0" />

                  <div className="space-y-0.5">
                    <div className="font-condensed text-xs text-[#E50914] font-bold tracking-widest">
                      {item.year}
                    </div>
                    <h4 className="font-syne font-bold text-base sm:text-lg text-white">
                      {t(item.title)}
                    </h4>
                    <p className="font-sans-jp text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                      {t(item.detail)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
