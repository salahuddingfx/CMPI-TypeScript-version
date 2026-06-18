import { useParams } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FacultyCard } from "@/components/features/FacultyCard";
import { CheckList } from "@/components/features/StatCard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";

export function DepartmentPage() {
  const { slug } = useParams();
  const { data, loading, error } = useInstituteContext();

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

  const facultyMembers = data.faculty.filter((member) => department.facultyIds.includes(member.id));

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
