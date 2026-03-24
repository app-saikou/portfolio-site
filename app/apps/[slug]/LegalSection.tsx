"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AppLegal } from "@/lib/apps";

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

const markdownComponents = {
  h2: ({ children }: any) => (
    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-6 mb-3 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-sm font-semibold text-gray-900 mt-3 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-700 text-sm md:text-base mb-3">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base mb-3">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm md:text-base mb-3">
      {children}
    </ol>
  ),
  li: ({ children }: any) => <li className="mb-1">{children}</li>,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  a: ({ href, children, ...props }: any) => (
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
};

interface LegalSectionProps {
  slug: string;
  legal: AppLegal;
}

export default function LegalSection({ slug, legal }: LegalSectionProps) {
  const [legalLang, setLegalLang] = useState(legal.languages[0]?.code ?? "ja");
  const [legalDocId, setLegalDocId] = useState(legal.docs[0]?.id ?? "privacy");
  const [legalContent, setLegalContent] = useState<string | null>(null);
  const [legalLoading, setLegalLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const doc = legal.docs.find((d) => d.id === legalDocId);
    if (!doc) return;
    const defaultLang = legal.languages[0]?.code ?? "ja";
    const candidateUrls = [
      `/legal/${slug}/${legalLang}/${doc.filename}`,
      `/legal/${slug}/${defaultLang}/${doc.filename}`,
    ];
    setLegalLoading(true);
    setLegalContent(null);

    const fetchFirstAvailable = async () => {
      for (const url of candidateUrls) {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) continue;
        return { text: await res.text(), url };
      }
      throw new Error("404-all");
    };

    fetchFirstAvailable()
      .then(({ text, url }) => {
        if (
          legalLang !== defaultLang &&
          url.includes(`/${defaultLang}/`) &&
          !url.includes(`/${legalLang}/`)
        ) {
          setLegalLang(defaultLang);
        }
        setLegalContent(text);
      })
      .catch(() => setLegalContent(null))
      .finally(() => setLegalLoading(false));
  }, [legal, slug, legalLang, legalDocId]);

  useEffect(() => {
    setLegalLang(legal.languages[0].code);
    setLegalDocId(legal.docs[0].id);
  }, [slug, legal]);

  useEffect(() => {
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const docId = legal.docs.some((d) => d.id === hash) ? hash : null;
    const langParam = searchParams.get("lang");
    if (docId) setLegalDocId(docId);
    if (langParam && legal.languages.some((l) => l.code === langParam)) {
      setLegalLang(langParam);
    }
    if (docId) {
      const el = document.getElementById("legal");
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
      }
    }
  }, [legal, searchParams]);

  return (
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
              <Select value={legalLang} onValueChange={setLegalLang}>
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
                    {(
                      LEGAL_DOC_LABELS[legalLang] as
                        | Record<string, string>
                        | undefined
                    )?.[doc.id] ?? doc.label}
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
              指定言語のドキュメントがありません。
            </p>
          )}
          {!legalLoading && legalContent !== null && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {legalContent}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
