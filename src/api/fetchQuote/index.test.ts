import { generateQuoteMock } from "@/mocks/quota";
import { buildGetQuoteMswHandler } from "@/mocks/quota/handler";
import { server } from "@/mocks/server";
import { fetchQuote } from ".";

describe("fetchQuote", () => {
  it("正常にQuoteResponseを返す", async () => {
    const mockQuote = generateQuoteMock({
      id: 1,
      quote: "テストの名言",
      author: "テスト太郎",
    });

    server.use(
      buildGetQuoteMswHandler.success({
        response: mockQuote
      })
    );

    const result = await fetchQuote();

    expect(result.id).toBe(1);
    expect(result.quote).toBe("テストの名言");
    expect(result.author).toBe("テスト太郎");
  });

  it("HTTPエラーの場合はエラーを投げる", async () => {
    server.use(
      buildGetQuoteMswHandler.error({ status: 500 })
    );

    await expect(fetchQuote()).rejects.toThrow("HTTP error! status: 500");
  });

  it("不正なデータの場合はエラーを投げる", async () => {
    server.use(
      buildGetQuoteMswHandler.success({
        response: { invalid: "data" } as any
      })
    );

    await expect(fetchQuote()).rejects.toThrow("Invalid quote data:");
  });
});