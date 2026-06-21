import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { NoticeCard } from "@/components/features/NoticeCard";
import { NoticeBoardSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";
import type { Notice } from "@/services/types";

type NoticeCategory = Notice["category"] | "All";

export function NoticeBoard() {
  const { data, loading, error } = useInstituteContext();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NoticeCategory>("All");

  const filteredNotices = useMemo(() => {
    if (!data) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return data.notices.filter((notice) => {
      const matchesCategory = category === "All" || notice.category === category;
      const searchable = `${notice.title} ${notice.summary} ${notice.details}`.toLowerCase();
      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [data, category, query]);

  if (loading) return <NoticeBoardSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load notices.</div></PageTransition>;

  return (
    <PageTransition>
      <SEO title="Notice Board" description="Official notices, circulars, admission updates, exam routines, holiday announcements, and tender notices for CMPI." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Notice List"
          title="Official announcements and circulars"
          description="Search and filter CMPI notices by category, title, or content."
          align="left"
        />
        <div className="mb-8 grid gap-4 rounded-sm border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notices..." aria-label="Search notices" />
          <Select value={category} onChange={(event) => setCategory(event.target.value as NoticeCategory)} aria-label="Filter notices by category">
            {["All", "Admission", "Exam", "Holiday", "Tender", "Result", "General"].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </Select>
        </div>
        {filteredNotices.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border bg-card p-8 text-center text-muted-foreground">No notices found for the selected filters.</div>
        )}
      </section>
    </PageTransition>
  );
}
