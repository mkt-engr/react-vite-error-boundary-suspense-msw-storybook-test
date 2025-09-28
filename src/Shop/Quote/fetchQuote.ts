import { quoteSchema, type Quote } from "@/schemes/quote";
import { generateApiUrl } from "@/test/generateApiUrl";

export const fetchQuote = async (): Promise<Quote> => {
  const response = await fetch(generateApiUrl("/quotes/random"));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const result = quoteSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid quote data: ${result.error.message}`);
  }

  return result.data;
};