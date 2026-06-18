import { useEffect, useState } from "react";
import { fetchInstituteData } from "@/services/api";
import type { InstituteData } from "@/services/types";

export function useInstituteData() {
  const [data, setData] = useState<InstituteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const result = await fetchInstituteData();
        if (mounted) setData(result);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Unable to load data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
