import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";
import { useCart } from "./useCart";

export const Header = () => {
  return (
    <ErrorBoundary fallback={<div>エラー</div>}>
      <Suspense fallback={<div>ローディング</div>}>
        <Inner />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner = () => {
  const { data } = useCart({ userId: "1" });
  return (
    <header>
      <p>これはヘッダーです。</p>
      {data.products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </header>
  );
};
