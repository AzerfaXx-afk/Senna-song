"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";

export default function ContactSection() {
  const { dict, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Live & Booking",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "Live & Booking", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Header (Borderless) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <span className="font-condensed text-xs text-[#E50914] tracking-[0.25em] uppercase block mb-1 font-semibold">
            {dict.contact.sectionNum} / {dict.contact.badge}
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-normal">
            {dict.contact.title}{" "}
            <span className="font-serif-jp text-lg sm:text-2xl text-white/40 ml-2 font-normal">
              {dict.contact.subtitle}
            </span>
          </h2>
        </div>
        <span className="font-condensed text-xs text-white/40 tracking-widest uppercase">
          BOOKING, PRESS & COLLABORATIONS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        {/* Left Column: Direct Info & Addresses (Clean, No Box) */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div className="space-y-3">
            <h3 className="font-syne font-bold text-2xl text-white">
              {t(siteData.contact.headline)}
            </h3>
            <p className="font-sans-jp text-sm text-white/60 font-light leading-relaxed">
              {t(siteData.contact.subheadline)}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0d] space-y-6 shadow-xl">
            <div>
              <span className="font-condensed text-[10px] text-[#E50914] uppercase tracking-widest block font-bold">
                {dict.contact.managementTitle}
              </span>
              <p className="font-syne font-bold text-sm text-white mt-1">
                {siteData.contact.management}
              </p>
              <a
                href={`mailto:${siteData.contact.email}`}
                className="font-condensed text-xs text-white/60 hover:text-white transition-colors"
              >
                {siteData.contact.email}
              </a>
            </div>

            <div>
              <span className="font-condensed text-[10px] text-[#E50914] uppercase tracking-widest block font-bold">
                {dict.contact.pressTitle}
              </span>
              <a
                href={`mailto:${siteData.contact.pressEmail}`}
                className="font-condensed text-xs text-white/60 hover:text-white transition-colors"
              >
                {siteData.contact.pressEmail}
              </a>
            </div>

            <div>
              <span className="font-condensed text-[10px] text-[#E50914] uppercase tracking-widest block font-bold">
                {dict.contact.locationTitle}
              </span>
              <p className="font-condensed text-xs text-white/60">
                Minato-ku, Tokyo, Japan
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (Clean, Borderless) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0a0a0d] p-6 sm:p-10 rounded-3xl space-y-5 sm:space-y-6 shadow-xl"
          >
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E50914]/20 text-[#E50914] flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="font-syne font-bold text-2xl text-white">
                  {dict.contact.formSuccess}
                </h4>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <label className="font-condensed text-xs text-white/60 tracking-widest uppercase block">
                      {dict.contact.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.08] font-condensed text-sm transition-colors min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-condensed text-xs text-white/60 tracking-widest uppercase block">
                      {dict.contact.formEmail} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.08] font-condensed text-sm transition-colors min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-condensed text-xs text-white/60 tracking-widest uppercase block">
                    {dict.contact.formCategory}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141418] text-white focus:outline-none font-condensed text-sm transition-colors min-h-[44px]"
                  >
                    <option value="Live & Booking">{dict.contact.formCategoryBooking}</option>
                    <option value="Media & Press">{dict.contact.formCategoryPress}</option>
                    <option value="General Inquiries">{dict.contact.formCategoryGeneral}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-condensed text-xs text-white/60 tracking-widest uppercase block">
                    {dict.contact.formMessage} *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.08] font-sans-jp text-sm transition-colors resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#E50914] hover:bg-[#d01025] text-white font-condensed text-xs tracking-[0.25em] uppercase font-semibold transition-all cursor-pointer min-h-[48px]"
                >
                  {dict.contact.formSubmit} ↗
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
