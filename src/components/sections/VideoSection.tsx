"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteData, VideoItem } from "@/data/siteData";

export default function VideoSection() {
  const { dict, t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const featured = siteData.video.featured;

  return (
    <section id="video" className="relative py-24 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Header (Borderless) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <span className="font-condensed text-xs text-[#E50914] tracking-[0.25em] uppercase block mb-1 font-semibold">
            {dict.video.sectionNum} / {dict.video.badge}
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-normal">
            {dict.video.title}{" "}
            <span className="font-serif-jp text-lg sm:text-2xl text-white/40 ml-2 font-normal">
              {dict.video.subtitle}
            </span>
          </h2>
        </div>
        <span className="font-condensed text-xs text-white/40 tracking-widest uppercase">
          {dict.video.tagline}
        </span>
      </div>

      {/* Featured Video 21:9 Cinema Showcase (Borderless) */}
      <div
        onClick={() => setActiveVideo(featured)}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[240px] sm:min-h-[320px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group mb-8 sm:mb-10 bg-black"
      >
        <Image
          src={featured.thumbnail}
          alt={t(featured.title)}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Center Circular Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E50914] text-white font-condensed text-[10px] font-bold tracking-widest">
                {featured.category}
              </span>
              <span className="font-condensed text-xs text-white/60 tracking-wider">
                {featured.releaseDate} • {featured.duration}
              </span>
            </div>
            <h3 className="font-syne text-lg sm:text-3xl font-bold text-white">
              {t(featured.title)}
            </h3>
            <p className="font-condensed text-xs text-white/40 tracking-wider">{featured.subtitle}</p>
          </div>

          <div className="font-condensed text-xs text-[#E50914] hidden sm:block tracking-widest">
            [ {dict.video.watchNow} ]
          </div>
        </div>
      </div>

      {/* Playlist Grid (Borderless Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {siteData.video.playlist.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveVideo(item)}
            className="bg-[#0a0a0d] hover:bg-[#111116] rounded-2xl overflow-hidden cursor-pointer group flex flex-col sm:flex-row gap-4 p-4 items-start sm:items-center transition-colors"
          >
            <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden shrink-0 bg-black">
              <Image
                src={item.thumbnail}
                alt={t(item.title)}
                fill
                sizes="200px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1 flex-1">
              <span className="font-condensed text-[10px] text-[#E50914] uppercase tracking-wider font-bold">
                {item.category} • {item.duration}
              </span>
              <h4 className="font-syne font-bold text-sm sm:text-base text-white group-hover:text-[#E50914] transition-colors line-clamp-1">
                {t(item.title)}
              </h4>
              <p className="font-condensed text-xs text-white/40">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player (Borderless) */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-12"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-5xl w-full bg-[#0a0a0d] rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
                <span className="font-syne font-bold text-white text-sm sm:text-base">
                  {t(activeVideo.title)}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="font-condensed text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-full bg-white/10 cursor-pointer"
              >
                {dict.video.closeVideo}
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={t(activeVideo.title)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
