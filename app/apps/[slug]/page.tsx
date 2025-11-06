import Link from "next/link";
import { AppDetailClient } from "./AppDetailClient";

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
      name: "Tanao - あなたの資産管理トラッカー",
      tagline: "月イチで棚卸しする新しい資産管理アプリ",
      icon: "📦",
      status: "開発中",
      version: "v1.0",
      slug: "tanao",
      description:
        "Tanaoは、個人や小規模チーム向けの資産管理アプリです。月1回の棚卸しを前提としたシンプルな設計で、資産の管理を効率化します。",
      screenshots: [
        "/screenshots/tanao/1.png",
        "/screenshots/tanao/2.png",
        "/screenshots/tanao/3.png",
      ],
      features: ["資産棚卸し機能", "複数資産の見える化", "10年後の資産予測"],
      technologies: ["React Native", "TypeScript", "Supabase", "Expo"],
      downloadUrl: "#",
      githubUrl: "https://github.com/app-saikou/asset-management-app",
    },
    "taskflow-pro": {
      name: "TaskFlow Pro",
      tagline: "生産性を向上させるシンプルなタスク管理アプリ",
      icon: "📋",
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
      githubUrl: "#",
    },
    quicknote: {
      name: "QuickNote",
      tagline: "Markdown対応の高速ノートアプリ",
      icon: "📝",
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
      githubUrl: "#",
    },
  };

  return apps[slug] || null;
};

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
            className="text-yellow-600 hover:text-yellow-700 mt-4 inline-block"
          >
            アプリ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <AppDetailClient app={app} />;
}
