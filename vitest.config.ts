/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/test/vitest.setup.ts"],
  },
  plugins: [react()],
});
