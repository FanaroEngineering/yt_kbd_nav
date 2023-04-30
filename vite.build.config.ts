import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: ["src/content.ts", "src/options.ts"],
      name: "YT Kbd Nav",
    },
  },
});
