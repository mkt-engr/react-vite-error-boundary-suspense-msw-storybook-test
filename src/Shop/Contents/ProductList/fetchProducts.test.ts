import { server } from "@/mocks/server";
import type { ProductsSearchResponse } from "@/schemes/product";
import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";
import { fetchProducts } from "./fetchProducts";

describe("fetchProducts", () => {
  it("パースに成功する場合、商品データが返される", async () => {
    const mockProductsResponse: ProductsSearchResponse = {
      products: [
        {
          id: 1,
          title: "iPhone 9",
          description: "An apple mobile which is nothing like apple",
          category: "smartphones",
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: "Apple",
          sku: "WW013001",
          weight: 2,
          tags: ["smartphones", "apple"],
          images: ["https://cdn.dummyjson.com/product-images/1/1.jpg"],
          thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        },
      ],
      total: 1,
      skip: 0,
      limit: 30,
    };

    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json(mockProductsResponse);
      })
    );

    const result = await fetchProducts({ query: "" });

    expect(result).toEqual(mockProductsResponse);
  });

  it("パースに失敗する場合、エラーがスローされる", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json({
          products: [
            {
              id: "invalid", // numberではなくstring
              title: "iPhone 9",
            },
          ],
          total: 1,
        });
      })
    );

    await expect(fetchProducts({ query: "" })).rejects.toThrow(
      "Invalid products data"
    );
  });

  it("500エラーレスポンスの場合、HTTPエラーがスローされる", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchProducts({ query: "" })).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });
});
