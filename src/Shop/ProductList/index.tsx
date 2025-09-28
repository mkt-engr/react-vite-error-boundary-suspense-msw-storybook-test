import { useDeferredValue, useState } from "react";
import { Results } from "./Results";

export const ProductList = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <main>
      <h2>商品一覧</h2>
      <label>
        検索
        <input
          type="text"
          name="検索"
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {isStale ? <span>検索中</span> : null}
      <Results query={deferredQuery} />
    </main>
  );
};
