import { generateCartMock } from "@/mocks/cart";
import { generateProductMock } from "@/mocks/product";
import { server } from "@/mocks/server";
import { customRender } from "@/test/customRender";
import { screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { Item as Component } from ".";

describe("Item", () => {
  it("商品が3つある場合、商品一覧と合計金額が表示される", async () => {
    server.use(
      http.get("https://dummyjson.com/carts/1", () => {
        return HttpResponse.json(
          generateCartMock({
            products: [1, 2, 3].map((num) =>
              generateProductMock({ id: num, title: `商品${num}` })
            ),
            total: 800,
          })
        );
      })
    );

    customRender(<Component />);

    await screen.findByText("カートの商品の金額:800円");

    expect(screen.getByText("商品1")).toBeInTheDocument();
    expect(screen.getByText("商品2")).toBeInTheDocument();
    expect(screen.getByText("商品3")).toBeInTheDocument();
  });

  it("商品が多数ある場合、すべての商品が表示される", async () => {
    server.use(
      http.get("https://dummyjson.com/carts/1", () => {
        return HttpResponse.json(
          generateCartMock({
            products: [1, 2, 3, 4, 5, 6, 7, 8].map((num) =>
              generateProductMock({ id: num, title: `商品${num}` })
            ),
            total: 5000,
          })
        );
      })
    );

    customRender(<Component />);

    await screen.findByText("カートの商品の金額:5000円");

    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(`商品${i}`)).toBeInTheDocument();
    }
  });

  it("商品が0の場合、空カートメッセージが表示される", async () => {
    server.use(
      http.get("https://dummyjson.com/carts/1", () => {
        return HttpResponse.json(
          generateCartMock({
            products: [],
            total: 0,
            discountedTotal: 0,
            totalProducts: 0,
            totalQuantity: 0,
          })
        );
      })
    );

    customRender(<Component />);

    expect(
      await screen.findByText("カートには何もありません。")
    ).toBeInTheDocument();
  });

  it("ローディング中はローディングメッセージが表示される", async () => {
    server.use(
      http.get("https://dummyjson.com/carts/1", async () => {
        await delay("infinite");
      })
    );

    customRender(<Component />);

    expect(screen.getByText("カートのローディング")).toBeInTheDocument();
  });

  it("エラー発生時はエラーメッセージが表示される", async () => {
    server.use(
      http.get("https://dummyjson.com/carts/1", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    customRender(<Component />);

    expect(
      await screen.findByText("カートの取得に失敗しました。")
    ).toBeInTheDocument();
  });
});
