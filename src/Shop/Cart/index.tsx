import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";
import { useCart } from "./useCart";

export const Cart = () => {
  return (
    <ErrorBoundary fallback={<div>カートの取得に失敗しました。</div>}>
      <Suspense fallback={<div>カートのローディング</div>}>
        <h2>カート</h2>
        <Inner />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner = () => {
  const { cart } = useCart({ userId: "1" });

  if (cart.products.length === 0) {
    return <header>カートには何もありません。</header>;
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
