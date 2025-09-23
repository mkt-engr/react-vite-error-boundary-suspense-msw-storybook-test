import { useMutation } from "@tanstack/react-query";

export const useCallApi = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: async () => {
      console.log("handleClick");
      const response = await fetch("https://httpbin.org/status/200");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("API呼び出し成功:", response.status);
      return { status: response.status, success: true };
    },
  });

  const handleClick = () => {
    mutate();
  };

  return {
    handleClick,
    loading: isPending,
    error,
  };
};
