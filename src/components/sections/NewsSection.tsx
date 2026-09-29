"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteData, NewsItem } from "@/data/siteData";

export default function NewsSection() {
  const { dict, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalNews, setActiveModalNews] = useState<NewsItem | null>(null);

  const categories = [
    { key: "ALL", label: dict.news.filterAll },
    { key: "LIVE", label: dict.news.filterLive },
    { key: "RELEASE", label: dict.news.filterRelease },
    { key: "MEDIA", label: dict.news.filterMedia },
    { key: "GOODS", label: dict.news.filterGoods },
  ];

  const filteredNews =
    selectedCategory === "ALL"
      ? siteData.news
      : siteData.news.filter((item) => item.category === selectedCategory);

  return (
    <section id="news" className="relative py-24 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Section Header (Pure Typography, Borderless) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
        <div>
          <span className="font-condensed text-xs text-[#E50914] tracking-[0.25em] uppercase block mb-1 font-semibold">
            {dict.news.sectionNum} / {dict.news.badge}
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-normal">
            {dict.news.title}{" "}
            <span className="font-serif-jp text-lg sm:text-2xl text-white/40 ml-2 font-normal">
              {dict.news.subtitle}
            </span>
          </h2>
        </div>

        {/* Category Filter Pills (Borderless, Touch-Friendly) */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 min-h-[36px] rounded-full font-condensed text-xs tracking-widest transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#E50914] text-white font-bold"
                  : "bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric News Grid (Clean & Borderless) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        {filteredNews.map((item, index) => {
          const isMain = index === 0;
          return (
            <article
              key={item.id}
              onClick={() => setActiveModalNews(item)}
              className={`bg-[#0a0a0d] hover:bg-[#111116] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 flex flex-col justify-between ${
                isMain ? "md:col-span-8 md:row-span-2" : "md:col-span-4"
              }`}
            >
              {/* Image Preview Container */}
              <div
                className={`relative w-full overflow-hidden ${
                  isMain ? "aspect-[16/10] min-h-[220px] sm:min-h-[260px]" : "aspect-[16/9] min-h-[160px] sm:min-h-[180px]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={t(item.title)}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent opacity-90" />

                {/* Badge Category */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E50914] text-white font-condensed text-[10px] tracking-widest uppercase font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="font-condensed text-xs text-white/60 tracking-wider">
                    {item.date}
                  </span>
                  <span className="font-condensed text-xs text-[#E50914] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    {dict.news.readStory}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <h3
                  className={`font-syne font-bold text-white group-hover:text-[#E50914] transition-colors leading-snug ${
                    isMain ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                  }`}
                >
                  {t(item.title)}
                </h3>
                <p className="font-sans-jp text-xs sm:text-sm text-white/50 line-clamp-2 leading-relaxed font-light">
                  {t(item.summary)}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* News Detail Reader Modal (Borderless) */}
      {activeModalNews && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-2xl w-full bg-[#0d0d11] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E50914] text-white font-condensed text-[10px] font-bold">
                  {activeModalNews.category}
                </span>
                <span className="font-condensed text-xs text-white/50 tracking-wider">
                  {activeModalNews.date}
                </span>
              </div>
              <button
                onClick={() => setActiveModalNews(null)}
                className="text-white/60 hover:text-white font-condensed text-xs px-3 py-1.5 rounded-full bg-white/5 cursor-pointer"
              >
                {dict.news.modalClose}
              </button>
            </div>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src={activeModalNews.image}
                alt={t(activeModalNews.title)}
                fill
                sizes="700px"
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white">
                {t(activeModalNews.title)}
              </h3>
              <p className="font-sans-jp text-sm sm:text-base text-white/70 leading-relaxed font-light whitespace-pre-line">
                {t(activeModalNews.summary)}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="font-condensed text-[10px] text-white/40 tracking-widest uppercase">
                SENNA OFFICIAL PRESS RELEASE
              </span>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: t(activeModalNews.title),
                      text: t(activeModalNews.summary),
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-condensed text-xs tracking-wider transition-colors cursor-pointer"
              >
                {dict.news.modalShare} ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
