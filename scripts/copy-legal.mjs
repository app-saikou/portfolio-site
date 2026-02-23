#!/usr/bin/env node
/**
 * doc/legal の各言語 md を public/legal/{slug}/ にコピーする。
 * - SuguMemo: doc/legal/ (flat) -> public/legal/sugumemo/{lang}/
 * - Tanao: doc/legal/tanao/ -> public/legal/tanao/{lang}/
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SUGUMEMO_LANGS = [
  "ja",
  "en",
  "zh-CN",
  "zh-TW",
  "ko",
  "es",
  "fr",
  "de",
  "pt",
  "it",
  "hi",
  "ar",
];

const APPS = [
  {
    slug: "sugumemo",
    srcDir: path.join(root, "doc", "legal"),
    langs: SUGUMEMO_LANGS,
    map: [
      ["privacy", "privacy-policy-subscription.md"],
      ["terms", "terms-of-service.md"],
    ],
  },
  {
    slug: "tanao",
    srcDir: path.join(root, "doc", "legal", "tanao"),
    langs: ["ja"],
    map: [["privacy", "privacy-policy-subscription.md"]],
  },
];

const TOKUSHO_SRC_DIR = path.join(root, "doc", "特定商取引法に基づく表示");
const TOKUSHO_OUT_NAME = "specified-commercial-transaction.md";

for (const app of APPS) {
  const outDir = path.join(root, "public", "legal", app.slug);
  if (!fs.existsSync(app.srcDir)) {
    console.warn(`${app.slug}: ${app.srcDir} が見つかりません。スキップします。`);
    continue;
  }
  for (const lang of app.langs) {
    const langDir = path.join(outDir, lang);
    fs.mkdirSync(langDir, { recursive: true });
    for (const [prefix, outName] of app.map) {
      const src = path.join(app.srcDir, `${prefix}_${lang}.md`);
      const dest = path.join(langDir, outName);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`${path.relative(root, src)} -> ${path.relative(root, dest)}`);
      }
    }
  }
  // SuguMemo: 特定商取引法に基づく表示を別フォルダからコピー
  if (app.slug === "sugumemo" && fs.existsSync(TOKUSHO_SRC_DIR)) {
    for (const lang of app.langs) {
      const src = path.join(TOKUSHO_SRC_DIR, `tokusho_${lang}.md`);
      const dest = path.join(outDir, lang, TOKUSHO_OUT_NAME);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`${path.relative(root, src)} -> ${path.relative(root, dest)}`);
      }
    }
  }
}

console.log("copy-legal: done.");
