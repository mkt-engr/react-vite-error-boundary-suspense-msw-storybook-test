import z from "zod";
import { productSchema } from "./product";

export const cartSchema = z.object({
  id: z.number().int().positive(),
  products: productSchema.array(),
  total: z.number().nonnegative(),
  discountedTotal: z.number().nonnegative(),
  userId: z.number().int().positive(),
  totalProducts: z.number().int().nonnegative(),
  totalQuantity: z.number().int().nonnegative(),
});

export type Cart = z.infer<typeof cartSchema>;
