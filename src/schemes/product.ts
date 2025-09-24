import z from "zod";

export const productSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().nonempty(),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
  total: z.number().nonnegative(),
  discountPercentage: z.number().nonnegative(),
  discountedTotal: z.number().nonnegative(),
  thumbnail: z.httpUrl(),
});
