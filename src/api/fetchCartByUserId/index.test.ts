import { generateCartMock } from "@mocks/cart";
import { buildGetCartHandler } from "@mocks/cart/handler";
import { generateProductMock } from "@mocks/product";
import { server } from "@mocks/server";
import { fetchCartByUserId } from ".";

describe("fetchCartByUserId", () => {
  it("パースに成功する場合、カートデータが返される", async () => {
    const mockCart = generateCartMock({
      id: 1,
      userId: 1,
      totalProducts: 1,
      totalQuantity: 2,
      total: 500,
      discountedTotal: 450,
      products: [
        generateProductMock({
          id: 10,
          title: "テスト商品",
          price: 250,
          quantity: 2,
          total: 500,
          discountPercentage: 10,
          discountedTotal: 450,
          thumbnail: "https://example.com/test-product.jpg",
        }),
      ],
    });

    server.use(
      buildGetCartHandler.success({
        response: mockCart
      })
    );

    const result = await fetchCartByUserId({ userId: "1" });

    expect(result).toStrictEqual({
      id: 1,
      userId: 1,
      totalProducts: 1,
      totalQuantity: 2,
      total: 500,
      discountedTotal: 450,
      products: [
        {
          id: 10,
          title: "テスト商品",
          price: 250,
          quantity: 2,
          total: 500,
          discountPercentage: 10,
          discountedTotal: 450,
          thumbnail: "https://example.com/test-product.jpg",
        },
      ],
    });
  });

  it("パースに失敗する場合、エラーがスローされる", async () => {
    const invalidCart = generateCartMock({
      id: "invalid" as unknown as number, // numberではなくstring
      products: [],
      total: 0,
      discountedTotal: 0,
      totalProducts: 0,
      totalQuantity: 0,
    });

    server.use(
      buildGetCartHandler.success({
        response: invalidCart
      })
    );

    await expect(fetchCartByUserId({ userId: "1" })).rejects.toThrow(
      "Invalid cart data"
    );
  });

  it("500エラーレスポンスの場合、HTTPエラーがスローされる", async () => {
    server.use(
      buildGetCartHandler.error({ status: 500 })
    );

    await expect(fetchCartByUserId({ userId: "1" })).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });
});
