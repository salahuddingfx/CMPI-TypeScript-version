import { SectionHeader } from "@/components/common/SectionHeader";

const enrolledCourses = [
  { title: "Civil Technology", code: "CIV-101", progress: 72, instructor: "Engr. Rahman", attendance: "88%" },
  { title: "Computer Science & Technology", code: "CST-201", progress: 60, instructor: "Engr. Akter", attendance: "92%" },
  { title: "Electrical Technology", code: "EET-101", progress: 84, instructor: "Engr. Karim", attendance: "95%" },
];

const upcomingBills = [
  { id: 1, title: "Semester Tuition Fee", amount: "BDT 12,500", due: "15 July 2026" },
  { id: 2, title: "Lab Fee", amount: "BDT 2,000", due: "30 July 2026" },
];

const notices = [
  { title: "Class suspended on 25 June", date: "2026-06-20" },
  { title: "Mid-term routine published", date: "2026-06-18" },
  { title: "Lab assignment deadline extended", date: "2026-06-15" },
];

const quickResources = [
  { title: "Class Routine", href: "/student-corner" },
  { title: "Download Forms", href: "/student-corner" },
  { title: "Academic Calendar", href: "/student-corner" },
  { title: "Exam Routine", href: "/notices" },
  { title: "Result Board", href: "/student-corner" },
  { title: "Library Portal", href: "/student-corner" },
  { title: "Hostel Info", href: "/contact" },
  { title: "Transport Info", href: "/contact" },
];

export function DashboardOverview() {
  const statProgress = Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length);

  return (
    <div className="space-y-10">
      <SectionHeader eyebrow="Overview" title="Your academic progress" description="Track enrolled courses, attendance, notices, resources, and upcoming payments." align="left" />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border bg-muted/60 p-5">
          <p className="text-sm text-muted-foreground">Average progress</p>
          <p className="mt-2 text-3xl font-bold text-primary">{statProgress}%</p>
          <div className="mt-3 h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${statProgress}%` }} />
          </div>
        </div>
        <div className="rounded-sm border bg-muted/60 p-5">
          <p className="text-sm text-muted-foreground">Enrolled courses</p>
          <p className="mt-2 text-3xl font-bold text-primary">{enrolledCourses.length}</p>
        </div>
        <div className="rounded-sm border bg-muted/60 p-5">
          <p className="text-sm text-muted-foreground">Pending bills</p>
          <p className="mt-2 text-3xl font-bold text-primary">{upcomingBills.length}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-base font-bold uppercase tracking-[0.18em] text-primary">Course progress</h3>
          <ul className="mt-4 space-y-4">
            {enrolledCourses.map((course) => (
              <li key={course.code} className="rounded-sm border bg-card p-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{course.title}</p>
                      <p className="text-xs text-muted-foreground">Code: {course.code} • Instructor: {course.instructor}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Attendance: {course.attendance}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-sm border bg-muted/60 p-6">
            <h3 className="text-base font-bold uppercase tracking-[0.18em] text-primary">Notices</h3>
            <ul className="mt-4 space-y-3">
              {notices.map((item) => (
                <li key={item.title} className="flex items-center justify-between rounded-sm border bg-card p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border bg-muted/60 p-6">
            <h3 className="text-base font-bold uppercase tracking-[0.18em] text-primary">Bills & payments</h3>
            <ul className="mt-4 space-y-3">
              {upcomingBills.map((bill) => (
                <li key={bill.id} className="flex items-center justify-between rounded-sm border bg-card p-4">
                  <div>
                    <p className="text-sm font-semibold">{bill.title}</p>
                    <p className="text-xs text-muted-foreground">Due: {bill.due}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{bill.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-sm border bg-muted/60 p-6">
        <h3 className="text-base font-bold uppercase tracking-[0.18em] text-primary">Resources</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickResources.map((item) => (
            <a key={item.href} href={item.href} className="rounded-sm border border-border/60 bg-card p-4 text-center text-sm font-semibold transition hover:border-primary hover:text-primary">
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
