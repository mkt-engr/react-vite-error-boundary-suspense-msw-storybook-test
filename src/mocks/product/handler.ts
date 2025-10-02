import { generateProductsSearchMock } from ".";
import { buildMswHttpHandlerBuilder } from "../buildMswHttpHandlerBuilder";
import { generateApiUrl } from "@/test/generateApiUrl";

export const buildGetProductsSearchMswHandler = buildMswHttpHandlerBuilder({
  path: generateApiUrl("/products/search"),
  method: "get",
  defaultResponse: generateProductsSearchMock(),
});