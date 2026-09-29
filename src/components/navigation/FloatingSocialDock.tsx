"use client";

import React from "react";
import SocialIcons from "@/components/ui/SocialIcons";

export default function FloatingSocialDock() {
  return (
    <aside
      aria-label="Official Social Channels"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto transition-all duration-300 flex items-center justify-center"
    >
      <div className="flex items-center justify-center bg-transparent">
        <SocialIcons size="sm" />
      </div>
    </aside>
  );
}
