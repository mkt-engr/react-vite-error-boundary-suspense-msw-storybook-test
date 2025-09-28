import {
  productsSearchResponseSchema,
  type ProductsSearchResponse,
} from "@/schemes/product";
import { generateApiUrl } from "@/test/generateApiUrl";

type Args = {
  query: string;
};

export const fetchProducts = async ({
  query,
}: Args): Promise<ProductsSearchResponse> => {
  const response = await fetch(generateApiUrl(`/products/search?q=${query}`));

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
