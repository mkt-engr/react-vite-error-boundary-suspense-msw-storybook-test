import { generateQuoteMock } from "@/mocks/quota.mock";
import { server } from "@/mocks/server";
import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";
import { fetchQuote } from ".";

describe("fetchQuote", () => {
  it("正常にQuoteResponseを返す", async () => {
    const mockQuote = generateQuoteMock({
      id: 1,
      quote: "テストの名言",
      author: "テスト太郎",
    });

    server.use(
      http.get(generateApiUrl("/quotes/random"), () => {
        return HttpResponse.json(mockQuote);
      })
    );

    const result = await fetchQuote();

    expect(result.id).toBe(1);
    expect(result.quote).toBe("テストの名言");
    expect(result.author).toBe("テスト太郎");
  });

  it("HTTPエラーの場合はエラーを投げる", async () => {
    server.use(
      http.get(generateApiUrl("/quotes/random"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchQuote()).rejects.toThrow("HTTP error! status: 500");
  });

  it("不正なデータの場合はエラーを投げる", async () => {
    server.use(
      http.get(generateApiUrl("/quotes/random"), () => {
        return HttpResponse.json({ invalid: "data" });
      })
    );

    await expect(fetchQuote()).rejects.toThrow("Invalid quote data:");
  });
});