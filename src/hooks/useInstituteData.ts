import { useEffect, useState } from "react";
import { fetchInstituteData } from "@/services/api";
import { instituteData } from "@/services/mockData";
import type { InstituteData } from "@/services/types";

/** Validate that the API returned a proper InstituteData shape (not a Laravel auth error etc.) */
function isValidInstituteData(value: unknown): value is InstituteData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.stats) && Array.isArray(v.departments) && Array.isArray(v.faculty);
}

export function useInstituteData() {
  // Initialize with mock data immediately — no null, no loading flash
  const [data, setData] = useState<InstituteData>(instituteData);
  const [loading, setLoading] = useState(false); // already have data, no skeleton needed
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const result = await fetchInstituteData();
        if (mounted && isValidInstituteData(result)) {
          setData(result);
        }
        // If API returns wrong shape (e.g. {message:"Unauthenticated"}), keep mock data silently
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load data");
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
