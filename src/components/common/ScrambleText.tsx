"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_GLYPHS =
  "0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@*+/<>[]{}~_=";

interface ScrambleTextProps {
  text: string;
  duration?: number; // total duration in ms
  scrambleSpeed?: number; // interval between scramble steps in ms
  glyphs?: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  trigger?: boolean | number | string;
  autoStart?: boolean;
  hoverScramble?: boolean;
  onComplete?: () => void;
}

export default function ScrambleText({
  text,
  duration = 900,
  scrambleSpeed = 30,
  glyphs = DEFAULT_GLYPHS,
  className = "",
  as: Component = "span",
  trigger,
  autoStart = true,
  hoverScramble = false,
  onComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const isScramblingRef = useRef(false);
  const frameRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (!text) return;
    if (frameRef.current) clearInterval(frameRef.current);

    isScramblingRef.current = true;
    const startTime = Date.now();
    const length = text.length;

    frameRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Characters resolved from left to right with slight organic noise
      const resolvedCount = Math.floor(progress * length);

      let scrambled = "";
      for (let i = 0; i < length; i++) {
        const char = text[i];
        if (char === " " || char === "\n" || char === "\t") {
          scrambled += char;
        } else if (i < resolvedCount) {
          scrambled += char;
        } else {
          const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
          scrambled += randomGlyph;
        }
      }

      setDisplayText(scrambled);

      if (progress >= 1) {
        if (frameRef.current) clearInterval(frameRef.current);
        setDisplayText(text);
        isScramblingRef.current = false;
        onComplete?.();
      }
    }, scrambleSpeed);
  }, [text, duration, scrambleSpeed, glyphs, onComplete]);

  // Trigger when text changes or trigger prop changes
  useEffect(() => {
    if (autoStart) {
      startScramble();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text, trigger, autoStart, startScramble]);

  const handleMouseEnter = () => {
    if (hoverScramble && !isScramblingRef.current) {
      startScramble();
    }
  };

  return (
    <Component
      className={`inline-block select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
}
