import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [react()],
  publicDir: command === "serve" ? resolve(root, "models") : false,
  build: {
    assetsInlineLimit: 0,
    lib: {
      entry: resolve(root, "src/index.js"),
      name: "EcorcheBody",
      fileName: () => "ecorche-body.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "three",
        /^three\//,
      ],
    },
  },
}));
