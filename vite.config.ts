import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set BASE_PATH at build time so the same config works for local dev and for
// GitHub Pages project sites (which serve under /<repo-name>/).
//   - Local dev: `npm run dev`   → base = "/"
//   - Pages build:  BASE_PATH=/founders-playbook-masterclass/ npm run build
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
});
