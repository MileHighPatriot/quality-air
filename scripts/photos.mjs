// Builds the resized WebP copies the site serves, from the originals in assets/photos.
// GitHub Pages has no image resizer, so every width is made ahead of time.
//
//   assets/photos/snowy-house.webp  ->  public/photos/snowy-house-640.webp, -1024.webp, ...
//
// Run with `npm run photos` after adding or changing a photo. Sources and licenses are in README.md.
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "assets", "photos");
const out = path.join(root, "public", "photos");
const WIDTHS = [480, 800, 1200, 1600];

/** Per-photo edits before resizing. */
const edits = {
  // Soften the maker's badge so the fictional company doesn't read as a brand dealer.
  "heat-pump": async (img) => {
    const region = { left: 960, top: 1810, width: 270, height: 190 };
    const patch = await img.clone().extract(region).blur(14).toBuffer();
    return sharp(await img.composite([{ input: patch, left: region.left, top: region.top }]).toBuffer());
  },
};

await mkdir(out, { recursive: true });
for (const file of await readdir(src)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = path.parse(file).name;
  let img = sharp(path.join(src, file)).rotate();
  if (edits[name]) img = await edits[name](sharp(await img.toBuffer()));
  const { width } = await img.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (widths.at(-1) !== width && width < WIDTHS.at(-1)) widths.push(width);
  for (const w of widths) {
    await img.clone().resize(w).webp({ quality: 72, effort: 6 }).toFile(path.join(out, `${name}-${w}.webp`));
  }
  console.log(name, widths.join(", "));
}
