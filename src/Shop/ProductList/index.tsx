import { useState } from "react";
import { Results } from "./Results";

export const ProductList = () => {
  const [query, setQuery] = useState("");

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
      <Results query={query} />
    </main>
  );
};
