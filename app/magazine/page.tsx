"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import {
  magazineIssues,
  defaultIssueId,
  type MagazineIssue,
} from "@/lib/magazine";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

// 号ごとのカロセルコンポーネント
function IssueCarousel({
  issue,
  onImageClick,
}: {
  issue: MagazineIssue;
  onImageClick: (issueId: string, pageNum: number) => void;
}) {
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
                <div
                  className="w-full h-full rounded-lg overflow-hidden shadow-2xl bg-white relative cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onImageClick(issue.id, pageNum)}
                >
                  <Image
                    src={`${issue.imagePath}page-${pageNum}.png`}
                    alt={`${t.magazine.title} - ${getDisplayName(
                      issue
                    )} - Page ${pageNum}`}
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const issueIdFromUrl = searchParams.get("issue");
  const [activeTab, setActiveTab] = useState(issueIdFromUrl || defaultIssueId);
  const [tabCarouselApi, setTabCarouselApi] = useState<CarouselApi>();
  const [fullscreenImage, setFullscreenImage] = useState<{
    issueId: string;
    pageNum: number;
  } | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  // URLパラメータからタブを設定
  useEffect(() => {
    const issueIdFromUrl = searchParams.get("issue");
    if (issueIdFromUrl && issueIdFromUrl !== activeTab) {
      const issueExists = sortedIssues.some(
        (issue) => issue.id === issueIdFromUrl
      );
      if (issueExists) {
        setActiveTab(issueIdFromUrl);
      }
    } else if (!issueIdFromUrl && activeTab !== defaultIssueId) {
      // URLパラメータがない場合はデフォルトに戻す
      setActiveTab(defaultIssueId);
    }
  }, [searchParams, activeTab, sortedIssues]);

  // アクティブなタブが変更されたら、タブカロセルをその位置にスクロール
  useEffect(() => {
    if (!tabCarouselApi) return;
    const activeIndex = sortedIssues.findIndex(
      (issue) => issue.id === activeTab
    );
    if (activeIndex !== -1) {
      tabCarouselApi.scrollTo(activeIndex);
    }
  }, [activeTab, tabCarouselApi, sortedIssues]);

  // タブ変更時にURLを更新
  const handleTabChange = (issueId: string) => {
    setActiveTab(issueId);
    const params = new URLSearchParams(searchParams.toString());
    if (issueId === defaultIssueId) {
      params.delete("issue");
    } else {
      params.set("issue", issueId);
    }
    const newUrl = params.toString()
      ? `/magazine?${params.toString()}`
      : "/magazine";
    router.push(newUrl, { scroll: false });
  };

  const activeIssue = sortedIssues.find((issue) => issue.id === activeTab);

  // 全画面表示時の前後ページ移動
  const fullscreenIssue = fullscreenImage
    ? sortedIssues.find((issue) => issue.id === fullscreenImage.issueId)
    : null;

  const handlePreviousPage = () => {
    if (!fullscreenImage || !fullscreenIssue) return;
    if (fullscreenImage.pageNum > 1) {
      setFullscreenImage({
        issueId: fullscreenImage.issueId,
        pageNum: fullscreenImage.pageNum - 1,
      });
    }
  };

  const handleNextPage = () => {
    if (!fullscreenImage || !fullscreenIssue) return;
    if (fullscreenImage.pageNum < fullscreenIssue.pageCount) {
      setFullscreenImage({
        issueId: fullscreenImage.issueId,
        pageNum: fullscreenImage.pageNum + 1,
      });
    }
  };

  // スワイプの最小距離
  const minSwipeDistance = 50;

  // タッチイベントハンドラー
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !fullscreenImage || !fullscreenIssue)
      return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && fullscreenImage.pageNum < fullscreenIssue.pageCount) {
      handleNextPage();
    }
    if (isRightSwipe && fullscreenImage.pageNum > 1) {
      handlePreviousPage();
    }
  };

  // マウスドラッグイベントハンドラー
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) {
      setShowControls(true);
      return;
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart || !fullscreenImage || !fullscreenIssue) {
      setIsDragging(false);
      return;
    }

    const distance = mouseStart - e.clientX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && fullscreenImage.pageNum < fullscreenIssue.pageCount) {
      handleNextPage();
    }
    if (isRightSwipe && fullscreenImage.pageNum > 1) {
      handlePreviousPage();
    }

    setIsDragging(false);
    setMouseStart(null);
  };

  // コントロールの表示/非表示を管理
  useEffect(() => {
    if (!fullscreenImage) {
      setShowControls(true);
      return;
    }

    // 3秒後に非表示
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [fullscreenImage]);

  // ページが変わったらコントロールを表示
  useEffect(() => {
    if (fullscreenImage) {
      setShowControls(true);
    }
  }, [fullscreenImage]);

  // キーボード操作
  useEffect(() => {
    if (!fullscreenImage || !fullscreenIssue) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (fullscreenImage.pageNum > 1) {
          setFullscreenImage({
            issueId: fullscreenImage.issueId,
            pageNum: fullscreenImage.pageNum - 1,
          });
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (fullscreenImage.pageNum < fullscreenIssue.pageCount) {
          setFullscreenImage({
            issueId: fullscreenImage.issueId,
            pageNum: fullscreenImage.pageNum + 1,
          });
        }
      } else if (e.key === "Escape") {
        setFullscreenImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenImage, fullscreenIssue]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.magazine.title}
        </h1>
        <p className="text-xl text-gray-600 mb-2">{t.magazine.subtitle}</p>
        <p className="text-sm text-gray-500">{t.magazine.description}</p>
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
                  onClick={() => handleTabChange(issue.id)}
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
      {activeIssue && (
        <IssueCarousel
          issue={activeIssue}
          onImageClick={(issueId, pageNum) =>
            setFullscreenImage({ issueId, pageNum })
          }
        />
      )}

      {/* 全画面表示ダイアログ */}
      <Dialog
        open={!!fullscreenImage}
        onOpenChange={(open) => !open && setFullscreenImage(null)}
      >
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-black/95 border-none [&>button]:hidden">
          <div
            className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
            onClick={() => !isDragging && setShowControls(!showControls)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            {fullscreenImage && fullscreenIssue && (
              <>
                <Image
                  src={`${fullscreenIssue.imagePath}page-${fullscreenImage.pageNum}.png`}
                  alt={`Fullscreen - Page ${fullscreenImage.pageNum}`}
                  width={1414}
                  height={2000}
                  className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none"
                  sizes="100vw"
                  draggable={false}
                />
                {/* ページ数表示 */}
                <div
                  className={`absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-md text-sm font-medium backdrop-blur-sm z-10 transition-all ${
                    showControls
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {fullscreenImage.pageNum} / {fullscreenIssue.pageCount}
                </div>
                {/* 閉じるボタン */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenImage(null);
                  }}
                  className={`absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all z-10 ${
                    showControls
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 説明 */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">{t.magazine.note}</p>
      </div>
    </div>
  );
}
