import { generateApiUrl } from "@/test/generateApiUrl";
import { generateCartMock } from ".";
import { buildHttpHandlerBuilder } from "../buildHttpHandlerBuilder";

export const buildGetCartHandler = buildHttpHandlerBuilder({
  path: generateApiUrl("/carts/1"),
  method: "get",
  defaultResponse: generateCartMock(),
});
