import { useState, useEffect, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { PageTransition } from "@/components/common/PageTransition";
import { SEO } from "@/components/common/SEO";
import { SectionHeader } from "@/components/common/SectionHeader";
import { api } from "@/services/api";

type Category = "exam" | "holiday" | "event" | "meeting" | "deadline" | "other";

interface CalendarEvent {
  id: number;
  title: string;
  event_date: string;
  end_date: string | null;
  category: Category;
  description: string | null;
  is_holiday: boolean;
}

const CATEGORY_CONFIG: Record<Category, { label: string; color: string; dot: string }> = {
  exam:     { label: "Examination",   color: "bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400    border-red-200",    dot: "bg-red-500"    },
  holiday:  { label: "Holiday",       color: "bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-400  border-green-200",  dot: "bg-green-500"  },
  event:    { label: "Event",         color: "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400   border-blue-200",   dot: "bg-blue-500"   },
  meeting:  { label: "Meeting",       color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200", dot: "bg-purple-500" },
  deadline: { label: "Deadline",      color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200", dot: "bg-orange-500" },
  other:    { label: "Other",         color: "bg-gray-100   text-gray-700   dark:bg-gray-800/60   dark:text-gray-400   border-gray-200",   dot: "bg-gray-400"   },
};

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export function AcademicCalendar() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());   // 0-indexed
  const [events, setEvents]         = useState<CalendarEvent[]>([]);
  const [loading, setLoading]       = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("/academic-calendar", { params: { year } })
      .then((res) => { if (mounted) setEvents(res.data ?? []); })
      .catch(() => {
        // Seed with sample data so the page isn't empty
        if (mounted) setEvents(sampleEvents(year));
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [year]);

  // Month grid
  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMon = new Date(year, month + 1, 0).getDate();

  const eventsForMonth = useMemo(() =>
    events.filter((e) => {
      const d = new Date(e.event_date);
      return d.getFullYear() === year && d.getMonth() === month &&
        (activeCategory === "all" || e.category === activeCategory);
    }), [events, year, month, activeCategory]);

  const eventsByDay = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    eventsForMonth.forEach((ev) => {
      const day = new Date(ev.event_date).getDate();
      (map[day] ??= []).push(ev);
    });
    return map;
  }, [eventsForMonth]);

  const upcomingAll = useMemo(() =>
    events
      .filter((e) => {
        const d = new Date(e.event_date);
        return d >= today && (activeCategory === "all" || e.category === activeCategory);
      })
      .sort((a, b) => a.event_date.localeCompare(b.event_date))
      .slice(0, 20),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [events, activeCategory]);

  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setMonth(0);  setYear(y => y + 1); } else setMonth(m => m + 1); }

  return (
    <PageTransition>
      <SEO title="Academic Calendar" description="View the academic calendar, exam schedules, holidays and events at CMPI." />

      <section className="container section-pad">
        <SectionHeader
          eyebrow="Academic Year"
          title="Academic Calendar"
          description="Exam schedules, holidays, events, and key academic deadlines for the current session."
          align="center"
          className="mb-10"
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${activeCategory === "all" ? "bg-primary text-white border-primary" : "hover:bg-muted text-muted-foreground"}`}
          >
            All
          </button>
          {(Object.keys(CATEGORY_CONFIG) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? "all" : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeCategory === cat ? CATEGORY_CONFIG[cat].color + " border" : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${CATEGORY_CONFIG[cat].dot}`} />
              {CATEGORY_CONFIG[cat].label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Calendar grid */}
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/30">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-muted transition">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <p className="text-xl font-black">{MONTH_NAMES[month]}</p>
                <p className="text-sm text-muted-foreground">{year}</p>
              </div>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-muted transition">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b">
              {DAY_NAMES.map((d) => (
                <div key={d} className="py-2 text-center text-xs font-black uppercase text-muted-foreground">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : (
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }, (_, i) => (
                  <div key={`pad-${i}`} className="min-h-[80px] border-b border-r last:border-r-0 bg-muted/5" />
                ))}
                {Array.from({ length: daysInMon }, (_, i) => {
                  const day = i + 1;
                  const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
                  const dayEvents = eventsByDay[day] ?? [];
                  return (
                    <div
                      key={day}
                      className={`min-h-[80px] border-b border-r p-1.5 flex flex-col gap-1 ${isToday ? "bg-primary/5" : "hover:bg-muted/20"} transition-colors`}
                    >
                      <span className={`text-xs font-bold self-end rounded-full w-6 h-6 flex items-center justify-center ${
                        isToday ? "bg-primary text-white" : "text-foreground"
                      }`}>
                        {day}
                      </span>
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className={`text-[10px] font-bold rounded px-1 py-0.5 truncate border ${CATEGORY_CONFIG[ev.category].color}`}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[10px] text-muted-foreground font-semibold">+{dayEvents.length - 2} more</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming events sidebar */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-black text-lg">Upcoming Events</h3>
            </div>

            {upcomingAll.length === 0 ? (
              <div className="rounded-xl border bg-card p-8 text-center">
                <Filter className="mx-auto h-10 w-10 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">No upcoming events for the selected filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingAll.map((ev) => {
                  const d = new Date(ev.event_date);
                  const cfg = CATEGORY_CONFIG[ev.category];
                  return (
                    <div key={ev.id} className={`rounded-xl border p-4 ${cfg.color} border`}>
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{ev.title}</p>
                          <p className="text-xs opacity-70 mt-0.5">
                            {d.toLocaleDateString("en-BD", { weekday: "short", month: "short", day: "numeric" })}
                            {ev.end_date && ev.end_date !== ev.event_date && (
                              <> – {new Date(ev.end_date).toLocaleDateString("en-BD", { month: "short", day: "numeric" })}</>
                            )}
                          </p>
                          {ev.description && (
                            <p className="text-xs opacity-60 mt-1 line-clamp-2">{ev.description}</p>
                          )}
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${cfg.color} border whitespace-nowrap`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Legend */}
            <div className="rounded-xl border bg-card p-4 mt-6">
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Legend</p>
              <div className="space-y-2">
                {(Object.entries(CATEGORY_CONFIG) as [Category, typeof CATEGORY_CONFIG[Category]][]).map(([cat, cfg]) => (
                  <div key={cat} className="flex items-center gap-2 text-xs">
                    <span className={`w-3 h-3 rounded-sm ${cfg.dot}`} />
                    <span className="font-semibold">{cfg.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

// Sample data so the page works before any real data is added
function sampleEvents(year: number): CalendarEvent[] {
  return [
    { id: 1,  title: "1st Semester Exam Start",        event_date: `${year}-01-15`, end_date: `${year}-01-30`, category: "exam",     description: "BTEB 1st semester final examinations.", is_holiday: false },
    { id: 2,  title: "Eid-ul-Adha Holiday",            event_date: `${year}-06-17`, end_date: `${year}-06-20`, category: "holiday",  description: null, is_holiday: true },
    { id: 3,  title: "Independence Day",                event_date: `${year}-03-26`, end_date: null,            category: "holiday",  description: null, is_holiday: true },
    { id: 4,  title: "Annual Sports Fest",              event_date: `${year}-02-10`, end_date: `${year}-02-11`, category: "event",    description: "Annual inter-department sports competition.", is_holiday: false },
    { id: 5,  title: "Department Faculty Meeting",      event_date: `${year}-03-05`, end_date: null,            category: "meeting",  description: null, is_holiday: false },
    { id: 6,  title: "Admission Form Deadline",         event_date: `${year}-04-30`, end_date: null,            category: "deadline", description: "Last date to submit admission forms.", is_holiday: false },
    { id: 7,  title: "3rd Semester Exam Start",        event_date: `${year}-07-01`, end_date: `${year}-07-20`, category: "exam",     description: "BTEB 3rd semester final examinations.", is_holiday: false },
    { id: 8,  title: "Victory Day Holiday",             event_date: `${year}-12-16`, end_date: null,            category: "holiday",  description: null, is_holiday: true },
    { id: 9,  title: "Result Publication",              event_date: `${year}-09-10`, end_date: null,            category: "event",    description: "1st and 2nd semester BTEB results.", is_holiday: false },
    { id: 10, title: "Scholarship Application Deadline",event_date: `${year}-10-15`, end_date: null,            category: "deadline", description: "Submit scholarship applications by this date.", is_holiday: false },
  ];
}
