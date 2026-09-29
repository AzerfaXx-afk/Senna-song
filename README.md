# Senna-song — Official Artist Web App & PWA

> **仙奈 (SENNA)** — Official Awwwards-grade responsive web application and Progressive Web App for Japanese singer, songwriter, and live performer SENNA.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-purple?style=flat&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Awwwards Nominee Grade](https://img.shields.io/badge/Design-Awwwards_Style-E50914?style=flat)](https://www.awwwards.com/)

---

## 🌟 Key Features & Architecture

### 1. ⚡ Refresh & Scroll Reliability
- **Guaranteed Top Reset**: Automatic scroll restoration set to `manual` on page reload, instantly resetting the view to the 4K Hero section without jarring jumps or stale anchor locks.
- **Lenis Momentum Scrolling**: Hardware-accelerated smooth scrolling with synchronized inertia physics.

### 2. 🌐 Complete Multilingual System
- **Comprehensive Dictionaries**: Full translation system supporting:
  - 🇯🇵 **Japanese (日本語)**
  - 🇬🇧 **English (Global)**
  - 🇫🇷 **French (Français)**
  - 🇪🇸 **Spanish (Español)**
  - *Dynamic fallback supporting 50+ world languages via custom dropdown selector.*
- **100% Surface Coverage**: Every heading, subtitle, button, form placeholder, modal reader, and metadata tag reacts dynamically in real-time.

### 3. 📱 Mobile First & Universal Responsiveness
- Engineered for flawless typography, aspect ratio scaling, and touch targets across iPhone, Android, tablets, and 4K desktop screens.
- Sliding 3D Vinyl sleeve exploration with both touch and hover activation.
- Pure borderless design with floating social dock and ambient audio controls.

### 4. 📲 Progressive Web App (PWA) & Auto-Updating Service Worker
- **Installable / Downloadable**: Standalone display mode with `manifest.json`, high-res icons, and custom install triggers for iOS and Android.
- **Auto-Updating Service Worker (`sw.js`)**:
  - Network-First navigation caching ensures users always receive the newest releases and code on refresh.
  - Stale-While-Revalidate caching for static media and fonts.
  - Instant client takeover via `self.skipWaiting()` and `clients.claim()`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm, yarn, or pnpm

### Installation
```bash
git clone https://github.com/AzerfaXx-afk/Senna-song.git
cd Senna-song
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/
│   ├── images/               # 4K artist photography & album covers
│   ├── manifest.json         # PWA Web App Manifest
│   └── sw.js                 # Auto-updating Service Worker
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with PWA meta & fonts
│   │   ├── page.tsx          # Main single-page storytelling flow
│   │   └── globals.css       # Tailwind CSS v4 design tokens
│   ├── components/
│   │   ├── audio/            # Floating audio engine & speaker button
│   │   ├── common/           # Smooth scroll (Lenis) wrapper
│   │   ├── navigation/       # Navbar, CurtainMenu & FloatingSocialDock
│   │   ├── pwa/              # PWA manager & update notifier
│   │   ├── sections/         # Hero, News, Profile, Discography, Video, etc.
│   │   └── ui/               # Social icons & reusable components
│   ├── context/
│   │   ├── AudioContext.tsx  # Ambient soundtrack state management
│   │   └── LanguageContext.tsx # Universal multilingual provider
│   └── data/
│       ├── languages.ts      # 50+ world language definitions
│       ├── siteData.ts       # Central artist catalog & bio
│       └── translations.ts   # JA/EN/FR/ES translation dictionaries
└── README.md
```

---

## 📜 License & Copyright

© 2026 **SENNA MUSIC ENTERTAINMENT / TOKYO**. All Rights Reserved.
Produced for artist **SENNA (仙奈)**.
