import { Calendar, Download, FileText, Clock } from "lucide-react";
import { ResourceList } from "@/components/features/ResourceList";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";

const routineRows = [
  { time: "08:00 AM - 09:30 AM", first: "Class / Lab Session", second: "Class / Lab Session", third: "Class / Lab Session" },
  { time: "09:45 AM - 11:15 AM", first: "Class / Lab Session", second: "Class / Lab Session", third: "Class / Lab Session" },
  { time: "11:30 AM - 01:00 PM", first: "Class / Lab Session", second: "Class / Lab Session", third: "Class / Lab Session" },
  { time: "02:00 PM - 03:30 PM", first: "Practical / Project", second: "Practical / Project", third: "Practical / Project" },
];

export function StudentCorner() {
  const { data, loading, error } = useInstituteContext();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load student corner data.</div></PageTransition>;

  return (
    <PageTransition>
      <SEO title="Student Corner" description="Academic calendar, downloads, class routines, forms, and student resources for CMPI." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Student Corner"
          title="Resources for current students"
          description="Access academic calendar, downloadable forms, class routine templates, and student support information."
          align="left"
        />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Calendar className="h-6 w-6 text-primary" />
              Academic Calendar
            </h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-sm bg-muted p-4">
                <p className="text-sm text-muted-foreground">Semester Start</p>
                <p className="font-semibold">June 2026</p>
              </div>
              <div className="rounded-sm bg-muted p-4">
                <p className="text-sm text-muted-foreground">Mid-Term Examination</p>
                <p className="font-semibold">July 2026</p>
              </div>
              <div className="rounded-sm bg-muted p-4">
                <p className="text-sm text-muted-foreground">Final Examination</p>
                <p className="font-semibold">October 2026</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Download className="h-6 w-6 text-primary" />
              Downloads
            </h2>
            <ResourceList resources={data.resources} />
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Routine" title="Sample class routine structure" align="left" />
          <div className="overflow-x-auto rounded-sm border bg-card shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Civil</th>
                  <th className="px-4 py-3 text-left">CST</th>
                  <th className="px-4 py-3 text-left">Electrical</th>
                </tr>
              </thead>
              <tbody>
                {routineRows.map((row) => (
                  <tr key={row.time} className="border-t">
                    <td className="flex items-center gap-2 px-4 py-3 font-semibold">
                      <Clock className="h-4 w-4 text-primary" />
                      {row.time}
                    </td>
                    <td className="px-4 py-3">{row.first}</td>
                    <td className="px-4 py-3">{row.second}</td>
                    <td className="px-4 py-3">{row.third}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader eyebrow="Forms" title="Common student forms" align="left" />
        <div className="grid gap-4 md:grid-cols-3">
          {["Leave Application", "Testimonial Request", "ID Card Correction"].map((form) => (
            <div key={form} className="rounded-sm border bg-card p-5 shadow-sm">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-bold">{form}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Submit through the academic section with required supporting documents.</p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
