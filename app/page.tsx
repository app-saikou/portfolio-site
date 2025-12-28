"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Quote,
  BookOpen,
  Target,
  Heart,
  Check,
} from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { TwitterIcon } from "@/components/TwitterIcon";
import { NoteIcon } from "@/components/NoteIcon";
import { getHomeApps } from "@/lib/apps";
import { roadmapItems } from "@/lib/roadmap";
import { magazineIssues } from "@/lib/magazine";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";

const apps = getHomeApps();

const latestPosts: any[] = [];

export default function Home() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  return (
    <>
      <StructuredData
        type="Person"
        data={{
          name: "Moedora",
          description: "個人開発者",
          url: "https://app-saikou.netlify.app",
          sameAs: ["https://x.com/app_saikou", "https://note.com/app_saikou"],
        }}
      />
      <StructuredData
        type="WebSite"
        data={{
          name: "Moedora Portfolio",
          description: "個人開発者Moedoraのポートフォリオサイト",
          url: "https://app-saikou.netlify.app",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://app-saikou.netlify.app/search?q={search_term_string}",
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
                alt="Moedoraのプロフィール画像"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.home.title}
              <span className="block text-lg md:text-xl font-normal text-gray-600 mt-2">
                {t.home.subtitle}
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
            <div className="relative">
              <blockquote className="text-lg text-gray-600 italic py-8 px-12 relative">
                <div className="absolute top-4 left-4 opacity-40">
                  <Quote
                    size={48}
                    fill="#111827"
                    stroke="#374151"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="absolute bottom-4 right-4 opacity-40 transform rotate-180">
                  <Quote
                    size={48}
                    fill="#111827"
                    stroke="#374151"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="relative z-10">
                  {t.home.quote.line1}
                  <br />
                  {t.home.quote.line2}
                  <br />
                  <span className="text-gray-900 font-semibold">
                    {t.home.quote.line3}
                  </span>
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Apps Section */}
        <section className="py-16">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.home.apps.title}
              <span className="block text-sm font-normal text-gray-600 mt-1">
                {t.home.apps.subtitle}
              </span>
            </h2>
            <Link
              href="/apps"
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              <span>{t.home.apps.viewAll}</span>
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
                  <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:text-gray-900 transition-colors">
                    {app.name}
                  </h3>

                  {/* App Subtitle */}
                  <p className="text-xs text-gray-500">{app.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Magazine Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.home.magazine.title}
              <span className="block text-sm font-normal text-gray-600 mt-1">
                {t.home.magazine.subtitle}
              </span>
            </h2>
            <Link
              href="/magazine"
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              <span>{t.home.magazine.viewAll}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {magazineIssues
            .filter((issue) => issue.isPrototype)
            .map((issue) => (
              <Link key={issue.id} href={`/magazine?issue=${issue.id}`}>
                <div className="notion-card hover-accent-bg group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 表紙サムネイル */}
                    <div className="flex-shrink-0">
                      <div className="relative w-full md:w-48 aspect-[1414/2000] bg-gray-100 rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={`${issue.imagePath}page-1.png`}
                          alt={`${issue.displayName} 表紙`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* 説明 */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full mb-3 self-start">
                        {issue.displayName}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-900 transition-colors">
                        Solo Dev Magazine
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {t.home.magazine.description}
                      </p>
                      <div className="text-sm text-gray-500 mb-4">
                        全 {issue.pageCount} ページ
                      </div>
                      <div className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium">
                        <span>読む</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </section>

        {/* Roadmap Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.home.roadmap.title}
              <span className="block text-sm font-normal text-gray-600 mt-1">
                {t.home.roadmap.subtitle}
              </span>
            </h2>
            <Link
              href="/roadmap"
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              <span>{t.home.roadmap.viewAll}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-6">
            {/* 現在開発中 */}
            {roadmapItems.now.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    現在開発中
                  </h3>
                </div>
                <div className="space-y-3">
                  {roadmapItems.now.map((item) => (
                    <div
                      key={item.id}
                      className="notion-card hover-accent-bg group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-900 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 次に予定 */}
            {roadmapItems.next.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    次に予定
                  </h3>
                </div>
                <div className="space-y-3">
                  {roadmapItems.next.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="notion-card hover-accent-bg group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-900 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* もっと見る */}
            <div className="text-center pt-4">
              <Link
                href="/roadmap"
                className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
              >
                <span>すべてのロードマップを見る</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Blog Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.home.blog.title}
              <span className="block text-sm font-normal text-gray-600 mt-1">
                {t.home.blog.subtitle}
              </span>
            </h2>
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              <span>{t.home.blog.viewAll}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-6">
            {latestPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">{t.home.blog.empty.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t.home.blog.empty.title}
                </h3>
                <p className="text-gray-600">{t.home.blog.empty.description}</p>
              </div>
            ) : (
              latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="notion-card hover-accent-bg group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-900 transition-colors">
                          {post.title}
                        </h3>
                        <time className="text-sm text-gray-500">
                          {post.date}
                        </time>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-gray-400 group-hover:text-gray-900 transition-colors mt-1"
                      />
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Sponsor Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.home.sponsor.title}
              <span className="block text-sm font-normal text-gray-600 mt-1">
                {t.home.sponsor.subtitle}
              </span>
            </h2>
            <Link
              href="/sponsor"
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              <span>{t.home.sponsor.viewAll}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-6">
            {/* 説明 */}
            <div className="notion-card">
              <p className="text-gray-700 mb-4">{t.home.sponsor.description}</p>
              <p className="text-sm text-gray-600">
                ご支援いただいた方々には心より感謝申し上げます 🙏
              </p>
            </div>

            {/* スポンサープラン */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 個人スポンサー */}
              <div className="notion-card hover-accent-bg group">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">👤</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {t.sponsor.plans.individual.type}
                  </h3>
                  <div className="text-xl font-bold text-gray-900">
                    {t.sponsor.plans.individual.amount}
                  </div>
                </div>
                <div className="space-y-2">
                  {t.sponsor.plans.individual.benefits
                    .slice(0, 3)
                    .map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check
                          size={16}
                          className="text-gray-900 mt-0.5 flex-shrink-0"
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* 企業スポンサー */}
              <div className="notion-card hover-accent-bg group">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🏢</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {t.sponsor.plans.corporate.type}
                  </h3>
                  <div className="text-xl font-bold text-gray-900">
                    {t.sponsor.plans.corporate.amount}
                  </div>
                </div>
                <div className="space-y-2">
                  {t.sponsor.plans.corporate.benefits
                    .slice(0, 3)
                    .map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check
                          size={16}
                          className="text-gray-900 mt-0.5 flex-shrink-0"
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* サポート方法 */}
            <div className="notion-card text-center">
              <p className="text-gray-700 mb-4">
                スポンサーシップにご興味をお持ちの方は、お気軽にご連絡ください
              </p>
              <a
                href="https://x.com/app_saikou"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
              >
                <TwitterIcon size={16} />
                <span>で DM を送る</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
