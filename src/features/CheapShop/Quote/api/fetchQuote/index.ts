import { quoteResponseSchema, type QuoteResponse } from "@features/CheapShop/Quote/schemas/quote";
import { generateApiUrl } from "@utils/generateApiUrl";

export const fetchQuote = async (): Promise<QuoteResponse> => {
  const response = await fetch(generateApiUrl("/quotes/random"));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const result = quoteResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid quote data: ${result.error.message}`);
  }

  return result.data;
};
