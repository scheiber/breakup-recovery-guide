import { loadedArticles } from "./content";

/** Returns the Markdown body (frontmatter stripped) for an article slug. */
export function getArticleContent(slug: string): string | undefined {
  return loadedArticles[slug]?.body;
}
