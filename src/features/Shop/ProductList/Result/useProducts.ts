import { fetchProducts } from "@features/Shop/ProductList/api/fetchProducts";
import { useSuspenseQuery } from "@tanstack/react-query";

type Args = {
  query: string;
};

export const useProducts = ({ query }: Args) => {
  const { data } = useSuspenseQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const response = await fetchProducts({ query });
      return response;
    },
  });

  return { data };
};
