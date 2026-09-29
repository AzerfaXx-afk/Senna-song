"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { WORLD_LANGUAGES, LanguageOption } from "@/data/languages";

export default function LanguageModal() {
  const { lang, setLanguageCode, isModalOpen, closeLanguageModal } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Sort alphabetically by English name
  const sortedLanguages = useMemo(() => {
    return [...WORLD_LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return sortedLanguages;
    return sortedLanguages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchQuery, sortedLanguages]);

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Select Language"
    >
      {/* Modal Container (Borderless, Pure Obsidian Floating Glass) */}
      <div className="relative w-full max-w-xl bg-[#0a0a0d] rounded-3xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
            <div>
              <h3 className="font-condensed text-base tracking-widest text-white font-bold uppercase">
                SELECT LANGUAGE / 言語を選択
              </h3>
              <p className="font-mono text-[10px] text-white/40">
                {WORLD_LANGUAGES.length} LANGUAGES AVAILABLE
              </p>
            </div>
          </div>

          <button
            onClick={closeLanguageModal}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer text-xs font-mono"
            aria-label="Close language modal"
          >
            ✕
          </button>
        </div>

        {/* Live Search Input (Borderless) */}
        <div className="px-6 py-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language / 言語を検索 (e.g. English, Français, 日本語)..."
              autoFocus
              className="w-full px-4 py-3 pl-10 rounded-2xl bg-white/[0.04] text-white placeholder-white/30 text-xs font-condensed tracking-wider focus:outline-none focus:bg-white/[0.08] transition-colors"
            />
            <svg
              className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5"
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
                className="absolute right-3.5 top-3.5 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Languages List (Alphabetical Scroll, Borderless Grid) */}
        <div className="p-6 pt-3 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredLanguages.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-xs font-mono text-white/40">
              No language found matching &ldquo;{searchQuery}&rdquo;
            </div>
          ) : (
            filteredLanguages.map((item: LanguageOption) => {
              const isSelected = item.code === lang;
              return (
                <button
                  key={item.code}
                  onClick={() => setLanguageCode(item.code)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#E50914] text-white font-semibold"
                      : "bg-white/[0.025] hover:bg-white/[0.07] text-white/70 hover:text-white"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-condensed text-xs font-bold tracking-wider">
                        {item.name}
                      </span>
                      <span className={`text-[10px] font-mono uppercase ${isSelected ? "text-white/80" : "text-white/30"}`}>
                        [{item.code}]
                      </span>
                    </div>
                    <span className={`font-serif-jp text-xs block ${isSelected ? "text-white/90" : "text-white/40"}`}>
                      {item.nativeName}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info (Borderless) */}
        <div className="px-6 py-4 bg-black/40 text-center text-[10px] font-mono text-white/30 tracking-widest">
          INTERNATIONALIZATION • GLOBAL SENNA COMMUNITY
        </div>
      </div>
    </div>
  );
}
