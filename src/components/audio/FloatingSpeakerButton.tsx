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
    <div
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-10 lg:right-14 z-50 select-none flex items-center pointer-events-auto"
    >
      <div className="flex items-center gap-2.5">
        {/* Interactive Button: ONLY the Speaker Icon */}
        <button
          onClick={handleClick}
          className="group relative w-7 h-7 flex items-center justify-center cursor-pointer focus:outline-none select-none bg-transparent border-0 p-0 shadow-none transition-transform duration-200 active:scale-90"
          aria-label={isPlaying ? (dict.sound?.mute || "Mute Audio") : (dict.sound?.play || "Play Audio")}
        >
          <motion.div
            animate={
              isJumping
                ? {
                    y: [0, -4, 1, 0],
                    scale: [1, 1.1, 0.98, 1],
                  }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setIsJumping(false)}
            className="w-6 h-6 flex items-center justify-center group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.85)] transition-all duration-300"
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5 overflow-visible"
                viewBox="0 0 24 24"
                fill="none"
              >
                {/* Speaker Body: Pure Crisp WHITE */}
                <path
                  d="M11 5L6 9H2V15H6L11 19V5Z"
                  fill="white"
                  className="transition-colors duration-300"
                />
                {/* Sound Wave 1 (Inner Arc): CRIMSON RED with pulse */}
                <path
                  d="M15.5 8.5C16.4 9.4 17 10.6 17 12C17 13.4 16.4 14.6 15.5 15.5"
                  stroke="#E50914"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="animate-pulse origin-center"
                />
                {/* Sound Wave 2 (Outer Arc): CRIMSON RED with delayed pulse */}
                <path
                  d="M19 5.5C20.8 7.3 22 9.5 22 12C22 14.5 20.8 16.7 19 18.5"
                  stroke="#E50914"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="animate-pulse [animation-delay:200ms] origin-center"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 overflow-visible"
                viewBox="0 0 24 24"
                fill="none"
              >
                {/* Speaker Body: Pure Crisp WHITE */}
                <path
                  d="M11 5L6 9H2V15H6L11 19V5Z"
                  fill="white"
                  className="transition-colors duration-300"
                />
                {/* Diagonal Mute Slash 1: CRIMSON RED */}
                <line
                  x1="22"
                  y1="9"
                  x2="16"
                  y2="15"
                  stroke="#E50914"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(229,9,20,0.9)]"
                />
                {/* Diagonal Mute Slash 2: CRIMSON RED */}
                <line
                  x1="16"
                  y1="9"
                  x2="22"
                  y2="15"
                  stroke="#E50914"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(229,9,20,0.9)]"
                />
              </svg>
            )}
          </motion.div>
        </button>

        {/* Vertical SOUND / SON label (Pure SECTIONS styling, non-interactive, NO hover animation, fixed container) */}
        <div className="flex w-4 h-16 items-center justify-center select-none pointer-events-none">
          <span className="font-condensed text-[10px] tracking-[0.4em] uppercase text-white/30 [writing-mode:vertical-rl] font-semibold select-none pointer-events-none">
            <ScrambleText
              text={dict.sound?.soundLabel || "SON"}
              duration={2000}
              delay={250}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
