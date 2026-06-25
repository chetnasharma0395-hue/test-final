// One-time optimization pass for public/gallery/.
// Downscales each image to max 1920px wide, converts to WebP @ q80,
// emits next to the original with .webp extension, then deletes the source.
//
// Usage: node scripts/optimize-gallery.mjs

import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public/gallery');
const MAX_WIDTH = 1920;
const QUALITY = 80;
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && SOURCE_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function processOne(filepath) {
  const dir = path.dirname(filepath);
  const base = path.basename(filepath, path.extname(filepath));
  const target = path.join(dir, `${base}.webp`);

  try {
    const input = await fs.readFile(filepath);
    const meta = await sharp(input).metadata();
    const inputBytes = input.length;

    let pipeline = sharp(input).rotate();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    const output = await pipeline.webp({ quality: QUALITY }).toBuffer();
    await fs.writeFile(target, output);
    await fs.unlink(filepath);

    const inputKB = (inputBytes / 1024).toFixed(0);
    const outputKB = (output.length / 1024).toFixed(0);
    const saving = (((inputBytes - output.length) / inputBytes) * 100).toFixed(0);
    console.log(`  ${path.relative(process.cwd(), filepath)} (${inputKB}KB) → ${path.basename(target)} (${outputKB}KB, -${saving}%)`);
  } catch (err) {
    console.error(`  FAIL ${filepath}:`, err.message);
  }
}

async function main() {
  console.log(`Optimizing gallery in ${ROOT} (max ${MAX_WIDTH}px, q${QUALITY})...`);
  const files = await walk(ROOT);
  console.log(`Found ${files.length} source images.`);
  for (const f of files) {
    await processOne(f);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
