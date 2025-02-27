import { useState, useCallback } from "react";
import { toast } from "sonner";

type Method = "POST" | "PUT" | "DELETE";

type Options = {
  method: Method;
  onSuccess?: () => void;
};

export function useMutate<TData = unknown, TBody = unknown>(
  path: string,
  options: Options,
) {
  const [data, setData] = useState<TData | null>(null);
  const [benchmark, setBenchmark] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (body?: TBody) => {
      const start = performance.now();
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8080" + path, {
          method: options.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();

        // Alert in toast if response has a message
        if (typeof json === "object" && json !== null && "message" in json) {
          toast.success((json as { message: string }).message);
        }

        setData(json);

        if (options.onSuccess) {
          options.onSuccess();
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred");
      } finally {
        setLoading(false);
      }

      const end = performance.now();
      setBenchmark((end - start).toFixed(1) + " ms");
    },
    [path, options],
  );

  return { loading, error, benchmark, data, mutate };
}
