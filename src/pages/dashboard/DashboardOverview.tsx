import { SectionHeader } from "@/components/common/SectionHeader";

const enrolledCourses = [
  { title: "Civil Technology", code: "CIV-101", progress: 72, instructor: "Engr. Rahman", attendance: "88%" },
  { title: "Computer Science & Technology", code: "CST-201", progress: 60, instructor: "Engr. Akter", attendance: "92%" },
  { title: "Electrical Technology", code: "EET-101", progress: 84, instructor: "Engr. Karim", attendance: "95%" },
];

const upcomingBills = [
  { id: 1, title: "Semester Tuition Fee", amount: "BDT 12,500", due: "15 July 2026" },
  { id: 2, title: " Laboratory Fee", amount: "BDT 2,000", due: "30 July 2026" },
];

export function DashboardOverview() {
  const statProgress = Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length);

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Overview" title="Your academic progress" description="Track enrolled courses, attendance, and upcoming payments." align="left" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border bg-muted/60 p-4">
          <p className="text-sm text-muted-foreground">Average progress</p>
          <p className="mt-2 text-3xl font-bold text-primary">{statProgress}%</p>
          <div className="mt-3 h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${statProgress}%` }} />
          </div>
        </div>
        <div className="rounded-sm border bg-muted/60 p-4">
          <p className="text-sm text-muted-foreground">Enrolled courses</p>
          <p className="mt-2 text-3xl font-bold text-primary">{enrolledCourses.length}</p>
        </div>
        <div className="rounded-sm border bg-muted/60 p-4">
          <p className="text-sm text-muted-foreground">Pending bills</p>
          <p className="mt-2 text-3xl font-bold text-primary">{upcomingBills.length}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold">Enrolled courses</h3>
          <ul className="mt-4 space-y-4">
            {enrolledCourses.map((course) => (
              <li key={course.code} className="rounded-sm border bg-muted/60 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-xs text-muted-foreground">Code: {course.code} • Instructor: {course.instructor}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Attendance: {course.attendance}</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-sm border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold">Upcoming bills</h3>
          <ul className="mt-4 space-y-3">
            {upcomingBills.map((bill) => (
              <li key={bill.id} className="flex flex-col gap-2 rounded-sm border bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{bill.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {bill.due}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-bold text-primary">{bill.amount}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
