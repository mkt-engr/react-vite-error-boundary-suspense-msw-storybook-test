import ErrorBoundary from "@/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

type Props = {
  children: ReactNode;
};

export const TestProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={null}>
      <Suspense>{children}</Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);
