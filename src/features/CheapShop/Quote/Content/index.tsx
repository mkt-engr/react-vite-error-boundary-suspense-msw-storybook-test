// Error BoundaryとSuspenseが個別にないため、このコンポーネント単体では動作しません
import { useQuote } from "./useQuote";

export const Content = () => {
  const { data } = useQuote();

  return (
    <blockquote>
      <p>"{data.quote}"</p>
      <cite>— {data.author}</cite>
    </blockquote>
  );
};
