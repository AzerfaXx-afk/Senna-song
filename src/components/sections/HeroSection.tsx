"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ScrambleText from "@/components/common/ScrambleText";

export default function HeroSection() {
  const { lang, dict } = useLanguage();

  // The 4 Core Main Page Sections specified by the artist
  const primarySections = [
    {
      index: "01",
      id: "news",
      en: "NEWS",
      title: dict.menu.news,
      sub: dict.menu.newsSub,
    },
    {
      index: "02",
      id: "profile",
      en: "PROFILE",
      title: dict.menu.profile,
      sub: dict.menu.profileSub,
    },
    {
      index: "03",
      id: "discography",
      en: "DISCOGRAPHY",
      title: dict.menu.discography,
      sub: dict.menu.discographySub,
    },
    {
      index: "04",
      id: "video",
      en: "VIDEO",
      title: dict.menu.video,
      sub: dict.menu.videoSub,
    },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    // Use Lenis if available on window for ultra-smooth inertia scroll
    const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number; duration?: number }) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(element, { offset: -20, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-end pt-24 pb-20 sm:pb-24 px-6 sm:px-10 lg:px-14 select-none">
      {/* ========================================================================= */}
      {/* TRUE 4K CINEMATIC ARTISTIC OPENING (SMOOTH DISSOLVE & GENTLE SCALE)       */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/senna-home.jpeg"
          alt="Senna official portrait"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_26%] sm:object-[center_22%] filter contrast-[1.03] brightness-[0.99]"
        />

        {/* Soft bottom blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-72 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        {/* Subtle side vignettes to ensure flawless text legibility */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-48 bg-gradient-to-r from-[#050505]/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-64 bg-gradient-to-l from-[#050505]/75 to-transparent" />
      </motion.div>

      {/* ========================================================================= */}
      {/* VERTICALLY CENTERED RIGHT SIDE NAVIGATION WITH VERTICAL "CONTENTS" LABEL */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="lg:absolute right-6 sm:right-10 lg:right-14 lg:top-1/2 lg:-translate-y-1/2 z-20 flex items-center gap-3 sm:gap-5 my-6 lg:my-0"
      >
        {/* Main 4 Core Sections: NEWS, PROFILE, DISCOGRAPHY, VIDEO */}
        <nav
          className="flex flex-col lg:items-end space-y-1.5 sm:space-y-2"
          aria-label="Main Page Sections"
        >
          {primarySections.map((sec, index) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => handleSmoothScroll(e, sec.id)}
              className="group relative flex items-baseline gap-3 sm:gap-3.5 lg:justify-end text-left lg:text-right py-0.5 cursor-pointer transition-all duration-300"
            >
              {/* Section Index */}
              <span className="font-condensed text-[11px] sm:text-xs tracking-[0.2em] text-white/30 group-hover:text-[#E50914] transition-colors duration-300 font-mono">
                {sec.index}
              </span>

              {/* Sleeker Pro Editorial Title with Artistic Underline */}
              <div className="relative inline-flex flex-col">
                <span className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal group-hover:text-[#E50914] transition-colors duration-300 drop-shadow-md">
                  <ScrambleText
                    text={sec.en}
                    duration={1500}
                    delay={100 + index * 40}
                  />
                </span>
                {/* Artistic animated underline (expands smoothly from right on hover) */}
                <span className="absolute -bottom-0.5 right-0 w-0 group-hover:w-full h-[1.5px] bg-[#E50914] transition-all duration-300 ease-[0.22,1,0.36,1] pointer-events-none" />
              </div>

              {/* Translated Subtitle / Tagline with stylized scramble decode */}
              <span className="font-serif-jp text-[11px] sm:text-xs text-white/40 group-hover:text-white/80 transition-colors duration-300 font-normal">
                <ScrambleText
                  text={lang === "ja" ? sec.title : `(${sec.sub})`}
                  duration={1500}
                  delay={120 + index * 40}
                />
              </span>
            </a>
          ))}
        </nav>

        {/* Vertical "SECTIONS / CONTENTS" Label (Identical right spine & typography as MENU and SON) */}
        <div className="hidden lg:flex items-center justify-center select-none">
          <span className="font-condensed text-[10px] tracking-[0.4em] uppercase text-white/30 [writing-mode:vertical-rl] font-semibold">
            <ScrambleText
              text={dict.hero.contents}
              duration={1500}
              delay={150}
            />
          </span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* BOTTOM LEFT: Monumental SENNA Typography (Zero Borders, Balanced Scale)  */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-xl pb-3 sm:pb-8 space-y-1.5"
      >
        <div className="font-condensed text-[10px] tracking-[0.4em] text-[#E50914] uppercase font-semibold">
          <ScrambleText text={dict.hero.badge} duration={1500} delay={80} />
        </div>

        <div className="flex items-baseline gap-3 sm:gap-5">
          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight text-white leading-[0.88] drop-shadow-2xl">
            <ScrambleText
              text="SENNA"
              duration={1500}
              delay={120}
              glyphs="0123456789センナ仙奈ECLIPSE808TOKYO#$!%*~+"
            />
          </h1>
          <span className="font-serif-jp text-lg sm:text-2xl md:text-3xl text-white/40 font-normal">
            <ScrambleText
              text="仙奈"
              duration={1500}
              delay={150}
              glyphs="仙奈センナ東京0123456789"
            />
          </span>
        </div>

        <p className="font-sans-jp text-xs sm:text-[13px] text-white/60 font-light leading-relaxed max-w-sm sm:max-w-md pt-1 tracking-wide">
          <ScrambleText
            text={dict.hero.tagline}
            duration={1500}
            delay={180}
            className="inline"
          />
        </p>
      </motion.div>
    </section>
  );
}
