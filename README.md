# Breakup Recovery Guide

A free, non-commercial guide to recovering from a breakup or divorce. Built with
Vite, React, TypeScript, Tailwind CSS, and a few shadcn/ui components. Every route
is pre-rendered to static HTML at build time (`vite-react-ssg`) and then hydrates
into a client-side app.

## Getting started

Requires Node.js 20+ and npm.

```sh
npm install
npm run dev      # dev server (CSR) on http://localhost:8080
npm run build    # typecheck, sitemap, then pre-render every route into dist/
npm run preview  # preview the pre-rendered build
npm run lint     # run eslint
npm test         # run the content-integrity tests (vitest)
```

`npm run build` runs `vite-react-ssg build`: it renders each route (all 24
articles plus the static pages) to its own `.html` file, so crawlers and
no-JS visitors get the full content. Routing, `<title>`, and social/JSON-LD tags
still come from the React app.

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

Section headings inside an article get slugged ids (`rehype-slug`) and are
linkable; articles with 3+ `##` headings show an auto-generated "In this article"
jump list.

## Reader features

All reader state lives in `localStorage` — no accounts, no server, no tracking.

- **Progress** — an article is marked read once you reach the end or linger a
  while ([`src/utils/readingProgress.ts`](src/utils/readingProgress.ts)); the
  articles list shows read badges, an "N of 24" count, and "Continue reading".
- **Resume** — leaving an article part-way and coming back drops you where you
  left off.
- **Reading time** — a per-article estimate on every card and header.
- **Text size** — an A−/A+ control on articles ([`FontSizeControl.tsx`](src/components/FontSizeControl.tsx));
  applied before first paint from `index.html`.
- **Contents panel** — the header's "Contents" button opens the full guide from
  anywhere ([`GuideContents.tsx`](src/components/GuideContents.tsx)).
- **Keyboard** — `←`/`→` move between articles, `/` focuses search, `?` shows the
  shortcut list.
- **`/resources`** — crisis support lines, linked prominently from the footer.
- **Installable / offline** — `vite-plugin-pwa` precaches the whole guide, so it
  works offline after one visit and can be added to a home screen.
- **RSS** — `/rss.xml`, generated from the article frontmatter.
- Motion is disabled for `prefers-reduced-motion`. Theme
  ([`src/lib/theme.ts`](src/lib/theme.ts)) is light / dark / system with an
  inline no-flash script. A print stylesheet drops the chrome so articles print
  cleanly.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/content/` | One Markdown file per article (frontmatter + body) |
| `src/utils/content.ts` | Loads + validates every article file |
| `src/utils/articles.ts` | `readingOrder`, lookup / prev-next / position / search |
| `src/utils/articleContent.ts` | Returns an article's Markdown body by slug |
| `src/utils/toc.ts` | Extracts a heading jump-list from an article body |
| `src/utils/readingProgress.ts` | Per-browser read / last-read tracking |
| `src/App.tsx` | `vite-react-ssg` route table (lazy-loaded pages) |
| `src/main.tsx` | SSG / hydration entry |
| `src/components/RootLayout.tsx` | Shell: header, footer, skip link, `<Outlet>` |
| `vite.config.ts` | `markdown-content` plugin + `ssgOptions` |
| `src/pages/` | Route components |
| `src/components/` | Shared UI (`ui/` holds the shadcn primitives in use) |
| `src/components/Seo.tsx` | Per-route `<title>`, social tags, JSON-LD |
| `src/config.ts` | Site name, description, canonical base URL |
| `scripts/prebuild.mjs` | Writes `sitemap.xml`, `robots.txt`, `rss.xml` at build |
| `scripts/generate-icons.mjs` | Rasterizes `public/icon.svg` → PWA icons (run manually) |

## Configuration

Set `VITE_SITE_URL` in the build environment to your deployed origin (used for
canonical URLs, Open Graph tags, and the sitemap). It defaults to the value in
`src/config.ts`.

## Deployment

Any static host works — `dist/` contains a `.html` file per route. The included
`public/_redirects` sends unknown paths to `index.html` so the client router can
render the 404 page (Netlify syntax).

## AI Disclaimer

This project was created and developed by a human, but an AI assistant ([Claude Code](https://claude.ai)) was used for brainstorming, code generation, design, and debugging purposes. The final implementation and design decisions were made solely by the author, and all generated code, content, and logic were reviewed, tested, and validated by the author prior to inclusion. Any errors, bugs, or issues in the final product are the responsibility of the author. The AI was a tool to assist in the creative and development process, but the vision, implementation, and final product are entirely the work of the author.