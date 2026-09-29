"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import { useLanguage } from "@/context/LanguageContext";
import ScrambleText from "@/components/common/ScrambleText";

interface FloatingSpeakerButtonProps {
  isMenuOpen?: boolean;
}

export default function FloatingSpeakerButton({ isMenuOpen = false }: FloatingSpeakerButtonProps) {
  const { isPlaying, toggleAudio } = useAudio();
  const { dict } = useLanguage();
  const [isJumping, setIsJumping] = useState(false);

  const handleClick = () => {
    toggleAudio();
    setIsJumping(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isMenuOpen ? 0 : 1, y: isMenuOpen ? 10 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: isMenuOpen ? "none" : "auto" }}
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-10 lg:right-14 z-50 select-none flex items-center"
    >
      <button
        onClick={handleClick}
        className="group relative flex items-center gap-2.5 p-0 cursor-pointer focus:outline-none select-none text-white hover:text-[#E50914] transition-colors duration-200 bg-transparent border-0 shadow-none"
        aria-label={isPlaying ? (dict.sound?.mute || "Mute Audio") : (dict.sound?.play || "Play Audio")}
      >
        <motion.div
          animate={
            isJumping
              ? {
                  y: [0, -6, 2, -1, 0],
                  scale: [1, 1.15, 0.95, 1.02, 1],
                }
              : { y: 0, scale: 1 }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setIsJumping(false)}
          className="flex items-center justify-center"
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
        </motion.div>

        {/* Vertical SOUND / SON label on desktop ONLY (hidden on mobile phone screens) */}
        <span className="hidden sm:inline-block font-condensed text-[10px] tracking-[0.4em] uppercase text-white/30 group-hover:text-white transition-colors [writing-mode:vertical-rl] select-none font-semibold">
          <ScrambleText
            text={dict.sound?.soundLabel || "SOUND"}
            duration={2000}
            delay={250}
          />
        </span>
      </button>
    </motion.div>
  );
}
