// Generates public/sitemap.xml and public/robots.txt from the article content
// files. Run automatically before `vite build` (see package.json).
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = (
  process.env.VITE_SITE_URL ?? "https://breakup-recovery-guide.netlify.app"
).replace(/\/$/, "");

const slugs = readdirSync(join(root, "src/content"))
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(/\.md$/, ""));

const routes = [
  "/",
  "/articles",
  "/about",
  ...slugs.map((slug) => `/articles/${slug}`),
];

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  )
  .join("\n");

writeFileSync(
  join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

writeFileSync(
  join(root, "public/robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);

console.log(`Generated sitemap.xml with ${routes.length} URLs`);
