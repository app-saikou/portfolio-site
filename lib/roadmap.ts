export interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  priority?: "high" | "medium" | "low";
  category: string;
  completedDate?: string;
}

export interface RoadmapData {
  now: RoadmapItem[];
  next: RoadmapItem[];
  future: RoadmapItem[];
  done: RoadmapItem[];
}

export const roadmapItems: RoadmapData = {
  now: [
    {
      id: 2,
      title: "ThinkMagic プロトタイプ開発",
      description:
        "AIが「気づき」を抽象化・転用・行動化する新しいToDoアプリの開発開始。",
      priority: "high",
      category: "新規アプリ",
    },
  ],
  next: [
    {
      id: 3,
      title: "読書引用SNS 開発開始",
      description:
        "本の印象的な部分を引用してシェアできるSNSアプリの開発を計画。",
      priority: "medium",
      category: "新規アプリ",
    },
    {
      id: 4,
      title: "あさイチ ToDo 開発",
      description:
        "毎朝1回だけ登録するシンプルなタスク管理アプリ。習慣化に特化した設計。",
      priority: "medium",
      category: "新規アプリ",
    },
    {
      id: 5,
      title: "お散歩ビンゴ 開発",
      description: "散歩中に出会うものでビンゴを楽しめる散歩習慣化アプリ。",
      priority: "medium",
      category: "新規アプリ",
    },
    {
      id: 6,
      title: "LIFE RESULT 開発",
      description:
        "日々の行動や感情をゲームUI風に記録・演出するライフログアプリ。",
      priority: "low",
      category: "新規アプリ",
    },
  ],
  future: [
    {
      id: 7,
      title: "乗り合わせアプリ",
      description:
        "友達と別々の目的でも同じ場所まで一緒に行く約束ができるアプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 8,
      title: "ランダムアラーム",
      description:
        "停止ボタン位置がランダムで変わる確実に起きる目覚ましアプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 9,
      title: "友達リスト",
      description: "家族や友達との会ったログを記録できる人間関係管理アプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 10,
      title: "人生年表",
      description: "自分の人生を振り返れるタイムラインアプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 11,
      title: "カタンスコア記録アプリ",
      description: "カタンのスコア記録とサイコロ機能付きゲーム支援アプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 12,
      title: "ゲームアプリ（HP100）",
      description: "ゲーム風UIの不気味なミッション系習慣化アプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 13,
      title: "ピタミツ",
      description:
        "予算から自分に合ったモノ・経験を探せるライフスタイルアプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 14,
      title: "本スワイプアプリ",
      description: "ランダムな本にスワイプで出会える読書発見アプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 15,
      title: "読書しおり×タイマー",
      description: "どの本を何ページまで読んだか記録する読書管理アプリ。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 16,
      title: "ビジョンボード",
      description:
        "年間目標を忘れずに意識できる目標管理アプリ（ウィジェット対応）。",
      priority: "low",
      category: "新規アプリ",
    },
    {
      id: 17,
      title: "シンプルなメモとアラート",
      description: "シンプルなメモとアラート機能のみのミニマルアプリ。",
      priority: "low",
      category: "新規アプリ",
    },
  ],
  done: [
    {
      id: 18,
      title: "Tanao プロトタイプ開発完了",
      description:
        "資産棚卸しアプリの基本機能を実装し、プロトタイプを完成させました。",
      completedDate: "2025-10-01",
      category: "アプリ開発",
    },
    {
      id: 19,
      title: "Tanao v1.0 リリース",
      description: "資産棚卸しアプリ「Tanao」をApp Storeに正式リリース。",
      completedDate: "2025-11-15",
      category: "アプリ開発",
    },
  ],
};

export const lastUpdated = "2025年12月28日";

