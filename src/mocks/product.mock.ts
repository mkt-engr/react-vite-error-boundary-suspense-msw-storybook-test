import type { Product } from "@/schemes/product";

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
