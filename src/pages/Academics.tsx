import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DepartmentCard } from "@/components/features/DepartmentCard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";

export function Academics() {
  const { data, loading, error } = useInstituteContext();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load academic programs.</div></PageTransition>;

  return (
    <PageTransition>
      <SEO title="Academics" description="Explore diploma technology departments at Cox's Bazar Model Polytechnic Institute including Civil, Computer Science, and Electrical Technology." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Academic Programs"
          title="Four-year diploma engineering programs"
          description="CMPI offers BTEB-aligned diploma programs with strong practical training, laboratory work, and industry-relevant project exposure."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {data.departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
        <div className="mt-8 rounded-sm bg-primary p-8 text-white">
          <h2 className="text-2xl font-bold">Academic Support</h2>
          <p className="mt-3 leading-8 text-white/80">
            Academic sections maintain class routines, examinations, results, and student progress records. Departments conduct practical classes, project reviews, and technical demonstrations throughout the semester.
          </p>
          <Button asChild variant="secondary" className="mt-5">
            <Link to="/student-corner">
              Student Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
