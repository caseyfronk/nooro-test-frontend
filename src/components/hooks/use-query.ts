import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// This is a React hook for fetching data (GET requests)
// from the server. It's designed to emulate the behavior
// of Tanstack Query, only simpler. It accepts a generic type.

export function useQuery<TData = unknown>(
  path: string,
  runOnMount: boolean = true,
) {
  const [data, setData] = useState<TData | null>(null);
  const [benchmark, setBenchmark] = useState("");
  const [loading, setLoading] = useState<boolean>(runOnMount);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const start = performance.now();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + path);
      const json = await response.json();
      if (!response.ok) {
        // Alert in toast if response has a message
        if (typeof json === "object" && json !== null && "message" in json) {
          toast.error((json as { message: string }).message);
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      }
      setData(json);
    } catch (error) {
      console.error(error);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
    const end = performance.now();
    setBenchmark((end - start).toFixed(1) + " ms");
  }, [path]);

  // Fetch data on mount if runOnMount is true
  useEffect(() => {
    if (runOnMount) {
      fetchData();
    }
  }, [fetchData, runOnMount]);

  return { loading, error, benchmark, data, refetch: fetchData };
}
