import { generateCartMock } from ".";
import { buildMswHttpHandlerBuilder } from "../buildMswHttpHandlerBuilder";
import { generateApiUrl } from "@/test/generateApiUrl";

export const buildGetCartMswHandler = buildMswHttpHandlerBuilder({
  path: generateApiUrl("/carts/1"),
  method: "get",
  defaultResponse: generateCartMock(),
});