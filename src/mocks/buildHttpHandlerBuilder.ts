import {
  delay,
  http,
  HttpHandler,
  HttpResponse,
  type JsonBodyType,
  type Path,
} from "msw";

type SuccessHandlerOptions = {
  response?: JsonBodyType;
  onPathParams?: (params: unknown) => void;
  onRequestBody?: (body: unknown) => void;
  onRequestSearchParams?: (searchParams: Record<string, string>) => void;
};

type LoadingHandlerOptions = {
  delay?: number;
  response?: JsonBodyType;
};

type ErrorHandlerOptions = {
  status: number;
  errorCode?: string;
  statusText?: string;
  response?: JsonBodyType;
};

type HttpHandlerMethods = {
  success: (options?: SuccessHandlerOptions) => HttpHandler;
  loading: (options?: LoadingHandlerOptions) => HttpHandler;
  error: (options: ErrorHandlerOptions) => HttpHandler;
};

type BuildHttpHandlerBuilderOptions = {
  path: Path;
  method: keyof typeof http;
  defaultResponse?: JsonBodyType;
};

/**
 * ハンドラを生成する関数
 *
 * @link {https://tech.jxpress.net/entry/2025/01/14/103618 こちらの記事を参考にした。}
 *
 * @example
 * // ハンドラー生成用関数を作成（デフォルトレスポンス付き）
 * const handlers = buildHttpHandlerBuilder({
 *   path: "/api/v1/users",
 *   method: "get",
 *   defaultResponse: generateUsersMock(),
 * });
 *
 * // 正常系: デフォルトレスポンスを使う
 * const successHandler1 = handlers.success();
 *
 * // 正常系: レスポンスを上書き
 * const successHandler2 = handlers.success({
 *   response: { items: [generateMockUser({ name: "JX太郎" })] },
 * });
 *
 * // 正常系: リクエストをキャプチャ
 * const onRequestSearchParams = vi.fn();
 * const onPathParams = vi.fn();
 * const onRequestBody = vi.fn();
 * const successHandler3 = handlers.success({
 *   response: { id: 123, name: "更新太郎" },
 *   onRequestSearchParams,
 *   onPathParams,
 *   onRequestBody,
 * });
 *
 * // loading: 無限ローディング（デフォルトレスポンス使用）
 * const loadingHandler1 = handlers.loading();
 *
 * // loading: 3秒後に正常レスポンス（デフォルトレスポンス使用）
 * const loadingHandler2 = handlers.loading({ delay: 3000 });
 *
 * // loading: 無限ローディング（レスポンス上書き）
 * const loadingHandler3 = handlers.loading({
 *   response: generateMockUser({ name: "カスタムユーザー" }),
 * });
 *
 * // 異常系: エラーコード付き（デフォルトレスポンス使用）
 * const errorHandler1 = handlers.error({
 *   status: 404,
 *   errorCode: "NOT_FOUND",
 * });
 *
 * // 異常系: エラーコードなし（デフォルトレスポンス使用）
 * const errorHandler2 = handlers.error({ status: 500 });
 *
 * // 異常系: カスタムエラーレスポンス付き
 * const errorHandler3 = handlers.error({
 *   status: 400,
 *   errorCode: "VALIDATION_ERROR",
 *   statusText: "Bad Request",
 *   response: { message: "Invalid input", errors: ["name is required"] },
 * });
 *
 * @param options - ハンドラビルダーのオプション
 * @param options.path - APIのパス
 * @param options.method - HTTPメソッド (get, post, put, delete等)
 * @param options.defaultResponse - デフォルトのレスポンスボディ
 * @returns HttpHandlerMethods
 */
export const buildHttpHandlerBuilder = ({
  path,
  method,
  defaultResponse,
}: BuildHttpHandlerBuilderOptions): HttpHandlerMethods => {
  return {
    success: (options: SuccessHandlerOptions = {}): HttpHandler =>
      http[method](path, async (req) => {
        const searchParamsObject = Object.fromEntries(
          new URL(req.request.url).searchParams
        );
        options.onRequestSearchParams?.(searchParamsObject);
        /** @link {https://mswjs.io/docs/api/http/#httpget} ここでパスパラメータを取得できる */
        options.onPathParams?.(req.params);
        options.onRequestBody?.(await req.request.json());
        return HttpResponse.json(options.response ?? defaultResponse, {
          status: 200,
          statusText: "ok",
        });
      }),

    loading: (options: LoadingHandlerOptions = {}): HttpHandler =>
      http[method](path, async () => {
        await delay(options.delay ?? "infinite");
        return HttpResponse.json(options.response ?? defaultResponse, {
          status: 200,
          statusText: "ok",
        });
      }),

    error: (options: ErrorHandlerOptions): HttpHandler =>
      http[method](path, async () => {
        return HttpResponse.json(options.response ?? defaultResponse, {
          status: options.status ?? 500,
          statusText: options.statusText ?? "error",
        });
      }),
  };
};
