"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ScrambleText from "@/components/common/ScrambleText";

interface AppIntroLoaderProps {
  onFinish?: () => void;
}

export default function AppIntroLoader({ onFinish }: AppIntroLoaderProps) {
  const { lang, detectedInfo, dict } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioContextTriggered = useRef(false);

  useEffect(() => {
    setIsMounted(true);

    // Fast check: allow immediate skipping with Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        completeIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Smooth cinematic progress counter
    const startTime = Date.now();
    const targetDuration = 1800; // 1.8s total cinematic experience

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(Math.floor((elapsed / targetDuration) * 100), 100);
      setProgress(currentPct);

      if (currentPct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          completeIntro();
        }, 300);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const completeIntro = () => {
    setIsDone(true);
    setTimeout(() => {
      onFinish?.();
    }, 800);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="app-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.04,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-6 md:p-12 bg-[#050505] text-white select-none overflow-hidden"
          onClick={completeIntro}
          title="Click to skip"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[600px] rounded-full bg-[#E50914]/10 blur-[140px] animate-pulse" />
          </div>

          {/* Film Grain Texture */}
          <div className="absolute inset-0 pointer-events-none film-grain opacity-40" />

          {/* Top Bar: System ID & Tokyo Clock */}
          <div className="relative z-10 flex items-center justify-between w-full text-[10px] md:text-xs font-mono tracking-widest text-[#8E8E93]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E50914] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E50914]" />
              </span>
              <span className="text-white font-semibold">
                SENNA // ARCHIVE INITIALIZATION
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <span>TOKYO 35.6764° N, 139.6500° E</span>
              <span className="text-white/30">|</span>
              <span className="text-white">v2.6 AWWWARDS CORE</span>
            </div>
          </div>

          {/* Center Main Stage: Scramble Title, Katakana & Precision Meter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center text-center my-auto max-w-3xl mx-auto w-full"
          >
            {/* Top Subtitle with Scramble */}
            <div className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-[0.3em] text-[#E50914] mb-3">
              <span>[01/ONLINE]</span>
              <ScrambleText
                text="OFFICIAL ARTIST ARCHIVE"
                duration={1000}
                className="font-bold text-white tracking-[0.25em]"
              />
            </div>

            {/* Giant Monolithic Artist Name */}
            <div className="relative flex items-center justify-center">
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-bebas tracking-[0.1em] text-white leading-none">
                <ScrambleText
                  text="SENNA"
                  duration={1200}
                  glyphs="0123456789センナ千奈ECLIPSE808TOKYO#$!%*"
                  className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70"
                />
              </h1>
              <span className="text-2xl sm:text-4xl md:text-5xl font-serif-jp text-[#E50914] ml-3 font-bold opacity-90 drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                千奈
              </span>
            </div>

            {/* Sub-Tagline Scramble */}
            <div className="mt-4 text-xs md:text-sm tracking-[0.2em] font-sans-jp text-white/60">
              <ScrambleText
                text="漆黒の静寂と、深紅の情熱 // AVANT-GARDE J-POP"
                duration={1400}
              />
            </div>

            {/* Precision Laser Loading Bar */}
            <div className="w-full max-w-md mt-10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8E93] tracking-widest">
                <span>BUFFERING ASSETS</span>
                <span className="text-white font-semibold">{progress.toString().padStart(2, "0")}%</span>
              </div>
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#800A13] via-[#E50914] to-white relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                </motion.div>
              </div>
            </div>

            {/* Automatic Language Detection Proof Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-col items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider">
                <span className="text-[#8E8E93]">DEVICE LOCALE:</span>
                <span className="text-[#E50914] font-bold">
                  {detectedInfo.code.toUpperCase()}
                </span>
                <span className="text-white font-medium">
                  [{detectedInfo.nativeName}]
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
                {detectedInfo.isAutoDetected ? "AUTO-DETECTED FROM HARDWARE" : "PREVIOUS SESSION RESTORED"}
              </span>
            </motion.div>
          </motion.div>

          {/* Bottom Bar: Action Hints & Skip Button */}
          <div className="relative z-10 flex items-center justify-between w-full text-[10px] md:text-xs font-mono tracking-widest text-[#8E8E93]">
            <div className="flex items-center gap-2">
              <span className="inline-block px-1.5 py-0.5 rounded border border-white/20 text-white text-[9px]">
                AUDIO
              </span>
              <span>IMMERSIVE SOUND ENGINE ENABLED</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                completeIntro();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/20 hover:border-[#E50914] text-white hover:text-[#E50914] transition-colors cursor-pointer group"
            >
              <span>SKIP</span>
              <span className="text-[9px] text-[#8E8E93] group-hover:text-[#E50914]">[ESC]</span>
              <span>↗</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
