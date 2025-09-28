import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense } from "react";
import { useQuote } from "./useQuote";

export const Quote = () => {
  return (
    <ErrorBoundary fallback={<div>名言の読み込みでエラーが発生しました</div>}>
      <Suspense fallback={<div>今日の名言を読み込み中...</div>}>
        <Inner />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner = () => {
  const { data } = useQuote();

  return (
    <footer>
      <h3>今日の名言</h3>
      <blockquote>
        <p>"{data.quote}"</p>
        <cite>— {data.author}</cite>
      </blockquote>
    </footer>
  );
};