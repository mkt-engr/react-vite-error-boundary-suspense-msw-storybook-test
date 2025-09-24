import { Suspense } from "react";
import ErrorBoundary from "src/common/ErrorBoundary";

export const Contents = () => {
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
    <main>
      <p>これはメインコンテンツです。</p>
    </main>
  );
};
