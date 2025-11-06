"use client";

import Link from "next/link";
import { TwitterIcon } from "@/components/TwitterIcon";
import { NoteIcon } from "@/components/NoteIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";

export function Footer() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="logo-font text-xl font-bold text-gray-900"
            >
              {t.home.title}
            </Link>
            <p className="mt-2 text-gray-600 text-sm">{t.footer.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t.footer.pages}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  {t.footer.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/apps"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  {t.footer.apps}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  {t.footer.blog}
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  {t.footer.roadmap}
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsor"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  {t.footer.sponsor}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t.footer.sns}</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://x.com/app_saikou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="https://note.com/app_saikou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-center text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <NoteIcon size={52} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
