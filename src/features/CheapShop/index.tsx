import ErrorBoundary from "@common/ErrorBoundary";
import { Suspense } from "react";
import { Cart } from "./Cart";
import { ProductList } from "./ProductList";
import { Quote } from "./Quote";

export const CheapShop = () => {
  return (
    <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
      <Suspense fallback={<div>読み込み中...</div>}>
        <div>
          <h1>Super coolなECサイト</h1>
          <Cart />
          <ProductList />
          <Quote />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
