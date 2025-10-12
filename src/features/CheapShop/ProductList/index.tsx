import { useDeferredValue, useState } from "react";
import { Result } from "./Result";

export const ProductList = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <section>
      <h2>商品一覧</h2>
      <label>
        検索
        <input
          type="text"
          name="検索"
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {query !== deferredQuery ? <span>検索中</span> : null}
      <Result query={deferredQuery} />
    </section>
  );
};
