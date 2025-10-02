import { generateApiUrl } from "@/test/generateApiUrl";
import { generateProductsSearchMock } from ".";
import { buildHttpHandlerBuilder } from "../buildHttpHandlerBuilder";

export const buildGetProductsSearchMswHandler = buildHttpHandlerBuilder({
  path: generateApiUrl("/products/search"),
  method: "get",
  defaultResponse: generateProductsSearchMock(),
});
