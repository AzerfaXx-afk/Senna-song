"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaManager() {
  const { lang } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    // 1. Check if running as standalone PWA
    const standaloneCheck =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standaloneCheck);

    // 2. Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // 3. Register Service Worker with instant auto-update
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          reg.update().catch(() => {});
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                newWorker.postMessage({ type: "SKIP_WAITING" });
              }
            });
          });
        })
        .catch(() => {});

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    // 4. Listen for BeforeInstallPrompt event (Chrome, Android, Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsStandalone(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      // Fallback for browsers that don't support beforeinstallprompt
      setShowIosGuide(true);
    }
  };

  const getSubLabel = () => {
    if (lang === "ja") return "公式アプリをインストール";
    if (lang === "fr") return "INSTALLER L'APPLI";
    if (lang === "es") return "INSTALAR APP OFICIAL";
    if (lang === "de") return "OFFIZIELLE APP INSTALLIEREN";
    return "INSTALL OFFICIAL APP";
  };

  if (!isMounted || isStandalone || isDismissed) return null;

  return (
    <>
      {/* ========================================================================= */}
      {/* AWWWARDS-GRADE LUXURY RED PWA INSTALL PILL (FLOATING BOTTOM-LEFT)        */}
      {/* ========================================================================= */}
      <aside
        aria-label="Install Senna Official Application"
        className="fixed bottom-5 sm:bottom-6 left-5 sm:left-6 z-50 select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex items-center bg-[#0a0a0d]/90 hover:bg-[#121217] backdrop-blur-xl border border-white/15 hover:border-[#E50914] rounded-full shadow-2xl transition-all duration-300 p-1 pr-3.5 cursor-pointer active:scale-95"
          onClick={handleInstallClick}
        >
          {/* Glowing Red Ambient Halo on Hover */}
          <div className="absolute inset-0 rounded-full bg-[#E50914]/0 group-hover:bg-[#E50914]/10 transition-colors pointer-events-none" />

          {/* Red Awwwards Emblem Badge (W.) */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E50914] text-white flex items-center justify-center font-black text-xs sm:text-sm tracking-tight shadow-[0_0_12px_rgba(229,9,20,0.6)] shrink-0">
            W.
          </div>

          {/* Text Content */}
          <div className="flex flex-col ml-2.5 mr-2 text-left">
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#8E8E93] uppercase leading-none">
              AWWWARDS PWA
            </span>
            <span className="text-[11px] sm:text-xs font-condensed tracking-wider font-bold text-white group-hover:text-[#E50914] transition-colors leading-tight mt-0.5">
              {getSubLabel()}
            </span>
          </div>

          {/* Install Arrow with subtle animated ping */}
          <div className="flex items-center gap-1 pl-1">
            <span className="text-white/60 group-hover:text-white transition-colors text-xs font-mono">
              ↓
            </span>
          </div>

          {/* Dismiss ✕ Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="ml-2 w-4 h-4 rounded-full text-white/30 hover:text-white text-[10px] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Dismiss install button"
          >
            ✕
          </button>
        </motion.div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE / IOS INSTALL GUIDE MODAL                                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showIosGuide && (
          <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-[#0e0e12] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white select-none relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowIosGuide(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                  W.
                </div>
                <div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide">
                    SENNA // OFFICIAL PWA
                  </h3>
                  <span className="text-[10px] font-mono text-[#8E8E93] tracking-widest uppercase">
                    FULLSCREEN STANDALONE ENGINE
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 my-6 text-xs text-white/80 font-sans leading-relaxed">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.04]">
                  <span className="w-6 h-6 rounded-full bg-[#E50914] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </span>
                  <p>
                    {lang === "ja"
                      ? "画面下部の「共有」アイコン (四角から矢印 ⎋) をタップします。"
                      : lang === "fr"
                      ? "Appuyez sur l'icône de Partage (flèche vers le haut ⎋) dans Safari ou Chrome."
                      : "Tap the Share icon (square with arrow ⎋) in Safari or Chrome."}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.04]">
                  <span className="w-6 h-6 rounded-full bg-[#E50914] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <p>
                    {lang === "ja"
                      ? "メニューをスクロールして「ホーム画面に追加 ⊞」を選択します。"
                      : lang === "fr"
                      ? "Faites défiler le menu et sélectionnez « Sur l'écran d'accueil ⊞ »."
                      : "Scroll down and select 'Add to Home Screen ⊞'."}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.04]">
                  <span className="w-6 h-6 rounded-full bg-[#E50914] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </span>
                  <p>
                    {lang === "ja"
                      ? "千奈のオフィシャルアプリがフルスクリーン・高音質オフライン対応で起動します。"
                      : lang === "fr"
                      ? "Lancez SENNA depuis votre écran d'accueil en immersion totale sans barre d'adresse."
                      : "Launch SENNA from your home screen in full cinematic standalone immersion."}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIosGuide(false)}
                className="w-full py-3.5 rounded-full bg-[#E50914] hover:bg-[#d01025] text-white font-condensed text-xs tracking-[0.2em] uppercase font-bold transition-colors cursor-pointer"
              >
                {lang === "ja" ? "閉じる" : lang === "fr" ? "COMPRIS" : "GOT IT"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
