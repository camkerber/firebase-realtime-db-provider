/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import { version } from "./package.json";
import { visualizer } from "rollup-plugin-visualizer";
import typescript from "@rollup/plugin-typescript";

console.log(`ReactFirebaseDB v${version}`);

const externals = [
  "react",
  "firebase",
  "firebase/app",
  "firebase/auth",
  "firebase/database",
  "@firebase/app",
  "@firebase/auth",
  "@firebase/database",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript(),

    // Visualize the bundle in `stats.html`.
    // Helps make sure we aren't pulling in extra deps
    visualizer({ template: "treemap" }),
  ],
  define: {
    "process.env.REACT_FIREBASE_DB_VERSION": JSON.stringify(version),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactFirebaseDB",
      fileName: "index",
    },
    rollupOptions: {
      external: externals,
      output: {
        globals: { react: "React" },
      },
    },
    sourcemap: true,
  },
});
