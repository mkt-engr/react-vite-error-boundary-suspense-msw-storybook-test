import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./common/ErrorBoundary.tsx";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  // 環境変数でMSWを有効にする場合のみ起動
  if (import.meta.env.ENABLE_MOCK !== "true") {
    console.log("MSW is disabled. Use 'pnpm dev:mock' to enable MSW.");
    return;
  }

  const { worker } = await import("./mocks/browsers.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  console.log("MSW is enabled");
  return worker.start();
}

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={null}>
          <Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  )
);
