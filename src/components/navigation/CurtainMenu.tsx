"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface CurtainMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurtainMenu({ isOpen, onClose }: CurtainMenuProps) {
  const { lang, dict } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Complete background freeze & isolation: NO scroll, NO touch, NO leak
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // 1. Pause Lenis smooth inertia engine
    const win = window as unknown as { lenis?: { stop: () => void; start: () => void } };
    win.lenis?.stop();

    // 2. Lock body scroll cleanly without layout shift
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 3. Block wheel and touchmove from ever reaching the background page
    const preventScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("[data-menu-scroll='true']")) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("keydown", handleKeyDown);
      win.lenis?.start();
    };
  }, [isOpen, onClose]);

  // The 7 Official Menu Items with genuine Senna 4K imagery
  const menuItems = [
    {
      number: "01",
      id: "news",
      en: "NEWS",
      title: dict.menu.news,
      sub: dict.menu.newsSub,
      preview: "/images/senna-home.jpeg",
    },
    {
      number: "02",
      id: "profile",
      en: "PROFILE",
      title: dict.menu.profile,
      sub: dict.menu.profileSub,
      preview: "/images/senna-home.jpeg",
    },
    {
      number: "03",
      id: "discography",
      en: "DISCOGRAPHY",
      title: dict.menu.discography,
      sub: dict.menu.discographySub,
      preview: "/images/album-eclipse.jpg",
    },
    {
      number: "04",
      id: "video",
      en: "VIDEO",
      title: dict.menu.video,
      sub: dict.menu.videoSub,
      preview: "/images/mv-crimson-rain.jpg",
    },
    {
      number: "05",
      id: "dlc-stream",
      en: "DLC & STREAM",
      title: dict.menu.dlcStream,
      sub: dict.menu.dlcStreamSub,
      preview: "/images/album-eclipse.jpg",
    },
    {
      number: "06",
      id: "goods",
      en: "GOODS",
      title: dict.menu.goods,
      sub: dict.menu.goodsSub,
      preview: "/images/merch-hoodie.jpg",
    },
    {
      number: "07",
      id: "contact",
      en: "CONTACT",
      title: dict.menu.contact,
      sub: dict.menu.contactSub,
      preview: "/images/senna-home.jpeg",
    },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onClose();

    // Small delay to let curtain start sliding away before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;

      const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number; duration?: number }) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(element, { offset: -20, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 180);
  };

  // Silky smooth hardware-accelerated curtain variants with zero stutter
  const curtainVariants: Variants = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: "0%",
      transition: {
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.42,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="curtain-menu"
          variants={curtainVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-between overflow-hidden select-none transform-gpu will-change-transform pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-28 md:pb-32 px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24 h-[100dvh] w-screen"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* ========================================================================= */}
          {/* HIGH-PERFORMANCE HOVER PREVIEW (DESKTOP MOUSE HOVER ONLY - ZERO FILTER LAG) */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden md:block">
            {hoveredIndex !== null && (
              <div
                key={menuItems[hoveredIndex].id}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-out"
                style={{
                  backgroundImage: `url(${menuItems[hoveredIndex].preview})`,
                  opacity: 0.38,
                }}
              />
            )}

            {/* Smooth Vignettes: High legibility for left text + maximum luminosity for right artwork */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-[#050505]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
          </div>

          {/* Ultra-efficient GPU Radial Ambient Glow (Zero rasterization lag) */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle at 35% 25%, rgba(229, 9, 20, 0.08) 0%, transparent 65%)",
            }}
          />

          {/* ========================================================================= */}
          {/* MAIN MENU LINKS: Perfectly fit 100dvh on mobile with ZERO SCROLL NEEDED   */}
          {/* ========================================================================= */}
          <div
            data-menu-scroll="true"
            className="relative z-30 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center h-full max-h-[calc(100dvh-180px)] sm:max-h-[calc(100dvh-200px)]"
          >
            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full flex flex-col justify-evenly h-full max-h-full divide-y divide-white/[0.04]"
            >
              {menuItems.map((item, index) => {
                const isHovered = hoveredIndex === index;
                const isOtherHovered = hoveredIndex !== null && !isHovered;

                return (
                  <motion.li
                    key={item.id}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group relative transition-opacity duration-300 flex-1 flex items-center ${
                      isOtherHovered ? "opacity-25" : "opacity-100"
                    }`}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleSmoothScroll(e, item.id)}
                      className="w-full flex items-center justify-between py-1 sm:py-2 md:py-3 lg:py-3.5 cursor-pointer select-none"
                    >
                      {/* Left: Number + Monumental Title with Artistic Underline */}
                      <div className="flex items-baseline gap-3 sm:gap-6 md:gap-8">
                        <span className="font-condensed text-[11px] sm:text-xs md:text-sm text-[#E50914] font-semibold tracking-[0.25em] font-mono shrink-0">
                          {item.number}
                        </span>

                        <div className="relative inline-flex flex-col">
                          <span
                            className={`font-bebas text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl tracking-tight leading-none transition-colors duration-300 drop-shadow-md ${
                              isHovered ? "text-white" : "text-white/85"
                            }`}
                          >
                            {lang === "ja" ? item.title : item.en}
                          </span>
                          {/* Artistic animated underline on hover (ZERO layout shift) */}
                          <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-[#E50914] transition-all duration-300 ease-[0.22,1,0.36,1] pointer-events-none hidden sm:block" />
                        </div>
                      </div>

                      {/* Right: Subtitle + Tag + Subtle Arrow */}
                      <div className="flex items-baseline gap-2 sm:gap-5 text-right pl-3">
                        <span className="font-serif-jp text-xs sm:text-sm md:text-base text-white/40 group-hover:text-white/90 transition-colors duration-300 font-normal">
                          {lang === "ja" ? item.sub : item.title}
                        </span>
                        <span className="hidden sm:inline font-condensed text-[11px] sm:text-xs text-white/25 tracking-[0.2em] uppercase group-hover:text-[#E50914] transition-colors duration-300 font-mono">
                          ({item.sub})
                        </span>
                        <span className="font-mono text-xs sm:text-sm text-white/20 group-hover:text-[#E50914] group-hover:translate-x-1 transition-all duration-300">
                          ↗
                        </span>
                      </div>
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
