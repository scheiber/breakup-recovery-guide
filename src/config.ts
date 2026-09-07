/**
 * Site-wide configuration. `siteUrl` is used for canonical URLs, Open Graph
 * tags, and the generated sitemap. Override it with the VITE_SITE_URL env var
 * at build time (e.g. in the deploy environment).
 */
export const siteUrl = (
  import.meta.env.VITE_SITE_URL ?? "https://breakup-recovery-guide.netlify.app"
).replace(/\/$/, "");

export const siteName = "Breakup Recovery Guide";

export const siteDescription =
  "Overcome the pain of a breakup or divorce. Survive, heal, grow. Over 20 detailed articles on recovery. Real advice. No nonsense. And 100% free.";
