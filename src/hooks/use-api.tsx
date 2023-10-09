import { useState, useCallback } from "react";

const API = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/`;

export const useApi = <T,>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async (path: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}${path}`);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setLoading(false);
      setError(null);

      return json;
    } catch (error) {
      setError(`${error} Could not Fetch Data, try again`);
      setLoading(false);
      return false;
    }
  }, []);

  const getArticles = useCallback(
    async (date: string, resultSize: number, transform: (items: T) => T) => {
      const data = await get(date);
      if (!data) return;
      setData(transform(data.items[0].articles.slice(0, resultSize)));
    },
    [get]
  );

  return { data, loading, error, getArticles, patchData: setData };
};
