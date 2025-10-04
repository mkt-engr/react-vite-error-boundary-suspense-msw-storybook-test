import type { Quote } from "@features/Shop/Quote/schemas/quote";

export const generateQuoteMock = (override: Partial<Quote> = {}): Quote => ({
  id: 1,
  quote: "君のような勘のいいガキは嫌いだよ",
  author: "ショウ・タッカー",
  ...override,
});
