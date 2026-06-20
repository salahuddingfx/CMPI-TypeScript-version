import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";
import { CalendarCheck, BookOpen, Wallet, TrendingUp, ExternalLink } from "lucide-react";

const enrolledCourses = [
  { title: "Civil Technology", code: "CIV-101", progress: 72, instructor: "Engr. Rahman", attendance: 88, grade: 3.5 },
  { title: "Computer Science & Technology", code: "CST-201", progress: 60, instructor: "Engr. Akter", attendance: 92, grade: 3.8 },
  { title: "Electrical Technology", code: "EET-101", progress: 84, instructor: "Engr. Karim", attendance: 95, grade: 3.2 },
  { title: "Electronics Technology", code: "ELT-201", progress: 68, instructor: "Engr. Hossain", attendance: 78, grade: 3.0 },
];

const gradeTrend = [
  { semester: "1st", gpa: 3.20 },
  { semester: "2nd", gpa: 3.45 },
  { semester: "3rd", gpa: 3.38 },
  { semester: "4th", gpa: 3.52 },
];

const upcomingBills = [
  { id: 1, title: "Semester Tuition Fee", amount: "BDT 12,500", due: "15 Jul 2026", status: "upcoming" as const },
  { id: 2, title: "Lab Fee", amount: "BDT 2,000", due: "30 Jul 2026", status: "upcoming" as const },
  { id: 3, title: "Library Fine", amount: "BDT 200", due: "05 Jul 2026", status: "overdue" as const },
];

const notices = [
  { title: "Class suspended on 25 June", date: "2026-06-20", category: "Holiday" },
  { title: "Mid-term routine published", date: "2026-06-18", category: "Exam" },
  { title: "Lab assignment deadline extended", date: "2026-06-15", category: "Academic" },
  { title: "Sports week registration open", date: "2026-06-12", event: "Event" },
];

const recentResults = [
  { course: "CIV-101", mid: 28, final: 55, total: 83, grade: "A-" },
  { course: "CST-201", mid: 30, final: 52, total: 82, grade: "A-" },
  { course: "EET-101", mid: 22, final: 48, total: 70, grade: "B+" },
  { course: "ELT-201", mid: 25, final: 45, total: 70, grade: "B+" },
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

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-bold text-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs font-semibold text-muted-foreground">
          {p.name}: {p.value}{typeof p.value === "number" && p.name !== "gpa" ? "%" : ""}
        </p>
      ))}
    </div>
  );
}

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cmpi-user");
  return raw ? JSON.parse(raw) : null;
}

