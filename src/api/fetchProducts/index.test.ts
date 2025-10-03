import {
  generateProductInSearchMock,
  generateProductsSearchMock,
} from "@mocks/product";
import { buildGetProductsSearchHandler } from "@mocks/product/handler";
import { server } from "@mocks/server";
import { vi } from "vitest";
import { fetchProducts } from ".";

describe("fetchProducts", () => {
  it("正常にProductsSearchResponseを返し、クエリパラメータが正しく含まれる", async () => {
    const onRequestSearchParams = vi.fn();
    const mockData = generateProductsSearchMock({
      products: [
        generateProductInSearchMock({
          id: 10,
          title: "テスト商品",
          description: "テスト用の商品説明",
          price: 1000,
        }),
      ],
      total: 1,
    });

    server.use(
      buildGetProductsSearchHandler.success({
        response: mockData,
        onRequestSearchParams,
      })
    );

    const { products, total } = await fetchProducts({ query: "test" });

    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({
      title: "テスト商品",
      description: "テスト用の商品説明",
      price: 1000,
    });
    expect(total).toBe(1);
    expect(onRequestSearchParams).toBeCalledWith({ q: "test" });
  });

  it("HTTPエラーの場合はエラーを投げる", async () => {
    server.use(buildGetProductsSearchHandler.error({ status: 500 }));

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
        response: invalidData,
      })
    );

    await expect(fetchProducts({ query: "test" })).rejects.toThrow(
      "Invalid products data:"
    );
  });
});
