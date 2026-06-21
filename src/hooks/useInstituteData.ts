import { useEffect, useState } from "react";
import { fetchInstituteData } from "@/services/api";
import { instituteData } from "@/services/mockData";
import type { InstituteData, Department, FacultyMember } from "@/services/types";

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
    notices: (raw.notices ?? []).map((n: any) => ({
      id: String(n.id),
      title: n.title,
      category: n.category,
      date: n.date,
      summary: n.summary,
      details: n.details,
      fileUrl: n.file_url ?? n.fileUrl,
      image: n.image,
    })),
    events: (raw.events ?? []).map((e: any) => ({
      id: String(e.id),
      title: e.title,
      date: e.date,
      endDate: e.end_date ?? e.endDate,
      time: e.time,
      venue: e.venue,
      category: e.category,
      status: e.status,
      summary: e.summary,
      details: e.details,
      image: e.image,
    })),
    blogs: (raw.blogs ?? []).map((b: any) => ({
      id: String(b.id),
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author,
      date: b.date,
      category: b.category,
      readTime: b.read_time ?? b.readTime ?? "",
      relatedIds: (b.related_ids ?? b.relatedIds ?? []).map(String),
      image: b.image,
    })),
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

    async function load(isBackground = false) {
      if (!isBackground) {
        setLoading(true);
      }
      try {
        const result = await fetchInstituteData();
        if (mounted) {
          setData(normalizeData(result));
        }
      } catch {
        if (mounted && !isBackground) {
          setData(instituteData);
        }
      } finally {
        if (mounted && !isBackground) {
          setLoading(false);
        }
      }
    }

    void load();

    const interval = setInterval(() => {
      void load(true);
    }, 15000); // Silent check for updates every 15 seconds

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error: null };
}
