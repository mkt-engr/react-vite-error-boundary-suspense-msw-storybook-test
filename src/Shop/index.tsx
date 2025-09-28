import { Cart } from "./Cart";
import { ProductList } from "./ProductList";
import { Quote } from "./Quote";

export const Shop = () => {
  return (
    <div>
      <h1>Super coolなECサイト</h1>
      <Cart />
      <ProductList />
      <Quote />
    </div>
  );
};
