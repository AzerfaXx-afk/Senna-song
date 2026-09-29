"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { WORLD_LANGUAGES, LanguageOption } from "@/data/languages";
import { siteData } from "@/data/siteData";

interface NavbarProps {
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onOpenMenu, isMenuOpen }: NavbarProps) {
  const { lang, currentLanguage, setLanguageCode, dict } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter languages for dropdown (declared early)
  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return WORLD_LANGUAGES;
    return WORLD_LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        const win = window as unknown as { lenis?: { start: () => void } };
        win.lenis?.start();
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Awwwards smooth momentum inertia scroll for language list (completely isolated from page scroll)
  useEffect(() => {
    const el = listRef.current;
    if (!el || !isDropdownOpen) return;

    let currentY = el.scrollTop;
    let targetY = el.scrollTop;
    let animId: number | null = null;
    let isWheeling = false;

    const smoothStep = () => {
      currentY += (targetY - currentY) * 0.18; // smooth inertia damping
      if (el) el.scrollTop = currentY;

      if (Math.abs(targetY - currentY) > 0.4) {
        animId = requestAnimationFrame(smoothStep);
      } else {
        isWheeling = false;
        animId = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Isolate wheel event completely: never propagate to Lenis or window
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      targetY += e.deltaY;
      const maxScroll = el.scrollHeight - el.clientHeight;
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isWheeling) {
        isWheeling = true;
        animId = requestAnimationFrame(smoothStep);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isDropdownOpen, searchQuery, filteredLanguages]);

  const scrollToTop = (e?: React.MouseEvent | React.PointerEvent) => {
    e?.preventDefault();
    if (isMenuOpen) {
      onOpenMenu(); // Close menu immediately if open
    }

    // Unlock body scroll and resume Lenis
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    const win = window as unknown as {
      lenis?: {
        start: () => void;
        scrollTo: (target: number | string, options?: { duration?: number }) => void;
      };
    };

    win.lenis?.start();

    if (win.lenis) {
      win.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDropdownMouseEnter = () => {
    // Pause background Lenis when cursor is over dropdown
    const win = window as unknown as { lenis?: { stop: () => void } };
    win.lenis?.stop();
  };

  const handleDropdownMouseLeave = () => {
    // Resume Lenis when cursor leaves dropdown
    const win = window as unknown as { lenis?: { start: () => void } };
    win.lenis?.start();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-10 lg:px-14 py-6 sm:py-8 bg-transparent pointer-events-none select-none">
      <div className="w-full flex items-center justify-between">
        {/* ================================================================= */}
        {/* FAR LEFT: Language Selector (Pure Floating Typography, No Box)    */}
        {/* ================================================================= */}
        <div className="flex-1 flex justify-start items-center relative pointer-events-auto" ref={dropdownRef}>
          <button
            onClick={() => {
              const nextState = !isDropdownOpen;
              setIsDropdownOpen(nextState);
              const win = window as unknown as { lenis?: { stop: () => void; start: () => void } };
              if (nextState) {
                win.lenis?.stop();
              } else {
                win.lenis?.start();
              }
            }}
            className="group relative inline-flex items-center cursor-pointer focus:outline-none select-none py-1 text-white hover:text-[#E50914] transition-colors duration-200"
            aria-label="Choose Language"
            aria-expanded={isDropdownOpen}
          >
            <span className="font-condensed text-xs uppercase tracking-[0.25em] font-bold text-white/90 group-hover:text-[#E50914] transition-colors">
              {currentLanguage.code.toUpperCase()}
            </span>
          </button>

          {/* Animated Floating Dropdown Menu (Clean, Inertia Scroll, Zero Background Leak) */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                data-lenis-prevent="true"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 mt-3 z-50 w-72 bg-[#09090c]/98 backdrop-blur-3xl rounded-2xl p-3 shadow-2xl shadow-black select-none border border-white/12"
              >
                {/* Compact Search Input */}
                <div className="relative mb-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search language..."
                    autoFocus
                    className="w-full px-3 py-2 pl-8 rounded-xl bg-white/[0.04] text-white placeholder-white/30 text-xs font-condensed tracking-wider focus:outline-none focus:bg-white/[0.08] transition-colors"
                  />
                  <svg
                    className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-xs text-white/40 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Scrollable Languages List with Inertia Physics & Lenis Isolation */}
                <div
                  ref={listRef}
                  data-lenis-prevent="true"
                  className="max-h-60 overflow-y-auto space-y-0.5 pr-1 overscroll-contain"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
                  }}
                >
                  {filteredLanguages.length === 0 ? (
                    <div className="py-6 text-center text-xs font-mono text-white/40">
                      No match
                    </div>
                  ) : (
                    filteredLanguages.map((l: LanguageOption) => {
                      const isSelected = l.code === lang;
                      return (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLanguageCode(l.code);
                            setIsDropdownOpen(false);
                            setSearchQuery("");
                            const win = window as unknown as { lenis?: { start: () => void } };
                            win.lenis?.start();
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#E50914] text-white font-medium shadow-md shadow-[#E50914]/20"
                              : "hover:bg-white/[0.08] text-white/80 hover:text-white"
                          }`}
                        >
                          <span className="font-serif-jp text-sm tracking-wide">
                            {l.nativeName}
                          </span>
                          <span
                            className={`font-condensed text-[10px] tracking-widest uppercase ${
                              isSelected ? "text-white/90 font-semibold" : "text-white/30"
                            }`}
                          >
                            {l.name}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================================= */}
        {/* CENTER: Artistic SENNA Home Brand (Pure Typography, No Box)       */}
        {/* ================================================================= */}
        <div className="flex-1 flex justify-center text-center pointer-events-auto">
          <button
            onClick={scrollToTop}
            onPointerDown={scrollToTop}
            className="group cursor-pointer focus:outline-none flex flex-col items-center select-none active:scale-95 transition-transform duration-150"
            aria-label={dict.nav?.sennaHome || "SENNA Home"}
          >
            <span className="font-syne font-black text-2xl sm:text-3xl tracking-[0.25em] text-white group-hover:text-[#E50914] transition-colors duration-300">
              {siteData.artist.name}
            </span>
            <span className="font-serif-jp text-[9px] tracking-[0.45em] text-white/35 group-hover:text-white/70 transition-colors uppercase -mt-0.5">
              {siteData.artist.japaneseName}
            </span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* FAR RIGHT: Animated Bars + Vertical MENU Label (Pure Typography)  */}
        {/* ================================================================= */}
        <div className="flex-1 flex justify-end items-center pointer-events-auto">
          <button
            onClick={onOpenMenu}
            className="group relative flex items-center gap-2.5 p-1.5 cursor-pointer focus:outline-none select-none text-white hover:text-[#E50914] transition-colors duration-200"
            aria-label={isMenuOpen ? (dict.nav?.close || "Close Navigation Menu") : (dict.nav?.menu || "Open Navigation Menu")}
          >
            <div className="flex flex-col justify-center items-end gap-[5.5px]">
              {/* Bar 1 (Top) */}
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  isMenuOpen
                    ? "w-6 rotate-45 translate-y-[7px] bg-[#E50914]"
                    : "w-6 group-hover:w-4 group-hover:bg-[#E50914]"
                }`}
              />

              {/* Bar 2 (Middle) */}
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 ${
                  isMenuOpen ? "w-0 opacity-0" : "w-4 group-hover:w-6 group-hover:bg-[#E50914]"
                }`}
              />

              {/* Bar 3 (Bottom) */}
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 origin-center ${
                  isMenuOpen
                    ? "w-6 -rotate-45 -translate-y-[7px] bg-[#E50914]"
                    : "w-5 group-hover:w-3 group-hover:bg-[#E50914]"
                }`}
              />
            </div>

            {/* Vertical MENU/CLOSE label */}
            <span className="font-condensed text-[10px] tracking-[0.4em] uppercase text-white/35 group-hover:text-white transition-colors [writing-mode:vertical-rl] font-semibold select-none">
              {isMenuOpen ? (dict.nav?.close || "CLOSE") : (dict.nav?.menu || "MENU")}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
