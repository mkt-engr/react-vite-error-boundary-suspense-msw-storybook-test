# Testing Libraryの設定

## Vitestの設定

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

## vitest.config.tsでimport path from "path";と\_\_dirnameでエラーが出てる

⏺ Node.jsの型定義が必要です。

Bash(pnpm add -D @types/node)
⎿ Progress: resolved 0, reused 1, downloaded 0, added 0  
 Progress: resolved 388, reused 330, downloaded 0, added 0
Packages: +26 -24
… +18 lines (ctrl+r to expand)

⏺ Read(vitest.config.ts)
⎿ Read 19 lines (ctrl+r to expand)

⏺ ES modulesでは\_\_dirnameが使えません。代わりにimport.meta.urlを使用する必要があります。
