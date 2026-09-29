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

  const getTooltipLabel = () => {
    if (lang === "ja") return "公式アプリをダウンロード";
    if (lang === "fr") return "INSTALLER L'APPLI";
    if (lang === "es") return "DESCARGAR APP";
    if (lang === "de") return "APP HERUNTERLADEN";
    return "DOWNLOAD APP";
  };

  if (!isMounted || isStandalone || isDismissed) return null;

  return (
    <>
      {/* ========================================================================= */}
      {/* SENNA AWWWARDS CIRCULAR DOWNLOAD BUTTON (FLOATING BOTTOM-LEFT)           */}
      {/* ========================================================================= */}
      <aside
        aria-label="Download Senna Official App"
        className="senna-download-wrapper fixed bottom-6 sm:bottom-8 left-6 sm:left-10 lg:left-14 z-50 select-none"
      >
        <button
          className="Btn"
          onClick={handleInstallClick}
          aria-label={getTooltipLabel()}
        >
          <svg
            className="svgIcon"
            viewBox="0 0 384 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
          <span className="icon2" />
          <span className="tooltip">{getTooltipLabel()}</span>
        </button>

        <style jsx>{`
          .Btn {
            width: 44px;
            height: 44px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 50%;
            background-color: #121216;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
            outline: none;
          }

          @media (min-width: 640px) {
            .Btn {
              width: 48px;
              height: 48px;
            }
          }

          .svgIcon {
            font-size: 16px;
            fill: #E50914;
            margin-bottom: 2px;
            transition: fill 0.3s ease;
          }

          .icon2 {
            width: 18px;
            height: 5px;
            border-bottom: 2px solid #E50914;
            border-left: 2px solid #E50914;
            border-right: 2px solid #E50914;
            border-radius: 0 0 2px 2px;
            transition: border-color 0.3s ease;
          }

          .tooltip {
            position: absolute;
            left: calc(100% + 14px);
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            background-color: #0c0c0e;
            color: #ffffff;
            padding: 6px 12px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: inherit;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            white-space: nowrap;
            transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
            pointer-events: none;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
          }

          .tooltip::before {
            position: absolute;
            content: "";
            width: 8px;
            height: 8px;
            background-color: #0c0c0e;
            border-left: 1px solid rgba(255, 255, 255, 0.15);
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            transform: rotate(45deg);
            left: -5px;
            top: calc(50% - 4px);
          }

          @media (hover: hover) and (pointer: fine) {
            .Btn:hover {
              background-color: #E50914;
              border-color: #E50914;
              box-shadow: 0 0 25px rgba(229, 9, 20, 0.65), 0 4px 15px rgba(0, 0, 0, 0.4);
            }

            .Btn:hover .tooltip {
              opacity: 1;
              transform: translateY(-50%) translateX(2px);
            }

            .Btn:hover .icon2 {
              border-bottom: 2px solid #ffffff;
              border-left: 2px solid #ffffff;
              border-right: 2px solid #ffffff;
            }

            .Btn:hover .svgIcon {
              fill: #ffffff;
              animation: slide-in-top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
            }
          }

          .Btn:active {
            transform: scale(0.92);
          }

          @keyframes slide-in-top {
            0% {
              transform: translateY(-8px);
              opacity: 0;
            }
            100% {
              transform: translateY(0px);
              opacity: 1;
            }
          }
        `}</style>
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
