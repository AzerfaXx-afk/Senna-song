"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_GLYPHS =
  "0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノSENNA808ECLIPSE#$*+/<>[]~";

interface ScrambleTextProps {
  text: string;
  duration?: number; // total duration in ms
  delay?: number; // delay before scramble begins in ms
  scrambleSpeed?: number; // interval between scramble steps in ms
  glyphs?: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  autoStart?: boolean;
  onComplete?: () => void;
}

export default function ScrambleText({
  text,
  duration = 1500,
  delay = 0,
  scrambleSpeed = 35,
  glyphs = DEFAULT_GLYPHS,
  className = "",
  as: Component = "span",
  autoStart = true,
  onComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef(false);

  const startScramble = useCallback(() => {
    if (!text || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const runAnimation = () => {
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
    };

    if (delay > 0) {
      timerRef.current = setTimeout(runAnimation, delay);
    } else {
      runAnimation();
    }
  }, [text, duration, delay, scrambleSpeed, glyphs, onComplete]);

  useEffect(() => {
    if (autoStart) {
      if (hasAnimatedRef.current) {
        setDisplayText(text);
      } else {
        startScramble();
      }
    } else {
      setDisplayText(text);
    }

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, autoStart, startScramble]);

  return (
    <Component
      className={`select-none ${className.includes("inline") || className.includes("block") ? "" : "inline-block"} ${className}`.trim()}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
}

