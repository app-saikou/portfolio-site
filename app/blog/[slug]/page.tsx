import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";
import { TwitterIcon } from "@/components/TwitterIcon";
import { NoteIcon } from "@/components/NoteIcon";

// Generate static params for static export
export async function generateStaticParams() {
  return [
    { slug: "nextjs-app-router" },
    { slug: "typescript-type-safety" },
    { slug: "tanao-dev-start" },
  ];
}

// Mock data - in real app this would come from database or CMS
const getBlogPost = (slug: string) => {
  const posts: Record<string, any> = {
    "nextjs-app-router": {
      title: "Next.js 14 App Router完全ガイド",
      slug: "nextjs-app-router",
      publishDate: "2024-03-15",
      updatedDate: "2024-03-16",
      readTime: "8分",
      content: `
Next.js 14のリリースとともに、App Routerが安定版となり、多くの開発者が新しい開発体験を楽しんでいることと思います。

## App Routerの魅力

App Routerは従来のPages Routerと比べて、以下の点で大きな改善がありました：

### 1. ファイルベースのルーティング
- **layout.tsx** でレイアウトの共有が簡単に
- **loading.tsx** でローディング状態の管理
- **error.tsx** でエラーハンドリング

### 2. Server Componentsの活用
Server Componentsにより、サーバーサイドでの処理が標準となり、パフォーマンスの向上が期待できます。

\`\`\`tsx
// app/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
\`\`\`

## 実際の開発での注意点

実際にTaskFlow Proを開発する際に遭遇した課題と解決策について説明します。

### Client Componentsの適切な使用
\`use client\` ディレクティブの使用タイミングが重要です。状態管理やイベントハンドリングが必要な場合のみClient Componentを使用しましょう。

### データフェッチングの最適化
App Routerでは、各レベルでデータを取得できるため、必要な場所で必要なデータのみを取得することが重要です。

## まとめ

Next.js 14のApp Routerは、開発者体験の向上とパフォーマンスの最適化を両立させた素晴らしいアップデートです。まだ移行していない方は、ぜひ試してみてください。
      `,
      tags: ["Next.js", "React", "Web Development"],
      relatedPosts: [
        {
          id: 2,
          title: "TypeScript型安全性の重要性",
          slug: "typescript-type-safety",
        },
        {
          id: 4,
          title: "Supabaseで始めるモダンなバックエンド開発",
          slug: "supabase-backend-development",
        },
      ],
    },
    "typescript-type-safety": {
      title: "TypeScript型安全性の重要性",
      publishDate: "2024-03-10",
      updatedDate: null,
      readTime: "6分",
      content: `
個人開発においても、TypeScriptの型安全性は非常に重要な要素です。今回は、実際の開発現場での体験をもとに、その重要性について解説します。

## なぜ型安全性が重要なのか

### 1. バグの早期発見
型システムにより、コンパイル時にエラーを検出できるため、実行時エラーを大幅に減らすことができます。

### 2. リファクタリングの安全性
大きなコードベースでも、型システムがあることで安心してリファクタリングを行えます。

### 3. 開発者体験の向上
IDEのオートコンプリートやインテリセンスが充実し、開発効率が向上します。

## 実践的な活用例

QuickNoteアプリの開発では、以下のような型定義を活用しています：

\`\`\`typescript
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NoteRepository {
  create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  update(id: string, updates: Partial<Note>): Promise<Note>;
  delete(id: string): Promise<void>;
}
\`\`\`

## 小さなアプリでも型安全性を

「小さなアプリだから型は不要」という考えは危険です。小さなアプリほど、迅速な開発が求められるため、型による安全性がより重要になります。

## まとめ

TypeScriptの型安全性は、個人開発においても大きなメリットをもたらします。初期コストはありますが、長期的な開発効率を考えると必須の技術と言えるでしょう。
      `,
      tags: ["TypeScript", "JavaScript", "Type Safety"],
      relatedPosts: [
        {
          id: 1,
          title: "Next.js 14でのアプリ開発で学んだこと",
          slug: "nextjs14-learnings",
        },
      ],
    },
    "tanao-dev-start": {
      title: "Tanao開発開始：なぜ資産管理アプリを作るのか",
      slug: "tanao-dev-start",
      publishDate: "2024-03-15",
      updatedDate: null,
      readTime: "5分",
      content: `
資産管理アプリ「Tanao」の開発を開始しました。この記事では、なぜこのアプリを作ることにしたのか、その背景と想いを共有したいと思います。

## 従来の家計簿アプリの問題点

従来の家計簿アプリは、毎日の支出を細かく記録することを前提としています。しかし、実際の生活では：

- 忙しくて記録を忘れてしまう
- 小額の支出まで記録するのが面倒
- 月末の集計作業が大変
- 資産全体の把握が困難

## Tanaoのアプローチ

Tanaoは「棚卸し」という新しいアプローチを採用しています：

### 月1回の棚卸し
- 毎日の細かい記録は不要
- 月末に現在の資産額を確認・更新
- シンプルで続けやすい仕組み

### 複利計算による将来予測
- 現在の資産額から将来の価値を予測
- 投資の効果を可視化
- 長期的な資産形成をサポート

## 技術スタック

- **フロントエンド**: React Native + TypeScript
- **バックエンド**: Supabase
- **認証**: Supabase Auth
- **デプロイ**: Expo

## 今後の展望

まずは基本的な棚卸し機能と複利計算機能を実装し、段階的に機能を拡張していく予定です。

## まとめ

Tanaoは、忙しい現代人でも続けられるシンプルな資産管理を目指しています。開発の進捗は随時ブログでお知らせしていきますので、ぜひご注目ください。
      `,
      tags: ["Tanao", "資産管理", "React Native", "開発"],
      relatedPosts: [
        {
          id: 2,
          title: "TypeScript型安全性の重要性",
          slug: "typescript-type-safety",
        },
      ],
    },
  };

  return posts[slug] || null;
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 mb-6">
            お探しの記事は存在しないか、まだ公開されていません。
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
          >
            <span>ブログ一覧に戻る</span>
            <ArrowRight size={16} />
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
          href="/blog"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>ブログ一覧に戻る</span>
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>公開: {post.publishDate}</span>
              </div>
              {post.updatedDate && (
                <div className="flex items-center space-x-2">
                  <span>更新: {post.updatedDate}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              className="leading-relaxed [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>p]:text-gray-700 [&>ul]:mb-4 [&>ol]:mb-4 [&>li]:mb-2 [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/\n## /g, "\n<h2>")
                  .replace(/\n### /g, "\n<h3>")
                  .replace(/\n/g, "<br/>")
                  .replace(/<h2>/g, "</p><h2>")
                  .replace(/<h3>/g, "</p><h3>")
                  .replace(/<br\/><br\/>/g, "</p><p>")
                  .replace(/^/, "<p>")
                  .replace(/$/, "</p>")
                  .replace(
                    /```tsx\n([\s\S]*?)\n```/g,
                    '<pre><code class="language-tsx">$1</code></pre>'
                  )
                  .replace(
                    /```typescript\n([\s\S]*?)\n```/g,
                    '<pre><code class="language-typescript">$1</code></pre>'
                  )
                  .replace(/`([^`]+)`/g, "<code>$1</code>"),
              }}
            />
          </div>

          {/* Share Buttons */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              この記事をシェア
            </h3>
            <ShareButtons title={post.title} url="" />
          </div>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                関連記事
              </h3>
              <div className="space-y-4">
                {post.relatedPosts.map((relatedPost: any) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="notion-card hover-accent-bg group">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-gray-900 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <ArrowLeft
                          size={16}
                          className="text-gray-400 group-hover:text-gray-900 transition-colors transform rotate-180"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      {/* Author Profile */}
      <div className="border-t border-gray-200 pt-8 mt-12">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-2xl">
            👨‍💻
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Moedora</h4>
            <p className="text-gray-600 text-sm">
              個人開発者・アプリクリエイター
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://x.com/app_saikou"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="https://note.com/app_saikou"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <NoteIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
