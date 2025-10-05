import {
  CircleCheck as CheckCircle2,
  Circle,
  Clock,
  Lightbulb,
} from "lucide-react";

const roadmapItems = {
  now: [
    {
      id: 1,
      title: "Tanao v1.0 リリース準備",
      description:
        "資産棚卸しアプリのベータテストを経て、App Storeでの正式リリースを準備中。",
      priority: "high",
      category: "アプリ開発",
    },
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
      title: "ポートフォリオサイト 作成",
      description: "このサイトを作成しました。",
      completedDate: "2025-10-03",
      category: "サイト開発",
    },
    {
      id: 20,
      title: "アプリアイデア整理",
      description:
        "17個の新しいアプリアイデアを整理し、開発ロードマップを作成しました。",
      completedDate: "2025-10-03",
      category: "企画・設計",
    },
  ],
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

const priorityLabels = {
  high: "高",
  medium: "中",
  low: "低",
};

export default function Roadmap() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Roadmap
          <span className="block text-lg font-normal text-gray-600 mt-2">
            開発ロードマップ
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          現在の開発状況と今後の予定をご紹介します。17個の新しいアプリアイデアを含む包括的なロードマップを公開しています。進捗状況は随時更新されます。
        </p>
      </div>

      {/* Now Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Clock className="text-yellow-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">現在開発中</h2>
        </div>

        <div className="space-y-4">
          {roadmapItems.now.map((item) => (
            <div
              key={item.id}
              className="notion-card border-l-4 border-l-yellow-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      priorityColors[
                        item.priority as keyof typeof priorityColors
                      ]
                    }`}
                  >
                    優先度:{" "}
                    {
                      priorityLabels[
                        item.priority as keyof typeof priorityLabels
                      ]
                    }
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Circle className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">次に予定</h2>
        </div>

        <div className="space-y-4">
          {roadmapItems.next.map((item) => (
            <div
              key={item.id}
              className="notion-card border-l-4 border-l-blue-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      priorityColors[
                        item.priority as keyof typeof priorityColors
                      ]
                    }`}
                  >
                    優先度:{" "}
                    {
                      priorityLabels[
                        item.priority as keyof typeof priorityLabels
                      ]
                    }
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Lightbulb className="text-purple-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">将来のアイデア</h2>
        </div>

        <div className="space-y-4">
          {roadmapItems.future.map((item) => (
            <div
              key={item.id}
              className="notion-card border-l-4 border-l-purple-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {item.category}
                </span>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Done Section */}
      <section className="mb-12">
        <div className="flex items-center space-x-3 mb-8">
          <CheckCircle2 className="text-green-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">完了済み</h2>
        </div>

        <div className="space-y-4">
          {roadmapItems.done.map((item) => (
            <div
              key={item.id}
              className="notion-card border-l-4 border-l-green-500 opacity-75"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {item.completedDate}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Voting Feature Placeholder */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          機能リクエスト・投票機能
        </h3>
        <p className="text-gray-600 mb-4">
          今後、フィードバックや機能リクエストの投票機能を追加予定です。
        </p>
        <p className="text-sm text-gray-500">
          現在は X の DM でご要望をお聞かせください。
        </p>
      </div>
    </div>
  );
}
