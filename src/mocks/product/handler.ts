import { generateApiUrl } from "@utils/generateApiUrl";
import { generateProductsSearchMock } from ".";
import { buildHttpHandlerBuilder } from "../buildHttpHandlerBuilder";

export const buildGetProductsSearchHandler = buildHttpHandlerBuilder({
  path: generateApiUrl("/products/search"),
  method: "get",
  defaultResponse: generateProductsSearchMock(),
});
