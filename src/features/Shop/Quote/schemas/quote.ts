import z from "zod";

export const quoteSchema = z.object({
  id: z.number().int().positive(),
  quote: z.string().nonempty(),
  author: z.string().nonempty(),
});

export type Quote = z.infer<typeof quoteSchema>;

export const quoteResponseSchema = quoteSchema;

export type QuoteResponse = z.infer<typeof quoteResponseSchema>;
