# 記事の構想

データフェッチがいい
ヘッダー、コンテンツ、フッターで分ける感じで

このダミーAPIはクエパラも自由に使えるっぽい
https://dummyjson.com/docs

こんな感じ
https://dummyjson.com/users/search?q=mor
https://dummyjson.com/users/search?q=Johnson
https://dummyjson.com/users/search?q=mor
https://dummyjson.com/users/search?limit=10&skip=5&select=key1&select=key2&select=key3'

ユーザーを管理するページ

- ヘッダー：管理者のメールアドレスを取得、画像でもいいかな？
  - https://dummyjson.com/docs/image この辺り参照
- コンテンツ：ユーザーの一覧を取得、検索ボックスをつける,ついでにuseDeferredValueの勉強もできる
- フッター：なんらかのデータを表示したい（最悪なくてもいいかも）

ヘッダーにカート
https://dummyjson.com/docs/carts#carts-user
コンテンツにプロダクト一覧でもいいかな
https://dummyjson.com/docs/products#products-all
ヘッダーは画像？
https://dummyjson.com/docs/image

- 適当にSuspenseやErrorBoundaryをつけていませんか？的な導入で入る感じで
- 画像が読み込まれないと全部見えなくなるのは意味が分かりませんよね？的な

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

## user-eventを使えるようにする

> user-eventが使えるようにモジュールを追加して

Bash(pnpm add -D @testing-library/user-event)
⎿ Progress: resolved 0, reused 1, downloaded 0, added 0  
 Progress: resolved 485, reused 430, downloaded 0, added 0
Already up to date

# Suspense

https://ja.react.dev/reference/react/Suspense

`useDeferredValue`を使ってる
https://ja.react.dev/reference/react/Suspense#showing-stale-content-while-fresh-content-is-loading

`useDeferredValue`についてはこちら
https://ja.react.dev/reference/react/useDeferredValue

# ErrorBoundary

TODO

# TanStack Queryの設定

fetchとかaxiosとかだと結局キャッシュの機構とかを自前で作る必要がある。
おとなしくTanStack Queryのセットアップをするか

このページを見てセットアップ
https://tanstack.com/query/latest/docs/framework/react/installation

```sh
pnpm add @tanstack/react-query
pnpm add -D @tanstack/eslint-plugin-query
```

onClick時にuseSuspenseQueryを実行したい
https://zenn.dev/chot/articles/4b484d45eae424#2.-usesuspensequery-%E3%83%99%E3%83%BC%E3%82%B9%E6%89%8B%E6%B3%95-%F0%9F%8C%9F

# MSW

- [サーバーに送信したリクエストを検査する](https://tech.jxpress.net/entry/2025/01/14/103618#:~:text=%E3%82%B5%E3%83%BC%E3%83%8F%E3%82%99%E3%83%BC%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%97%E3%81%9F%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%92%E6%A4%9C%E6%9F%BB%E3%81%99%E3%82%8B)
- [Nextjs,GraphQLでMSWを使えるようにする](https://creators.bengo4.com/entry/2024/10/10/083000)

# （いらんかも）Connect for　TanStack Query

https://connectrpc.com/docs/web/query/getting-started/

TODO
