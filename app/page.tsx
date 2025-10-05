import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { TwitterIcon } from "@/components/TwitterIcon";
import { NoteIcon } from "@/components/NoteIcon";
import { getHomeApps } from "@/lib/apps";

const apps = getHomeApps();

const latestPosts: any[] = [];

export default function Home() {
  return (
    <>
      <StructuredData
        type="Person"
        data={{
          name: "燃えドラ",
          description: "個人開発者",
          url: "https://moedora.dev",
          sameAs: ["https://x.com/app_saikou", "https://note.com/app_saikou"],
        }}
      />
      <StructuredData
        type="WebSite"
        data={{
          name: "燃えドラ Portfolio",
          description: "個人開発者燃えドラのポートフォリオサイト",
          url: "https://moedora.dev",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://moedora.dev/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-48 h-48 rounded-full mb-8 mx-auto overflow-hidden shadow-lg">
              <Image
                src="/profile-image.png"
                alt="燃えドラのプロフィール画像"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              燃えドラ
              <span className="block text-lg md:text-xl font-normal text-gray-600 mt-2">
                個人開発者
              </span>
            </h1>
            <div className="flex justify-center items-center space-x-6 mb-8">
              <a
                href="https://x.com/app_saikou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-gray-600"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="https://note.com/app_saikou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-gray-600"
              >
                <NoteIcon size={52} />
              </a>
            </div>
            <blockquote className="text-lg text-gray-600 italic border-l-4 border-yellow-400 pl-6 py-4 bg-yellow-50 rounded-r-lg">
              "個人開発者として、シンプルで実用的なアプリケーションを作っています。
              <br />
              ユーザーファーストな設計で、日常を少し便利にするツールを開発中。
              <br />
              <span className="text-yellow-600 font-semibold">
                開発の過程や学びを共有し、個人開発界隈に貢献していきます。
              </span>
              "
            </blockquote>
          </div>
        </section>

        {/* Apps Section */}
        <section className="py-16">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Apps
              <span className="block text-sm font-normal text-gray-600 mt-1">
                開発したアプリ
              </span>
            </h2>
            <Link
              href="/apps"
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
            >
              <span>すべて見る</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apps.map((app) => (
              <Link key={app.id} href={`/apps/${app.slug}`}>
                <div className="notion-card hover-accent-bg group text-center">
                  {/* App Icon */}
                  <div className="w-36 h-36 rounded-lg overflow-hidden shadow-lg mb-4 mx-auto">
                    <Image
                      src={app.iconUrl}
                      alt={`${app.name} icon`}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>

                  {/* App Title */}
                  <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
                    {app.name}
                  </h3>

                  {/* App Subtitle */}
                  <p className="text-xs text-gray-500">{app.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Blog Section */}
        <section className="py-16">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Blog
              <span className="block text-sm font-normal text-gray-600 mt-1">
                最新の記事
              </span>
            </h2>
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
            >
              <span>すべて見る</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-6">
            {latestPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  まだ記事がありません
                </h3>
                <p className="text-gray-600">
                  個人開発の経験談や技術的な学びについて、今後記事を公開予定です。
                </p>
              </div>
            ) : (
              latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="notion-card hover-accent-bg group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                          {post.title}
                        </h3>
                        <time className="text-sm text-gray-500">
                          {post.date}
                        </time>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-gray-400 group-hover:text-yellow-600 transition-colors mt-1"
                      />
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
