import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default: "燃えドラ - 個人開発者のポートフォリオ",
    template: "%s | 燃えドラ",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  description:
    "個人開発者燃えドラのアプリケーション・ブログ・プロジェクトのポートフォリオサイトです。シンプルで実用的なアプリを開発し、ユーザーファーストな設計を心がけています。",
  keywords: [
    "個人開発",
    "ポートフォリオ",
    "アプリ開発",
    "燃えドラ",
    "タスク管理",
    "ノートアプリ",
    "習慣トラッカー",
  ],
  authors: [{ name: "燃えドラ" }],
  creator: "燃えドラ",
  publisher: "燃えドラ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://moedora.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://moedora.dev",
    title: "燃えドラ - 個人開発者のポートフォリオ",
    description:
      "個人開発者燃えドラのアプリケーション・ブログ・プロジェクトのポートフォリオサイトです。シンプルで実用的なアプリを開発し、ユーザーファーストな設計を心がけています。",
    siteName: "燃えドラ Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "燃えドラ - 個人開発者のポートフォリオ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "燃えドラ - 個人開発者のポートフォリオ",
    description:
      "個人開発者燃えドラのアプリケーション・ブログ・プロジェクトのポートフォリオサイトです。",
    images: ["/og-image.png"], // Twitter専用画像がある場合は "/twitter-image.png" に変更
    creator: "@app_saikou", // 正しいTwitterハンドルに修正
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
