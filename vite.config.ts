import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
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
  plugins: [markdownContent(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
