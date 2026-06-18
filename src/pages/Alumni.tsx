import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const alumni = [
  { name: "Md. Ariful Islam", dept: "CST", batch: "2018-2022", currentRole: "Software Engineer at bKash", location: "Dhaka" },
  { name: "Fatema Begum", dept: "Civil", batch: "2017-2021", currentRole: "Site Engineer at Square Construction", location: "Chittagong" },
  { name: "Rakibul Hasan", dept: "EEE", batch: "2019-2023", currentRole: "Maintenance Engineer at DPDC", location: "Cox's Bazar" },
  { name: "Sumaiya Akter", dept: "CST", batch: "2020-2024", currentRole: "Junior Developer at Brain Station 23", location: "Dhaka" },
  { name: "Mohammad Ali", dept: "Civil", batch: "2016-2020", currentRole: "Highway Engineer at LGED", location: "Cox's Bazar" },
  { name: "Nusrat Jahan", dept: "EEE", batch: "2018-2022", currentRole: "Sub-Engineer at BPDB", location: "Chittagong" },
  { name: "Tanvir Ahmed", dept: "CST", batch: "2019-2023", currentRole: "Full-Stack Developer (Freelance)", location: "Remote" },
  { name: "Ruma Khatun", dept: "Civil", batch: "2021-2025", currentRole: "Jr. Architect at ACS Architects", location: "Dhaka" },
];

export function Alumni() {
  return (
    <PageTransition>
      <SEO title="Alumni" description="CMPI alumni network - success stories from graduates." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Alumni Network" title="CMPI Alumni" description="Our graduates are working across Bangladesh and beyond." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
          {alumni.map((a) => (
            <div key={a.name} className="rounded-sm border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {a.name.split(" ").slice(-1)[0]?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">{a.dept} — Batch {a.batch}</p>
                  <p className="mt-1 text-sm font-medium">{a.currentRole}</p>
                  <p className="text-xs text-muted-foreground">{a.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
