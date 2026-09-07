import GithubSlugger from "github-slugger";

export interface TocEntry {
  id: string;
  text: string;
}

const HEADING = /^(#{2,3})\s+(.+?)\s*#*\s*$/;

/** Strip the inline Markdown that can appear inside a heading. */
function plainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

/**
 * Pulls the `##`/`###` headings out of an article body. The ids match what
 * `rehype-slug` generates for the rendered HTML, so they can be linked to.
 */
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING.exec(line);
    if (match) {
      const text = plainText(match[2]);
      if (text) entries.push({ id: slugger.slug(text), text });
    }
  }

  return entries;
}
