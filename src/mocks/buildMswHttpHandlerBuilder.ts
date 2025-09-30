import {
  http,
  HttpHandler,
  HttpResponse,
  type JsonBodyType,
  type Path,
} from "msw";

type MswHttpHandlerBuilderProps = {
  response?: JsonBodyType;
  status?: number;
  statusText?: string;
  onPathParams?: (params: unknown) => void;
  onRequestBody?: (body: unknown) => void;
  onRequestSearchParams?: (searchParams: URLSearchParams) => void;
};

type BuildMswHttpHandlerBuilderProps = {
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
 * export const buildGetUsersMswHandler =
 *  buildMswHttpHandlerBuilder({
 *  path: "/api/v1/users",
 *  method: "get",
 *  defaultResponse: generateUsersMock(),
 *  });
 *
 * // デフォルトレスポンスを使う
 * const handler1 = buildGetUsersMswHandler({});
 *
 * // レスポンスを上書き
 * const handler2 = buildGetUsersMswHandler({
 *  response: { items: [generateMockUser({ name: "JX太郎" })] },
 * });
 *
 * @param param0
 * @returns HttpHandler
 */
export const buildMswHttpHandlerBuilder = ({
  path,
  method,
  defaultResponse,
}: BuildMswHttpHandlerBuilderProps) => {
  return (props: MswHttpHandlerBuilderProps = {}): HttpHandler =>
    http[method](path, async (req) => {
      props.onRequestSearchParams?.(new URL(req.request.url).searchParams);
      props.onPathParams?.(req.params);
      props.onRequestBody?.(await req.request.json());
      return HttpResponse.json(props.response ?? defaultResponse, {
        status: props.status ?? 200,
        statusText: props.statusText ?? "ok",
      });
    });
};
