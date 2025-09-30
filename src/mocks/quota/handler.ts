import { generateQuoteMock } from ".";
import { buildMswHttpHandlerBuilder } from "../buildMswHttpHandlerBuilder";

export const buildGetQuoteMswHandler = buildMswHttpHandlerBuilder({
  path: "/quotes/random",
  method: "get",
  defaultResponse: generateQuoteMock(),
});

export const successHandler = buildGetQuoteMswHandler();

export const errorHandler = buildGetQuoteMswHandler({
  response: null,
  status: 500,
});

export const invalidDataHandler = buildGetQuoteMswHandler({
  response: { invalid: "data" },
});
