"use client";

import React from "react";
import SocialIcons from "@/components/ui/SocialIcons";

export default function FloatingSocialDock() {
  return (
    <aside
      aria-label="Official Social Channels"
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto transition-all duration-300"
    >
      {/* 
        Sleek, Borderless Floating Glass Dock
        - Horizontally centered at the bottom of the viewport
        - Permanently attached ("tout le temps attaché")
        - Subtle frosted glass backplate that prevents any interference with page content
      */}
      <div className="flex items-center justify-center bg-transparent">
        <SocialIcons size="sm" />
      </div>
    </aside>
  );
}
