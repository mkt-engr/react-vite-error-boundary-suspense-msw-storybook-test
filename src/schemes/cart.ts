import z from "zod";
import { productSchema } from "./product";

export const cartSchema = z.object({
  id: z.number().int().positive(),
  products: productSchema.array(),
  total: z.number().positive(),
  discountedTotal: z.number().positive(),
  userId: z.number().int().positive(),
  totalProducts: z.number().int().positive(),
  totalQuantity: z.number().int().positive(),
});

export type Cart = z.infer<typeof cartSchema>;
