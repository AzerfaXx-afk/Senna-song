"use client";

import React from "react";
import { useAudio } from "@/context/AudioContext";

export default function FloatingAudioButton() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden sm:block">
      <button
        onClick={toggleAudio}
        className="glass-pill px-3.5 py-2 rounded-full flex items-center gap-3 shadow-2xl hover:border-[#E50914]/50 transition-all duration-300 group cursor-pointer"
        aria-label={isPlaying ? "Mute Atmospheric Sound" : "Activate Atmospheric Sound"}
      >
        {/* 4 Animated Sound Bars */}
        <div className="flex items-end gap-[3px] h-[18px] w-[18px]">
          <div
            className={`w-[2.5px] rounded-full bg-white/70 group-hover:bg-[#E50914] transition-colors ${
              isPlaying ? "eq-bar-1" : "h-[4px]"
            }`}
          />
          <div
            className={`w-[2.5px] rounded-full bg-white/70 group-hover:bg-[#E50914] transition-colors ${
              isPlaying ? "eq-bar-2" : "h-[6px]"
            }`}
          />
          <div
            className={`w-[2.5px] rounded-full bg-white/70 group-hover:bg-[#E50914] transition-colors ${
              isPlaying ? "eq-bar-3" : "h-[3px]"
            }`}
          />
          <div
            className={`w-[2.5px] rounded-full bg-white/70 group-hover:bg-[#E50914] transition-colors ${
              isPlaying ? "eq-bar-4" : "h-[5px]"
            }`}
          />
        </div>

        {/* Text Status */}
        <div className="flex flex-col text-left">
          <span className="font-mono text-[9px] tracking-widest text-[#E50914] font-bold">
            {isPlaying ? "LIVE SOUND" : "AUDIO MUTED"}
          </span>
          <span className="font-mono text-[10px] tracking-wider text-white/70 group-hover:text-white transition-colors">
            {isPlaying ? "ON AIR" : "CLICK TO LISTEN"}
          </span>
        </div>
      </button>
    </div>
  );
}
