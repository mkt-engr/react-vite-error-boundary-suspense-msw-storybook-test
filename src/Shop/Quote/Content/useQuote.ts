import { fetchQuote } from "@api/fetchQuote";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useQuote = () => {
  const { data, isPending, error } = useSuspenseQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const response = await fetchQuote();
      return response;
    },
  });

  return { data, isPending, error };
};
