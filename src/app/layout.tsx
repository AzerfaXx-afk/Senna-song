import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AudioProvider } from "@/context/AudioContext";
import SmoothScroll from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://senna-official.com"),
  title: "SENNA | 千奈 OFFICIAL WEBSITE",
  description:
    "Official website of Japanese artist and singer SENNA. Discover latest news, tour dates, album 'ECLIPSE', official music videos, and merchandise.",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/hero-artist.jpg",
    apple: "/images/hero-artist.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SENNA",
  },
  openGraph: {
    title: "SENNA | 千奈 OFFICIAL WEBSITE",
    description: "Official web app for artist SENNA. News, Live Tour, Discography & Merch.",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/images/hero-artist.jpg",
        width: 1200,
        height: 630,
        alt: "SENNA Live Performance",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="bg-[#050505] text-white antialiased selection:bg-[#E50914] selection:text-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SENNA" />
        <link rel="apple-touch-icon" href="/images/hero-artist.jpg" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-white overflow-x-hidden">
        <LanguageProvider>
          <AudioProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
