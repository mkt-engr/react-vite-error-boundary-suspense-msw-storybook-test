import type { Cart } from "@/schemes/cart";
import type { ProductsSearchResponse } from "@/schemes/product";
import type { QuoteResponse } from "@/schemes/quote";
import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(generateApiUrl("/products/search"), () => {
    return HttpResponse.json({
      products: [
        {
          id: 1,
          title: "iPhone 15 Pro",
          description: "最新のApple製スマートフォン。高性能なA17 Proチップ搭載で、プロ級の写真撮影が可能です。",
          category: "スマートフォン",
          price: 159800,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: "Apple",
          sku: "WW013001",
          weight: 2,
          tags: ["スマートフォン", "Apple"],
          images: [
            "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
          ],
          thumbnail:
            "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
        },
        {
          id: 2,
          title: "MacBook Air M3",
          description:
            "軽量で高性能なMacBook Air。M3チップ搭載で、一日中使えるバッテリー持続時間を実現。",
          category: "ノートパソコン",
          price: 164800,
          discountPercentage: 17.94,
          rating: 4.44,
          stock: 34,
          brand: "Apple",
          sku: "WW013002",
          weight: 2,
          tags: ["ノートパソコン", "Apple"],
          images: [
            "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
          ],
          thumbnail:
            "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
        },
        {
          id: 3,
          title: "Nintendo Switch OLED",
          description:
            "有機ELディスプレイ搭載のNintendo Switch。鮮やかな画面でゲームを楽しめます。",
          category: "ゲーム機",
          price: 37980,
          discountPercentage: 15.46,
          rating: 4.09,
          stock: 36,
          brand: "Nintendo",
          sku: "WW013003",
          weight: 2,
          tags: ["ゲーム機", "Nintendo"],
          images: [
            "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
          ],
          thumbnail:
            "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
        },
      ],
      total: 3,
      skip: 0,
      limit: 30,
    } satisfies ProductsSearchResponse);
  }),
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
  }),
  http.get(generateApiUrl("/quotes/random"), () => {
    return HttpResponse.json({
      id: 62,
      quote: "君のような勘のいいガキは嫌いだよ",
      author: "ショウ・タッカー",
    } satisfies QuoteResponse);
  }),
];
