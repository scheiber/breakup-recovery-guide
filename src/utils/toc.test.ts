import { describe, it, expect } from "vitest";
import { extractToc } from "./toc";
import { loadedArticles } from "./content";

describe("extractToc", () => {
  it("pulls ## and ### headings with slugged ids", () => {
    const toc = extractToc(
      ["Intro paragraph.", "", "## First Section", "text", "", "### A Sub-point", "more"].join("\n")
    );
    expect(toc).toEqual([
      { id: "first-section", text: "First Section" },
      { id: "a-sub-point", text: "A Sub-point" },
    ]);
  });

  it("ignores # inside fenced code blocks", () => {
    const toc = extractToc(["## Real", "", "```", "# not a heading", "```", "", "## Also Real"].join("\n"));
    expect(toc.map((e) => e.text)).toEqual(["Real", "Also Real"]);
  });

  it("strips inline markdown and de-duplicates ids", () => {
    const toc = extractToc(["## The **bold** one", "", "## The bold one"].join("\n"));
    expect(toc[0]).toEqual({ id: "the-bold-one", text: "The bold one" });
    expect(toc[1].id).toBe("the-bold-one-1");
  });

  it("every real article's toc ids are unique", () => {
    for (const { slug, body } of Object.values(loadedArticles)) {
      const ids = extractToc(body).map((e) => e.id);
      expect(new Set(ids).size, `duplicate heading id in ${slug}`).toBe(ids.length);
    }
  });
});
