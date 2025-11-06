"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "@/components/TwitterIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";

type AppData = {
  name: string;
  tagline: string;
  icon: string;
  status?: string;
  version: string;
  description: string;
  screenshots: string[];
  features: string[];
  technologies: string[];
  downloadUrl: string;
  githubUrl: string;
  blogPosts?: any[];
  slug: string;
};

interface AppDetailClientProps {
  app: AppData;
}

export function AppDetailClient({ app }: AppDetailClientProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/apps"
          className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>{t.apps.detail.backToList}</span>
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
                {getStatusTranslation(app.status)}
              </span>
              <span className="text-sm text-gray-500">{app.version}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t.apps.detail.screenshots}
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
              {t.apps.detail.developmentStatus}
            </h2>
            <p className="text-gray-600">
              {app.status === "リリース済み"
                ? t.apps.detail.availableNow
                : t.apps.detail.inDevelopment}
            </p>
            {app.status === "開発中" && (
              <div className="mt-3 text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-md">
                <div className="flex items-center">
                  <span>{t.apps.detail.checkProgress}</span>
                  <a
                    href="https://x.com/app_saikou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 text-blue-600 hover:text-blue-800 underline transition-colors font-bold text-xl"
                    title="X（旧Twitter）で開発進捗を確認"
                  >
                    X
                  </a>
                  <span>{t.apps.detail.checkProgressSuffix}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            {app.status === "リリース済み" ? (
              <>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Download size={16} className="mr-2" />
                  {t.apps.detail.download}
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
                  {t.apps.detail.inDevelopmentStatus}
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t.apps.detail.overview}
        </h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t.apps.detail.features}
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {t.apps.detail.featuresSubtitle}
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature: string, index: number) => (
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
          {t.apps.detail.technologies}
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {t.apps.detail.technologiesSubtitle}
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
          {t.apps.detail.howToUse}
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {t.apps.detail.howToUseSubtitle}
          </span>
        </h2>
        <div className="prose max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {t.apps.detail.howToUseSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t.apps.detail.faq}
        </h2>
        <div className="space-y-4">
          {faq ? (
            faq.map((item, index) => (
              <div key={index} className="notion-card">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))
          ) : (
            // フォールバック（翻訳データがない場合）
            <div className="notion-card">
              <h3 className="font-semibold text-gray-900 mb-2">
                Q1. アプリの料金はいくらですか？
              </h3>
              <p className="text-gray-700">
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {privacyPolicy.title}
          </h2>
          <div className="notion-card space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                {privacyPolicy.lastUpdated}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {privacyPolicy.dataCollection.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {privacyPolicy.dataCollection.intro}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {privacyPolicy.collectedData.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {privacyPolicy.collectedData.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {privacyPolicy.dataUsage.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {privacyPolicy.dataUsage.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {privacyPolicy.dataStorage.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {privacyPolicy.dataStorage.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {privacyPolicy.dataDeletion.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {privacyPolicy.dataDeletion.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {privacyPolicy.thirdPartyServices.title}
              </h4>
              <p className="text-gray-700 mb-2">
                {privacyPolicy.thirdPartyServices.intro}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {privacyPolicy.thirdPartyServices.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 mt-2">
                {privacyPolicy.thirdPartyServices.note}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {privacyPolicy.dataSharing.title}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {privacyPolicy.dataSharing.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {privacyPolicy.policyChanges.title}
              </h4>
              <p className="text-gray-700">
                {privacyPolicy.policyChanges.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Related Blog Posts */}
      {app.blogPosts && app.blogPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.apps.detail.relatedPosts}
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
          {t.apps.detail.feedback}
        </h2>
        <p className="text-gray-600 mb-4">
          {t.apps.detail.feedbackDescription}
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
            <TwitterIcon size={16} className="mr-2" />
            {t.apps.detail.sendDM}
          </a>
        </Button>
      </div>
    </div>
  );
}
