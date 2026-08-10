// public/配下の重い画像(screenshots・magazine・app-icons)をWebPに変換する。
// 元のPNG/JPGは変換後に削除する（同じ内容を二重に持たないため）。
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIRS = ['public/screenshots', 'public/magazine', 'public/app-icons'];
const SOURCE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const WEBP_QUALITY = 80;

async function collectImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath)));
    } else if (SOURCE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const dir of TARGET_DIRS) {
    const files = await collectImageFiles(dir).catch(() => []);
    for (const file of files) {
      const before = (await stat(file)).size;
      const outPath = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');

      await sharp(file).webp({ quality: WEBP_QUALITY }).toFile(outPath);
      const after = (await stat(outPath)).size;

      await unlink(file);

      totalBefore += before;
      totalAfter += after;
      count += 1;
      console.log(
        `${file} -> ${outPath} (${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`
      );
    }
  }

  console.log(`\n変換: ${count}件`);
  console.log(`合計: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
