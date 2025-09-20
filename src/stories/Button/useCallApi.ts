import { useCallback, useState } from "react";

export const useCallApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleClick = useCallback(async () => {
    console.log("handleClick");
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch("https://httpbin.org/status/200");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccess(true);
      console.log("API呼び出し成功:", response.status);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "不明なエラーが発生しました";
      setError(errorMessage);
      console.error("API呼び出しエラー:", errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    handleClick,
    loading,
    error,
    success,
  };
};
