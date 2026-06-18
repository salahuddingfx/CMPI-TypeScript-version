import { SectionHeader } from "@/components/common/SectionHeader";
import { enrolledCourses } from "@/data/mockStudentData";

export function StudentCourses() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Courses" title="Enrolled courses" description="Your registered courses, instructors, and attendance overview." align="left" />
      <div className="space-y-4">
        {enrolledCourses.map((course) => (
          <div key={course.code} className="rounded-sm border bg-muted/60 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className="text-xs text-muted-foreground">Code: {course.code} • Instructor: {course.instructor}</p>
              </div>
              <span className="text-xs text-muted-foreground">Next class: {course.nextClass}</span>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Progress</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              <span className="text-xs font-semibold text-primary">Attendance: {course.attendance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
