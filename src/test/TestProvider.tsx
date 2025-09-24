import ErrorBoundary from "@/common/ErrorBoundary";
import { Suspense, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const TestProvider = ({ children }: Props) => (
  <ErrorBoundary fallback={null}>
    <Suspense>{children}</Suspense>;
  </ErrorBoundary>
);
