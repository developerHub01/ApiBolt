import path, { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    esbuild: {
      drop: ["console", "debugger"],
    },
    resolve: {
      alias: {
        "@/main": resolve("src/main"),
        "@/data": resolve("src/data"),
        "@shared": resolve("src/shared"),
      },
    },
    build: {
      rollupOptions: {
        external: ["@libsql/client", "node-machine-id"],
      },
    },
  },
  preload: {
    esbuild: {
      drop: ["console", "debugger"],
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    assetsInclude: "src/renderer/assets/**",
    esbuild: {
      drop: ["console", "debugger"],
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@shared": resolve("src/shared"),
        "@": resolve("src/renderer/src"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "src/renderer/index.html"),
          splash: path.resolve(__dirname, "src/renderer/splash.html"),
          "local-password": path.resolve(
            __dirname,
            "src/renderer/local-password.html",
          ),
        },
      },
    },
    plugins: [react(), tailwindcss()],
  },
});
