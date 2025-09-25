import ErrorBoundary from "@/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const TestProvider = ({ children }: Props) => {
  //NOTE:Storybookやテストごとに新たにクライアントを作らないと最初の表示したものが別のケースに依存してしまう。
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={null}>
        <Suspense>{children}</Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
