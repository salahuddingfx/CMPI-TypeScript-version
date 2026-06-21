import { useState } from "react";
import { useParams } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FacultyCard } from "@/components/features/FacultyCard";
import { CheckList } from "@/components/features/StatCard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";

interface Subject {
  id: number;
  department: string;
  semester: string;
  subject_code: string;
  subject_name: string;
  credit: number | null;
  technology_code: number | null;
  technology_name: string | null;
  theory_marks: number;
  practical_marks: number;
  total_marks: number;
}

const SEM_ORDER = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export function DepartmentPage() {
  const { slug } = useParams();
  const { data, loading, error } = useInstituteContext();
  const [openSem, setOpenSem] = useState<string>("1st");

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load department details.</div></PageTransition>;

  const department = data.departments.find((item) => item.slug === slug);
  if (!department) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border bg-card p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Department not found</h1>
          <p className="mt-3 text-muted-foreground">The requested department page does not exist.</p>
        </div>
      </PageTransition>
    );
  }

  const facultyIds = department.facultyIds ?? [];
  const facultyMembers = data.faculty.filter((member) => facultyIds.includes(member.id));

  const subjects: Subject[] = (department as any).subjects ?? [];
  const groupedSubjects: Record<string, Subject[]> = {};
  for (const sem of SEM_ORDER) {
    groupedSubjects[sem] = subjects.filter((s) => s.semester === sem);
  }
  const availableSemesters = SEM_ORDER.filter((s) => groupedSubjects[s]?.length > 0);

  return (
    <PageTransition>
      <SEO title={department.title} description={`${department.title} department overview, faculty, labs, achievements, and career opportunities at CMPI.`} />
      <section className="container section-pad">
        <div className="rounded-sm bg-primary p-8 text-white shadow-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">{department.shortTitle}</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">{department.title}</h1>
          <p className="mt-5 max-w-3xl leading-8 text-white/80">{department.overview}</p>
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader eyebrow="Department Overview" title="Curriculum and practical focus" align="left" />
            <CheckList items={department.objectives} />
          </div>
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Labs & Facilities</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {department.labs.map((lab) => (
                <li key={lab} className="rounded-sm bg-muted p-4 font-medium">{lab}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Subjects / Syllabus Section ── */}
      {availableSemesters.length > 0 && (
        <section className="container section-pad">
          <SectionHeader eyebrow="Curriculum" title="Subjects by Semester" align="left" className="mb-6" />
          <div className="flex flex-wrap gap-2 mb-6">
            {availableSemesters.map((sem) => (
              <button
                key={sem}
                type="button"
                onClick={() => setOpenSem(sem)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                  openSem === sem
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {sem} Semester ({groupedSubjects[sem]?.length ?? 0})
              </button>
            ))}
          </div>

          {groupedSubjects[openSem] && groupedSubjects[openSem].length > 0 && (
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">#</th>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Subject Name</th>
                    <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-muted-foreground">Credit</th>
                    <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Theory</th>
                    <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Practical</th>
                    <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedSubjects[openSem]!.map((sub, i) => (
                    <tr key={sub.id} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="px-4 py-3 text-muted-foreground font-bold">{i + 1}</td>
                      <td className="px-4 py-3 font-mono font-bold text-primary">{sub.subject_code}</td>
                      <td className="px-4 py-3 font-semibold">{sub.subject_name}</td>
                      <td className="px-4 py-3 text-center font-bold">{sub.credit ?? "—"}</td>
                      <td className="px-4 py-3 text-center font-bold hidden sm:table-cell">{sub.theory_marks || "—"}</td>
                      <td className="px-4 py-3 text-center font-bold hidden sm:table-cell">{sub.practical_marks || "—"}</td>
                      <td className="px-4 py-3 text-center font-bold hidden sm:table-cell">{sub.total_marks || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      <section className="container section-pad">
        <SectionHeader eyebrow="Faculty Members" title="Department faculty" align="left" />
        <div className="grid gap-6 md:grid-cols-3">
          {facultyMembers.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <CheckList items={department.achievements} />
          </div>
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Career Opportunities</h2>
            <CheckList items={department.careerOpportunities} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
