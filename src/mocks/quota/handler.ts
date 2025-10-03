import { generateApiUrl } from "@utils/generateApiUrl";
import { generateQuoteMock } from ".";
import { buildHttpHandlerBuilder } from "../buildHttpHandlerBuilder";

export const buildGetQuoteHandler = buildHttpHandlerBuilder({
  path: generateApiUrl("/quotes/random"),
  method: "get",
  defaultResponse: generateQuoteMock(),
});
