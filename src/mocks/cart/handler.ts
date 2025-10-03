import { generateApiUrl } from "@utils/generateApiUrl";
import { generateCartMock } from ".";
import { buildHttpHandlerBuilder } from "../buildHttpHandlerBuilder";

export const buildGetCartHandler = buildHttpHandlerBuilder({
  path: generateApiUrl("/carts/1"),
  method: "get",
  defaultResponse: generateCartMock(),
});
