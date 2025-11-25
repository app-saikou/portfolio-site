"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { magazineIssues, defaultIssueId, type MagazineIssue } from "@/lib/magazine";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// 号ごとのカロセルコンポーネント
function IssueCarousel({ issue }: { issue: MagazineIssue }) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const pages = Array.from({ length: issue.pageCount }, (_, i) => i + 1);

  // 表示名を生成
  const getDisplayName = (issue: MagazineIssue) => {
    if (issue.isPrototype) {
      return t.magazine.prototype;
    }
    if (issue.year && issue.month) {
      return language === "ja"
        ? `${issue.year}年${issue.month}月${t.magazine.issue}`
        : `${issue.month}/${issue.year} ${t.magazine.issue}`;
    }
    return issue.displayName;
  };

  // Coming Soon表示
  if (issue.comingSoon) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[3/4] max-w-2xl mx-auto">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold text-gray-400 mb-4">
                {t.magazine.comingSoon}
              </div>
              <div className="text-xl text-gray-600">
                {getDisplayName(issue)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {pages.map((pageNum) => (
            <CarouselItem key={pageNum} className="basis-full">
              <div className="relative w-full aspect-[3/4] max-w-2xl mx-auto">
                <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl bg-white relative">
                  <Image
                    src={`${issue.imagePath}page-${pageNum}.png`}
                    alt={`${t.magazine.title} - ${getDisplayName(issue)} - Page ${pageNum}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 768px"
                    priority={pageNum === 1 && issue.id === defaultIssueId}
                  />
                  {/* ページ数表示（右上） */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-sm font-medium backdrop-blur-sm">
                    {t.magazine.page} {pageNum} / {issue.pageCount}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
}

export default function Magazine() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState(defaultIssueId);
  const [tabCarouselApi, setTabCarouselApi] = useState<CarouselApi>();

  // 表示名を生成
  const getDisplayName = (issue: MagazineIssue) => {
    if (issue.isPrototype) {
      return t.magazine.prototype;
    }
    if (issue.year && issue.month) {
      return language === "ja"
        ? `${issue.year}年${issue.month}月${t.magazine.issue}`
        : `${issue.month}/${issue.year} ${t.magazine.issue}`;
    }
    return issue.displayName;
  };

  // 号を古い順にソート（プロトタイプは最初）
  const sortedIssues = [...magazineIssues].sort((a, b) => {
    if (a.isPrototype && !b.isPrototype) return -1;
    if (!a.isPrototype && b.isPrototype) return 1;
    if (a.isPrototype && b.isPrototype) return 0;
    
    // 年と月でソート（古い順）
    if (a.year && b.year) {
      if (a.year !== b.year) return a.year - b.year;
      if (a.month && b.month) return a.month - b.month;
    }
    return 0;
  });

  // アクティブなタブが変更されたら、タブカロセルをその位置にスクロール
  useEffect(() => {
    if (!tabCarouselApi) return;
    const activeIndex = sortedIssues.findIndex((issue) => issue.id === activeTab);
    if (activeIndex !== -1) {
      tabCarouselApi.scrollTo(activeIndex);
    }
  }, [activeTab, tabCarouselApi, sortedIssues]);

  const activeIssue = sortedIssues.find((issue) => issue.id === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.magazine.title}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {t.magazine.subtitle}
        </p>
        <p className="text-sm text-gray-500">
          {t.magazine.description}
        </p>
      </div>

      {/* タブ（1行で横スクロール可能） */}
      <div className="mb-8">
        <Carousel
          setApi={setTabCarouselApi}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sortedIssues.map((issue) => (
              <CarouselItem key={issue.id} className="pl-2 md:pl-4 basis-auto">
                <button
                  onClick={() => setActiveTab(issue.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === issue.id
                      ? "bg-yellow-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {getDisplayName(issue)}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* タブコンテンツ */}
      {activeIssue && <IssueCarousel issue={activeIssue} />}

      {/* 説明 */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.magazine.note}
        </p>
      </div>
    </div>
  );
}
