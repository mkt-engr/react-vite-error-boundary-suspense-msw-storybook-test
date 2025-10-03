import {
  generateProductInSearchMock,
  generateProductsSearchMock,
} from "@mocks/product";
import { buildGetProductsSearchHandler } from "@mocks/product/handler";
import { server } from "@mocks/server";
import { customRender } from "@test/customRender";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ProductList } from ".";

describe("ProductList", () => {
  it("商品が0の場合、商品がないメッセージが表示される", async () => {
    server.use(
      buildGetProductsSearchHandler.success({
        response: generateProductsSearchMock({
          products: [],
          total: 0,
        }),
      })
    );

    customRender(<ProductList />);

    expect(
      await screen.findByText("商品がありませんでした。")
    ).toBeInTheDocument();
  });

  it("ローディング中はローディングメッセージが表示される", async () => {
    server.use(buildGetProductsSearchHandler.loading());

    customRender(<ProductList />);

    expect(screen.getByText("商品一覧を読み込み中...")).toBeInTheDocument();
  });

  it("エラー発生時はエラーメッセージが表示される", async () => {
    server.use(buildGetProductsSearchHandler.error({ status: 500 }));

    customRender(<ProductList />);

    expect(
      await screen.findByText("商品一覧でエラーが発生しました")
    ).toBeInTheDocument();
  });

  it("検索欄に入力した内容がsearchParamsに反映される", async () => {
    const onRequestSearchParams = vi.fn();

    server.use(
      buildGetProductsSearchHandler.success({
        response: generateProductsSearchMock({
          products: [
            generateProductInSearchMock({
              id: 1,
              title: "iPhone 15 Pro",
            }),
          ],
          total: 1,
        }),
        onRequestSearchParams,
      })
    );

    customRender(<ProductList />);

    const searchInput = screen.getByRole("textbox", { name: "検索" });
    await userEvent.click(searchInput);
    await userEvent.paste("iphone");

    expect(onRequestSearchParams).toBeCalledWith({ q: "iphone" });
  });
});
