import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";
import { useProducts } from "./useProducts";

export const Contents = () => {
  return (
    <ErrorBoundary fallback={<div>商品一覧でエラーが発生しました</div>}>
      <Suspense fallback={<div>商品一覧を読み込み中...</div>}>
        <Inner />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner = () => {
  const { data } = useProducts();

  if (data.products.length === 0) {
    return (
      <main>
        <h2>商品がありませんでした。</h2>
      </main>
    );
  }

  return (
    <main>
      <h2>商品一覧 ({data.total}件)</h2>
      <div>
        {data.products.map((product) => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div>${product.price}</div>
            <hr />
          </div>
        ))}
      </div>
    </main>
  );
};
