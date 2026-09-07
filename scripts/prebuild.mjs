// Generates public/sitemap.xml, public/robots.txt, and public/rss.xml from the
// article content and reading order. Runs before `vite-react-ssg build`.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parse as parseYaml } from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");
const write = (rel, content) => writeFileSync(join(root, rel), content);

const siteUrl = (
  process.env.VITE_SITE_URL ?? "https://breakup-recovery-guide.netlify.app"
).replace(/\/$/, "");

const siteName = "Breakup Recovery Guide";
const siteDescription =
  read("src/config.ts").match(/siteDescription\s*=\s*\n?\s*"([^"]+)"/)?.[1] ??
  "A free guide to recovering from a breakup or divorce.";

// The reading order is the source of truth for article ordering.
const orderBlock =
  read("src/utils/articles.ts").match(/readingOrder\s*=\s*\[([\s\S]*?)\]/)?.[1] ?? "";
const readingOrder = [...orderBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

const articles = readingOrder.map((slug) => {
  const source = read(`src/content/${slug}.md`);
  const fm = parseYaml(FRONTMATTER.exec(source)?.[1] ?? "") ?? {};
  return {
    slug,
    title: fm.title ?? slug,
    description: fm.subtitle ?? "",
    date: fm.date ? new Date(fm.date) : null,
  };
});

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c])
  );

/* -------------------------------------------------------------- sitemap.xml */

const today = new Date().toISOString().slice(0, 10);
const routes = ["/", "/articles", "/about", "/resources", ...articles.map((a) => `/articles/${a.slug}`)];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map((r) => `  <url>\n    <loc>${siteUrl}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n") +
  `\n</urlset>\n`;
write("public/sitemap.xml", sitemap);

/* --------------------------------------------------------------- robots.txt */

write(
  "public/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);

/* ----------------------------------------------------------------- rss.xml */

const buildDate = new Date().toUTCString();
const items = articles
  .map((a) => {
    const url = `${siteUrl}/articles/${a.slug}`;
    const pubDate = a.date ? `\n      <pubDate>${a.date.toUTCString()}</pubDate>` : "";
    return (
      `    <item>\n` +
      `      <title>${escapeXml(a.title)}</title>\n` +
      `      <link>${url}</link>\n` +
      `      <guid isPermaLink="true">${url}</guid>\n` +
      `      <description>${escapeXml(a.description)}</description>${pubDate}\n` +
      `    </item>`
    );
  })
  .join("\n");

const rss =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `  <channel>\n` +
  `    <title>${escapeXml(siteName)}</title>\n` +
  `    <link>${siteUrl}</link>\n` +
  `    <description>${escapeXml(siteDescription)}</description>\n` +
  `    <language>en</language>\n` +
  `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
  `    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>\n` +
  `${items}\n` +
  `  </channel>\n` +
  `</rss>\n`;
write("public/rss.xml", rss);

console.log(
  `prebuild: sitemap (${routes.length} urls), robots.txt, rss.xml (${articles.length} items)`
);
