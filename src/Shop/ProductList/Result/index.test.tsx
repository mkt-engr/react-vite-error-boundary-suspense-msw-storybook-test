import { generateProductsSearchMock, generateProductInSearchMock } from "@/mocks/product";
import { buildGetProductsSearchMswHandler } from "@/mocks/product/handler";
import { server } from "@/mocks/server";
import { customRender } from "@/test/customRender";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { Result } from ".";

describe("Results", () => {
  it("商品が3つある場合、商品一覧と件数が表示される", async () => {
    server.use(
      buildGetProductsSearchMswHandler.success({
        response: generateProductsSearchMock({
          products: [
            generateProductInSearchMock({
              id: 1,
              title: "iPhone 15 Pro",
              description: "最新のApple製スマートフォン",
              category: "スマートフォン",
              price: 159800,
            }),
            generateProductInSearchMock({
              id: 2,
              title: "MacBook Air M3",
              description: "軽量で高性能なMacBook Air",
              category: "ノートパソコン",
              price: 164800,
            }),
            generateProductInSearchMock({
              id: 3,
              title: "Nintendo Switch OLED",
              description: "有機ELディスプレイ搭載のNintendo Switch",
              category: "ゲーム機",
              price: 37980,
            }),
          ],
          total: 3,
        })
      })
    );

    customRender(<Result query="" />);

    await screen.findByText("商品件数:3件");

    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
    expect(screen.getByText("MacBook Air M3")).toBeInTheDocument();
    expect(screen.getByText("Nintendo Switch OLED")).toBeInTheDocument();
  });

  it("商品が0の場合、商品がないメッセージが表示される", async () => {
    server.use(
      buildGetProductsSearchMswHandler.success({
        response: generateProductsSearchMock({
          products: [],
          total: 0,
        })
      })
    );

    customRender(<Result query="" />);

    expect(
      await screen.findByText("商品がありませんでした。")
    ).toBeInTheDocument();
  });

  it("ローディング中はローディングメッセージが表示される", async () => {
    server.use(
      buildGetProductsSearchMswHandler.loading()
    );

    customRender(<Result query="test" />);

    expect(screen.getByText("商品一覧を読み込み中...")).toBeInTheDocument();
  });

  it("エラー発生時はエラーメッセージが表示される", async () => {
    server.use(
      buildGetProductsSearchMswHandler.error({ status: 500 })
    );

    customRender(<Result query="test" />);

    expect(
      await screen.findByText("商品一覧でエラーが発生しました")
    ).toBeInTheDocument();
  });

  it("検索クエリが渡されている場合、クエリパラメータが含まれる", async () => {
    let capturedUrl = "";
    const capturedSearchParams = vi.fn();

    server.use(
      buildGetProductsSearchMswHandler.success({
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

    customRender(<Result query="iphone" />);

    await screen.findByText("商品がありませんでした。");

    expect(capturedUrl).toContain("q=iphone");
  });
});
