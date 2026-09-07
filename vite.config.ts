/// <reference types="vite-react-ssg" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { parse as parseYaml } from "yaml";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Compiles `src/content/*.md` to a JS module exporting `{ frontmatter, body }`,
 * parsing the YAML frontmatter at build time so the `yaml` parser never ships
 * to the browser.
 */
function markdownContent(): Plugin {
  return {
    name: "markdown-content",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md")) return null;
      const match = code.match(FRONTMATTER);
      const frontmatter = match ? (parseYaml(match[1]) ?? {}) : {};
      const body = match ? code.slice(match[0].length).replace(/^\s+/, "") : code;
      return {
        code:
          `export const frontmatter = ${JSON.stringify(frontmatter)};\n` +
          `export const body = ${JSON.stringify(body)};\n`,
        map: { mappings: "" },
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    markdownContent(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "icon.svg"],
      manifest: {
        name: "Breakup Recovery Guide",
        short_name: "Recovery Guide",
        description:
          "An honest, detailed guide to recovering from a breakup or divorce.",
        theme_color: "#e50a34",
        background_color: "#1c1a22",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/pwa-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,ico,xml,txt}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 3_000_000,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    entry: "src/main.tsx",
    dirStyle: "flat",
    script: "async",
    // vite-react-ssg injects the per-route <head> tags right after `<head>`,
    // which pushes the charset declaration past the first 1024 bytes. Move it
    // back to the front.
    onPageRendered(_route, html) {
      return html
        .replace(/\s*<meta charset="[^"]*"\s*\/?>/i, "")
        .replace("<head>", '<head><meta charset="utf-8">');
    },
  },
});
