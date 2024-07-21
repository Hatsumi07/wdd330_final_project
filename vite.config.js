import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        recipe_listing: resolve(__dirname, "src/recipe_listing/index.html"),
        recipe: resolve(__dirname, "src/recipe_pages/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
      },
    },
  },
});