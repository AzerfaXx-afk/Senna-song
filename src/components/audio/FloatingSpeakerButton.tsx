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
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-10 lg:right-14 z-50 select-none flex items-center"
    >
      <button
        onClick={handleClick}
        className="group relative flex items-center gap-2.5 p-0 cursor-pointer focus:outline-none select-none bg-transparent border-0 shadow-none"
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
          className="w-6 h-6 flex items-center justify-center"
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5 text-[#E50914]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Speaker Body in Crimson */}
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
                stroke="#E50914"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-[#E50914]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Muted Speaker Body in Crimson */}
              <path d="M11 5L6 9H2V15H6L11 19V5Z" />
              {/* Diagonal Mute Slash in Crimson */}
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

        {/* Vertical SOUND / SON label (Pure SECTIONS styling, NO hover animation, fixed container) */}
        <div className="flex w-4 h-16 items-center justify-center select-none overflow-visible">
          <span className="font-condensed text-[10px] tracking-[0.4em] uppercase text-white/30 [writing-mode:vertical-rl] font-semibold select-none">
            <ScrambleText
              text={dict.sound?.soundLabel || "SOUND"}
              duration={2000}
              delay={250}
            />
          </span>
        </div>
      </button>
    </div>
  );
}
