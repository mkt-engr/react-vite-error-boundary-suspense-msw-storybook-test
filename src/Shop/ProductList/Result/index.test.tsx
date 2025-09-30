import { server } from "@/mocks/server";
import type { ProductsSearchResponse } from "@/schemes/product";
import { customRender } from "@/test/customRender";
import { generateApiUrl } from "@/test/generateApiUrl";
import { screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { Result } from ".";

describe("Results", () => {
  it("商品が3つある場合、商品一覧と件数が表示される", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json({
          products: [
            {
              id: 1,
              title: "iPhone 15 Pro",
              description: "最新のApple製スマートフォン",
              category: "スマートフォン",
              price: 159800,
              discountPercentage: 12.96,
              rating: 4.69,
              stock: 94,
              brand: "Apple",
              sku: "WW013001",
              weight: 2,
              tags: ["スマートフォン", "Apple"],
              images: ["https://example.com/image1.jpg"],
              thumbnail: "https://example.com/thumb1.jpg",
            },
            {
              id: 2,
              title: "MacBook Air M3",
              description: "軽量で高性能なMacBook Air",
              category: "ノートパソコン",
              price: 164800,
              discountPercentage: 17.94,
              rating: 4.44,
              stock: 34,
              brand: "Apple",
              sku: "WW013002",
              weight: 2,
              tags: ["ノートパソコン", "Apple"],
              images: ["https://example.com/image2.jpg"],
              thumbnail: "https://example.com/thumb2.jpg",
            },
            {
              id: 3,
              title: "Nintendo Switch OLED",
              description: "有機ELディスプレイ搭載のNintendo Switch",
              category: "ゲーム機",
              price: 37980,
              discountPercentage: 15.46,
              rating: 4.09,
              stock: 36,
              brand: "Nintendo",
              sku: "WW013003",
              weight: 2,
              tags: ["ゲーム機", "Nintendo"],
              images: ["https://example.com/image3.jpg"],
              thumbnail: "https://example.com/thumb3.jpg",
            },
          ],
          total: 3,
          skip: 0,
          limit: 30,
        } satisfies ProductsSearchResponse);
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
      http.get(generateApiUrl("/products/search"), () => {
        return HttpResponse.json({
          products: [],
          total: 0,
          skip: 0,
          limit: 30,
        } satisfies ProductsSearchResponse);
      })
    );

    customRender(<Result query="" />);

    expect(
      await screen.findByText("商品がありませんでした。")
    ).toBeInTheDocument();
  });

  it("ローディング中はローディングメッセージが表示される", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), async () => {
        await delay("infinite");
      })
    );

    customRender(<Result query="test" />);

    expect(screen.getByText("商品一覧を読み込み中...")).toBeInTheDocument();
  });

  it("エラー発生時はエラーメッセージが表示される", async () => {
    server.use(
      http.get(generateApiUrl("/products/search"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    customRender(<Result query="test" />);

    expect(
      await screen.findByText("商品一覧でエラーが発生しました")
    ).toBeInTheDocument();
  });

  it("検索クエリが渡されている場合、クエリパラメータが含まれる", async () => {
    let capturedUrl = "";

    server.use(
      http.get(generateApiUrl("/products/search"), ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({
          products: [],
          total: 0,
          skip: 0,
          limit: 30,
        } satisfies ProductsSearchResponse);
      })
    );

    customRender(<Result query="iphone" />);

    await screen.findByText("商品がありませんでした。");

    expect(capturedUrl).toContain("q=iphone");
  });
});
