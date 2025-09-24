import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import ErrorBoundary from "./common/ErrorBoundary.tsx";
import "./index.css";

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browsers.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={null}>
          <Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  )
);
