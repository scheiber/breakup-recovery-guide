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

Every article lives in `src/content/<slug>.md` as plain Markdown. The reading
order, titles, subtitles, and hero images are defined in
[`src/utils/articles.ts`](src/utils/articles.ts); each entry's `slug` must match a
Markdown filename.

To add an article:

1. Create `src/content/my-new-article.md`.
2. Add a matching entry to the `articles` array in `src/utils/articles.ts`.

Prev/next navigation, the article index, search, and the sitemap all update
automatically.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/content/` | Article bodies (Markdown) |
| `src/utils/articles.ts` | Ordered article manifest + lookup helpers |
| `src/utils/articleContent.ts` | Loads Markdown bodies via `import.meta.glob` |
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