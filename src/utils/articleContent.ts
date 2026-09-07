/**
 * Loads the raw Markdown body for each article from `src/content/*.md`.
 * Vite inlines the file contents at build time, keyed by slug.
 */
const modules = import.meta.glob("../content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const contentBySlug: Record<string, string> = {};
for (const [path, source] of Object.entries(modules)) {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  contentBySlug[slug] = source;
}

export function getArticleContent(slug: string): string | undefined {
  return contentBySlug[slug];
}
