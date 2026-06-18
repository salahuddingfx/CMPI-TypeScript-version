import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const jobs = [
  { title: "Junior Software Developer", company: "Brain Station 23", location: "Dhaka", type: "Full-time", salary: "BDT 30,000-45,000", posted: "2026-06-10", dept: "CST" },
  { title: "Site Engineer (Intern)", company: "Square Infratech", location: "Chittagong", type: "Internship", salary: "BDT 12,000", posted: "2026-06-08", dept: "Civil" },
  { title: "Electrical Maintenance Tech", company: "PGCB", location: "Cox's Bazar", type: "Full-time", salary: "BDT 25,000-35,000", posted: "2026-06-05", dept: "EEE" },
  { title: "Web Developer (Remote)", company: "Creative IT Institute", location: "Remote", type: "Part-time", salary: "BDT 20,000-30,000", posted: "2026-06-01", dept: "CST" },
  { title: "Surveyor Assistant", company: "LGED", location: "Cox's Bazar", type: "Contract", salary: "BDT 18,000", posted: "2026-05-28", dept: "Civil" },
  { title: "Junior Network Admin", company: "Local ISP", location: "Cox's Bazar", type: "Full-time", salary: "BDT 22,000-28,000", posted: "2026-05-25", dept: "CST" },
];

export function Placement() {
  return (
    <PageTransition>
      <SEO title="Career & Placement" description="Job and internship opportunities for CMPI students and alumni." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Career Services" title="Career & Placement Cell" description="Connecting our students with industry opportunities and career guidance." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl space-y-4">
          {jobs.map((j) => (
            <div key={j.title + j.company} className="rounded-sm border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-bold">{j.title}</h3>
                  <p className="text-sm font-medium text-primary">{j.company}</p>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{j.location}</span>
                    <span>•</span>
                    <span>{j.type}</span>
                    <span>•</span>
                    <span className="font-semibold text-foreground">{j.salary}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <span className="inline-flex h-5 items-center rounded-sm bg-primary/10 px-1.5 font-bold text-primary">{j.dept}</span>
                  <p className="mt-1">Posted {new Date(j.posted).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
