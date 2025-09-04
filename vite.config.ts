import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/ui"),
    },
  },
  build: {
    outDir: "dist-react",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        splash: path.resolve(__dirname, "splash.html"),
      },
    },
  },
});
