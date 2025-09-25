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
  const { data } = useCart({ userId: "1" });
  return (
    <header>
      {data.products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </header>
  );
};
