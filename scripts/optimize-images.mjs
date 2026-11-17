/**
 * npm run images
 * Optimises campaign photos dropped in photos-inbox/ into public/photos/
 * (AVIF + WebP + JPEG fallback at 640/1080/1920) and prints manifest stubs
 * to paste into data/photos.ts (alt/caption/credit must be filled by a human).
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INBOX = "photos-inbox";
const OUT = "public/photos";
const WIDTHS = [640, 1080, 1920];

await mkdir(OUT, { recursive: true });
const files = (await readdir(INBOX).catch(() => [])).filter((f) => /\.(jpe?g|png|webp|tiff?|heic)$/i.test(f));
if (!files.length) {
  console.log(`No photos in ${INBOX}/. Add campaign-supplied images and re-run.`);
  process.exit(0);
}
for (const file of files) {
  const id = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const img = sharp(path.join(INBOX, file)).rotate();
  const { width, height } = await img.metadata();
  for (const w of WIDTHS.filter((w) => w <= (width ?? 0) || w === WIDTHS[0])) {
    const r = img.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: 55 }).toFile(`${OUT}/${id}-${w}.avif`);
    await r.clone().webp({ quality: 72 }).toFile(`${OUT}/${id}-${w}.webp`);
    await r.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${id}-${w}.jpg`);
  }
  console.log(JSON.stringify({ id, src: `/photos/${id}-1920.jpg`, width, height, alt: { en: "", sw: "" }, caption: { en: "", sw: "" }, date: null, ward: null, category: "community", credit: "", approvedForPress: false, featured: false }) + ",");
}
