"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { getAppsPageData } from "@/lib/apps";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";

const apps = getAppsPageData();

export default function Apps() {
  const { language } = useLanguage();
  const t = getTranslation(language);

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.apps.title}
          <span className="block text-lg font-normal text-gray-600 mt-2">
            {t.apps.subtitle}
          </span>
        </h1>
        <p className="text-xl text-gray-600">{t.apps.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apps.map((app) => (
          <div key={app.id} className="notion-card hover-accent-bg group">
            {/* App Image - Main Focus */}
            <div className="relative mb-6">
              <Link href={`/apps/${app.slug}`} className="block">
                <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer">
                  <img
                    src={app.iconUrl}
                    alt={`${app.name} icon`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                    app.status === "リリース済み"
                      ? "bg-green-100 text-green-800"
                      : app.status === "開発中"
                      ? "bg-blue-100 text-blue-800"
                      : app.status === "アイデア段階"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {getStatusTranslation(app.status)}
                </span>
              </div>
            </div>

            {/* App Info */}
            <div className="text-center">
              <Link href={`/apps/${app.slug}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors cursor-pointer">
                  {app.name}
                </h2>
              </Link>

              <p className="text-gray-600 mb-6 line-clamp-3 text-sm">
                {app.description}
              </p>

              {/* Action Button */}
              <div className="flex justify-center">
                <Link
                  href={`/apps/${app.slug}`}
                  className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
                >
                  <span>{t.apps.viewDetails}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* External Links */}
              {app.status === "リリース済み" && (
                <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Github size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
