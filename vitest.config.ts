/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/vitest.setup.ts"],
    globals: true,
  },
  plugins: [react(), tsconfigPaths()],
});
