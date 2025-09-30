import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";
import { useItem } from "./useCart";

export const Content = () => {
  return (
    <ErrorBoundary fallback={<div>カートの取得に失敗しました。</div>}>
      <Suspense fallback={<div>カートのローディング</div>}>
        <Inner />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner = () => {
  const { cart } = useItem({ userId: "1" });

  if (cart.products.length === 0) {
    return <div>カートには何もありません。</div>;
  }

  return (
    <div>
      <div>カートの商品の金額:{cart.total}円</div>
      <ul>
        {cart.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};
