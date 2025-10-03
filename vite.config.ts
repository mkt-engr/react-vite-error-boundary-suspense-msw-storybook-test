/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
});
