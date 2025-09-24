import { Suspense } from "react";
import ErrorBoundary from "@/common/ErrorBoundary";

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
  return (
    <header>
      <p>これはヘッダーです。</p>
    </header>
  );
};