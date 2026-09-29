"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import CurtainMenu from "@/components/navigation/CurtainMenu";
import FloatingSpeakerButton from "@/components/audio/FloatingSpeakerButton";
import FloatingSocialDock from "@/components/navigation/FloatingSocialDock";
import PwaManager from "@/components/pwa/PwaManager";
import HeroSection from "@/components/sections/HeroSection";
import NewsSection from "@/components/sections/NewsSection";
import ProfileSection from "@/components/sections/ProfileSection";
import DiscographySection from "@/components/sections/DiscographySection";
import VideoSection from "@/components/sections/VideoSection";
import LinkcoreSection from "@/components/sections/LinkcoreSection";
import GoodsSection from "@/components/sections/GoodsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Guarantee that on every refresh the user always starts at the top (Hero / main landing page)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo(0, 0);

      const win = window as unknown as { lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#050505] text-white">
      {/* Top Professional Navbar: Left Initials Language Dropdown, Center SENNA, Right 3-Bar Menu */}
      <Navbar
        isMenuOpen={isMenuOpen}
        onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Fullscreen Curtain Menu (Triggered by 3-bar button) */}
      <CurtainMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Main Single Page Storytelling Flow */}
      <main className="flex-1 flex flex-col">
        {/* 4K Hero with Unobstructed Portrait & Lower Audio Trigger */}
        <HeroSection />

        {/* 01. NEWS (New arrivals & Live Tour) */}
        <NewsSection />

        {/* 02. PROFILE (Biography & Philosophy) */}
        <ProfileSection />

        {/* 03. DISCOGRAPHY (Releases, 3D Vinyl interactive sleeve & Stream) */}
        <DiscographySection />

        {/* 04. VIDEO (Music videos & concert films) */}
        <VideoSection />

        {/* 05. DLC & STREAM (Linkcore / TuneCore Japan Official Hub) */}
        <LinkcoreSection />

        {/* 06. GOODS (Official Tour Apparel & Merchandise) */}
        <GoodsSection />

        {/* 07. CONTACT (Booking, Press & Management Inquiries) */}
        <ContactSection />
      </main>

      {/* Bottom Footer & Socials */}
      <Footer />

      {/* Permanent Bottom-Center Floating Social Media Dock (Always Attached) */}
      <FloatingSocialDock />

      {/* Permanent Bottom-Right Speaker Sound Button (Borderless, Animated) */}
      <FloatingSpeakerButton />

      {/* PWA Auto-Updater & Install Manager */}
      <PwaManager />
    </div>
  );
}
