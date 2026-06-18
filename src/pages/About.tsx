import { Award, BookOpen, CalendarDays, Users } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FacilityCard } from "@/components/features/FacilityCard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";
import { institute } from "@/utils/constants";

export function About() {
  const { data, loading, error } = useInstituteContext();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load about information.</div></PageTransition>;

  return (
    <PageTransition>
      <SEO title="About" description="Learn about Cox's Bazar Model Polytechnic Institute overview, mission, vision, history, principal message, and campus facilities." />
      <section className="container section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-sm bg-primary p-8 text-white shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Institute Overview</p>
            <h1 className="mt-4 text-4xl font-black">CMPI at a glance</h1>
            <p className="mt-5 leading-8 text-white/80">
              Cox's Bazar Model Polytechnic Institute is a public technical education institution offering diploma programs under the Bangladesh Technical Education Board. The institute emphasizes practical competence, discipline, and ethical professionalism.
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm bg-white/10 p-4">
                <dt className="text-sm text-white/70">Established</dt>
                <dd className="text-2xl font-bold">{institute.established}</dd>
              </div>
                <div className="rounded-sm bg-white/10 p-4">
                <dt className="text-sm text-white/70">EIIN</dt>
                <dd className="text-2xl font-bold">{institute.eiin}</dd>
              </div>
            </dl>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Mission & Vision</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Our mission is to deliver accessible, high-quality technical education that prepares learners for productive employment and lifelong learning. Our vision is to become a leading polytechnic institute recognized for innovation, industry collaboration, and socially responsible graduates.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">History</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                CMPI was established to expand technical education opportunities in Cox's Bazar and surrounding regions. Since inception, the institute has strengthened laboratories, academic programs, and student support services to meet national skill development priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Principal Message" title="Leadership for excellence and discipline" description="The principal's message reflects the institute's commitment to practical learning, ethical conduct, and student success." />
            <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-8">
            <p className="text-lg leading-8 text-foreground">
              We believe every student can become a capable technologist when provided with quality instruction, hands-on practice, and a supportive learning environment. CMPI continues to strengthen academic standards, industry linkage, and co-curricular development.
            </p>
            <p className="mt-6 font-bold text-primary">Principal, {institute.shortName}</p>
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader eyebrow="Campus Facilities" title="Learning infrastructure that supports practical education" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FacilityCard icon={BookOpen} title="Digital Library" description={data.facilities[0].description} />
          <FacilityCard icon={Award} title="Department Labs" description="Specialized laboratories for Civil, CST, and Electrical Technology programs." />
          <FacilityCard icon={CalendarDays} title="Academic Section" description="Routine management, examination support, and academic record services." />
          <FacilityCard icon={Users} title="Student Support" description="Guidance, clubs, welfare support, and co-curricular participation opportunities." />
        </div>
      </section>
    </PageTransition>
  );
}
