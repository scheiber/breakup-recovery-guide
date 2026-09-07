export interface ArticleFrontmatter {
  title: string;
  subtitle: string;
  image: string;
}

export interface LoadedArticle {
  slug: string;
  frontmatter: ArticleFrontmatter;
  /** Markdown body with the frontmatter block removed. */
  body: string;
}

interface MarkdownModule {
  frontmatter: Partial<ArticleFrontmatter>;
  body: string;
}

// The `markdown-content` Vite plugin (see vite.config.ts) parses each file's
// YAML frontmatter at build time and exports it alongside the Markdown body.
const modules = import.meta.glob<MarkdownModule>("../content/*.md", { eager: true });

function load(path: string, mod: MarkdownModule): LoadedArticle {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { frontmatter, body } = mod;
  const missing = (["title", "subtitle", "image"] as const).filter((key) => !frontmatter[key]);
  if (missing.length > 0) {
    throw new Error(`Article "${slug}" frontmatter is missing: ${missing.join(", ")}.`);
  }
  return { slug, frontmatter: frontmatter as ArticleFrontmatter, body };
}

/** Every article file, keyed by slug. Unordered — see `readingOrder` in articles.ts. */
export const loadedArticles: Record<string, LoadedArticle> = {};
for (const [path, mod] of Object.entries(modules)) {
  const article = load(path, mod);
  loadedArticles[article.slug] = article;
}
