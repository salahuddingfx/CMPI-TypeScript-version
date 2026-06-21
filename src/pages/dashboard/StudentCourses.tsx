import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getStudentCourses } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

export function StudentCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentCourses()
      .then(setCourses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader eyebrow="Courses" title="Enrolled courses" description="Loading courses..." align="left" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-sm border bg-card p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Courses" title="Enrolled courses" description="Your registered courses, instructors, and attendance overview." align="left" />
      {courses.length === 0 ? (
        <div className="rounded-sm border bg-card p-8 text-center text-muted-foreground">
          No courses enrolled yet.
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course: any) => (
            <div key={course.id || course.code} className="rounded-sm border bg-muted/60 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{course.title || course.name}</p>
                  <p className="text-xs text-muted-foreground">Code: {course.code} • Instructor: {course.instructor || "TBA"}</p>
                </div>
                {course.schedule && (
                  <span className="text-xs text-muted-foreground">Schedule: {course.schedule}</span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span className="font-semibold">{course.progress || 0}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${course.progress || 0}%` }} />
                  </div>
                </div>
                {course.attendance && (
                  <span className="text-xs font-semibold text-primary">Attendance: {course.attendance}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
