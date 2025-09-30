import { generateCartMock } from "@/mocks/cart";
import { generateProductMock, generateProductsSearchMock } from "@/mocks/product";
import { generateQuoteMock } from "@/mocks/quota";
import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(generateApiUrl("/products/search"), () => {
    return HttpResponse.json(generateProductsSearchMock());
  }),
  http.get(generateApiUrl("/carts/1"), () => {
    return HttpResponse.json(
      generateCartMock({
        products: [
          generateProductMock({ id: 1, title: "商品1", price: 100 }),
          generateProductMock({
            id: 2,
            title: "商品2",
            price: 200,
            quantity: 2,
            total: 400,
            discountPercentage: 5,
            discountedTotal: 380,
          }),
          generateProductMock({
            id: 3,
            title: "商品3",
            price: 300,
            discountPercentage: 10,
            discountedTotal: 270,
          }),
        ],
      })
    );
  }),
  http.get(generateApiUrl("/quotes/random"), () => {
    return HttpResponse.json(
      generateQuoteMock({
        id: 62,
        quote: "君のような勘のいいガキは嫌いだよ",
        author: "ショウ・タッカー",
      })
    );
  }),
];
