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
    name: "Tanao - 家計簿いらずの資産トラッカー",
    description: "月イチ棚卸しで資産形成をもっとシンプルに",
    iconUrl: "/app-icons/tanao.png", // ← ここを変更
    slug: "tanao",
    status: "リリース済み",
    technologies: ["React Native", "TypeScript", "Supabase"],
  },
  {
    id: "sugumemo",
    name: "すぐメモ - 音声入力 & リマインダーメモ",
    description: "忘れる前に、10秒で記録。ひらめきを逃さない爆速メモ。",
    iconUrl: "/app-icons/sugumemo.png",
    slug: "sugumemo",
    status: "リリース済み",
    technologies: ["React Native", "TypeScript", "Expo"],
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
