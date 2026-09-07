# Breakup Recovery Guide

A free, non-commercial guide to recovering from a breakup or divorce. Built as a
static single-page site with Vite, React, TypeScript, Tailwind CSS, and a few
shadcn/ui components.

## Getting started

Requires Node.js 18+ and npm.

```sh
npm install
npm run dev      # start the dev server on http://localhost:8080
npm run build    # typecheck, generate sitemap, production build into dist/
npm run preview  # preview the production build
npm run lint     # run eslint
npm test         # run the content-integrity tests (vitest)
```

CI (`.github/workflows/ci.yml`) runs lint, tests, and build on every push and
pull request.

## Content

Each article is a single file, `src/content/<slug>.md`. The title, subtitle, and
hero image are in the file's YAML frontmatter; everything below the closing `---`
is the article body in GitHub-flavored Markdown.

```markdown
---
title: "No Contact"
subtitle: >-
  Contact with your ex- is like cutting an open wound over and over again.
  No contact is by far the most important step. Learn why to do it and how.
image: /images/no-contact.jpg
---

The most important rule by far is to have absolutely no contact with your ex-...
```

The subtitle uses YAML's `>-` folded block scalar: write it over as many indented
lines as you like and they're joined with spaces — no quote-escaping needed. It's
shown on the article card, under the article's heading, and as the page's
`<meta name="description">`.

Reading order (used for prev/next navigation and the sitemap) is the
`readingOrder` list in [`src/utils/articles.ts`](src/utils/articles.ts). Every
slug in that list must have a matching file in `src/content/`.

To add an article:

1. Create `src/content/my-new-article.md` with frontmatter and a body.
2. Add `"my-new-article"` to `readingOrder` where it should appear.
3. Add `public/images/my-new-article.jpg` (or point `image:` somewhere else).

`npm test` checks that `readingOrder` and the content files stay in sync, that
every file's frontmatter is complete, and that internal links resolve.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/content/` | One Markdown file per article (frontmatter + body) |
| `src/utils/content.ts` | Loads + validates every article file |
| `src/utils/articles.ts` | `readingOrder` + lookup / prev-next helpers |
| `src/utils/articleContent.ts` | Returns an article's Markdown body by slug |
| `vite.config.ts` | `markdown-content` plugin parses frontmatter at build time |
| `src/pages/` | Route components |
| `src/components/` | Shared UI (`ui/` holds the shadcn primitives in use) |
| `src/components/Seo.tsx` | Per-route `<title>` / Open Graph tags |
| `src/config.ts` | Site name, description, canonical base URL |
| `scripts/generate-sitemap.mjs` | Writes `public/sitemap.xml` + `robots.txt` at build |

## Configuration

Set `VITE_SITE_URL` in the build environment to your deployed origin (used for
canonical URLs, Open Graph tags, and the sitemap). It defaults to the value in
`src/config.ts`.

## Deployment

Any static host works. The included `public/_redirects` routes all paths to
`index.html` for client-side routing (Netlify style).

## AI Disclaimer

This project was created and developed by a human, but an AI assistant ([Claude Code](https://claude.ai)) was used for brainstorming, code generation, design, and debugging purposes. The final implementation and design decisions were made solely by the author, and all generated code, content, and logic were reviewed, tested, and validated by the author prior to inclusion. Any errors, bugs, or issues in the final product are the responsibility of the author. The AI was a tool to assist in the creative and development process, but the vision, implementation, and final product are entirely the work of the author.