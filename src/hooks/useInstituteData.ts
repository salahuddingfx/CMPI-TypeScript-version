import { useEffect, useState } from "react";
import { fetchInstituteData } from "@/services/api";
import { instituteData } from "@/services/mockData";
import type { InstituteData, Department, FacultyMember } from "@/services/types";

function isValidInstituteData(value: unknown): value is InstituteData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.stats) && Array.isArray(v.departments) && Array.isArray(v.faculty);
}

function normalizeDepartment(raw: any): Department {
  return {
    id: String(raw.id),
    slug: raw.slug,
    title: raw.title,
    shortTitle: raw.short_title ?? raw.shortTitle ?? "",
    description: raw.description ?? "",
    overview: raw.overview ?? "",
    objectives: raw.objectives ?? [],
    labs: raw.labs ?? [],
    achievements: raw.achievements ?? [],
    careerOpportunities: raw.career_opportunities ?? raw.careerOpportunities ?? [],
    facultyIds: raw.faculty_ids ?? raw.facultyIds ?? [],
  };
}

function normalizeFaculty(raw: any): FacultyMember {
  return {
    id: String(raw.id),
    name: raw.name,
    designation: raw.designation,
    department: raw.department,
    qualification: raw.qualification ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    specialization: raw.specialization ?? [],
  };
}

function normalizeData(raw: any): InstituteData {
  return {
    stats: raw.stats ?? [],
    facilities: raw.facilities ?? [],
    achievements: raw.achievements ?? [],
    departments: (raw.departments ?? []).map(normalizeDepartment),
    faculty: (raw.faculty ?? []).map(normalizeFaculty),
    notices: raw.notices ?? [],
    events: raw.events ?? [],
    blogs: raw.blogs ?? [],
    albums: raw.albums ?? [],
    resources: raw.resources ?? [],
    faqs: raw.faqs ?? [],
  };
}

export function useInstituteData() {
  const [data, setData] = useState<InstituteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const result = await fetchInstituteData();
        if (mounted) {
          setData(normalizeData(result));
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

  return { data, loading, error: null };
}
