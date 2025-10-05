// Error BoundaryとSuspenseが個別にないため、このコンポーネント単体では動作しません
import { type FC } from "react";
import { useProducts } from "./useProducts";

type Props = {
  query: string;
};

export const Result: FC<Props> = ({ query }: Props) => {
  const { data } = useProducts({ query });

  if (data.products.length === 0) {
    return (
      <div>
        <h3>商品がありませんでした。</h3>
      </div>
    );
  }

  return (
    <div>
      <h3>商品件数:{data.total}件</h3>
      <div>
        {data.products.map((product) => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} width={100} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div>{product.price}円</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
