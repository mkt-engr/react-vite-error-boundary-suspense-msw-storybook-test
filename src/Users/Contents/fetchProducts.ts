import {
  productsSearchResponseSchema,
  type ProductsSearchResponse,
} from "@/schemes/product";
import { generateApiUrl } from "@/test/generateApiUrl";

export const fetchProducts = async (): Promise<ProductsSearchResponse> => {
  const response = await fetch(generateApiUrl("/products/search"));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const result = productsSearchResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid products data: ${result.error.message}`);
  }

  return result.data;
};
