import ErrorBoundary from "@common/ErrorBoundary";
import { Suspense, type FC } from "react";
import { useProducts } from "./useProducts";

type Props = {
  query: string;
};

export const Result: FC<Props> = ({ query }: Props) => {
  return (
    <ErrorBoundary fallback={<div>商品一覧でエラーが発生しました</div>}>
      <Suspense fallback={<div>商品一覧を読み込み中...</div>}>
        <Inner query={query} />
      </Suspense>
    </ErrorBoundary>
  );
};

const Inner: FC<Props> = ({ query }) => {
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
            <div>${product.price}</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
