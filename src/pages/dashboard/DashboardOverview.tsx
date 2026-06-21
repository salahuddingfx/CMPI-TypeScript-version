import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Award, AlertTriangle, TrendingUp, DollarSign, Loader2, User } from "lucide-react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { getDashboard, getNotices } from "@/services/api";

function getStoredUser() {
  try {
    const raw = localStorage.getItem("cmpi-user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function DashboardOverview() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const storedUser = getStoredUser();
  const isPending = storedUser?.status === "pending";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [dashData, noticeData] = await Promise.allSettled([
        getDashboard(),
        getNotices(),
      ]);
      if (dashData.status === "fulfilled") setDashboard(dashData.value);
      if (noticeData.status === "fulfilled") setNotices(noticeData.value.slice(0, 5));
    } catch (e: any) {
      console.error("Failed to load dashboard data", e);
    }
    setLoading(false);
  }

  const user = dashboard?.user || storedUser;
  const courses = dashboard?.courses || [];
  const courseResults = dashboard?.courseResults || [];
  const bills = dashboard?.bills || [];

  const pendingBills = bills.filter((b: any) => b.status === "pending");
  const totalPending = pendingBills.reduce((sum: number, b: any) => sum + parseFloat(b.amount || 0), 0);

  const latestSemester = courseResults.length > 0 ? courseResults[courseResults.length - 1] : null;
  const cgpa = latestSemester?.sgpa || "—";

  const gradeTrend = courseResults.map((r: any, i: number) => ({
    semester: r.semester || `${i + 1}th`,
    sgpa: parseFloat(r.sgpa) || 0,
  }));

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];
  const courseProgress = courses.length > 0
    ? [
        { name: "Completed", value: courses.filter((c: any) => c.progress >= 80).length },
        { name: "In Progress", value: courses.filter((c: any) => c.progress >= 30 && c.progress < 80).length },
        { name: "Just Started", value: courses.filter((c: any) => c.progress < 30).length },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading dashboard...
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
          <AlertTriangle className="h-10 w-10 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold">Account Pending Activation</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Your account is pending admin approval. Services are currently locked. You will receive an email once your account is activated.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enrollment Card */}
      <div className="rounded-sm border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user?.name || "Student"}</h2>
            <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
              <span>ID: <strong className="text-foreground font-mono">{user?.student_id || "—"}</strong></span>
              <span>Dept: <strong className="text-foreground">{user?.department || "—"}</strong></span>
              <span>Semester: <strong className="text-foreground">{user?.semester || "—"}</strong></span>
              <span>Session: <strong className="text-foreground">{user?.session || "—"}</strong></span>
            </div>
          </div>
          <Link to="/dashboard/profile" className="text-sm text-primary hover:underline">Edit Profile</Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-sm border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Enrolled Courses</span>
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold">{courses.length}</div>
        </div>
        <div className="rounded-sm border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Current CGPA</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{cgpa}</div>
        </div>
        <div className="rounded-sm border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Pending Bills</span>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{pendingBills.length}</div>
          {totalPending > 0 && (
            <div className="text-xs text-yellow-600 mt-1">৳{totalPending.toLocaleString()} due</div>
          )}
        </div>
        <div className="rounded-sm border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Results Published</span>
            <Award className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{courseResults.length}</div>
          <div className="text-xs text-muted-foreground mt-1">semesters</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* GPA Trend Chart */}
        {gradeTrend.length > 0 && (
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold">GPA Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={gradeTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="semester" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sgpa" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Course Progress Pie */}
        {courseProgress.length > 0 && (
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold">Course Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={courseProgress} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {courseProgress.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enrolled Courses */}
        <div className="rounded-sm border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold">Enrolled Courses</h3>
            <Link to="/dashboard/courses" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          {courses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses enrolled yet.</p>
          ) : (
            <div className="space-y-3">
              {courses.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex items-center justify-between rounded-sm bg-muted/40 px-3 py-2">
                  <div>
                    <div className="text-sm font-semibold">{c.title || c.code}</div>
                    <div className="text-xs text-muted-foreground">{c.code} — {c.instructor || "TBA"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium">{c.progress || 0}%</div>
                    <div className="mt-1 h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${c.progress || 0}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Results */}
        <div className="rounded-sm border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold">Recent Results</h3>
            <Link to="/dashboard/results" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          {courseResults.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results published yet.</p>
          ) : (
            <div className="space-y-2">
              {courseResults.slice(-5).map((r: any, i: number) => (
                <div key={i} className="flex items-center justify-between rounded-sm bg-muted/40 px-3 py-2 text-sm">
                  <span className="font-medium">{r.semester || `Semester ${i + 1}`}</span>
                  <span className={`font-bold ${parseFloat(r.sgpa) >= 3.5 ? "text-green-600" : parseFloat(r.sgpa) >= 2.5 ? "text-yellow-600" : "text-red-600"}`}>
                    SGPA: {r.sgpa || "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bills */}
        <div className="rounded-sm border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold">Bills & Payments</h3>
            <Link to="/dashboard/bills" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          {bills.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bills found.</p>
          ) : (
            <div className="space-y-2">
              {bills.slice(0, 4).map((b: any) => (
                <div key={b.id} className="flex items-center justify-between rounded-sm bg-muted/40 px-3 py-2 text-sm">
                  <div>
                    <div className="font-medium">{b.title}</div>
                    <div className="text-xs text-muted-foreground">Due: {b.due ? new Date(b.due).toLocaleDateString() : "—"}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">৳{parseFloat(b.amount || 0).toLocaleString()}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      b.status === "paid" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      b.status === "overdue" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notices */}
        <div className="rounded-sm border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold">Latest Notices</h3>
            <Link to="/notices" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          {notices.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notices yet.</p>
          ) : (
            <div className="space-y-2">
              {notices.map((n: any) => (
                <Link key={n.id} to={`/notices/${n.id}`} className="block rounded-sm bg-muted/40 px-3 py-2 text-sm hover:bg-muted/60 transition-colors">
                  <div className="font-medium truncate">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {n.category || "General"} — {new Date(n.created_at).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
