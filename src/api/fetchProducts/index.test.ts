import { generateProductsSearchMock, generateProductInSearchMock } from "@mocks/product";
import { buildGetProductsSearchHandler } from "@mocks/product/handler";
import { server } from "@mocks/server";
import { vi } from "vitest";
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
      buildGetProductsSearchHandler.success({
        response: mockData
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
      buildGetProductsSearchHandler.error({ status: 500 })
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
      buildGetProductsSearchHandler.success({
        response: invalidData
      })
    );

    await expect(fetchProducts({ query: "test" })).rejects.toThrow(
      "Invalid products data:"
    );
  });

  it("クエリパラメータが正しく含まれる", async () => {
    let capturedUrl = "";
    const capturedSearchParams = vi.fn();

    server.use(
      buildGetProductsSearchHandler.success({
        response: generateProductsSearchMock({
          products: [],
          total: 0,
        }),
        onRequestSearchParams: (searchParams) => {
          capturedUrl = `https://dummyjson.com/products/search?${searchParams.toString()}`;
          capturedSearchParams(searchParams);
        }
      })
    );

    await fetchProducts({ query: "iphone" });

    expect(capturedUrl).toContain("q=iphone");
  });
});