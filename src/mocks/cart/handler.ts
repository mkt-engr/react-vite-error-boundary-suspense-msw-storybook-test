import { generateApiUrl } from "@/test/generateApiUrl";
import { generateCartMock } from ".";
import { buildHttpHandlerBuilder } from "../buildHttpHandlerBuilder";

export const buildGetCartMswHandler = buildHttpHandlerBuilder({
  path: generateApiUrl("/carts/1"),
  method: "get",
  defaultResponse: generateCartMock(),
});
