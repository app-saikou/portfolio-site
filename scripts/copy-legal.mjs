#!/usr/bin/env node
/**
 * doc/apps/<slug>/{prefix}_{lang}.md を public/legal/<slug>/<lang>/<outName> にコピーする。
 *
 * doc/apps 配下の各アプリディレクトリを自動スキャンするため、新しいアプリを追加するときはディレクトリと
 * ファイルを doc/apps/_template/README.md の手順通りに置くだけでよい（このスクリプトの
 * 編集は不要）。出力ファイル名を標準（privacy-policy.md 等）から変えたい場合のみ、
 * そのアプリのディレクトリに _meta.json を置いて上書きする。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const appsDir = path.join(root, "doc", "apps");

const DEFAULT_OUT_NAMES = {
  privacy: "privacy-policy.md",
  terms: "terms-of-service.md",
  tokusho: "specified-commercial-transaction.md",
};

const FILENAME_PATTERN = /^(privacy|terms|tokusho)_([a-zA-Z-]+)\.md$/;

if (!fs.existsSync(appsDir)) {
  console.warn(`${appsDir} が見つかりません。何もコピーしません。`);
  process.exit(0);
}

const appSlugs = fs
  .readdirSync(appsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .map((d) => d.name);

for (const slug of appSlugs) {
  const srcBase = path.join(appsDir, slug);
  const metaPath = path.join(srcBase, "_meta.json");
  const outNameOverrides = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, "utf8"))
    : {};

  const files = fs.readdirSync(srcBase).filter((f) => FILENAME_PATTERN.test(f));

  for (const filename of files) {
    const [, prefix, lang] = filename.match(FILENAME_PATTERN);
    const outName = outNameOverrides[prefix] ?? DEFAULT_OUT_NAMES[prefix];
    if (!outName) continue;

    const langDir = path.join(root, "public", "legal", slug, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const src = path.join(srcBase, filename);
    const dest = path.join(langDir, outName);
    fs.copyFileSync(src, dest);
    console.log(`${path.relative(root, src)} -> ${path.relative(root, dest)}`);
  }
}

console.log("copy-legal: done.");