export function DashboardOverview() {
  const storedUser = getStoredUser();
  const userProfile = {
    name: storedUser?.name || "Rahim Miah",
    studentId: storedUser?.studentId || "CMPI-2023-0456",
    department: storedUser?.department || "Computer Science & Technology",
    semester: storedUser?.semester || "4th",
    session: storedUser?.session || "2023-2024",
    admissionDate: storedUser?.admissionDate || "2023-06-15",
  };

  let expectedGraduation = "June 2027";
  if (userProfile.admissionDate && userProfile.admissionDate !== "N/A" && userProfile.admissionDate !== "—") {
    try {
      const year = new Date(userProfile.admissionDate).getFullYear();
      if (!isNaN(year)) {
        expectedGraduation = `June ${year + 4}`;
      }
    } catch {}
  } else if (userProfile.session && userProfile.session.includes("-")) {
    const startYear = parseInt(userProfile.session.split("-")[0]);
    if (!isNaN(startYear)) {
      expectedGraduation = `June ${startYear + 4}`;
    }
  }

  const studentDept = userProfile.department?.toLowerCase() || "";
  const filteredCourses = enrolledCourses.filter((c) => {
    if (storedUser?.role === "admin") return true;
    if (studentDept.includes("computer") || studentDept.includes("cst")) {
      return c.title.toLowerCase().includes("computer") || c.title.toLowerCase().includes("cst");
    }
    if (studentDept.includes("civil")) {
      return c.title.toLowerCase().includes("civil");
    }
    if (studentDept.includes("electrical") || studentDept.includes("eee")) {
      return c.title.toLowerCase().includes("electrical") || c.title.toLowerCase().includes("eee") || c.title.toLowerCase().includes("eet");
    }
    if (studentDept.includes("electronics")) {
      return c.title.toLowerCase().includes("electronics") || c.title.toLowerCase().includes("elt");
    }
    return true;
  });

  const avgAttendance = filteredCourses.length > 0
    ? Math.round(filteredCourses.reduce((s, c) => s + c.attendance, 0) / filteredCourses.length)
    : 0;
  const avgProgress = filteredCourses.length > 0
    ? Math.round(filteredCourses.reduce((s, c) => s + c.progress, 0) / filteredCourses.length)
    : 0;
  const avgGpa = gradeTrend[gradeTrend.length - 1]?.gpa ?? 0;
  const overdueCount = upcomingBills.filter((b) => b.status === "overdue").length;

  const attendanceData = filteredCourses.map((c) => ({ name: c.code, attendance: c.attendance, attendanceNum: c.attendance }));
  const progressPie = [
    { name: "Completed", value: avgProgress },
    { name: "Remaining", value: 100 - avgProgress },
  ];

  const isPending = storedUser?.role === "student" && storedUser?.status === "pending";

  if (isPending) {
    return (
      <div className="space-y-10">
        <SectionHeader
          eyebrow="Overview"
          title="Account Pending Activation"
          description="Your registration has been submitted and is currently undergoing verification by the institute administrators."
          align="left"
        />

        {/* Student Enrollment Card (Pending Mode) */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl text-white">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <span className="inline-flex rounded-full bg-amber-500/10 border border-amber-500/25 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-500">
                Pending Verification
              </span>
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{userProfile.name}</h2>
                <p className="text-sm font-semibold text-slate-300">
                  {userProfile.department}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-white/5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Student ID</p>
                  <p className="text-sm font-bold text-white mt-0.5">{userProfile.studentId}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Current Semester</p>
                  <p className="text-sm font-bold text-white mt-0.5">{userProfile.semester} Semester</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Academic Session</p>
                  <p className="text-sm font-bold text-white mt-0.5">{userProfile.session}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Admission Date</p>
                  <p className="text-sm font-bold text-white mt-0.5">{userProfile.admissionDate}</p>
                </div>
              </div>
            </div>
            
            <div className="shrink-0 rounded-2xl border border-amber-500/10 bg-amber-500/5 backdrop-blur-md p-5 text-center min-w-[200px]">
              <p className="text-[10px] font-black uppercase tracking-wider text-amber-500">Verification Status</p>
              <p className="text-xl font-black text-amber-500 mt-1">Pending Approval</p>
              <div className="mt-3 flex items-center gap-2 justify-center text-xs text-slate-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Under Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lock Screen placeholder */}
        <div className="rounded-sm border border-border bg-card p-8 md:p-12 text-center shadow-sm space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-8 w-8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-foreground">Services are currently locked</h3>
            <p className="text-sm text-muted-foreground leading-6">
              Your profile verification is in progress. Once activated by CMPI administrators, your courses, routine class schedules, exams, grade transcripts, and billing ledgers will be fully accessible here.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/contact" className="inline-flex rounded-sm bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition">
              Contact Admin Office
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Overview"
        title="Your academic progress"
        description="Track attendance, exam results, course progress, notices, and upcoming payments."
        align="left"
      />

      {/* Student Enrollment Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl text-white">
        {/* Dynamic backdrop glow decoration */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 -ml-16 -mb-16 h-32 w-32 rounded-full bg-secondary/10 blur-2xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4 flex-1">
            <span className="inline-flex rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
              Active Student Profile
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{userProfile.name}</h2>
              <p className="text-sm font-semibold text-slate-300">
                {userProfile.department}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-white/5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Student ID</p>
                <p className="text-sm font-bold text-white mt-0.5">{userProfile.studentId}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Current Semester</p>
                <p className="text-sm font-bold text-white mt-0.5">{userProfile.semester} Semester</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Academic Session</p>
                <p className="text-sm font-bold text-white mt-0.5">{userProfile.session}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Admission Date</p>
                <p className="text-sm font-bold text-white mt-0.5">{userProfile.admissionDate}</p>
              </div>
            </div>
          </div>
          
          <div className="shrink-0 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md p-5 text-center min-w-[200px]">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-300">Expected Graduation</p>
            <p className="text-xl font-black text-secondary mt-1">{expectedGraduation}</p>
            <div className="mt-3 flex items-center gap-2 justify-center text-xs text-slate-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Program Duration: 4 Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-sm border bg-muted/60 p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarCheck className="h-4 w-4" />
            <p className="text-sm font-semibold">Avg Attendance</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-primary">{avgAttendance}%</p>
          <p className="text-xs text-muted-foreground mt-1">Across {filteredCourses.length} courses</p>
        </div>
        <div className="rounded-sm border bg-muted/60 p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <p className="text-sm font-semibold">Course Progress</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-primary">{avgProgress}%</p>
          <p className="text-xs text-muted-foreground mt-1">Current semester average</p>
        </div>
        <div className="rounded-sm border bg-muted/60 p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <p className="text-sm font-semibold">Current CGPA</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-primary">{avgGpa.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Latest semester GPA</p>
        </div>
        <div className="rounded-sm border bg-muted/60 p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <p className="text-sm font-semibold">Pending Bills</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-primary">{upcomingBills.length}</p>
          <p className="text-xs text-muted-foreground mt-1">{overdueCount > 0 ? `${overdueCount} overdue` : "All clear"}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Bar Chart */}
        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-4">Attendance by Course</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="attendance" name="Attendance" fill="hsl(164, 100%, 21%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GPA Trend Line Chart */}
        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-4">GPA Trend</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gradeTrend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="semester" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis domain={[0, 4]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="gpa" name="GPA" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: "#2563eb", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Donut */}
        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-4">Overall Progress</h3>
          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {progressPie.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "hsl(164, 100%, 21%)" : "hsl(var(--muted))"} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress + Results */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enrolled Courses */}
        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Enrolled Courses</h3>
          <ul className="mt-4 space-y-3">
            {filteredCourses.map((course) => (
              <li key={course.code} className="rounded-sm border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.code} • {course.instructor}</p>
                  </div>
                  <span className="text-xs font-bold text-primary">{course.attendance}%</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Results */}
        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Recent Exam Results</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  <th className="pb-2">Course</th>
                  <th className="pb-2 text-center">Mid</th>
                  <th className="pb-2 text-center">Final</th>
                  <th className="pb-2 text-center">Total</th>
                  <th className="pb-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentResults.map((r) => (
                  <tr key={r.course} className="hover:bg-card/50">
                    <td className="py-3 font-semibold">{r.course}</td>
                    <td className="py-3 text-center text-muted-foreground">{r.mid}</td>
                    <td className="py-3 text-center text-muted-foreground">{r.final}</td>
                    <td className="py-3 text-center font-bold">{r.total}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                        r.total >= 80 ? "bg-primary/10 text-primary" :
                        r.total >= 70 ? "bg-blue-500/10 text-blue-600" :
                        "bg-secondary/15 text-secondary-dark"
                      }`}>
                        {r.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notices + Bills */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Latest Notices</h3>
          <ul className="mt-4 space-y-3">
            {notices.map((item) => (
              <li key={item.title} className="flex items-center justify-between rounded-sm border bg-card p-4">
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-sm border bg-muted/60 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Bills & Payments</h3>
          <ul className="mt-4 space-y-3">
            {upcomingBills.map((bill) => (
              <li key={bill.id} className="flex items-center justify-between rounded-sm border bg-card p-4">
                <div>
                  <p className="text-sm font-semibold">{bill.title}</p>
                  <p className={`text-xs font-semibold ${bill.status === "overdue" ? "text-destructive" : "text-muted-foreground"}`}>
                    Due: {bill.due} {bill.status === "overdue" && "• Overdue"}
                  </p>
                </div>
                <p className="text-sm font-bold text-primary">{bill.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Resources */}
      <div className="rounded-sm border bg-muted/60 p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Quick Resources</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickResources.map((item) => (
            <Link
              key={item.href + item.title}
              to={item.href}
              className="flex items-center justify-between rounded-sm border border-border/60 bg-card p-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
            >
              {item.title}
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
