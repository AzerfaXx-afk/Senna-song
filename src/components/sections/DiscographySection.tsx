"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import ScrambleText from "@/components/common/ScrambleText";

export default function DiscographySection() {
  const { dict, t } = useLanguage();
  const [selectedRelease, setSelectedRelease] = useState<string>("eclipse");
  const [showTracklist, setShowTracklist] = useState<boolean>(true);
  const [isVinylRevealed, setIsVinylRevealed] = useState<boolean>(false);

  const activeRelease =
    siteData.discography.find((r) => r.id === selectedRelease) ||
    siteData.discography[0];

  return (
    <section id="discography" className="relative py-24 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Header (Borderless) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <span className="font-condensed text-xs text-[#E50914] tracking-[0.25em] uppercase block mb-1 font-semibold">
            {dict.discography.sectionNum} / {dict.discography.badge}
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-normal">
            <ScrambleText text={dict.discography.title} duration={850} hoverScramble={true} />{" "}
            <span className="font-serif-jp text-lg sm:text-2xl text-white/40 ml-2 font-normal">
              {dict.discography.subtitle}
            </span>
          </h2>
        </div>

        {/* Release Type Switcher (Borderless, Touch-Friendly) */}
        <div className="flex flex-wrap gap-2">
          {siteData.discography.map((rel) => (
            <button
              key={rel.id}
              onClick={() => setSelectedRelease(rel.id)}
              className={`px-3.5 py-1.5 min-h-[36px] rounded-full font-condensed text-xs tracking-wider transition-all cursor-pointer ${
                selectedRelease === rel.id
                  ? "bg-[#E50914] text-white font-bold"
                  : "bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {rel.type} : {rel.title}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Release Display (Borderless, Clean) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center bg-[#09090c] p-6 sm:p-12 rounded-3xl overflow-hidden">
        {/* Left Column: Interactive Vinyl Sleeve Animation */}
        <div className="lg:col-span-6 flex justify-center py-4 sm:py-6 overflow-hidden">
          <div
            onClick={() => setIsVinylRevealed(!isVinylRevealed)}
            className="relative w-60 sm:w-80 aspect-square group cursor-pointer select-none"
          >
            {/* Sliding Vinyl Disc */}
            <div
              className={`absolute top-2 bottom-2 right-0 w-[95%] aspect-square rounded-full bg-[#070709] shadow-2xl flex items-center justify-center transform transition-transform duration-700 ease-out z-0 pointer-events-none ${
                isVinylRevealed
                  ? "translate-x-14 sm:translate-x-28"
                  : "group-hover:translate-x-14 sm:group-hover:translate-x-28"
              }`}
            >
              <div className="w-[85%] h-[85%] rounded-full bg-white/[0.02] flex items-center justify-center">
                <div className="w-[70%] h-[70%] rounded-full bg-black/40 flex items-center justify-center">
                  <div className="w-[50%] h-[50%] rounded-full bg-white/[0.02] flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914] flex flex-col items-center justify-center text-center shadow-inner">
                      <span className="font-syne font-black text-[9px] text-white leading-tight">
                        SENNA
                      </span>
                      <span className="font-condensed text-[7px] text-white/80">
                        33⅓ RPM
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-black/80 mt-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Album Jacket Cover Sleeve */}
            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={activeRelease.coverImage}
                alt={activeRelease.title}
                fill
                sizes="350px"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-8 left-0 right-0 text-center font-condensed text-[10px] tracking-widest text-white/40 group-hover:text-[#E50914] transition-colors">
              {dict.discography.dragHint}
            </div>
          </div>
        </div>

        {/* Right Column: Release Metadata & Streaming Links */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E50914] text-white font-condensed text-[10px] font-bold tracking-wider">
                {activeRelease.type}
              </span>
              <span className="font-condensed text-xs text-white/40 tracking-wider">
                {activeRelease.catalogNumber} • {activeRelease.releaseDate}
              </span>
            </div>
            <h3 className="font-syne text-3xl sm:text-4xl font-black text-white mt-2">
              {activeRelease.title}
            </h3>
            {activeRelease.japaneseTitle && (
              <span className="font-serif-jp text-sm text-white/50 block">
                {activeRelease.japaneseTitle}
              </span>
            )}
          </div>

          <p className="font-sans-jp text-sm text-white/70 leading-relaxed font-light">
            {t(activeRelease.description)}
          </p>

          {/* Streaming Platform Direct Buttons */}
          <div className="space-y-3 pt-2">
            <span className="font-condensed text-xs text-white/40 tracking-widest uppercase block">
              {dict.discography.listenOn}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <a
                href={activeRelease.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white/[0.04] hover:bg-[#1DB954]/25 text-white flex items-center justify-center gap-2 font-condensed text-xs tracking-wider transition-colors"
              >
                <span>Spotify</span>
              </a>
              <a
                href={activeRelease.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white/[0.04] hover:bg-[#FA2D48]/25 text-white flex items-center justify-center gap-2 font-condensed text-xs tracking-wider transition-colors"
              >
                <span>Apple Music</span>
              </a>
              <a
                href={activeRelease.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white/[0.04] hover:bg-[#FF0000]/25 text-white flex items-center justify-center gap-2 font-condensed text-xs tracking-wider transition-colors"
              >
                <span>YouTube</span>
              </a>
              <a
                href={activeRelease.linkcoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#E50914]/20 hover:bg-[#E50914] text-white flex items-center justify-center gap-2 font-condensed text-xs tracking-wider transition-colors font-bold"
              >
                <span>Linkcore ↗</span>
              </a>
            </div>
          </div>

          {/* Tracklist (Clean, Borderless) */}
          <div className="pt-2">
            <button
              onClick={() => setShowTracklist(!showTracklist)}
              className="flex items-center justify-between w-full font-condensed text-xs text-white/50 hover:text-white cursor-pointer py-2 tracking-widest"
            >
              <span>{dict.discography.tracks} ({activeRelease.tracks.length})</span>
              <span>{showTracklist ? "▲" : "▼"}</span>
            </button>

            {showTracklist && (
              <ul className="mt-2 space-y-1.5 max-h-48 overflow-y-auto pr-2">
                {activeRelease.tracks.map((track) => (
                  <li
                    key={track.number}
                    className="flex items-center justify-between text-xs py-2 px-3.5 rounded-xl bg-white/[0.025] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-condensed text-[#E50914] font-semibold">
                        {track.number}
                      </span>
                      <span className="font-syne text-white/80">
                        {track.title}
                      </span>
                    </div>
                    <span className="font-condensed text-white/40 text-[11px]">
                      {track.duration}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
