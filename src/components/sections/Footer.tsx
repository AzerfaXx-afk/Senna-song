"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Footer() {
  const { lang, dict } = useLanguage();

  const scrollToTop = () => {
    const win = window as unknown as { lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number; duration?: number }) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(element, { offset: -20, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Official Menu at the bottom of the page requested by the artist
  const bottomMenuItems = [
    { id: "news", en: "NEWS", title: dict.menu.news, sub: dict.menu.newsSub },
    { id: "profile", en: "PROFILE", title: dict.menu.profile, sub: dict.menu.profileSub },
    { id: "discography", en: "DISCOGRAPHY", title: dict.menu.discography, sub: dict.menu.discographySub },
    { id: "video", en: "VIDEO", title: dict.menu.video, sub: dict.menu.videoSub },
    { id: "dlc-stream", en: "DLC & STREAM", title: dict.menu.dlcStream, sub: dict.menu.dlcStreamSub },
    { id: "contact", en: "CONTACT", title: dict.menu.contact, sub: dict.menu.contactSub },
    { id: "goods", en: "GOODS", title: dict.menu.goods, sub: dict.menu.goodsSub },
  ];

  return (
    <footer className="relative pt-20 sm:pt-24 pb-16 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden bg-[#030304]">
      {/* Subtle Crimson Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#E50914]/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-12 sm:space-y-16 relative z-10">
        {/* ========================================================================= */}
        {/* 《MENU TOUT EN BAS DE LA PAGE》 - As requested by the artist               */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
              <span className="font-condensed text-[11px] text-[#E50914] tracking-[0.3em] uppercase font-bold">
                {dict.footer.navTitle}
              </span>
            </div>
            <span className="font-condensed text-[11px] text-white/30 tracking-[0.25em] uppercase">
              {dict.footer.navSubtitle}
            </span>
          </div>

          {/* Navigation Links Grid (Clean, Bold, Borderless) */}
          <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-6 gap-x-4 pt-2">
            {bottomMenuItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className="group flex flex-col space-y-1 text-left cursor-pointer transition-all duration-300 min-h-[44px]"
              >
                <span className="font-condensed text-[10px] tracking-[0.25em] text-white/30 group-hover:text-[#E50914] font-mono transition-colors">
                  0{idx + 1}
                </span>
                <span className="font-bebas text-2xl sm:text-3xl text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                  {item.en}
                </span>
                <span className="font-serif-jp text-[11px] text-white/40 group-hover:text-white/70 transition-colors">
                  {lang === "ja" ? item.title : item.sub}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* 《PUIS, EN DESSOUS, LES LIENS VERS LES RÉSEAUX SOCIAUX》                   */}
        {/* ========================================================================= */}
        <div className="pt-6 pb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div>
            <span className="font-condensed text-[10px] text-[#E50914] tracking-[0.3em] uppercase block mb-1 font-bold">
              {dict.footer.socialsTitle}
            </span>
            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider">
              {dict.footer.socialsSubtitle}
            </h3>
          </div>

          {/* Social Media Tooltip Animated Icons (Exact user specification) */}
          <SocialIcons size="lg" />
        </div>

        {/* Monumental SENNA Typography */}
        <div className="text-center select-none py-4 sm:py-6">
          <div className="font-bebas text-[18vw] leading-none tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white/15 via-white/5 to-transparent">
            SENNA
          </div>
          <div className="font-serif-jp text-xs sm:text-sm tracking-[1.2em] text-white/20 -mt-2 sm:-mt-6">
            仙奈 • TOKYO
          </div>
        </div>

        {/* Bottom Tier: Credits & Back to Top (Borderless) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-4 text-xs font-condensed tracking-widest text-white/40 text-center sm:text-left">
          <div>
            {dict.footer.rights}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <span className="hover:text-white transition-colors cursor-pointer">
              {dict.footer.privacy}
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              {dict.footer.terms}
            </span>
            <button
              onClick={scrollToTop}
              className="text-[#E50914] hover:text-white font-bold transition-colors cursor-pointer min-h-[36px]"
            >
              {dict.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
