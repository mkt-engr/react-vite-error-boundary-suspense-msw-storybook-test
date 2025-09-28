import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProducts } from "./fetchProducts";

type Args = {
  query: string;
};

export const useProducts = ({ query }: Args) => {
  const { data, isPending, error } = useSuspenseQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const response = await fetchProducts({ query });
      return response;
    },
  });

  return { data, isPending, error };
};
