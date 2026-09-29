"use client";

import React from "react";
import { motion } from "framer-motion";
import SocialIcons from "@/components/ui/SocialIcons";

export default function FloatingSocialDock() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Official Social Channels"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto transition-all duration-300 flex items-center justify-center"
    >
      <div className="flex items-center justify-center bg-transparent">
        <SocialIcons size="sm" />
      </div>
    </motion.aside>
  );
}
