// Rasterizes the app icons from SVG. Run manually when the icon changes:
//   node scripts/generate-icons.mjs
// Uses headless Chrome to render the SVG and ImageMagick ("magick") to resize.
// Outputs land in public/ and are committed — the build does not run this.
import { execFileSync } from "node:child_process";
import { writeFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (name) => join(root, "public", name);
const tmp = (name) => join(root, name);

const chrome =
  process.env.CHROME ||
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome not found — set the CHROME env var.");

const glyph = `<g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="m12 13-1-1 2-2-3-3 2-2" />
  </g>`;

const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#e50a34" />
  <g transform="translate(148 148) scale(9)" stroke-width="2.4">${glyph}</g>
</svg>`;

function renderSvg(svgPath, outPath) {
  execFileSync(chrome, [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    "--window-size=512,512",
    "--default-background-color=00000000",
    `--screenshot=${outPath}`,
    `file://${svgPath}`,
  ]);
}

const maskablePath = tmp(".icon-maskable.svg");
writeFileSync(maskablePath, maskableSvg);

renderSvg(pub("icon.svg"), pub("pwa-512.png"));
renderSvg(maskablePath, pub("pwa-maskable-512.png"));
rmSync(maskablePath);

const resize = (src, size, out) =>
  execFileSync("magick", [src, "-resize", `${size}x${size}`, out]);
resize(pub("pwa-512.png"), 192, pub("pwa-192.png"));
resize(pub("pwa-512.png"), 180, pub("apple-touch-icon.png"));

console.log("generated pwa-512, pwa-maskable-512, pwa-192, apple-touch-icon");
