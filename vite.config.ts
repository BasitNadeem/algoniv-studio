import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Vercel-ready Vite SPA config.
// - Plain React + Vite (no SSR, no Cloudflare Worker)
// - Outputs static assets to dist/ which Vercel serves directly
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: Number(process.env.PORT) || 8080,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
