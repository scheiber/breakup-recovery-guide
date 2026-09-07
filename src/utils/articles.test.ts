import { describe, it, expect } from "vitest";
import { articles } from "./articles";

const contentFiles = import.meta.glob("../content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const contentSlugs = new Set(
  Object.keys(contentFiles).map((path) => path.split("/").pop()!.replace(/\.md$/, ""))
);

const manifestSlugs = new Set(articles.map((a) => a.slug));

const staticRoutes = new Set(["/", "/articles", "/about"]);

describe("article manifest ↔ content", () => {
  it("every manifest entry has a matching Markdown file", () => {
    const missing = articles.filter((a) => !contentSlugs.has(a.slug)).map((a) => a.slug);
    expect(missing).toEqual([]);
  });

  it("every Markdown file has a matching manifest entry", () => {
    const orphaned = [...contentSlugs].filter((slug) => !manifestSlugs.has(slug));
    expect(orphaned).toEqual([]);
  });

  it("slugs are unique", () => {
    expect(manifestSlugs.size).toBe(articles.length);
  });

  it("every entry points at an image under /images/", () => {
    const bad = articles.filter((a) => !a.imageUrl.startsWith("/images/")).map((a) => a.slug);
    expect(bad).toEqual([]);
  });
});

describe("internal links in article content", () => {
  const linkPattern = /\]\((\/[^)\s]*)\)/g;

  for (const [path, source] of Object.entries(contentFiles)) {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");

    it(`${slug} only links to routes that exist`, () => {
      const broken: string[] = [];
      for (const match of source.matchAll(linkPattern)) {
        const href = match[1].replace(/\/$/, "") || "/";
        if (staticRoutes.has(href)) continue;
        const articleMatch = href.match(/^\/articles\/([^/]+)$/);
        if (articleMatch && manifestSlugs.has(articleMatch[1])) continue;
        broken.push(match[1]);
      }
      expect(broken).toEqual([]);
    });
  }
});
