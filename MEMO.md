# Testing Libraryの設定

- Vitestの設定

下記のようにすると自動クリーンアップがされる

https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest

```tsx
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
});
```
