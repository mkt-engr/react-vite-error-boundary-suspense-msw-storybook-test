import type { Cart } from "@/schemes/cart";
import type { ProductsSearchResponse } from "@/schemes/product";
import type { QuotesResponse } from "@/schemes/quote";
import { generateApiUrl } from "@/test/generateApiUrl";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(generateApiUrl("/products/search"), () => {
    return HttpResponse.json({
      products: [
        {
          id: 1,
          title: "iPhone 9",
          description: "An apple mobile which is nothing like apple",
          category: "smartphones",
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: "Apple",
          sku: "WW013001",
          weight: 2,
          tags: ["smartphones", "apple"],
          images: ["https://cdn.dummyjson.com/product-images/1/1.jpg"],
          thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        },
        {
          id: 2,
          title: "iPhone X",
          description:
            "SIM-Free, Model A19211 6.5-inch Super Retina HD display",
          category: "smartphones",
          price: 899,
          discountPercentage: 17.94,
          rating: 4.44,
          stock: 34,
          brand: "Apple",
          sku: "WW013002",
          weight: 2,
          tags: ["smartphones", "apple"],
          images: ["https://cdn.dummyjson.com/product-images/2/1.jpg"],
          thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        },
        {
          id: 3,
          title: "Samsung Universe 9",
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          category: "smartphones",
          price: 1249,
          discountPercentage: 15.46,
          rating: 4.09,
          stock: 36,
          brand: "Samsung",
          sku: "WW013003",
          weight: 2,
          tags: ["smartphones", "samsung"],
          images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
          thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
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
  http.get(generateApiUrl("/quotes"), () => {
    return HttpResponse.json({
      quotes: [
        {
          id: 1,
          quote:
            "Life isn't about getting and having, it's about giving and being.",
          author: "Kevin Kruse",
        },
      ],
      total: 1,
      skip: 0,
      limit: 1,
    } satisfies QuotesResponse);
  }),
];
