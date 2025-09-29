import { generateApiUrl } from "@/test/generateApiUrl";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { fetchProducts } from ".";

describe("fetchProducts", () => {
  it("正常にProductsSearchResponseを返す", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json({
          products: [
            {
              id: 1,
              title: "Test Product",
              description: "Test Description",
              category: "Test Category",
              price: 100,
              discountPercentage: 10,
              rating: 4.5,
              stock: 50,
              brand: "Test Brand",
              sku: "TEST-001",
              weight: 1,
              tags: ["test"],
              images: ["https://example.com/image.jpg"],
              thumbnail: "https://example.com/thumb.jpg",
            },
          ],
          total: 1,
          skip: 0,
          limit: 30,
        });
      })
    );

    const result = await fetchProducts({ query: "test" });

    expect(result.products).toHaveLength(1);
    expect(result.products[0].title).toBe("Test Product");
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
        return HttpResponse.json({
          products: [],
          total: 0,
          skip: 0,
          limit: 30,
        });
      })
    );

    await fetchProducts({ query: "iphone" });

    expect(capturedUrl).toContain("q=iphone");
  });
});