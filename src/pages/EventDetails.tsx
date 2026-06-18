import { useParams } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteData } from "@/hooks/useInstituteData";

export function EventDetails() {
  const { id } = useParams();
  const { data, loading, error } = useInstituteData();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load event details.</div></PageTransition>;

  const event = data.events.find((item) => item.id === id);
  if (!event) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border bg-card p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Event not found</h1>
          <p className="mt-3 text-muted-foreground">The requested event does not exist.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO title={event.title} description={event.summary} />
      <section className="container section-pad">
        <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant={event.status === "Upcoming" ? "default" : "outline"}>{event.status}</Badge>
            <Badge variant="secondary">{event.category}</Badge>
          </div>
          <SectionHeader title={event.title} description={event.summary} align="left" className="mb-6" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-sm bg-muted p-4">
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="mt-1 flex items-center gap-2 font-semibold">
                <Calendar className="h-4 w-4 text-primary" />
                {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} · {event.time}
              </p>
            </div>
            <div className="rounded-sm bg-muted p-4">
              <p className="text-sm text-muted-foreground">Venue</p>
              <p className="mt-1 flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4 text-primary" />
                {event.venue}
              </p>
            </div>
          </div>
          <div className="prose prose-emerald mt-8 max-w-none dark:prose-invert">
            <p>{event.details}</p>
          </div>
        </article>
      </section>
    </PageTransition>
  );
}
