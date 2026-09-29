"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingSpeakerButton() {
  const { isPlaying, toggleAudio } = useAudio();
  const { dict } = useLanguage();
  const [isJumping, setIsJumping] = useState(false);

  const handleClick = () => {
    toggleAudio();
    setIsJumping(true);
  };

  return (
    <div className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 select-none flex items-center gap-2.5">
      {/* 
        1. Beautiful Speaker Icon: on mobile, refined pill with sound waves; on desktop, minimalist
      */}
      <motion.button
        onClick={handleClick}
        animate={
          isJumping
            ? {
                y: [0, -10, 2, -3, 0],
                scale: [1, 1.25, 0.9, 1.05, 1],
              }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setIsJumping(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-[#0a0a0d]/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-white/15 sm:border-0 shadow-xl sm:shadow-none cursor-pointer select-none outline-none text-white/80 hover:text-[#E50914] transition-colors duration-200 flex items-center justify-center"
        aria-label={isPlaying ? (dict.sound?.mute || "Mute Audio") : (dict.sound?.play || "Play Audio")}
      >
        {isPlaying ? (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#E50914] transition-colors"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Speaker Body */}
            <path d="M11 5L6 9H2V15H6L11 19V5Z" />
            {/* Sound Wave 1 */}
            <path
              d="M15.54 8.46C16.48 9.4 17 10.65 17 12C17 13.35 16.48 14.6 15.54 15.54"
              stroke="#E50914"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse"
            />
            {/* Sound Wave 2 */}
            <path
              d="M19.07 4.93C20.95 6.81 22 9.35 22 12C22 14.65 20.95 17.19 19.07 19.07"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-[#E50914] transition-colors"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Muted Speaker Body */}
            <path d="M11 5L6 9H2V15H6L11 19V5Z" />
            {/* Diagonal Mute Slash */}
            <line
              x1="22"
              y1="9"
              x2="16"
              y2="15"
              stroke="#E50914"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="9"
              x2="22"
              y2="15"
              stroke="#E50914"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.button>

      {/* 
        2. Vertical SOUND label on desktop ONLY (hidden on mobile phone screens)
      */}
      <span className="hidden sm:inline-block font-condensed text-[10px] tracking-[0.4em] uppercase text-white/35 [writing-mode:vertical-rl] select-none font-semibold">
        {dict.sound?.soundLabel || "SOUND"}
      </span>
    </div>
  );
}
