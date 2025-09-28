import z from "zod";

export const quoteSchema = z.object({
  id: z.number().int().positive(),
  quote: z.string().nonempty(),
  author: z.string().nonempty(),
});

export const quotesResponseSchema = z.object({
  quotes: quoteSchema.array(),
  total: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
  limit: z.number().int().nonnegative(),
});

export type Quote = z.infer<typeof quoteSchema>;
export type QuotesResponse = z.infer<typeof quotesResponseSchema>;