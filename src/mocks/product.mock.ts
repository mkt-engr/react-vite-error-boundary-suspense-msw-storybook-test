import type { Product } from "@/schemes/product";
import type { ProductsSearchResponse } from "@/api/fetchProducts/schemas";

export const generateProductMock = (
  override: Partial<Product> = {}
): Product => ({
  id: 1,
  title: "商品1",
  price: 100,
  quantity: 1,
  total: 100,
  discountPercentage: 0,
  discountedTotal: 100,
  thumbnail:
    "https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png",
  ...override,
});

export const generateProductsSearchMock = (
  override: Partial<ProductsSearchResponse> = {}
): ProductsSearchResponse => ({
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
  ...override,
});
