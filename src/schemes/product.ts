import z from "zod";

export const productIdSchema = z.number().int().positive();
export const productTitleSchema = z.string().nonempty();
export const productPriceSchema = z.number().nonnegative();
export const productDiscountPercentageSchema = z.number().nonnegative();
export const productThumbnailSchema = z.httpUrl();

export const productSchema = z.object({
  id: productIdSchema,
  title: productTitleSchema,
  price: productPriceSchema,
  quantity: z.number().nonnegative(),
  total: z.number().nonnegative(),
  discountPercentage: productDiscountPercentageSchema,
  discountedTotal: z.number().nonnegative(),
  thumbnail: productThumbnailSchema,
});

export type Product = z.infer<typeof productSchema>;
