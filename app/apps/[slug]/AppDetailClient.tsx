"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  TrendingUp,
  PieChart,
  Target,
  Calculator,
  Check,
  X,
  Star,
  Clock,
  Shield,
  BarChart3,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "@/components/TwitterIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { AppLegal } from "@/lib/apps";

// 選択言語に応じた法務タブラベル（privacy / terms / tokusho）
const LEGAL_DOC_LABELS: Record<
  string,
  { privacy: string; terms: string; tokusho: string }
> = {
  ja: {
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    tokusho: "特定商取引法に基づく表示",
  },
  en: {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    tokusho: "Specified Commercial Transaction Act",
  },
  "zh-CN": {
    privacy: "隐私政策",
    terms: "服务条款",
    tokusho: "特定商取引法相关说明",
  },
  "zh-TW": {
    privacy: "隱私權政策",
    terms: "服務條款",
    tokusho: "特定商取引法相關說明",
  },
  ko: {
    privacy: "개인정보 처리방침",
    terms: "이용약관",
    tokusho: "전자상거래법에 따른 표시",
  },
  es: {
    privacy: "Política de privacidad",
    terms: "Términos de servicio",
    tokusho: "Información según la ley de transacciones comerciales",
  },
  fr: {
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    tokusho: "Informations relatives à la loi sur les transactions commerciales",
  },
  de: {
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    tokusho: "Angaben gemäß dem Gesetz über bestimmte Handelsgeschäfte",
  },
  pt: {
    privacy: "Política de privacidade",
    terms: "Termos de serviço",
    tokusho: "Informações com base na lei de transações comerciais",
  },
  it: {
    privacy: "Informativa sulla privacy",
    terms: "Termini di servizio",
    tokusho: "Informazioni sulla legge sulle transazioni commerciali",
  },
  hi: {
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    tokusho: "निर्दिष्ट वाणिज्यिक लेनदेन अधिनियम के तहत प्रदर्शन",
  },
  ar: {
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    tokusho: "الإفصاح بموجب قانون المعاملات التجارية المحددة",
  },
};

