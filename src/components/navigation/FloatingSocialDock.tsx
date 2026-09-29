"use client";

import React from "react";
import { motion } from "framer-motion";
import SocialIcons from "@/components/ui/SocialIcons";

interface FloatingSocialDockProps {
  isMenuOpen?: boolean;
}

export default function FloatingSocialDock({ isMenuOpen = false }: FloatingSocialDockProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: "auto" }}
      aria-label="Official Social Channels"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none flex items-center justify-center pointer-events-auto"
    >
      <div className="flex items-center justify-center bg-transparent">
        <SocialIcons size="sm" />
      </div>
    </motion.aside>
  );
}
