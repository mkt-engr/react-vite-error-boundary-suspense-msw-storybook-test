import { generateCartMock } from "@/mocks/cart";
import { buildGetCartMswHandler } from "@/mocks/cart/handler";
import { generateProductMock } from "@/mocks/product";
import { server } from "@/mocks/server";
import { customRender } from "@/test/customRender";
import { screen } from "@testing-library/react";
import { Cart as Component } from ".";

describe("Cart", () => {
  it("商品が3つある場合、商品一覧と合計金額が表示される", async () => {
    server.use(
      buildGetCartMswHandler.success({
        response: generateCartMock({
          products: [1, 2, 3].map((num) =>
            generateProductMock({ id: num, title: `商品${num}` })
          ),
          total: 800,
        })
      })
    );

    customRender(<Component />);

    await screen.findByText("カートの商品の金額:800円");

    expect(screen.getByText("商品1")).toBeInTheDocument();
    expect(screen.getByText("商品2")).toBeInTheDocument();
    expect(screen.getByText("商品3")).toBeInTheDocument();
  });

  it("商品が0の場合、空カートメッセージが表示される", async () => {
    server.use(
      buildGetCartMswHandler.success({
        response: generateCartMock({
          products: [],
          total: 0,
          discountedTotal: 0,
          totalProducts: 0,
          totalQuantity: 0,
        })
      })
    );

    customRender(<Component />);

    expect(
      await screen.findByText("カートには何もありません。")
    ).toBeInTheDocument();
  });

  it("ローディング中はローディングメッセージが表示される", async () => {
    server.use(
      buildGetCartMswHandler.loading()
    );

    customRender(<Component />);

    expect(screen.getByText("カートの読み込み中...")).toBeInTheDocument();
  });

  it("エラー発生時はエラーメッセージが表示される", async () => {
    server.use(
      buildGetCartMswHandler.error({ status: 500 })
    );

    customRender(<Component />);

    expect(
      await screen.findByText("カートの取得に失敗しました。")
    ).toBeInTheDocument();
  });
});
