import Link from "next/link";
import { Metadata } from "next";
import { AppDetailClient } from "./AppDetailClient";

const siteUrl = "https://app-saikou.netlify.app";

// Generate static params for static export
export async function generateStaticParams() {
  return [
    { slug: "tanao" },
    { slug: "quicknote" },
    { slug: "habitbuilder" },
    { slug: "minimal-weather" },
  ];
}

// Mock data - in real app this would come from database or CMS
const getAppData = (slug: string) => {
  const apps: Record<string, any> = {
    tanao: {
      name: "Tanao - 家計簿いらずの資産トラッカー",
      tagline: "月イチ棚卸しで資産形成をもっとシンプルに",
      iconUrl: "/app-icons/tanao.png",
      ogImageUrl: "/og/apps/tanao.png",
      status: "リリース済み",
      version: "v1.1.0",
      slug: "tanao",
      description:
        "Tanaoは、個人向けの資産管理アプリです。月1回の棚卸しを前提としたシンプルな設計で、資産の管理を効率化します。",
      screenshots: [
        "/screenshots/tanao/1.png",
        "/screenshots/tanao/2.png",
        "/screenshots/tanao/3.png",
        "/screenshots/tanao/4.png",
        "/screenshots/tanao/5.png",
      ],
      features: ["資産棚卸し機能", "複数資産の見える化", "100歳までの資産予測"],
      technologies: ["React Native", "TypeScript", "Supabase", "Expo"],
      downloadUrl:
        "https://apps.apple.com/jp/app/tanao-%E5%AE%B6%E8%A8%88%E7%B0%BF%E3%81%84%E3%82%89%E3%81%9A%E3%81%AE%E8%B3%87%E7%94%A3%E3%83%88%E3%83%A9%E3%83%83%E3%82%AB%E3%83%BC/id6753191685",
    },
    "taskflow-pro": {
      name: "TaskFlow Pro",
      tagline: "生産性を向上させるシンプルなタスク管理アプリ",
      status: "リリース済み",
      version: "v1.2.0",
      description:
        "TaskFlow Proは、個人やチームでのタスク管理を効率化するためのアプリケーションです。直感的なUIとパワフルな機能で、あなたの仕事をより整理されたものにします。",
      screenshots: [
        "/screenshots/taskflow-pro/1.png",
        "/screenshots/taskflow-pro/2.png",
        "/screenshots/taskflow-pro/3.png",
      ],
      features: [
        "ドラッグ&ドロップでタスクの優先順位変更",
        "プロジェクトごとのタスク分類",
        "期限とリマインダー設定",
        "チームメンバーとの共有機能",
        "進捗の可視化とレポート",
        "モバイル・デスクトップ対応",
      ],
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
      downloadUrl: "#",
    },
    quicknote: {
      name: "QuickNote",
      tagline: "Markdown対応の高速ノートアプリ",
      status: "開発中",
      version: "v0.8.0 (Beta)",
      description:
        "QuickNoteは、Markdown記法に対応した軽量で高速なノートアプリです。リアルタイムプレビューとクラウド同期により、どこでも快適にメモを取ることができます。",
      screenshots: [
        "/screenshots/quicknote/1.png",
        "/screenshots/quicknote/2.png",
        "/screenshots/quicknote/3.png",
      ],
      features: [
        "リアルタイムMarkdownプレビュー",
        "クラウド同期でデバイス間連携",
        "タグ機能による整理",
        "全文検索機能",
        "エクスポート機能（PDF, HTML）",
        "ダークモード対応",
      ],
      technologies: ["React", "Electron", "Node.js", "SQLite"],
      downloadUrl: "#",
    },
  };

  return apps[slug] || null;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const app = getAppData(params.slug);

  if (!app) {
    return {
      title: "アプリが見つかりません",
    };
  }

  // OG画像: 専用OGP画像があればそれを使用、なければアイコンを使用
  const ogImage = app.ogImageUrl || app.iconUrl || "/og-image.png";
  const ogImageUrl = `${siteUrl}${ogImage}`;

  return {
    title: app.name,
    description: app.description || app.tagline,
    openGraph: {
      title: app.name,
      description: app.description || app.tagline,
      type: "website",
      url: `${siteUrl}/apps/${params.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: app.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: app.name,
      description: app.description || app.tagline,
      images: [ogImageUrl],
      creator: "@app_saikou",
    },
  };
}

export default function AppDetail({ params }: { params: { slug: string } }) {
  const app = getAppData(params.slug);

  if (!app) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            アプリが見つかりません
          </h1>
          <Link
            href="/apps"
            className="text-gray-900 hover:text-gray-700 mt-4 inline-block"
          >
            アプリ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <AppDetailClient app={app} />;
}
