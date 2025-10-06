import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // GitHub Pages is served from https://<user>.github.io/<repo>/
  // ensure base matches the repository name (case-sensitive path)
  base: "/asterisk/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  build: {
    // Split vendor libraries into separate chunks to avoid one huge bundle
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three")) return "vendor_three";
            if (id.includes("plotly.js")) return "vendor_plotly";
            if (id.includes("antd")) return "vendor_antd";
            return "vendor";
          }
        },
      },
    },
    // Raise warning limit since some assets are large but splitable
    chunkSizeWarningLimit: 2000,
  },
});
