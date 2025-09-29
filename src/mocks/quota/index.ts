import type { Quote } from "@/schemes/quote";

export const generateQuoteMock = (override: Partial<Quote> = {}): Quote => ({
  id: 1,
  quote: "君のような勘のいいガキは嫌いだよ",
  author: "ショウ・タッカー",
  ...override,
});