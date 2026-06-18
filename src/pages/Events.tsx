import { useMemo, useState } from "react";
import { EventCard } from "@/components/features/EventCard";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteData } from "@/hooks/useInstituteData";

type EventStatus = InstituteEventStatus | "All";
type InstituteEventStatus = "Upcoming" | "Past";

export function Events() {
  const { data, loading, error } = useInstituteData();
  const [status, setStatus] = useState<EventStatus>("All");

  const filteredEvents = useMemo(() => {
    if (!data) return [];
    return data.events.filter((event) => status === "All" || event.status === status);
  }, [data, status]);

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load events.</div></PageTransition>;

  const upcoming = data.events.filter((event) => event.status === "Upcoming");
  const past = data.events.filter((event) => event.status === "Past");

  return (
    <PageTransition>
      <SEO title="Events" description="Upcoming and past events at Cox's Bazar Model Polytechnic Institute including seminars, workshops, cultural programs, and sports events." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Event List"
          title="Campus events and activities"
          description="View upcoming events and explore past campus programs."
          align="left"
        />
        <div className="mb-8 flex flex-wrap gap-2 rounded-sm border bg-card p-4 shadow-sm">
          {["All", "Upcoming", "Past"].map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-sm px-4 py-2 text-sm font-bold ${status === item ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              onClick={() => setStatus(item as EventStatus)}
            >
              {item}
            </button>
          ))}
        </div>
        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border bg-card p-8 text-center text-muted-foreground">No events found for this filter.</div>
        )}
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Upcoming Events" title="What's next at CMPI" align="left" />
            <div className="grid gap-6 md:grid-cols-2">
              {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Past Events" title="Recent campus programs" align="left" />
            <div className="grid gap-6 md:grid-cols-2">
              {past.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
