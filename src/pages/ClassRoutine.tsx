import { useState } from "react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

type Dept = "CST" | "Civil" | "EEE";
const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const timeSlots = ["8:00 - 9:30", "9:45 - 11:15", "11:30 - 1:00", "2:00 - 3:30", "3:45 - 5:15"];

const routines: Record<Dept, Record<string, Record<string, string>>> = {
  CST: {
    Saturday: { "8:00 - 9:30": "Web Dev (CST-301)", "9:45 - 11:15": "DB Lab (CST-302)", "11:30 - 1:00": "Networks (CST-303)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Sunday: { "8:00 - 9:30": "", "9:45 - 11:15": "Web Dev (CST-301)", "11:30 - 1:00": "", "2:00 - 3:30": "Networks Lab (CST-303)", "3:45 - 5:15": "" },
    Monday: { "8:00 - 9:30": "SE (CST-304)", "9:45 - 11:15": "", "11:30 - 1:00": "Web Dev Lab (CST-301)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Tuesday: { "8:00 - 9:30": "", "9:45 - 11:15": "DB (CST-302)", "11:30 - 1:00": "", "2:00 - 3:30": "SE (CST-304)", "3:45 - 5:15": "" },
    Wednesday: { "8:00 - 9:30": "Networks (CST-303)", "9:45 - 11:15": "", "11:30 - 1:00": "DB (CST-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Thursday: { "8:00 - 9:30": "", "9:45 - 11:15": "Lab (CST-304)", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
  },
  Civil: {
    Saturday: { "8:00 - 9:30": "Structural (CIV-301)", "9:45 - 11:15": "", "11:30 - 1:00": "Surveying Lab (CIV-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Sunday: { "8:00 - 9:30": "", "9:45 - 11:15": "Materials (CIV-303)", "11:30 - 1:00": "", "2:00 - 3:30": "Structural (CIV-301)", "3:45 - 5:15": "" },
    Monday: { "8:00 - 9:30": "Surveying (CIV-302)", "9:45 - 11:15": "", "11:30 - 1:00": "Materials Lab (CIV-303)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Tuesday: { "8:00 - 9:30": "", "9:45 - 11:15": "", "11:30 - 1:00": "Structural (CIV-301)", "2:00 - 3:30": "Surveying (CIV-302)", "3:45 - 5:15": "" },
    Wednesday: { "8:00 - 9:30": "Materials (CIV-303)", "9:45 - 11:15": "", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Thursday: { "8:00 - 9:30": "", "9:45 - 11:15": "CAD Lab (CIV-304)", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
  },
  EEE: {
    Saturday: { "8:00 - 9:30": "Power Electronics (EEE-301)", "9:45 - 11:15": "", "11:30 - 1:00": "Control Systems (EEE-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Sunday: { "8:00 - 9:30": "", "9:45 - 11:15": "Machines (EEE-303)", "11:30 - 1:00": "", "2:00 - 3:30": "Power Electronics Lab (EEE-301)", "3:45 - 5:15": "" },
    Monday: { "8:00 - 9:30": "Control Systems (EEE-302)", "9:45 - 11:15": "", "11:30 - 1:00": "", "2:00 - 3:30": "Machines (EEE-303)", "3:45 - 5:15": "" },
    Tuesday: { "8:00 - 9:30": "", "9:45 - 11:15": "", "11:30 - 1:00": "Power Electronics (EEE-301)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Wednesday: { "8:00 - 9:30": "", "9:45 - 11:15": "Machines Lab (EEE-303)", "11:30 - 1:00": "Control Systems (EEE-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Thursday: { "8:00 - 9:30": "Electronics Lab (EEE-304)", "9:45 - 11:15": "", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
  },
};

export function ClassRoutine() {
  const [dept, setDept] = useState<Dept>("CST");
  const routine = routines[dept];

  return (
    <PageTransition>
      <SEO title="Class Routine" description="Weekly class routine for all departments at CMPI." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Academics" title="Weekly Class Routine" description="Department-wise weekly class schedule for the current semester." align="center" className="mb-10" />

        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center gap-2">
            {(["CST", "Civil", "EEE"] as const).map((d) => (
              <button key={d} type="button" className={`rounded-sm px-4 py-2 text-sm font-bold transition ${dept === d ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} onClick={() => setDept(d)}>
                {d === "CST" ? "Computer Science" : d === "Civil" ? "Civil Technology" : "Electrical Technology"}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-sm border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60">
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Time</th>
                  {days.map((d) => <th key={d} className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">{d.slice(0, 3)}</th>)}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, i) => (
                  <tr key={slot} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                    <td className="whitespace-nowrap border-t px-3 py-2 font-semibold text-muted-foreground">{slot}</td>
                    {days.map((d) => {
                      const cell = routine[d]?.[slot] ?? "";
                      return <td key={d} className={`border-t px-3 py-2 text-center text-xs ${cell ? "font-semibold text-foreground" : "text-muted-foreground/40"}`}>{cell || "-"}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
