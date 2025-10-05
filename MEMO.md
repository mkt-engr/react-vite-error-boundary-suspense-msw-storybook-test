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

ProductListコンポーネントにuseDeferredValueを追加したパフォーマンス改善

変更内容:

- useDeferredValueを使用して検索入力の遅延処理を実装
- ユーザーが検索ボックスに入力している間、APIリクエストが頻繁に発生することを防止
- より良い検索体験とパフォーマンスの最適化

これでユーザーが素早くタイピングしても、最終的な入力値でのみAPIが呼び出されるようになり、不要なリ
クエストを削減できます。

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
  - ハンドラを生成するUtilityについて書いてある
- [Nextjs,GraphQLでMSWを使えるようにする](https://creators.bengo4.com/entry/2024/10/10/083000)

# （いらんかも）Connect for　TanStack Query

https://connectrpc.com/docs/web/query/getting-started/

TODO

# 304 NotModifiedってなに

⏺ 304 Not ModifiedはHTTPステータスコードの一つで、「リソースが変更されていない」という意味です。

304 Not Modifiedの仕組み

初回リクエスト:
Client → Server: GET /api/products
Server → Client: 200 OK + データ + ETag: "abc123"

2回目のリクエスト:
Client → Server: GET /api/products + If-None-Match: "abc123"
Server → Client: 304 Not Modified (データなし)

メリット

1. 帯域幅の節約: データを再送信しない
2. 高速化: 小さなレスポンスサイズ
3. サーバー負荷軽減: 処理が軽い

ブラウザでの表示

DevToolsのNetworkタブで：

- Size: (from disk cache) または小さなサイズ
- Status: 304
- Time: 通常のリクエストより高速

APIでの実装例

// サーバー側
app.get('/api/products', (req, res) => {
const etag = generateETag(products);

    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end(); // 304を返す
    }

    res.set('ETag', etag);
    res.json(products);

});

つまり304は正常な状態で、キャッシュが効いているサインです。エラーではありません。

# vite.config.ts、vitest.config.ts、tsconfig.jsonでエイリアスを三重管理していたのをやめる

> エイリアスをtscondig.jsonとvitest.config.tsで2回書くのは面倒\
> 1回で済むようにする方法を教えて

⏺ vite-tsconfig-paths
プラグインを使えば、tsconfig.jsonの設定だけで済みます。

手順：

1. プラグインをインストール
   pnpm add -D vite-tsconfig-paths

2. vite.config.ts と vitest.config.ts を更新

// vite.config.ts
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
plugins: [react(), tsconfigPaths()],
});

// vitest.config.ts
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const \_\_dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
plugins: [react(), tsconfigPaths()],
test: {
environment: "jsdom",
setupFiles: ["./src/test/vitest.setup.ts"],
globals: true,
},
});

3. 設定ファイルからエイリアス定義を削除
   - resolve.alias の部分を削除すれば、tsconfig.jsonの paths

だけで管理できます

これで、エイリアスの設定は tsconfig.json だけ で完結します。

# onRequestParamsのアサーション

builderで

```
type SuccessHandlerOptions = {
  response?: JsonBodyType;
  onPathParams?: (params: unknown) => void;
  onRequestBody?: (body: unknown) => void;
  onRequestSearchParams?: (searchParams: URLSearchParams) => void;
};
---
  success: (options: SuccessHandlerOptions = {}): HttpHandler =>
      http[method](path, async (req) => {
        options.onRequestSearchParams?.(new URL(req.request.url).searchParams);
```

の場合、アサーションは下記のようになる。

```tsx
expect(onRequestSearchParams).toBeCalledWith(new URLSearchParams("q=phone a"));
```

ただ、毎回`new URLSearchParams`をするのがめんどくさいので変えた。

# Chromaticに自分のStorybookを公開

ここからやる
https://www.chromatic.com/apps?accountId=65f834004dd2925643854a11
