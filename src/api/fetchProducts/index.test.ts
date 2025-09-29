import { generateProductsSearchMock, generateProductInSearchMock } from "@/mocks/product.mock";
import { server } from "@/mocks/server";
import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";
import { fetchProducts } from ".";

describe("fetchProducts", () => {
  it("正常にProductsSearchResponseを返す", async () => {
    const mockData = generateProductsSearchMock({
      products: [
        generateProductInSearchMock({
          id: 10,
          title: "テスト商品",
          description: "テスト用の商品説明",
          category: "テストカテゴリ",
          price: 1000,
          discountPercentage: 5,
          rating: 4.5,
          stock: 20,
          brand: "テストブランド",
          sku: "TEST-SKU-001",
          weight: 1.5,
          tags: ["テスト", "商品"],
          images: ["https://example.com/test-image.jpg"],
          thumbnail: "https://example.com/test-thumb.jpg",
        }),
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
    expect(result.products[0].title).toBe("テスト商品");
    expect(result.products[0].description).toBe("テスト用の商品説明");
    expect(result.products[0].price).toBe(1000);
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
    const invalidData = generateProductsSearchMock({
      products: [
        generateProductInSearchMock({
          id: "invalid" as unknown as number, // numberではなくstring
          title: "テスト商品",
        }),
      ],
    });

    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json(invalidData);
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