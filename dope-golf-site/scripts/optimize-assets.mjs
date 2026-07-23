// Downscale/compress the heavy brand PNGs so the page stays fast.
// Safe to re-run: it only rewrites files that are larger than the target.
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(here, "..", "public", "assets");

// PNG brand marks: keep alpha, downscale. Lifestyle photos (PNG bytes saved
// as .jpg by the generator): re-encode as real JPEG at web-friendly sizes.
const pngTargets = {
  "dg-crown.png": 1024,
};

const jpgTargets = {
  "desert-dawn.jpg": 2048,
  "hero-movement.jpg": 2048,
  "movement-celebration.jpg": 1920,
  "clubhouse-19th.jpg": 1600,
  "col-tour-black.jpg": 1200,
  "col-desert-classic.jpg": 1200,
  "col-pinseeker.jpg": 1200,
  "col-players-rope.jpg": 1200,
  "col-miami-vice.jpg": 1200,
};

const files = await readdir(assetsDir);
for (const file of files) {
  const path = join(assetsDir, file);
  // Read fully into memory so no input handle stays open on Windows.
  const input = await readFile(path);
  const before = input.length;
  let buf;
  if (pngTargets[file]) {
    buf = await sharp(input)
      .resize({ width: pngTargets[file], height: pngTargets[file], fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 82, effort: 8 })
      .toBuffer();
  } else if (jpgTargets[file]) {
    buf = await sharp(input)
      .resize({ width: jpgTargets[file], fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
  } else {
    continue;
  }
  if (buf.length < before) {
    await writeFile(path, buf);
  }
  const after = (await stat(path)).size;
  console.log(
    `${file}: ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB`,
  );
}
console.log("done");
