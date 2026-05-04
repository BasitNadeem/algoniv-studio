import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";

// Vercel-ready Vite SPA config.
// - Plain React + Vite (no SSR, no Cloudflare Worker)
// - Outputs static assets to dist/ which Vercel serves directly
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), cloudflare()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});