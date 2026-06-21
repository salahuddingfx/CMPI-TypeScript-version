import { useEffect, useState } from "react";
import { fetchInstituteData } from "@/services/api";
import { instituteData } from "@/services/mockData";
import type { InstituteData } from "@/services/types";

function isValidInstituteData(value: unknown): value is InstituteData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.stats) && Array.isArray(v.departments) && Array.isArray(v.faculty);
}

export function useInstituteData() {
  const [data, setData] = useState<InstituteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const result = await fetchInstituteData();
        if (mounted && isValidInstituteData(result)) {
          setData(result);
        } else if (mounted) {
          setData(instituteData);
        }
      } catch {
        if (mounted) {
          setData(instituteData);
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
