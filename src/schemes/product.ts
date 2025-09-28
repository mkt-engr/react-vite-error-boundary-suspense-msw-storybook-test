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

export type Product = z.infer<typeof productSchema>;

export const searchProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().nonempty(),
  description: z.string(),
  category: z.string(),
  price: z.number().nonnegative(),
  discountPercentage: z.number().nonnegative(),
  rating: z.number().min(0).max(5),
  stock: z.number().int().nonnegative(),
  brand: z.string().optional(),
  sku: z.string(),
  weight: z.number().positive(),
  tags: z.array(z.string()),
  images: z.array(z.string()),
  thumbnail: z.string(),
});

export const productsSearchResponseSchema = z.object({
  products: searchProductSchema.array(),
  total: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
  limit: z.number().int().nonnegative(),
});

export type ProductsSearchResponse = z.infer<
  typeof productsSearchResponseSchema
>;
