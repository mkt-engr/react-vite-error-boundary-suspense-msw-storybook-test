import { fetchCartByUserId } from "@features/Shop/Cart/api/fetchCartByUserId";
import { useSuspenseQuery } from "@tanstack/react-query";

type Args = {
  userId: string;
};

export const useItem = ({ userId }: Args) => {
  const { data: cart } = useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetchCartByUserId({ userId });
      return response;
    },
  });

  return { cart };
};
