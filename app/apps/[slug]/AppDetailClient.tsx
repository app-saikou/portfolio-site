"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "@/components/TwitterIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

type AppData = {
  name: string;
  tagline: string;
  iconUrl?: string;
  status?: string;
  version: string;
  description: string;
  screenshots: string[];
  features: string[];
  technologies: string[];
  downloadUrl: string;
  blogPosts?: any[];
  slug: string;
};

interface AppDetailClientProps {
  app: AppData;
}

export function AppDetailClient({ app }: AppDetailClientProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const downloadButtonRef = useRef<HTMLDivElement>(null);
  const [showHeaderButton, setShowHeaderButton] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ダウンロードボタンの可視性を監視
  useEffect(() => {
    if (!downloadButtonRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // ボタンが画面外になったらヘッダーに表示
        setShowHeaderButton(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-64px 0px 0px 0px", // 通常のHeaderの高さ（64px = h-16）分のオフセット
      }
    );

    observerRef.current.observe(downloadButtonRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // アプリ固有の翻訳データを取得
  const appTranslations = t.apps.detail.appData?.[app.slug as "tanao"];
  const description = appTranslations?.description || app.description;
  const features = appTranslations?.features || app.features;
  const faq = appTranslations?.faq;
  const privacyPolicy = appTranslations?.privacyPolicy;

  // ステータスの翻訳マッピング
  const getStatusTranslation = (status: string | undefined) => {
    if (!status) return "";
    const statusMap: Record<string, string> = {
      リリース済み: t.apps.status.released,
      開発中: t.apps.status.developing,
      アイデア段階: t.apps.status.idea,
    };
    return statusMap[status] || status;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Sticky Header with App Info (shown when download button is out of view) */}
      <div
        className={`fixed top-16 left-0 right-0 z-[45] bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ${
          showHeaderButton
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{ pointerEvents: showHeaderButton ? "auto" : "none" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/apps"
                className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              {app.iconUrl && (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden shadow-md bg-white">
                  <Image
                    src={app.iconUrl}
                    alt={`${app.name} icon`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                  {app.name}
                </h2>
              </div>
            </div>
            {app.status === "リリース済み" ? (
              <Button
                asChild
                className="bg-gray-900 hover:bg-gray-800 text-white flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300"
                size="sm"
              >
                <a
                  href={app.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} className="sm:mr-1" />
                  <span className="hidden sm:inline">
                    {t.apps.detail.download}
                  </span>
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled
                className="opacity-50 cursor-not-allowed flex-shrink-0"
                size="sm"
              >
                <Download size={16} className="sm:mr-1" />
                <span className="hidden sm:inline">
                  {t.apps.detail.inDevelopmentStatus}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <Link
          href="/apps"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>{t.apps.detail.backToList}</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* App Icon */}
          {app.iconUrl ? (
            <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden shadow-lg bg-white">
              <Image
                src={app.iconUrl}
                alt={`${app.name} icon`}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-500 font-medium text-center px-2">
                準備中
              </span>
            </div>
          )}

          {/* App Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {app.name}
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-4">
              {app.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === "リリース済み"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {getStatusTranslation(app.status)}
              </span>
              <span className="text-sm text-gray-500">{app.version}</span>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div
          ref={downloadButtonRef}
          className="flex justify-center md:justify-start"
        >
          {app.status === "リリース済み" ? (
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white w-full md:w-auto md:min-w-[200px] py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a
                href={app.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} className="mr-2" />
                {t.apps.detail.download}
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              disabled
              className="opacity-50 cursor-not-allowed w-full md:w-auto md:min-w-[200px] py-6 text-base"
            >
              <Download size={18} className="mr-2" />
              {t.apps.detail.inDevelopmentStatus}
            </Button>
          )}
        </div>
      </div>

      {/* Screenshots */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
          {t.apps.detail.screenshots}
        </h2>
        <div className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="flex gap-4 px-4 sm:px-6 lg:px-8 pb-4">
            {app.screenshots.map((screenshot: string, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] max-w-[350px]"
              >
                <div className="w-full aspect-[9/19.5] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-white relative">
                  <Image
                    src={screenshot}
                    alt={`${app.name} Screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {t.apps.detail.overview}
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
          {t.apps.detail.features}
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {t.apps.detail.featuresSubtitle}
          </span>
        </h2>
        <div className="space-y-3">
          {features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-gray-900 rounded-full"></div>
              <span className="text-gray-700 text-sm md:text-base">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {t.apps.detail.technologies}
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {t.apps.detail.technologiesSubtitle}
          </span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {app.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Usage Guide */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {t.apps.detail.howToUse}
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {t.apps.detail.howToUseSubtitle}
          </span>
        </h2>
        <div className="prose max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm md:text-base">
            {t.apps.detail.howToUseSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {t.apps.detail.faq}
        </h2>
        <div className="space-y-4">
          {faq ? (
            faq.map((item, index) => (
              <div key={index} className="notion-card">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                  {item.question}
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            ))
          ) : (
            // フォールバック（翻訳データがない場合）
            <div className="notion-card">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                Q1. アプリの料金はいくらですか？
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                A.
                現在は基本機能を無料でご利用いただけます。アプリ内に広告が表示される場合があります。将来的にプレミアム機能を追加する際は、事前にご案内いたします。
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Privacy Policy */}
      {privacyPolicy && (
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            {privacyPolicy.title}
          </h2>
          <div className="notion-card space-y-6">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-4">
                {privacyPolicy.lastUpdated}
              </p>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                {privacyPolicy.dataCollection.title}
              </h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                {privacyPolicy.dataCollection.intro}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {privacyPolicy.collectedData.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                {privacyPolicy.collectedData.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {privacyPolicy.dataUsage.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                {privacyPolicy.dataUsage.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {privacyPolicy.dataStorage.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                {privacyPolicy.dataStorage.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {privacyPolicy.dataDeletion.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                {privacyPolicy.dataDeletion.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {privacyPolicy.thirdPartyServices.title}
              </h4>
              <p className="text-gray-700 mb-2 text-sm md:text-base">
                {privacyPolicy.thirdPartyServices.intro}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                {privacyPolicy.thirdPartyServices.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                {privacyPolicy.thirdPartyServices.note}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {privacyPolicy.dataSharing.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                {privacyPolicy.dataSharing.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {privacyPolicy.policyChanges.title}
              </h4>
              <p className="text-gray-700 text-sm md:text-base">
                {privacyPolicy.policyChanges.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Related Blog Posts */}
      {app.blogPosts && app.blogPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
            {t.apps.detail.relatedPosts}
          </h2>
          <div className="space-y-4">
            {app.blogPosts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="notion-card hover-accent-bg group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-900 transition-colors">
                        {post.title}
                      </h3>
                      <time className="text-xs md:text-sm text-gray-500">
                        {post.date}
                      </time>
                    </div>
                    <ArrowLeft
                      size={16}
                      className="text-gray-400 group-hover:text-gray-900 transition-colors mt-1 transform rotate-180"
                    />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      <div className="bg-gray-50 rounded-lg p-4 md:p-6 text-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          {t.apps.detail.feedback}
        </h2>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          {t.apps.detail.feedbackDescription}
        </p>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
          <a
            href="https://x.com/app_saikou"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon size={16} className="mr-2" />
            {t.apps.detail.sendDM}
          </a>
        </Button>
      </div>
    </div>
  );
}
