import z from "zod";

const productIdSchema = z.number().int().positive();
const productTitleSchema = z.string().nonempty();
const productPriceSchema = z.number().nonnegative();
const productDiscountPercentageSchema = z.number().nonnegative();
const productThumbnailSchema = z.httpUrl();

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

export const searchProductSchema = z.object({
  id: productIdSchema,
  title: productTitleSchema,
  description: z.string(),
  category: z.string(),
  price: productPriceSchema,
  discountPercentage: productDiscountPercentageSchema,
  rating: z.number().min(0).max(5),
  stock: z.number().int().nonnegative(),
  brand: z.string().optional(),
  sku: z.string(),
  weight: z.number().positive(),
  tags: z.array(z.string()),
  images: z.array(z.string()),
  thumbnail: productThumbnailSchema,
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
