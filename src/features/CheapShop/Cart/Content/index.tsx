// Error BoundaryとSuspenseが個別にないため、このコンポーネント単体では動作しません
import { useItem } from "./useCart";

export const Content = () => {
  const { cart } = useItem({ userId: "1" });

  if (cart.products.length === 0) {
    return <div>カートには何もありません。</div>;
  }

  return (
    <div>
      <div>カートの商品の金額:{cart.total}円</div>
      <ul>
        {cart.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};
