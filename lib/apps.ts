export interface App {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  slug: string;
  status?: string;
  technologies?: string[];
}

export const apps: App[] = [
  {
    id: "tanao",
    name: "Tanao - your asset tracker",
    description: "月イチで棚卸しする新しい資産管理アプリ",
    iconUrl: "/app-icons/tanao.png", // ← ここを変更
    slug: "tanao",
    status: "開発中",
    technologies: ["React Native", "TypeScript", "Supabase"],
  },
];

// ホーム画面用のシンプルなデータ
export const getHomeApps = () => {
  return apps.map(({ id, name, description, iconUrl, slug }) => ({
    id,
    name,
    description,
    iconUrl,
    slug,
  }));
};

// アプリ一覧ページ用の詳細データ
export const getAppsPageData = () => {
  return apps.map((app) => ({
    ...app,
    iconUrl: app.iconUrl.replace("w=100&h=100", "w=200&h=200"), // より大きな画像
    description: getDetailedDescription(app.slug),
  }));
};

// 詳細な説明文を取得
const getDetailedDescription = (slug: string): string => {
  const descriptions: Record<string, string> = {
    "taskflow-pro":
      "シンプルで効率的なタスク管理アプリ。直感的なUIでタスクの作成、管理、完了までをスムーズに行えます。",
    quicknote:
      "Markdown対応の高速ノートアプリ。リアルタイムプレビューとクラウド同期で、どこでもメモを取れます。",
    habitbuilder:
      "習慣化をサポートするトラッキングアプリ。視覚的な進捗管理で継続をモチベートします。",
    "minimal-weather":
      "ミニマルなデザインの天気予報ウィジェット。シンプルで美しいUIで天気情報を提供します。",
  };
  return descriptions[slug] || "";
};
