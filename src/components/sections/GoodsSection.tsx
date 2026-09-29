"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteData, MerchItem } from "@/data/siteData";

export default function GoodsSection() {
  const { dict, t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);

  const getBadgeLabel = (badge?: "NEW" | "SOLD OUT" | "LIMITED") => {
    if (!badge) return null;
    if (badge === "NEW") return dict.goods.newBadge;
    if (badge === "SOLD OUT") return dict.goods.soldOut;
    if (badge === "LIMITED") return dict.goods.limited;
    return badge;
  };

  return (
    <section id="goods" className="relative py-24 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Header (Borderless) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <span className="font-condensed text-xs text-[#E50914] tracking-[0.25em] uppercase block mb-1 font-semibold">
            {dict.goods.sectionNum} / {dict.goods.badge}
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-normal">
            {dict.goods.title}{" "}
            <span className="font-serif-jp text-lg sm:text-2xl text-white/40 ml-2 font-normal">
              {dict.goods.subtitle}
            </span>
          </h2>
        </div>
        <span className="font-condensed text-xs text-white/40 tracking-widest uppercase">
          SENNA OFFICIAL CAPSULE COLLECTION & VINYL
        </span>
      </div>

      {/* Merch Grid (Clean, Borderless) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {siteData.goods.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            className="bg-[#0a0a0d] hover:bg-[#111116] rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-colors shadow-xl"
          >
            {/* Image Container */}
            <div className="relative aspect-square min-h-[240px] sm:min-h-[260px] w-full overflow-hidden bg-[#0c0c0e]">
              <Image
                src={item.image}
                alt={t(item.name)}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent opacity-60" />

              {/* Badge */}
              {item.badge && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-condensed font-bold tracking-widest uppercase ${
                      item.badge === "LIMITED"
                        ? "bg-[#E50914] text-white"
                        : item.badge === "SOLD OUT"
                        ? "bg-white/20 text-white line-through"
                        : "bg-white text-black"
                    }`}
                  >
                    {getBadgeLabel(item.badge)}
                  </span>
                </div>
              )}
            </div>

            {/* Product Meta */}
            <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-[#E50914] transition-colors leading-snug">
                  {t(item.name)}
                </h3>
                <p className="font-sans-jp text-xs text-white/50 font-light line-clamp-2">
                  {t(item.description)}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-condensed text-base font-bold text-white tracking-wider">
                    ¥{item.priceJPY.toLocaleString()}
                  </span>
                  <span className="font-condensed text-xs text-white/40">
                    (approx. €{item.priceEUR})
                  </span>
                </div>

                <span className="font-condensed text-xs text-[#E50914] group-hover:translate-x-1 transition-transform tracking-widest font-semibold">
                  {dict.goods.orderNow} →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Merch Detail Modal (Borderless) */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-xl w-full bg-[#0d0d11] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2">
              <span className="font-condensed text-xs text-[#E50914] font-bold tracking-widest">
                {dict.goods.modalTitle}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="font-condensed text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-full bg-white/5 cursor-pointer"
              >
                {dict.goods.close}
              </button>
            </div>

            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black">
              <Image
                src={selectedProduct.image}
                alt={t(selectedProduct.name)}
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-syne font-bold text-2xl text-white">
                {t(selectedProduct.name)}
              </h3>
              <p className="font-sans-jp text-sm text-white/70 leading-relaxed font-light">
                {t(selectedProduct.description)}
              </p>
              <p className="font-sans-jp text-xs text-white/40 italic">
                {dict.goods.modalNotice}
              </p>
              <div className="font-condensed text-xl font-bold text-white pt-2 tracking-wider">
                ¥{selectedProduct.priceJPY.toLocaleString()} / €{selectedProduct.priceEUR}
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => alert("Store checkout will be linked to official base/shopify store.")}
                  className="flex-1 py-3.5 rounded-full bg-[#E50914] hover:bg-[#d01025] text-white font-condensed text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer min-h-[44px]"
                >
                  {dict.goods.orderNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
