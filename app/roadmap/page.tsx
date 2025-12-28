"use client";

import {
  CircleCheck as CheckCircle2,
  Circle,
  Clock,
  Lightbulb,
  Calendar,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { roadmapItems, lastUpdated } from "@/lib/roadmap";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-gray-100 text-gray-800",
  low: "bg-green-100 text-green-800",
};

// 現在の累計収益（2025年12月28日時点）
const currentRevenue = 18;

// 収益マイルストーン
const revenueMilestones = [
  {
    id: 1,
    target: 1,
    title: "初収益",
    description: "最初の1円を稼ぐ",
  },
  {
    id: 2,
    target: 100,
    title: "¥100達成",
    description: "3桁の収益を達成",
  },
  {
    id: 3,
    target: 1000,
    title: "¥1,000達成",
    description: "4桁の収益を達成",
  },
  {
    id: 4,
    target: 10000,
    title: "¥10,000達成",
    description: "5桁の収益を達成",
  },
  {
    id: 5,
    target: 50000,
    title: "¥50,000達成",
    description: "月5万円の収益を達成",
  },
  {
    id: 6,
    target: 100000,
    title: "¥100,000達成",
    description: "月10万円の収益を達成",
  },
];

export default function Roadmap() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState("development");

  const priorityLabels = {
    high: t.roadmap.priority.high,
    medium: t.roadmap.priority.medium,
    low: t.roadmap.priority.low,
  };

  const categoryLabels: Record<string, string> = {
    アプリ開発: t.roadmap.categories.appDevelopment,
    新規アプリ: t.roadmap.categories.newApp,
    サイト開発: t.roadmap.categories.siteDevelopment,
    "企画・設計": t.roadmap.categories.planning,
  };

  const getCategoryLabel = (category: string) => {
    return categoryLabels[category] || category;
  };

  const getItemTitle = (id: number) => {
    return t.roadmap.items[id as keyof typeof t.roadmap.items]?.title;
  };

  const getItemDescription = (id: number) => {
    return t.roadmap.items[id as keyof typeof t.roadmap.items]?.description;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.roadmap.title}
          <span className="block text-lg font-normal text-gray-600 mt-2">
            {t.roadmap.subtitle}
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-4">{t.roadmap.description}</p>
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
          <Calendar size={16} className="text-gray-400" />
          <span>{t.roadmap.lastUpdated}</span>
          <span className="font-medium text-gray-700">2025年12月28日</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="development">開発ロードマップ</TabsTrigger>
          <TabsTrigger value="revenue">収益ロードマップ</TabsTrigger>
        </TabsList>

        <TabsContent value="development" className="mt-8">
          {/* Now and Next Sections - Connected Timeline */}
          <section className="mb-16">
            <div className="relative">
              {/* Continuous timeline line */}
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="space-y-8">
                {/* Now Section */}
                <div>
                  <div className="mb-6 pl-10">
                    <h2 className="text-xl font-bold text-gray-900">
                      {t.roadmap.sections.now}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {roadmapItems.now.map((item, index) => {
                      const translatedTitle = getItemTitle(item.id);
                      const translatedDescription = getItemDescription(item.id);
                      return (
                        <div key={item.id} className="relative flex gap-4">
                          <div className="flex-shrink-0 w-4 h-4 mt-1 rounded-full bg-gray-900 border-2 border-white shadow-sm z-10"></div>
                          <div className="flex-1 bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-base font-semibold text-gray-900">
                                {translatedTitle || item.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded-full whitespace-nowrap">
                                  進行中
                                </span>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {getCategoryLabel(item.category)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {translatedDescription || item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next Section */}
                <div>
                  <div className="mb-6 pl-10">
                    <h2 className="text-xl font-bold text-gray-900">
                      {t.roadmap.sections.next}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {roadmapItems.next.map((item, index) => {
                      const translatedTitle = getItemTitle(item.id);
                      const translatedDescription = getItemDescription(item.id);
                      return (
                        <div key={item.id} className="relative flex gap-4">
                          <div className="flex-shrink-0 w-4 h-4 mt-1 rounded-full bg-blue-500 border-2 border-white shadow-sm z-10"></div>
                          <div className="flex-1 bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-base font-semibold text-gray-900">
                                {translatedTitle || item.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full whitespace-nowrap">
                                  計画中
                                </span>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {getCategoryLabel(item.category)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {translatedDescription || item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Future Section */}
                <div>
                  <div className="mb-6 pl-10">
                    <h2 className="text-xl font-bold text-gray-900">
                      {t.roadmap.sections.future}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {roadmapItems.future.map((item, index) => {
                      const translatedTitle = getItemTitle(item.id);
                      const translatedDescription = getItemDescription(item.id);
                      return (
                        <div key={item.id} className="relative flex gap-4">
                          <div className="flex-shrink-0 w-4 h-4 mt-1 rounded-full bg-purple-500 border-2 border-white shadow-sm z-10"></div>
                          <div className="flex-1 bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-base font-semibold text-gray-900">
                                {translatedTitle || item.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full whitespace-nowrap">
                                  アイデア
                                </span>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {getCategoryLabel(item.category)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {translatedDescription || item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Done Section */}
                <div>
                  <div className="mb-6 pl-10">
                    <h2 className="text-xl font-bold text-gray-900">
                      {t.roadmap.sections.done}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {roadmapItems.done.map((item, index) => {
                      const translatedTitle = getItemTitle(item.id);
                      const translatedDescription = getItemDescription(item.id);
                      return (
                        <div key={item.id} className="relative flex gap-4">
                          <div className="flex-shrink-0 w-4 h-4 mt-1 rounded-full bg-green-500 border-2 border-white shadow-sm z-10 flex items-center justify-center">
                            <Check
                              size={10}
                              className="text-white"
                              strokeWidth={3}
                            />
                          </div>
                          <div className="flex-1 bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-base font-semibold text-gray-700">
                                {translatedTitle || item.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">
                                  完了
                                </span>
                                <div className="flex items-center gap-2 text-xs text-gray-500 whitespace-nowrap">
                                  <span>{item.completedDate}</span>
                                  <span>·</span>
                                  <span>{getCategoryLabel(item.category)}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {translatedDescription || item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Voting Feature Placeholder */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t.roadmap.voting.title}
            </h3>
            <p className="text-gray-600 mb-4">{t.roadmap.voting.description}</p>
            <p className="text-sm text-gray-500">{t.roadmap.voting.note}</p>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-8">
          {/* Current Revenue */}
          <div className="mb-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">現在の累計収益</p>
              <p className="text-5xl font-bold text-gray-900 mb-4">
                ¥{currentRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">スタート: 2025年10月</p>
            </div>
          </div>

          {/* Revenue Milestones */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                収益マイルストーン
              </h2>
              <p className="text-sm text-gray-600 mt-1">目標に向けた進捗状況</p>
            </div>

            <div className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-3">
                {revenueMilestones.map((milestone) => {
                  const isAchieved = currentRevenue >= milestone.target;
                  const isCurrent =
                    currentRevenue < milestone.target &&
                    (revenueMilestones.find(
                      (m) =>
                        currentRevenue >= m.target &&
                        currentRevenue < milestone.target
                    ) === undefined ||
                      milestone.id === 1);

                  return (
                    <div key={milestone.id} className="relative flex gap-4">
                      <div
                        className={`flex-shrink-0 w-4 h-4 mt-1 rounded-full border-2 border-white shadow-sm z-10 flex items-center justify-center ${
                          isAchieved
                            ? "bg-green-500"
                            : isCurrent
                            ? "bg-gray-900"
                            : "bg-gray-300"
                        }`}
                      >
                        {isAchieved && (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <div
                        className={`flex-1 p-5 rounded-lg border transition-all ${
                          isAchieved
                            ? "bg-green-50 border-green-200 hover:shadow-md"
                            : isCurrent
                            ? "bg-white border-gray-900 hover:shadow-md"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3
                                className={`text-base font-semibold ${
                                  isAchieved
                                    ? "text-green-900"
                                    : isCurrent
                                    ? "text-gray-900"
                                    : "text-gray-500"
                                }`}
                              >
                                {milestone.title}
                              </h3>
                              <span
                                className={`text-xl font-bold ${
                                  isAchieved
                                    ? "text-green-900"
                                    : isCurrent
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                ¥{milestone.target.toLocaleString()}
                              </span>
                            </div>
                            <p
                              className={`text-sm ${
                                isAchieved
                                  ? "text-green-700"
                                  : isCurrent
                                  ? "text-gray-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {milestone.description}
                            </p>
                          </div>
                          {isAchieved && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">
                              達成済み
                            </span>
                          )}
                          {isCurrent && (
                            <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded-full whitespace-nowrap">
                              次の目標
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">📊 透明性について：</span>
              <br />
              個人開発者として、収益の透明性を大切にしています。
              アプリのリリース後、毎月の収益を正直に公開していきます。
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
