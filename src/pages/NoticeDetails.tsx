import { useParams } from "react-router-dom";
import { Calendar, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteData } from "@/hooks/useInstituteData";

export function NoticeDetails() {
  const { id } = useParams();
  const { data, loading, error } = useInstituteData();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load notice details.</div></PageTransition>;

  const notice = data.notices.find((item) => item.id === id);
  if (!notice) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border bg-card p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Notice not found</h1>
          <p className="mt-3 text-muted-foreground">The requested notice does not exist.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO title={notice.title} description={notice.summary} />
      <section className="container section-pad">
        <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{notice.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(notice.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>
          <SectionHeader title={notice.title} description={notice.summary} align="left" className="mb-6" />
          <div className="prose prose-emerald max-w-none dark:prose-invert">
            <p>{notice.details}</p>
          </div>
          {notice.fileUrl && (
            <Button asChild className="mt-8">
              <a href={notice.fileUrl} download>
                <Download className="h-4 w-4" />
                <FileText className="h-4 w-4" />
                Download Notice
              </a>
            </Button>
          )}
        </article>
      </section>
    </PageTransition>
  );
}
