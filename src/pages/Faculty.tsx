import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FacultyCard } from "@/components/features/FacultyCard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";
import type { DepartmentSlug, FacultyMember } from "@/services/types";

type FacultyDepartment = FacultyMember["department"];

const departmentOptions: Array<{ value: FacultyDepartment | "all"; label: string }> = [
  { value: "all", label: "All Departments" },
  { value: "civil-technology", label: "Civil Technology" },
  { value: "computer-science-technology", label: "Computer Science & Technology" },
  { value: "electrical-technology", label: "Electrical Technology" },
  { value: "Administration", label: "Administration" },
];

export function Faculty() {
  const { data, loading, error } = useInstituteContext();
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<FacultyDepartment | "all">("all");

  const filteredFaculty = useMemo(() => {
    if (!data) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return data.faculty.filter((member) => {
      const matchesDepartment = department === "all" || member.department === department;
      const searchable = `${member.name} ${member.designation} ${member.qualification} ${member.specialization.join(" ")}`.toLowerCase();
      return matchesDepartment && searchable.includes(normalizedQuery);
    });
  }, [data, department, query]);

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load faculty listing.</div></PageTransition>;

  return (
    <PageTransition>
      <SEO title="Faculty" description="Faculty listing and profile cards for Cox's Bazar Model Polytechnic Institute departments." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Faculty Listing"
          title="Meet the educators behind practical learning"
          description="Browse faculty profiles by department or search by name, designation, qualification, or specialization."
          align="left"
        />
        <div className="mb-8 grid gap-4 rounded-sm border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search faculty..." aria-label="Search faculty" />
          <Select value={department} onChange={(event) => setDepartment(event.target.value as FacultyDepartment | "all")} aria-label="Filter faculty by department">
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </div>
        {filteredFaculty.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border bg-card p-8 text-center text-muted-foreground">No faculty members found for the selected filters.</div>
        )}
      </section>
    </PageTransition>
  );
}
