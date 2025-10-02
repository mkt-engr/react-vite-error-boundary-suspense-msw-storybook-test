import { generateApiUrl } from "@/test/generateApiUrl";
import { generateQuoteMock } from ".";
import { buildMswHttpHandlerBuilder } from "../buildMswHttpHandlerBuilder";

export const buildGetQuoteMswHandler = buildMswHttpHandlerBuilder({
  path: generateApiUrl("/quotes/random"),
  method: "get",
  defaultResponse: generateQuoteMock(),
});
