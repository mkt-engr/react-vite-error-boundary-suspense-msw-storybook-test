import type {
  ProductInSearch,
  ProductsSearchResponse,
} from "@features/Shop/ProductList/api/fetchProducts/schemas";
import type { Product } from "@features/Shop/ProductList/schemas/product";

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
    "https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image1",
  ...override,
});

export const generateProductInSearchMock = (
  override: Partial<ProductInSearch> = {}
): ProductInSearch => ({
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
  images: ["https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image1"],
  thumbnail: "https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image1",
  ...override,
});

export const generateProductsSearchMock = (
  override: Partial<ProductsSearchResponse> = {}
): ProductsSearchResponse => ({
  products: [
    generateProductInSearchMock({
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
      images: ["https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image1"],
      thumbnail: "https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image1",
    }),
    generateProductInSearchMock({
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
      images: ["https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image2"],
      thumbnail: "https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image2",
    }),
    generateProductInSearchMock({
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
      images: ["https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image3"],
      thumbnail: "https://placehold.jp/30/0010f5/ffffff/300x150.png?text=product+image3",
    }),
  ],
  total: 3,
  skip: 0,
  limit: 30,
  ...override,
});
