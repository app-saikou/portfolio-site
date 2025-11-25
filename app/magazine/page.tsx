"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// 雑誌のページ数
const MAGAZINE_PAGES = 12;

export default function Magazine() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const pages = Array.from({ length: MAGAZINE_PAGES }, (_, i) => i + 1);

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

      {/* カロセル */}
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
                      src={`/magazine/Solo Dev/page-${pageNum}.png`}
                      alt={`${t.magazine.title} - Page ${pageNum}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 768px"
                      priority={pageNum === 1}
                    />
                    {/* ページ数表示（右上） */}
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-sm font-medium backdrop-blur-sm">
                      {t.magazine.page} {pageNum} / {MAGAZINE_PAGES}
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

      {/* 説明 */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.magazine.note}
        </p>
      </div>
    </div>
  );
}

