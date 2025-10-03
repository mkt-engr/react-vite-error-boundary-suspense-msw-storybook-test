import ErrorBoundary from "@common/ErrorBoundary";
import { Suspense } from "react";
import { useQuote } from "./useQuote";

export const Content = () => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Suspense fallback={<Loading />}>
        <Inner />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner = () => {
  const { data } = useQuote();

  return (
    <blockquote>
      <p>"{data.quote}"</p>
      <cite>— {data.author}</cite>
    </blockquote>
  );
};

const Fallback = () => {
  return (
    <blockquote>
      <p>今日の名言の取得に失敗しました。</p>
    </blockquote>
  );
};

const Loading = () => {
  return (
    <blockquote>
      <p>今日の名言を読み込み中...</p>
    </blockquote>
  );
};
