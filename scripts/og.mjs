// Builds public/og.jpg (1200x630), the image link previews show. Run with `npm run og`.
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const W = 1200;
const H = 630;

const photo = await sharp(path.join(root, "assets/photos/snowy-house.webp"))
  .resize(760, H, { fit: "cover", position: "centre" })
  .toBuffer();

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";
const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0.45" stop-color="#1f4d3a"/>
      <stop offset="0.66" stop-color="#1f4d3a" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="64" y="72" width="56" height="56" rx="14" fill="#ffffff" fill-opacity="0.12"/>
  <path d="M76 116l12-16 9 9 8-10 10 17" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="110" cy="86" r="6" fill="#e06a2b"/>
  <text x="136" y="100" font-family="${font}" font-size="30" font-weight="800" fill="#ffffff">Quality Air</text>
  <text x="136" y="126" font-family="${font}" font-size="19" font-weight="600" fill="#ffffff" fill-opacity="0.75">Heating &amp; Cooling · Aurora, CO</text>
  <text x="64" y="292" font-family="${font}" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Heat that shows up.</text>
  <text x="64" y="368" font-family="${font}" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Cool that keeps up.</text>
  <rect x="64" y="420" width="478" height="64" rx="14" fill="#e06a2b"/>
  <text x="90" y="462" font-family="${font}" font-size="26" font-weight="800" fill="#10201a">No heat tonight? We answer 24/7.</text>
  <text x="64" y="566" font-family="${font}" font-size="18" font-weight="600" fill="#ffffff" fill-opacity="0.7">Concept site by 5280 Web Solutions · not a real company</text>
</svg>`;

await sharp({ create: { width: W, height: H, channels: 3, background: "#1f4d3a" } })
  .composite([
    { input: photo, left: W - 760, top: 0 },
    { input: Buffer.from(overlay), left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, "public/og.jpg"));
console.log("public/og.jpg");
