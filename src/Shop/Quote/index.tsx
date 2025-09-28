import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";
import { useQuote } from "./useQuote";

export const Quote = () => {
  return (
    <ErrorBoundary fallback={<div>今日の名言の取得に失敗しました。</div>}>
      <Suspense fallback={<div>今日の名言を読み込み中...</div>}>
        <Inner />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner = () => {
  const { data } = useQuote();

  return (
    <div>
      <h2>今日の名言</h2>
      <blockquote>
        <p>"{data.quote}"</p>
        <cite>— {data.author}</cite>
      </blockquote>
    </div>
  );
};
