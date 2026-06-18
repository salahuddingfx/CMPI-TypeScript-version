import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const scholarships = [
  { name: "Government Merit Scholarship", eligibility: "CGPA ≥ 3.50, top 10% of class", amount: "100% tuition fee waiver", deadline: "2026-12-31", status: "open" },
  { name: "SSC GPA 5.0 Scholarship", eligibility: "SSC GPA 5.00", amount: "50% tuition fee waiver", deadline: "2026-11-30", status: "open" },
  { name: "Tribal Quota Scholarship", eligibility: "Students from tribal communities", amount: "75% tuition fee waiver", deadline: "2026-11-30", status: "open" },
  { name: "Freedom Fighter Quota", eligibility: "Children of freedom fighters", amount: "100% tuition fee waiver", deadline: "2026-12-31", status: "open" },
  { name: "CMPI Merit-Cum-Means", eligibility: "CGPA ≥ 3.00 + family income < 50,000 BDT", amount: "40% tuition fee waiver", deadline: "2026-10-31", status: "closed" },
  { name: "Industry Sponsorship (Robi)", eligibility: "Top 5 students in EEE", amount: "BDT 15,000/semester stipend", deadline: "2027-01-15", status: "upcoming" },
];

export function Scholarship() {
  return (
    <PageTransition>
      <SEO title="Scholarships" description="Scholarship opportunities for CMPI diploma students." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Financial Aid" title="Scholarship Opportunities" description="Various scholarship programs to support meritorious and needy students." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl space-y-4">
          {scholarships.map((s) => (
            <div key={s.name} className="rounded-sm border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.eligibility}</p>
                </div>
                <span className={`inline-flex h-7 w-fit items-center rounded-sm px-2 text-xs font-bold ${s.status === "open" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500" : s.status === "closed" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"}`}>
                  {s.status === "open" ? "Open" : s.status === "closed" ? "Closed" : "Upcoming"}
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:gap-6">
                <span className="text-muted-foreground">Amount: <span className="font-semibold text-foreground">{s.amount}</span></span>
                <span className="text-muted-foreground">Deadline: <span className="font-semibold text-foreground">{new Date(s.deadline).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
