import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getStudentResults } from "@/services/api";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";

export function StudentResults() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentResults()
      .then(setResults)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader eyebrow="Results" title="Semester results and grades" description="Loading results..." align="left" />
        <TableSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Results" title="Semester results and grades" description="Review your exam performance and grade points." align="left" />

      {results.length === 0 ? (
        <div className="rounded-sm border bg-card p-8 text-center text-muted-foreground">
          No results published yet.
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((sem: any) => (
            <div key={sem.semester} className="rounded-sm border bg-muted/60 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{sem.semester} Semester</p>
                <p className="text-sm text-primary font-bold">SGPA: {sem.sgpa || "—"}</p>
              </div>
              {sem.courses && sem.courses.length > 0 && (
                <div className="mt-4 space-y-3">
                  {sem.courses.map((course: any) => (
                    <div key={course.name} className="flex items-center justify-between rounded-sm border bg-card p-4 text-sm">
                      <span>{course.name}</span>
                      <span className="font-semibold">Grade: {course.grade || "—"}</span>
                      <span className="text-muted-foreground">GP: {course.gp || "—"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="rounded-sm border bg-card p-6 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">For detailed BTEB board results, check the</p>
            <Link to="/results" className="mt-2 inline-flex text-sm font-bold text-primary hover:underline">
              Board Results page →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
