import { useEffect, useState } from "react";
import { fetchInstituteData } from "@/services/api";
import { instituteData } from "@/services/mockData";
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
      } catch {
        // API unavailable (backend not running) — fall back to local mock data
        if (mounted) {
          setData(instituteData);
          setError(null); // treat mock data as a clean load, not an error
        }
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
