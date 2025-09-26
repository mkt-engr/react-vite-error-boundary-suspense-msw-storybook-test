import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/mocks/server";
import type { Cart } from "@/schemes/cart";
import { fetchCartByUserId } from "./fetchCartByUserId";

describe("fetchCartByUserId", () => {
  it("パースに成功する場合、カートデータが返される", async () => {
    const mockCart: Cart = {
      id: 1,
      products: [
        {
          id: 1,
          title: "商品1",
          price: 100,
          quantity: 1,
          total: 100,
          discountPercentage: 0,
          discountedTotal: 100,
          thumbnail: "https://example.com/image1.jpg",
        },
      ],
      total: 100,
      discountedTotal: 100,
      userId: 1,
      totalProducts: 1,
      totalQuantity: 1,
    };

    server.use(
      http.get(generateApiUrl("/carts/1"), () => {
        return HttpResponse.json(mockCart);
      })
    );

    const result = await fetchCartByUserId({ userId: "1" });

    expect(result).toEqual(mockCart);
  });

  it("パースに失敗する場合、エラーがスローされる", async () => {
    server.use(
      http.get(generateApiUrl("/carts/1"), () => {
        return HttpResponse.json({
          id: "invalid", // numberではなくstring
          products: [],
        });
      })
    );

    await expect(fetchCartByUserId({ userId: "1" })).rejects.toThrow(
      "Invalid cart data"
    );
  });

  it("500エラーレスポンスの場合、HTTPエラーがスローされる", async () => {
    server.use(
      http.get(generateApiUrl("/carts/1"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchCartByUserId({ userId: "1" })).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });
});