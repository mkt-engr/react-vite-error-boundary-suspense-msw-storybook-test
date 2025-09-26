import { customRender } from "@/test/customRender";
import { generateApiUrl } from "@/test/generateApiUrl";
import { screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/mocks/server";
import type { Cart } from "@/schemes/cart";
import { Header } from ".";

describe("Header", () => {
  it("商品が3つある場合、商品一覧と合計金額が表示される", async () => {
    server.use(
      http.get(generateApiUrl("/carts/1"), () => {
        return HttpResponse.json({
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
            {
              id: 2,
              title: "商品2",
              price: 200,
              quantity: 2,
              total: 400,
              discountPercentage: 5,
              discountedTotal: 380,
              thumbnail: "https://example.com/image2.jpg",
            },
            {
              id: 3,
              title: "商品3",
              price: 300,
              quantity: 1,
              total: 300,
              discountPercentage: 10,
              discountedTotal: 270,
              thumbnail: "https://example.com/image3.jpg",
            },
          ],
          total: 800,
          discountedTotal: 750,
          userId: 1,
          totalProducts: 3,
          totalQuantity: 4,
        } satisfies Cart);
      })
    );

    customRender(<Header />);

    await screen.findByText("カートの商品の金額:800円");

    expect(screen.getByText("商品1")).toBeInTheDocument();
    expect(screen.getByText("商品2")).toBeInTheDocument();
    expect(screen.getByText("商品3")).toBeInTheDocument();
  });

  it("商品が0の場合、空カートメッセージが表示される", async () => {
    server.use(
      http.get(generateApiUrl("/carts/1"), () => {
        return HttpResponse.json({
          id: 1,
          products: [],
          total: 0,
          discountedTotal: 0,
          userId: 1,
          totalProducts: 0,
          totalQuantity: 0,
        } satisfies Cart);
      })
    );

    customRender(<Header />);

    expect(await screen.findByText("カートには何もありません。")).toBeInTheDocument();
  });

  it("ローディング中はローディングメッセージが表示される", async () => {
    server.use(
      http.get(generateApiUrl("/carts/1"), async () => {
        await delay("infinite");
      })
    );

    customRender(<Header />);

    expect(screen.getByText("ヘッダーのローディング")).toBeInTheDocument();
  });

  it("エラー発生時はエラーメッセージが表示される", async () => {
    server.use(
      http.get(generateApiUrl("/carts/1"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    customRender(<Header />);

    expect(await screen.findByText("ヘッダーのエラー")).toBeInTheDocument();
  });
});