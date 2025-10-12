import { generateApiUrl } from "@utils/generateApiUrl";
import {
  productsSearchResponseSchema,
  type ProductsSearchResponse,
} from "./schemas";

type Args = {
  query: string;
};

export const fetchProducts = async ({
  query,
}: Args): Promise<ProductsSearchResponse> => {
  const response = await fetch(
    generateApiUrl(`/products/search?q=${encodeURIComponent(query)}`)
  );

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
