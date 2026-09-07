import { describe, it, expect } from "vitest";
import {
  articles,
  readingOrder,
  getAdjacentArticles,
  getArticlePosition,
  searchArticles,
  formatReadingTime,
} from "./articles";
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

describe("reading time", () => {
  it("every article has a whole-minute estimate of at least 1", () => {
    for (const article of articles) {
      expect(Number.isInteger(article.readingMinutes)).toBe(true);
      expect(article.readingMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it("longer articles estimate longer", () => {
    const noContact = articles.find((a) => a.slug === "no-contact")!;
    const intro = articles.find((a) => a.slug === "intro")!;
    const short = articles.find((a) => a.slug === "bumping-into-ex")!;
    expect(noContact.readingMinutes).toBeGreaterThan(short.readingMinutes);
    expect(intro.readingMinutes).toBeGreaterThan(short.readingMinutes);
  });

  it("formats as '<n> min read'", () => {
    expect(formatReadingTime(1)).toBe("1 min read");
    expect(formatReadingTime(9)).toBe("9 min read");
  });
});

describe("getArticlePosition", () => {
  it("is 1-based and covers the whole guide", () => {
    expect(getArticlePosition(readingOrder[0])).toEqual({ number: 1, total: articles.length });
    expect(getArticlePosition(readingOrder[readingOrder.length - 1])).toEqual({
      number: articles.length,
      total: articles.length,
    });
  });

  it("returns null for an unknown slug", () => {
    expect(getArticlePosition("nope")).toBeNull();
  });
});

describe("searchArticles", () => {
  it("returns every article, in order, for an empty query", () => {
    const results = searchArticles("   ");
    expect(results.map((r) => r.article.slug)).toEqual([...readingOrder]);
    expect(results.every((r) => r.excerpt === undefined)).toBe(true);
  });

  it("matches title/subtitle without an excerpt", () => {
    const results = searchArticles("no contact");
    expect(results.some((r) => r.article.slug === "no-contact")).toBe(true);
    expect(results.find((r) => r.article.slug === "no-contact")?.excerpt).toBeUndefined();
  });

  it("matches body text and returns a highlighted excerpt", () => {
    const results = searchArticles("oxytocin");
    const hit = results.find((r) => r.article.slug === "pain-is-real");
    expect(hit).toBeDefined();
    expect(hit?.excerpt?.toLowerCase()).toContain("oxytocin");
    expect(hit?.excerpt).not.toMatch(/[#*`]/);
  });

  it("returns nothing for a term that appears nowhere", () => {
    expect(searchArticles("zzzznotarealword")).toEqual([]);
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
