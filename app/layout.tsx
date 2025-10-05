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
    images: ["/og-image.png"],
    creator: "@moedora",
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
