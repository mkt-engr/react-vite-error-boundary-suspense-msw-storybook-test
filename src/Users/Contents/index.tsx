import { useState } from "react";
import { ProductList } from "./ProductList";

export const Contents = () => {
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
      <ProductList query={query} />
    </main>
  );
};
