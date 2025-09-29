import { generateProductsSearchMock } from "@/mocks/product.mock";
import { server } from "@/mocks/server";
import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";
import { fetchProducts } from ".";

describe("fetchProducts", () => {
  it("正常にProductsSearchResponseを返す", async () => {
    const mockData = generateProductsSearchMock({
      products: [
        generateProductsSearchMock().products[0], // デフォルトの1つ目の商品を使用
      ],
      total: 1,
    });

    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json(mockData);
      })
    );

    const result = await fetchProducts({ query: "test" });

    expect(result.products).toHaveLength(1);
    expect(result.products[0].title).toBe("iPhone 15 Pro");
    expect(result.total).toBe(1);
  });

  it("HTTPエラーの場合はエラーを投げる", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchProducts({ query: "test" })).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });

  it("不正なデータの場合はエラーを投げる", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json({ invalid: "data" });
      })
    );

    await expect(fetchProducts({ query: "test" })).rejects.toThrow(
      "Invalid products data:"
    );
  });

  it("クエリパラメータが正しく含まれる", async () => {
    let capturedUrl = "";

    server.use(
      http.get(generateApiUrl("/products/search"), ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(generateProductsSearchMock({
          products: [],
          total: 0,
        }));
      })
    );

    await fetchProducts({ query: "iphone" });

    expect(capturedUrl).toContain("q=iphone");
  });
});