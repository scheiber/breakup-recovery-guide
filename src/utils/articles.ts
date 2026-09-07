import { loadedArticles } from "./content";

export interface Article {
  title: string;
  subtitle: string;
  slug: string;
  imageUrl: string;
}

/**
 * The reading order of the guide, used for prev/next navigation and the sitemap.
 * Each slug must match a file at `src/content/<slug>.md`. To reorder the guide,
 * or add/remove an article, edit this list — the title, subtitle, and hero image
 * live in each Markdown file's frontmatter.
 */
export const readingOrder = [
  "immediate-aftermath",
  "intro",
  "pain-is-real",
  "time-to-recover",
  "no-contact",
  "initiating-no-contact",
  "closure",
  "remove-reminders",
  "contact-from-ex",
  "bumping-into-ex",
  "ex-special-occasions",
  "ex-with-new-partner",
  "getting-back-together",
  "friends-family-support",
  "mental-work",
  "never-another-love",
  "revenge",
  "alcohol-drugs-medicine",
  "health",
  "activities",
  "rebound-relationships",
  "language",
  "costly-guides-plans",
  "youre-not-alone",
] as const;

export const articles: Article[] = readingOrder.map((slug) => {
  const loaded = loadedArticles[slug];
  if (!loaded) {
    throw new Error(
      `readingOrder lists "${slug}" but src/content/${slug}.md does not exist.`
    );
  }
  return {
    slug,
    title: loaded.frontmatter.title,
    subtitle: loaded.frontmatter.subtitle,
    imageUrl: loaded.frontmatter.image,
  };
});

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** 1-based position of an article within the guide, e.g. `{ number: 6, total: 24 }`. */
export function getArticlePosition(
  slug: string
): { number: number; total: number } | null {
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) return null;
  return { number: index + 1, total: articles.length };
}

export interface ArticleSearchResult {
  article: Article;
  /** A short body excerpt, present only when the match is in the body text. */
  excerpt?: string;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Searches titles, subtitles, and article bodies. An empty query returns every
 * article in reading order. Body-only matches carry a highlighted excerpt.
 */
export function searchArticles(query: string): ArticleSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return articles.map((article) => ({ article }));

  const results: ArticleSearchResult[] = [];
  for (const article of articles) {
    const inMeta =
      article.title.toLowerCase().includes(q) ||
      article.subtitle.toLowerCase().includes(q);
    const body = loadedArticles[article.slug]?.body ?? "";
    const bodyIndex = body.toLowerCase().indexOf(q);

    if (!inMeta && bodyIndex === -1) continue;

    let excerpt: string | undefined;
    if (!inMeta && bodyIndex !== -1) {
      let start = Math.max(0, bodyIndex - 70);
      let end = Math.min(body.length, bodyIndex + q.length + 70);
      // Snap to word boundaries so the excerpt doesn't start/end mid-word.
      if (start > 0) start = body.indexOf(" ", start) + 1 || start;
      if (end < body.length) {
        const lastSpace = body.lastIndexOf(" ", end);
        if (lastSpace > bodyIndex) end = lastSpace;
      }
      excerpt =
        (start > 0 ? "… " : "") +
        stripMarkdown(body.slice(start, end)) +
        (end < body.length ? " …" : "");
    }
    results.push({ article, excerpt });
  }
  return results;
}

/** Returns the previous and next articles in reading order for a given slug. */
export function getAdjacentArticles(slug: string): {
  prev: Article | null;
  next: Article | null;
} {
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}
