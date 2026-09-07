import { describe, it, expect } from "vitest";
import { articles, readingOrder, getAdjacentArticles } from "./articles";
import { loadedArticles } from "./content";

const contentSlugs = new Set<string>(Object.keys(loadedArticles));
const orderedSlugs = new Set<string>(readingOrder);
const staticRoutes = new Set<string>(["/", "/articles", "/about"]);

describe("reading order ↔ content files", () => {
  it("every slug in readingOrder has a Markdown file", () => {
    const missing = readingOrder.filter((slug) => !contentSlugs.has(slug));
    expect(missing).toEqual([]);
  });

  it("every Markdown file is listed in readingOrder", () => {
    const orphaned = [...contentSlugs].filter((slug) => !orderedSlugs.has(slug));
    expect(orphaned).toEqual([]);
  });

  it("readingOrder has no duplicates", () => {
    expect(orderedSlugs.size).toBe(readingOrder.length);
  });
});

describe("frontmatter", () => {
  for (const [slug, { frontmatter }] of Object.entries(loadedArticles)) {
    it(`${slug} has a non-empty title and subtitle`, () => {
      expect(frontmatter.title.trim().length).toBeGreaterThan(0);
      expect(frontmatter.subtitle.trim().length).toBeGreaterThan(0);
    });

    it(`${slug} points at its own hero image`, () => {
      expect(frontmatter.image).toBe(`/images/${slug}.jpg`);
    });
  }
});

describe("derived article list", () => {
  it("matches readingOrder length and shape", () => {
    expect(articles).toHaveLength(readingOrder.length);
    for (const article of articles) {
      expect(article.title).toBeTruthy();
      expect(article.subtitle).toBeTruthy();
      expect(article.imageUrl).toMatch(/^\/images\//);
    }
  });

  it("prev/next wiring is consistent end to end", () => {
    expect(getAdjacentArticles(readingOrder[0]).prev).toBeNull();
    expect(getAdjacentArticles(readingOrder[readingOrder.length - 1]).next).toBeNull();
    const mid = getAdjacentArticles(readingOrder[1]);
    expect(mid.prev?.slug).toBe(readingOrder[0]);
    expect(mid.next?.slug).toBe(readingOrder[2]);
  });
});

describe("internal links in article bodies", () => {
  const linkPattern = /\]\((\/[^)\s]*)\)/g;

  for (const [slug, { body }] of Object.entries(loadedArticles)) {
    it(`${slug} only links to routes that exist`, () => {
      const broken: string[] = [];
      for (const match of body.matchAll(linkPattern)) {
        const href = match[1].replace(/\/$/, "") || "/";
        if (staticRoutes.has(href)) continue;
        const articleMatch = href.match(/^\/articles\/([^/]+)$/);
        if (articleMatch && orderedSlugs.has(articleMatch[1])) continue;
        broken.push(match[1]);
      }
      expect(broken).toEqual([]);
    });
  }
});
