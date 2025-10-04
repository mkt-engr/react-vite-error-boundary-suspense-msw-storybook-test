import { cartSchema, type Cart } from "@features/Shop/Cart/schemas/cart";

type Args = {
  userId: string;
};

export const fetchCartByUserId = async ({ userId }: Args): Promise<Cart> => {
  const response = await fetch(`https://dummyjson.com/carts/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const result = cartSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid cart data: ${result.error.message}`);
  }

  return result.data;
};
