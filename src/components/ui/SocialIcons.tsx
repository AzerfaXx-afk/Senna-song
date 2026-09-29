"use client";

import React from "react";

export interface SocialIconItem {
  name: string;
  key: "instagram" | "tiktok" | "spotify" | "youtube" | "x" | "applemusic";
  url: string;
  label: string;
}

export const OFFICIAL_SOCIALS: SocialIconItem[] = [
  {
    name: "Instagram",
    key: "instagram",
    url: "https://instagram.com",
    label: "Instagram",
  },
  {
    name: "TikTok",
    key: "tiktok",
    url: "https://tiktok.com",
    label: "TikTok",
  },
  {
    name: "Spotify",
    key: "spotify",
    url: "https://spotify.com",
    label: "Spotify",
  },
  {
    name: "YouTube",
    key: "youtube",
    url: "https://youtube.com",
    label: "YouTube",
  },
  {
    name: "X",
    key: "x",
    url: "https://x.com",
    label: "X (Twitter)",
  },
  {
    name: "Apple Music",
    key: "applemusic",
    url: "https://music.apple.com",
    label: "Apple Music",
  },
];

interface SocialIconsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SocialIcons({ className = "", size = "sm" }: SocialIconsProps) {
  // Dimensions based on size prop (sleek & refined for high-fashion editorial look)
  const sizeClasses =
    size === "sm"
      ? "w-7.5 h-7.5 sm:w-8 sm:h-8"
      : size === "lg"
      ? "w-11 h-11 sm:w-12 sm:h-12"
      : "w-9 h-9 sm:w-9.5 sm:h-9.5";

  const iconSizes =
    size === "sm" ? "w-3.5 h-3.5 sm:w-4 sm:h-4" : size === "lg" ? "w-5 h-5 sm:w-6 sm:h-6" : "w-4 h-4";

  return (
    <div className={`social-tooltip-wrapper ${className}`}>
      <ul className="flex items-center gap-1.5 sm:gap-2 list-none p-0 m-0">
        {OFFICIAL_SOCIALS.map((social) => (
          <li key={social.key} className="social-icon-item relative">
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              data-social={social.key}
              aria-label={social.label}
              className={`social-btn group relative overflow-hidden flex items-center justify-center rounded-full bg-white text-[#18181b] shadow-sm transition-all duration-300 sm:hover:shadow-xl sm:hover:scale-110 active:scale-90 cursor-pointer select-none outline-none ${sizeClasses}`}
              onTouchEnd={(e) => (e.currentTarget as HTMLElement).blur()}
              onClick={(e) => (e.currentTarget as HTMLElement).blur()}
            >
              {/* Animated Rising Filled Background in Brand Colors */}
              <div className="filled-bg absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out pointer-events-none" />

              {/* Official Platform Vector Icon (Zero Text beside icon) */}
              <span className="relative z-10 text-[#1f1f23] sm:group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                {renderSocialSvg(social.key, iconSizes)}
              </span>
            </a>

            {/* 
              Clean, Monochrome Floating Tooltip (Visible ONLY on Desktop with True Mouse Hover)
              - Completely hidden on touch/mobile to prevent sticky hover bugs
            */}
            <div
              className="social-tooltip pointer-events-none absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#0c0c0e] text-[10px] font-condensed tracking-wider font-semibold text-white whitespace-nowrap opacity-0 invisible transition-all duration-200 shadow-lg shadow-black/90 z-50 hidden sm:block"
            >
              {social.label}
              {/* Neutral black arrow indicator */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-[#0c0c0e] border-t-4 border-x-transparent border-x-4 border-b-0 w-0 h-0" />
            </div>
          </li>
        ))}
      </ul>

      {/* Scoped CSS: STRICTLY scoped to @media (hover: hover) and (pointer: fine) */}
      <style jsx>{`
        .social-icon-item .social-tooltip {
          display: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .social-icon-item .social-tooltip {
            display: block;
            top: -24px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .social-icon-item:hover .social-tooltip {
            opacity: 1;
            visibility: visible;
            top: -38px;
          }

          .social-btn:hover .filled-bg {
            height: 100%;
          }
        }

        /* 1. INSTAGRAM - Button fills with Instagram Gradient */
        .social-btn[data-social="instagram"] .filled-bg {
          background: linear-gradient(
            45deg,
            #405de6,
            #5851db,
            #833ab4,
            #c13584,
            #e1306c,
            #fd1d1d
          );
        }

        /* 2. TIKTOK - Button fills with pure black */
        .social-btn[data-social="tiktok"] .filled-bg {
          background-color: #010101;
        }

        /* 3. SPOTIFY - Button fills with Spotify Green */
        .social-btn[data-social="spotify"] .filled-bg {
          background-color: #1db954;
        }

        /* 4. YOUTUBE - Button fills with YouTube Red */
        .social-btn[data-social="youtube"] .filled-bg {
          background-color: #ff0000;
        }

        /* 5. X (TWITTER) - Button fills with Black */
        .social-btn[data-social="x"] .filled-bg {
          background-color: #000000;
        }

        /* 6. APPLE MUSIC - Button fills with Apple Music Red */
        .social-btn[data-social="applemusic"] .filled-bg {
          background: linear-gradient(135deg, #fc3c44, #f94c57, #e43345);
        }
      `}</style>
    </div>
  );
}

function renderSocialSvg(key: string, sizeClass: string) {
  switch (key) {
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={sizeClass}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );

    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={sizeClass}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.87 2.89 2.89 0 0 1-2.88-2.87 2.89 2.89 0 0 1 2.88-2.88c.45 0 .88.1 1.26.28V9.6a6.34 6.34 0 0 0-1.26-.13A6.33 6.33 0 0 0 3 15.8a6.33 6.33 0 0 0 6.35 6.34 6.33 6.33 0 0 0 6.34-6.34V9.28a8.16 8.16 0 0 0 4.9 1.63v-3.46a4.85 4.85 0 0 1-1-.76z" />
        </svg>
      );

    case "spotify":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={sizeClass}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );

    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={sizeClass}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );

    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={sizeClass}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );

    case "applemusic":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={sizeClass}>
          <path d="M21 3v12.5a3.5 3.5 0 1 1-3.5-3.5c.54 0 1.05.12 1.5.33V6.66l-10 2.22V17.5A3.5 3.5 0 1 1 5.5 14c.54 0 1.05.12 1.5.33V5.5a1.5 1.5 0 0 1 1.18-1.46l11-2.44A1.5 1.5 0 0 1 21 3z" />
        </svg>
      );

    default:
      return null;
  }
}
