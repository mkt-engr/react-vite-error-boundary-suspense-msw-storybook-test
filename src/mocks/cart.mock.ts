import type { Cart } from "@/schemes/cart";
import { generateProductMock } from "./product.mock";

export const generateCartMock = (override: Partial<Cart> = {}): Cart => ({
  id: 1,
  products: [1, 2, 3].map((num) => generateProductMock({ id: num })),
  total: 800,
  discountedTotal: 750,
  userId: 1,
  totalProducts: 3,
  totalQuantity: 4,
  ...override,
});
