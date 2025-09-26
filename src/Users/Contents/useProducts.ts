import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchProducts } from "./fetchProducts";

export const useProducts = () => {
  const { data, isPending, error } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetchProducts();
      return response;
    },
  });

  return { data, isPending, error };
};
