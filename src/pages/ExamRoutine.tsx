import { useState } from "react";
import { Calendar } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

type Dept = "CST" | "Civil" | "EEE";

const examRoutine: Record<Dept, { date: string; day: string; time: string; course: string; courseCode: string }[]> = {
  CST: [
    { date: "2026-07-01", day: "Wednesday", time: "9:00 AM - 12:00 PM", course: "Web Development", courseCode: "CST-301" },
    { date: "2026-07-03", day: "Friday", time: "9:00 AM - 12:00 PM", course: "Database Management", courseCode: "CST-302" },
    { date: "2026-07-05", day: "Sunday", time: "9:00 AM - 12:00 PM", course: "Computer Networks", courseCode: "CST-303" },
    { date: "2026-07-07", day: "Tuesday", time: "9:00 AM - 12:00 PM", course: "Software Engineering", courseCode: "CST-304" },
  ],
  Civil: [
    { date: "2026-07-01", day: "Wednesday", time: "2:00 PM - 5:00 PM", course: "Structural Analysis", courseCode: "CIV-301" },
    { date: "2026-07-03", day: "Friday", time: "2:00 PM - 5:00 PM", course: "Surveying II", courseCode: "CIV-302" },
    { date: "2026-07-05", day: "Sunday", time: "2:00 PM - 5:00 PM", course: "Construction Materials", courseCode: "CIV-303" },
  ],
  EEE: [
    { date: "2026-07-02", day: "Thursday", time: "9:00 AM - 12:00 PM", course: "Power Electronics", courseCode: "EEE-301" },
    { date: "2026-07-04", day: "Saturday", time: "9:00 AM - 12:00 PM", course: "Control Systems", courseCode: "EEE-302" },
    { date: "2026-07-06", day: "Monday", time: "9:00 AM - 12:00 PM", course: "Electrical Machines", courseCode: "EEE-303" },
  ],
};

export function ExamRoutine() {
  const [dept, setDept] = useState<Dept>("CST");

  return (
    <PageTransition>
      <SEO title="Exam Routine" description="Mid-term and final examination routine for all departments at CMPI." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Examinations" title="Exam Routine 2026" description="Department-wise examination schedule for the current semester." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center gap-2">
            {(["CST", "Civil", "EEE"] as const).map((d) => (
              <button key={d} type="button" className={`rounded-sm px-4 py-2 text-sm font-bold transition ${dept === d ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} onClick={() => setDept(d)}>
                {d === "CST" ? "Computer Science" : d === "Civil" ? "Civil Technology" : "Electrical Technology"}
              </button>
            ))}
          </div>

          <div className="rounded-sm border bg-card shadow-sm overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_1.2fr] bg-muted/60 px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>Date & Day</span>
              <span>Time</span>
              <span>Course</span>
            </div>
            {examRoutine[dept].map((item, i) => (
              <div key={item.courseCode} className={`grid grid-cols-[1fr_1fr_1.2fr] px-4 py-3 text-sm ${i % 2 === 0 ? "" : "bg-muted/30"}`}>
                <div>
                  <p className="font-semibold">{new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  <p className="text-xs text-muted-foreground">{item.day}</p>
                </div>
                <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" />{item.time}</span>
                <div>
                  <p className="font-semibold">{item.course}</p>
                  <p className="text-xs text-muted-foreground">{item.courseCode}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
