import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "@/components/TwitterIcon";

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/apps"
          className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>アプリ一覧に戻る</span>
        </Link>

        <div className="flex items-start gap-6 mb-6">
          <div className="text-6xl">{app.icon}</div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {app.name}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{app.tagline}</p>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === "リリース済み"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {app.status}
              </span>
              <span className="text-sm text-gray-500">{app.version}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          スクリーンショット
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-start overflow-x-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-start min-w-fit lg:min-w-0">
            {app.screenshots.map((screenshot: string, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 mx-auto lg:mx-0 w-[180px] h-[390px] md:w-[220px] md:h-[476px] lg:w-[250px] lg:h-[541px]"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-white relative">
                  <Image
                    src={screenshot}
                    alt={`${app.name} Screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 250px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Development Status */}
      <div className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              開発状況
            </h2>
            <p className="text-gray-600">
              {app.status === "リリース済み"
                ? "今すぐ無料でダウンロードできます"
                : "現在開発中です。完成次第、公開予定です"}
            </p>
            {app.status === "開発中" && (
              <div className="mt-3 text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-md">
                📱 開発進捗や最新情報は各SNSでご確認ください
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            {app.status === "リリース済み" ? (
              <>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Download size={16} className="mr-2" />
                  ダウンロード
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-yellow-50"
                  asChild
                >
                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} className="mr-2" />
                    GitHub
                  </a>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  disabled
                  className="opacity-50 cursor-not-allowed"
                >
                  <Download size={16} className="mr-2" />
                  開発中
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-yellow-50"
                  asChild
                >
                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} className="mr-2" />
                    GitHub
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">概要</h2>
        <p className="text-gray-700 leading-relaxed">{app.description}</p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Features
          <span className="block text-sm font-normal text-gray-600 mt-1">
            主な機能
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {app.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Technologies
          <span className="block text-sm font-normal text-gray-600 mt-1">
            使用技術
          </span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {app.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Usage Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          How to Use
          <span className="block text-sm font-normal text-gray-600 mt-1">
            使用方法
          </span>
        </h2>
        <div className="prose max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>上記のダウンロードボタンからアプリをダウンロード</li>
            <li>インストール後、アプリを起動</li>
            <li>初回セットアップでアカウントを作成（オプション）</li>
            <li>すぐに使い始めることができます</li>
          </ol>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          ❓ よくある質問（FAQ）
        </h2>
        <div className="space-y-4">
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q1. アプリの料金はいくらですか？
            </h3>
            <p className="text-gray-700">
              A.
              現在は基本機能を無料でご利用いただけます。アプリ内に広告が表示される場合があります。将来的にプレミアム機能を追加する際は、事前にご案内いたします。
            </p>
          </div>
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q2. 計算結果は正確ですか？
            </h3>
            <p className="text-gray-700">
              A.
              アプリは個別に設定した年利率で複利計算を行います。これは参考値であり、実際の投資成果とは異なる場合があります。投資判断はご自身の責任で行ってください。
            </p>
          </div>
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q3. データは安全に保存されますか？
            </h3>
            <p className="text-gray-700">
              A.
              はい。Supabaseを使用したセキュアな認証システムで、ユーザーデータを安全に保護しています。すべての通信は暗号化されています。
            </p>
          </div>
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q4. 棚卸し機能とは何ですか？
            </h3>
            <p className="text-gray-700">
              A.
              現在の資産額を簡単に入力・更新できる機能です。従来の家計簿のように毎日の支出を記録する必要はなく、月に一回程度の棚卸しで資産管理ができます。
            </p>
          </div>
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q5. 複数の資産を管理できますか？
            </h3>
            <p className="text-gray-700">
              A.
              はい。現金、株式など複数の資産タイプを一括で管理できます。それぞれに個別の年利率を設定して将来価値を予測できます。
            </p>
          </div>
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q6. 履歴はどのくらい保存されますか？
            </h3>
            <p className="text-gray-700">
              A.
              計算履歴はアカウントに紐付けて永続的に保存されます。いつでも過去の資産推移を確認できます。
            </p>
          </div>
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q7. 広告を非表示にできますか？
            </h3>
            <p className="text-gray-700">
              A.
              現在は広告を非表示にする機能はありませんが、将来的にプレミアムプランで対応予定です。
            </p>
          </div>
          <div className="notion-card">
            <h3 className="font-semibold text-gray-900 mb-2">
              Q8. データのエクスポートはできますか？
            </h3>
            <p className="text-gray-700">
              A. 現在は対応していませんが、将来的に検討いたします。
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          プライバシーポリシー
        </h2>
        <div className="notion-card space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              最終更新日：2025年10月1日
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              データの収集・使用について
            </h3>
            <p className="text-gray-700 mb-4">
              本アプリ「Tanao」（以下「本アプリ」）は、以下のデータを収集・使用します。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">収集するデータ</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>メールアドレス（アカウント認証用）</li>
              <li>資産額データ（現金・株式など）</li>
              <li>年利率設定</li>
              <li>計算履歴</li>
              <li>アカウント作成日時</li>
              <li>広告関連データ</li>
              <li>広告ID（ユーザーの許可を得た場合のみ）</li>
              <li>アプリ使用状況データ（広告配信の最適化用）</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              データの使用目的
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>アプリ機能の提供</li>
              <li>資産計算結果の表示と保存</li>
              <li>アカウント管理</li>
              <li>広告の配信と最適化</li>
              <li>アプリの改善とバグ修正</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">データの保存</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Supabaseを使用した安全なデータベースに保存</li>
              <li>すべての通信はHTTPSで暗号化</li>
              <li>Row Level Security（RLS）によるアクセス制御</li>
              <li>ユーザーごとにデータを分離して管理</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">データの削除</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>アカウント削除時にすべての個人データを自動削除</li>
              <li>アプリ内の設定からいつでもアカウントを削除可能</li>
              <li>ユーザーの要求に応じてデータを削除</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">第三者サービス</h4>
            <p className="text-gray-700 mb-2">
              本アプリは以下の第三者サービスを使用しています：
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Supabase: 認証・データベースサービス</li>
              <li>Google AdMob: 広告配信</li>
              <li>App Tracking Transparency（iOS）</li>
            </ul>
            <p className="text-gray-700 mt-2">
              iOSでは、App Tracking
              Transparencyにより、ユーザーの許可を得た場合のみトラッキングを行います。トラッキングを拒否しても、アプリの基本機能は問題なくご利用いただけます。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">データの共有</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                個人を特定できる情報を第三者に販売・共有することはありません
              </li>
              <li>
                法的要請がある場合を除き、ユーザーの同意なしにデータを共有することはありません
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              プライバシーポリシーの変更
            </h4>
            <p className="text-gray-700">
              本プライバシーポリシーは予告なく変更される場合があります。重要な変更がある場合は、アプリ内で通知いたします。
            </p>
          </div>
        </div>
      </div>

      {/* Related Blog Posts */}
      {app.blogPosts && app.blogPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            関連記事
          </h2>
          <div className="space-y-4">
            {app.blogPosts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="notion-card hover-accent-bg group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                        {post.title}
                      </h3>
                      <time className="text-sm text-gray-500">{post.date}</time>
                    </div>
                    <ArrowLeft
                      size={16}
                      className="text-gray-400 group-hover:text-yellow-600 transition-colors mt-1 transform rotate-180"
                    />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          フィードバックをお聞かせください
        </h2>
        <p className="text-gray-600 mb-4">
          ご意見・ご要望は X の DM でお気軽にお送りください。
        </p>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          asChild
        >
          <a
            href="https://x.com/app_saikou"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon size={16} className="mr-2" />で DM を送る
          </a>
        </Button>
      </div>
    </div>
  );
}
