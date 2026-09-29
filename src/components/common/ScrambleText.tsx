"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_GLYPHS =
  "0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノSENNA808ECLIPSE#$*+/<>[]~";

interface ScrambleTextProps {
  text: string;
  duration?: number; // total duration in ms
  scrambleSpeed?: number; // interval between scramble steps in ms
  glyphs?: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  autoStart?: boolean;
  onComplete?: () => void;
}

export default function ScrambleText({
  text,
  duration = 550,
  scrambleSpeed = 20,
  glyphs = DEFAULT_GLYPHS,
  className = "",
  as: Component = "span",
  autoStart = true,
  onComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const frameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  const startScramble = useCallback(() => {
    if (!text || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const startTime = performance.now();
    const length = text.length;
    let lastUpdate = 0;

    const updateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Only re-generate scrambled characters at scrambleSpeed intervals for visual clarity
      if (currentTime - lastUpdate >= scrambleSpeed || progress >= 1) {
        lastUpdate = currentTime;
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
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateFrame);
      } else {
        setDisplayText(text);
        onComplete?.();
      }
    };

    frameRef.current = requestAnimationFrame(updateFrame);
  }, [text, duration, scrambleSpeed, glyphs, onComplete]);

  useEffect(() => {
    if (autoStart) {
      startScramble();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, autoStart, startScramble]);

  return (
    <Component className={`inline-block select-none ${className}`} aria-label={text}>
      {displayText}
    </Component>
  );
}

