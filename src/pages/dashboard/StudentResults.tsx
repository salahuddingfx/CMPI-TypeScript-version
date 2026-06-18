import { SectionHeader } from "@/components/common/SectionHeader";
import { courseResults } from "@/data/mockStudentData";

export function StudentResults() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Results" title="Semester results and grades" description="Review your exam performance and grade points." align="left" />
      <div className="space-y-6">
        {courseResults.map((sem) => (
          <div key={sem.semester} className="rounded-sm border bg-muted/60 p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{sem.semester} Semester</p>
              <p className="text-sm text-primary font-bold">SGPA: {sem.sgpa}</p>
            </div>
            <div className="mt-4 space-y-3">
              {sem.courses.map((course) => (
                <div key={course.name} className="flex items-center justify-between rounded-sm border bg-card p-4 text-sm">
                  <span>{course.name}</span>
                  <span className="font-semibold">Grade: {course.grade}</span>
                  <span className="text-muted-foreground">GP: {course.gp}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
