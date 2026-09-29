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
      animate={{ opacity: isMenuOpen ? 0 : 1, y: isMenuOpen ? 15 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: isMenuOpen ? "none" : "auto" }}
      aria-label="Official Social Channels"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none transition-all duration-300 flex items-center justify-center"
    >
      <div className="flex items-center justify-center bg-transparent">
        <SocialIcons size="sm" />
      </div>
    </motion.aside>
  );
}
