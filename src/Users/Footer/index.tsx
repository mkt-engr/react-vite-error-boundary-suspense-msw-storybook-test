import { Suspense } from "react";
import ErrorBoundary from "@/common/ErrorBoundary";

export const Footer = () => {
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
    <footer>
      <p>これはフッターです。</p>
    </footer>
  );
};