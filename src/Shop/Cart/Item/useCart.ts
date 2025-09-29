import { fetchCartByUserId } from "@/api/fetchCartByUserId";
import { useSuspenseQuery } from "@tanstack/react-query";

type Args = {
  userId: string;
};

export const useItem = ({ userId }: Args) => {
  const {
    data: cart,
    isPending,
    error,
  } = useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetchCartByUserId({ userId });
      return response;
    },
  });

  return { cart, isPending, error };
};
