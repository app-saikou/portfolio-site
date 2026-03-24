export interface AppLegalDoc {
  id: string;
  filename: string;
  label: string;
}

export interface AppLegal {
  languages: { code: string; label: string }[];
  docs: AppLegalDoc[];
}

export interface AppDetail {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  iconUrl: string;
  ogImageUrl?: string;
  status: string;
  version: string;
  screenshots: string[];
  features: string[];
  technologies: string[];
  downloadUrl: string;
  legal?: AppLegal;
}

export const apps: AppDetail[] = [
  {
    id: "tanao",
    slug: "tanao",
    name: "Tanao - 家計簿いらずの資産トラッカー",
    tagline: "月イチ棚卸しで資産形成をもっとシンプルに",
    description:
      "Tanaoは、個人向けの資産管理アプリです。月1回の棚卸しを前提としたシンプルな設計で、資産の管理を効率化します。",
    iconUrl: "/app-icons/tanao.png",
    ogImageUrl: "/og/apps/tanao.png",
    status: "リリース済み",
    version: "v1.1.0",
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
    legal: {
      languages: [{ code: "ja", label: "日本語" }],
      docs: [
        {
          id: "privacy",
          filename: "privacy-policy-subscription.md",
          label: "プライバシーポリシー",
        },
      ],
    },
  },
  {
    id: "sugumemo",
    slug: "sugumemo",
    name: "すぐメモ - 音声入力 & リマインダーメモ",
    tagline: "忘れる前に、10秒で記録。ひらめきを逃さない爆速メモ。",
    description:
      "「あ、何だっけ…？」となる前に。思いついてから10秒で、記録とリマインドを完了。ロック画面から0秒起動、音声入力と1タップ予約で、あなたの「ひらめき」を忘れる前に確実に記録。",
    iconUrl: "/app-icons/sugumemo.png",
    ogImageUrl: "/og/apps/sugumemo.png",
    status: "リリース済み",
    version: "v1.0.0",
    screenshots: [
      "/screenshots/sugumemo/1.png",
      "/screenshots/sugumemo/2.png",
      "/screenshots/sugumemo/3.png",
      "/screenshots/sugumemo/4.png",
      "/screenshots/sugumemo/5.png",
      "/screenshots/sugumemo/6.png",
    ],
    features: [
      "ロック画面から0秒で起動",
      "10秒でリマインド完了",
      "音声入力機能",
      "手書き風デザイン",
      "スヌーズ機能",
      "多言語対応（11言語）",
    ],
    technologies: ["React Native", "TypeScript", "Expo"],
    downloadUrl: "#",
    legal: {
      languages: [
        { code: "ja", label: "日本語" },
        { code: "en", label: "English" },
        { code: "zh-CN", label: "简体中文" },
        { code: "zh-TW", label: "繁體中文" },
        { code: "ko", label: "한국어" },
        { code: "es", label: "Español" },
        { code: "fr", label: "Français" },
        { code: "de", label: "Deutsch" },
        { code: "pt", label: "Português" },
        { code: "it", label: "Italiano" },
        { code: "hi", label: "हिन्दी" },
        { code: "ar", label: "العربية" },
      ],
      docs: [
        {
          id: "privacy",
          filename: "privacy-policy-subscription.md",
          label: "プライバシーポリシー",
        },
        {
          id: "terms",
          filename: "terms-of-service.md",
          label: "利用規約",
        },
        {
          id: "tokusho",
          filename: "specified-commercial-transaction.md",
          label: "特定商取引法に基づく表示",
        },
      ],
    },
  },
  {
    id: "ideahatch",
    slug: "ideahatch",
    name: "IdeaHatch - AIが雑なメモを文書に変える",
    tagline: "雑でいい。断片でいい。思考をMarkdownに育てる。",
    description:
      "思いついたメモをそのまま残すだけで、AIが意図を読み取り構造化。音声入力からMarkdown文書化までを一気に行えるメモアプリです。",
    iconUrl: "/app-icons/ideahatch.png",
    status: "開発中",
    version: "v0.1.0",
    screenshots: [],
    features: [
      "AIによる思考の構造化（雑なメモ → Markdown文書）",
      "Markdownエディタ＋プレビュー",
      "音声入力（リアルタイム文字起こし）",
      ".mdファイル共有 / PDF書き出し",
      "タグ・ブックマーク・全文検索",
      "クラウド同期（自動保存）",
    ],
    technologies: ["React Native", "Expo", "Supabase", "OpenAI API"],
    downloadUrl: "#",
    legal: {
      languages: [
        { code: "ja", label: "日本語" },
        { code: "en", label: "English" },
      ],
      docs: [
        {
          id: "privacy",
          filename: "privacy-policy.md",
          label: "プライバシーポリシー",
        },
        {
          id: "terms",
          filename: "terms-of-service.md",
          label: "利用規約",
        },
      ],
    },
  },
];

export const getAppBySlug = (slug: string): AppDetail | null =>
  apps.find((a) => a.slug === slug) ?? null;

export const getHomeApps = () =>
  apps.map(({ id, name, description, iconUrl, slug }) => ({
    id,
    name,
    description,
    iconUrl,
    slug,
  }));

export const getAppsPageData = () =>
  apps.map((app) => ({
    ...app,
  }));