export type AppData = {
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
  legal?: AppLegal;
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
  const appTranslations = t.apps.detail.appData?.[app.slug as "tanao" | "sugumemo"];
  const description = appTranslations?.description || app.description;
  const features = appTranslations?.features || app.features;
  const faq = appTranslations?.faq;

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

  // 法務ドキュメント（app.legal があるアプリのみ・共通UI）
  const legal = app.legal;
  const [legalLang, setLegalLang] = useState(legal?.languages[0]?.code ?? "ja");
  const [legalDocId, setLegalDocId] = useState(legal?.docs[0]?.id ?? "privacy");
  const [legalContent, setLegalContent] = useState<string | null>(null);
  const [legalLoading, setLegalLoading] = useState(false);

  useEffect(() => {
    if (!legal) return;
    const doc = legal.docs.find((d) => d.id === legalDocId);
    if (!doc) return;
    const url = `/legal/${app.slug}/${legalLang}/${doc.filename}`;
    setLegalLoading(true);
    setLegalContent(null);
    fetch(url)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error("404"))))
      .then(setLegalContent)
      .catch(() => setLegalContent(null))
      .finally(() => setLegalLoading(false));
  }, [legal, app.slug, legalLang, legalDocId]);

  // アプリ切替時に法務の言語・文書をリセット
  useEffect(() => {
    if (legal) {
      setLegalLang(legal.languages[0].code);
      setLegalDocId(legal.docs[0].id);
    }
  }, [app.slug, legal]);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  // URL の #privacy / #terms / #tokusho と ?lang= を解釈し、タブ・言語を設定して法務セクションへスクロール
  useEffect(() => {
    if (!legal) return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const docId = legal.docs.some((d) => d.id === hash) ? hash : null;
    const langParam = searchParams.get("lang");
    if (docId && legal.docs.some((d) => d.id === docId)) {
      setLegalDocId(docId);
    }
    if (langParam && legal.languages.some((l) => l.code === langParam)) {
      setLegalLang(langParam);
    }
    if (docId) {
      const el = document.getElementById("legal");
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, [legal, searchParams]);

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
                <div className="w-full aspect-[9/18] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-white relative">
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
        {app.slug === "tanao" ? (
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium text-center">
              家計簿は続かない、でも資産は把握したい。
              <br />
              そんな悩みを解決するのがTanaoです。
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* 時間の節約 */}
              <div className="notion-card bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Clock className="text-blue-600" size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    時間の節約
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    毎日の記録は不要。月1回、たった数分で資産を把握できます。
                    <br />
                    忙しいあなたでも、無理なく続けられます。
                  </p>
                </div>
              </div>

              {/* 将来への安心 */}
              <div className="notion-card bg-gradient-to-br from-green-50 to-white border-2 border-green-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Shield className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    将来への安心
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    複利計算で100歳までの資産を予測。今の行動が将来どうなるか、一目で分かります。
                    <br />
                    資産形成のモチベーションが続きます。
                  </p>
                </div>
              </div>

              {/* シンプルな管理 */}
              <div className="notion-card bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <BarChart3 className="text-purple-600" size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    シンプルな管理
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    現金、株式資産を1つのアプリで管理。
                    <br />
                    資産の全体像が一目瞭然です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium">
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Comparison - Tanao only */}
      {app.slug === "tanao" && (
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
            従来の家計簿との違い
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 従来の家計簿 */}
            <div className="notion-card border-2 border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                従来の家計簿
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <X size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base">
                    毎日の記録が必要
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <X size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base">
                    細かい支出まで記録が面倒
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <X size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base">
                    資産全体が見えない
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <X size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base">
                    将来予測がない
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <X size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base">
                    記録が負担で挫折しやすい
                  </span>
                </li>
              </ul>
            </div>

            {/* Tanao */}
            <div className="notion-card border-2 border-gray-900 bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Tanao
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Check
                    size={20}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-sm md:text-base">
                    月1回の棚卸しでOK
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check
                    size={20}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-sm md:text-base">
                    まとめて入力するだけ
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check
                    size={20}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-sm md:text-base">
                    全資産を一元管理
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check
                    size={20}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-sm md:text-base">
                    100歳までの資産予測
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check
                    size={20}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-sm md:text-base">
                    負担が少なく続けやすい
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
          {t.apps.detail.features}
          <span className="block text-sm font-normal text-gray-600 mt-1">
            {t.apps.detail.featuresSubtitle}
          </span>
        </h2>
        {app.slug === "tanao" ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* 月1回の簡単棚卸し */}
            <div className="notion-card hover-accent-bg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Calculator className="text-gray-900" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                    月1回の簡単棚卸し
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    毎日の記録は不要。月末に現在の資産額を入力するだけ
                  </p>
                </div>
              </div>
            </div>

            {/* 全資産の一覧表示 */}
            <div className="notion-card hover-accent-bg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <PieChart className="text-gray-900" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                    全資産の一覧表示
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    銀行、投資、不動産など複数の資産を一元管理
                  </p>
                </div>
              </div>
            </div>

            {/* 100歳までの資産予測 */}
            <div className="notion-card hover-accent-bg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="text-gray-900" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                    100歳までの資産予測
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    複利計算で将来の資産を可視化。目標達成への道筋が明確に
                  </p>
                </div>
              </div>
            </div>

            {/* 複利計算エンジン */}
            <div className="notion-card hover-accent-bg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Target className="text-gray-900" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                    複利計算エンジン
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    設定された年利率で、将来価値を自動計算
                  </p>
                </div>
              </div>
            </div>

            {/* シンプルな操作 */}
            <div className="notion-card hover-accent-bg md:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Check className="text-gray-900" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                    シンプルな操作
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    直感的なUIで、初心者でも簡単に使い始められます
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {/* User Reviews - Tanao only */}
      {app.slug === "tanao" && (
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
            ユーザーレビュー
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Review 1 */}
            <div className="notion-card">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-orange-400 text-orange-400"
                  />
                ))}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                良いアプリです！
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                簡単に登録できて、将来の資産の算出ができました！
              </p>
            </div>

            {/* Review 2 */}
            <div className="notion-card">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-orange-400 text-orange-400"
                  />
                ))}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                将来の資産額が見えて安心できる
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                毎日の家計簿入力がいらないので無理なく使えそうで便利！
              </p>
            </div>
          </div>
        </div>
      )}

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

      {/* プライバシーポリシー・利用規約（app.legal があるアプリのみ） */}
      {legal && (
        <div id="legal" className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            プライバシーポリシー・利用規約
          </h2>
          <div className="notion-card space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {legal.languages.length > 1 && (
                <div className="flex items-center gap-2">
                  <Globe
                    className="h-5 w-5 text-gray-500 shrink-0"
                    aria-hidden
                  />
                  <Select
                    value={legalLang}
                    onValueChange={(v) => setLegalLang(v)}
                  >
                    <SelectTrigger className="w-[180px]" aria-label="表示言語">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {legal.languages.map(({ code, label }) => (
                        <SelectItem key={code} value={code}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {legal.docs.length > 1 && (
                <Tabs
                  value={legalDocId}
                  onValueChange={(v) => {
                    setLegalDocId(v);
                    if (typeof window !== "undefined") {
                      const search = window.location.search || "";
                      window.history.replaceState(
                        null,
                        "",
                        `${pathname}${search}#${v}`
                      );
                    }
                  }}
                >
                  <TabsList>
                    {legal.docs.map((doc) => (
                      <TabsTrigger key={doc.id} value={doc.id}>
                        {(LEGAL_DOC_LABELS[legalLang] as Record<string, string> | undefined)?.[doc.id] ?? doc.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              )}
            </div>
            <div className="prose prose-sm max-w-none">
              {legalLoading && (
                <p className="text-gray-500 text-sm">読み込み中…</p>
              )}
              {!legalLoading && legalContent === null && (
                <p className="text-gray-500 text-sm">
                  指定言語のドキュメントがありません。public/legal/
                  {app.slug}/ に .md を配置してください。
                </p>
              )}
              {!legalLoading && legalContent !== null && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-6 mb-3 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-sm font-semibold text-gray-900 mt-3 mb-2">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-700 text-sm md:text-base mb-3">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base mb-3">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm md:text-base mb-3">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">
                        {children}
                      </strong>
                    ),
                    a: ({ href, children, ...props }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 no-underline hover:underline"
                        {...props}
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {legalContent}
                </ReactMarkdown>
              )}
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
