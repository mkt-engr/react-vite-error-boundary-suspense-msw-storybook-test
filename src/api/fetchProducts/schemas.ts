import {
  productDiscountPercentageSchema,
  productIdSchema,
  productPriceSchema,
  productThumbnailSchema,
  productTitleSchema,
} from "@schemes/product";
import z from "zod";

const productSchema = z.object({
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

export type ProductInSearch = z.infer<typeof productSchema>;

export const productsSearchResponseSchema = z.object({
  products: productSchema.array(),
  total: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
  limit: z.number().int().nonnegative(),
});

export type ProductsSearchResponse = z.infer<
  typeof productsSearchResponseSchema
>;
