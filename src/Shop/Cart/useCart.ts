import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCartByUserId } from "@/api/fetchCartByUserId";

type Args = {
  userId: string;
};

export const useCart = ({ userId }: Args) => {
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
