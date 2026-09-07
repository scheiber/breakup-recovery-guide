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
