import { useParams } from "react-router-dom";
import { Calendar, Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";

export function NoticeDetails() {
  const { id } = useParams();
  const { data, loading, error } = useInstituteContext();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">
          Unable to load notice details.
        </div>
      </PageTransition>
    );
  }

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

  const isPdf = notice.fileUrl && notice.fileUrl.toLowerCase().endsWith(".pdf");

  return (
    <PageTransition>
      <SEO title={notice.title} description={notice.summary} />
      <section className="container section-pad">
        <article className="mx-auto max-w-4xl rounded-2xl border border-border/80 bg-card p-6 shadow-xl sm:p-10 backdrop-blur-md">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-black uppercase tracking-wider">{notice.category}</Badge>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              {new Date(notice.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>

          <SectionHeader title={notice.title} description={notice.summary} align="left" className="mb-6" />
          
          <div className="prose prose-emerald max-w-none dark:prose-invert text-base leading-relaxed font-medium text-foreground/90 border-b border-border/60 pb-8">
            <p className="whitespace-pre-line">{notice.details}</p>
          </div>

          {notice.fileUrl && (
            <div className="mt-8 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-foreground">Attachment Document</h3>
                    <p className="text-xs text-muted-foreground font-semibold">Official PDF document reference</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="rounded-xl font-bold">
                    <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <ExternalLink className="h-4 w-4" />
                      Full Preview
                    </a>
                  </Button>
                  <Button asChild size="sm" className="rounded-xl font-black shadow-md shadow-primary/20">
                    <a href={notice.fileUrl} download className="flex items-center gap-1.5">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              </div>

              {isPdf && (
                <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-inner bg-muted aspect-[1/1.35] w-full max-h-[850px] ring-4 ring-muted/20">
                  <iframe
                    src={`${notice.fileUrl}#toolbar=0`}
                    className="absolute inset-0 w-full h-full border-none"
                    title="Notice Document Attachment Preview"
                  />
                </div>
              )}
            </div>
          )}
        </article>
      </section>
    </PageTransition>
  );
}
