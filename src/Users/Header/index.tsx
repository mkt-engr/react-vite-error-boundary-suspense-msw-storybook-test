import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";
import { useCart } from "./useCart";

export const Header = () => {
  return (
    <ErrorBoundary fallback={<div>ヘッダーのエラー</div>}>
      <Suspense fallback={<div>ヘッダーのローディング</div>}>
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
    <header>
      <div>カートの商品の金額:{cart.total}円</div>
      <ul>
        {cart.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </header>
  );
};
