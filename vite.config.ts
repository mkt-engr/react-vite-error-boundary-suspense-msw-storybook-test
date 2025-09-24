/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@test": path.resolve(__dirname, "src/test"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
    },
  },
});
