#!/usr/bin/env node
/**
 * doc/apps/<slug>/ の法務 md を public/legal/<slug>/<lang>/<outName> にコピーする。
 * 出力パスは既存URLと完全に同一を保つ。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SUGUMEMO_LANGS = [
  "ja", "en", "zh-CN", "zh-TW", "ko", "es", "fr", "de", "pt", "it", "hi", "ar",
];

const COPY_MAP = [
  {
    slug: "sugumemo",
    srcDir: "doc/apps/sugumemo",
    langs: SUGUMEMO_LANGS,
    files: [
      { prefix: "privacy", outName: "privacy-policy-subscription.md" },
      { prefix: "terms",   outName: "terms-of-service.md" },
      { prefix: "tokusho", outName: "specified-commercial-transaction.md" },
    ],
  },
  {
    slug: "tanao",
    srcDir: "doc/apps/tanao",
    langs: ["ja"],
    files: [
      { prefix: "privacy", outName: "privacy-policy-subscription.md" },
    ],
  },
  {
    slug: "ideahatch",
    srcDir: "doc/apps/ideahatch",
    langs: ["ja", "en"],
    files: [
      { prefix: "privacy", outName: "privacy-policy.md" },
      { prefix: "terms", outName: "terms-of-service.md" },
    ],
  },
];

for (const app of COPY_MAP) {
  const srcBase = path.join(root, app.srcDir);
  if (!fs.existsSync(srcBase)) {
    console.warn(`${app.slug}: ${srcBase} が見つかりません。スキップします。`);
    continue;
  }

  for (const lang of app.langs) {
    const langDir = path.join(root, "public", "legal", app.slug, lang);
    fs.mkdirSync(langDir, { recursive: true });

    for (const file of app.files) {
      const srcName = file.src ?? `${file.prefix}_${lang}.md`;
      const src = path.join(srcBase, srcName);
      const dest = path.join(langDir, file.outName);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`${path.relative(root, src)} -> ${path.relative(root, dest)}`);
      }
    }
  }
}

console.log("copy-legal: done.");
