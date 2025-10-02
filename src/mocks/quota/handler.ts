import { generateApiUrl } from "@/test/generateApiUrl";
import { generateQuoteMock } from ".";
import { buildHttpHandlerBuilder } from "../buildHttpHandlerBuilder";

export const buildGetQuoteMswHandler = buildHttpHandlerBuilder({
  path: generateApiUrl("/quotes/random"),
  method: "get",
  defaultResponse: generateQuoteMock(),
});
