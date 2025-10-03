/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@test": path.resolve(__dirname, "src/test"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@api": path.resolve(__dirname, "src/api"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@common": path.resolve(__dirname, "src/common"),
      "@schemes": path.resolve(__dirname, "src/schemes"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/vitest.setup.ts"],
    globals: true,
  },
  plugins: [react()],
});
