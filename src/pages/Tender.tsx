import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const tenders = [
  { id: "T-2026-045", title: "Supply of Laboratory Equipment", department: "Computer Science Dept.", budget: "BDT 8,50,000", published: "2026-06-10", deadline: "2026-07-10", status: "open" },
  { id: "T-2026-044", title: "Renovation of Classroom Block B", department: "Administration", budget: "BDT 12,00,000", published: "2026-06-05", deadline: "2026-07-05", status: "open" },
  { id: "T-2026-043", title: "Supply of Internet Bandwidth", department: "IT Cell", budget: "BDT 3,60,000/year", published: "2026-05-20", deadline: "2026-06-20", status: "closed" },
  { id: "T-2026-042", title: "Campus Beautification & Landscaping", department: "Administration", budget: "BDT 4,50,000", published: "2026-05-15", deadline: "2026-06-15", status: "closed" },
  { id: "T-2026-041", title: "Supply of Electrical Materials", department: "EEE Dept.", budget: "BDT 2,25,000", published: "2026-05-10", deadline: "2026-06-10", status: "closed" },
];

export function Tender() {
  return (
    <PageTransition>
      <SEO title="Tenders & Procurement" description="Current and past tender notices for CMPI procurement." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Procurement" title="Tenders & Procurement" description="Official tender notices for goods and services required by CMPI." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl space-y-4">
          {tenders.map((t) => (
            <div key={t.id} className="rounded-sm border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                    <span className={`inline-flex h-5 items-center rounded-sm px-1.5 text-xs font-bold ${t.status === "open" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {t.status === "open" ? "Open" : "Closed"}
                    </span>
                  </div>
                  <h3 className="mt-1 font-bold">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.department}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-primary">{t.budget}</p>
                  <p className="text-xs text-muted-foreground">Deadline: {new Date(t.deadline).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
