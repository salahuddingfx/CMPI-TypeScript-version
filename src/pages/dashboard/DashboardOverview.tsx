import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Award, AlertTriangle, TrendingUp, DollarSign, User, Search, Trophy } from "lucide-react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { getDashboard, getNotices } from "@/services/api";
import { DashboardSkeleton } from "@/components/common/LoadingSkeleton";
import { SEM_ORDER, semIndex } from "@/components/results/ResultHelpers";
import { useLanguage } from "@/contexts/LanguageContext";

function getStoredUser() {
  try {
    const raw = localStorage.getItem("cmpi-user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function DashboardOverview() {
  const { language, t } = useLanguage();
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
      if (noticeData.status === "fulfilled") {
        const raw = noticeData.value;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        setNotices(list.slice(0, 5));
      }
    } catch (e: any) {
      console.error("Failed to load dashboard data", e);
    }
    setLoading(false);
  }

  const user = dashboard?.user || storedUser;
  const courses = dashboard?.courses || [];
  const courseResults = dashboard?.results || dashboard?.courseResults || [];
  const boardResults = dashboard?.board_results || [];
  const bills = dashboard?.bills || [];

  const pendingBills = bills.filter((b: any) => b.status === "pending");
  const totalPending = pendingBills.reduce((sum: number, b: any) => sum + parseFloat(b.amount || 0), 0);

  // Board results calculations
  const sortedBoard = [...boardResults].sort((a: any, b: any) => semIndex(a.semester) - semIndex(b.semester));
  const passedSemesters = sortedBoard.filter((r: any) => r.status === "Passed");
  const referredSemesters = sortedBoard.filter((r: any) => r.status === "Referred");
  const totalReferredSubjects = referredSemesters.reduce((sum: number, r: any) => sum + (r.referred_subjects?.length ?? 0), 0);
  const boardCgpa = passedSemesters.length > 0
    ? passedSemesters.reduce((sum: number, r: any) => sum + parseFloat(r.gpa || "0"), 0) / passedSemesters.length
    : 0;

  // Institute CGPA
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
    return <DashboardSkeleton />;
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
      <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 overflow-hidden border border-border">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-7 w-7" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-bold truncate">{user?.name || (language === 'en' ? "Student" : "শিক্ষার্থী")}</h2>
              <Link to="/dashboard/profile" className="text-sm text-primary hover:underline shrink-0">{language === 'en' ? "Edit Profile" : "প্রোফাইল পরিবর্তন"}</Link>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="truncate">{language === 'en' ? "ID" : "আইডি"}: <strong className="text-foreground font-mono">{user?.student_id || "—"}</strong></span>
              {user?.board_roll && <span className="truncate">{language === 'en' ? "Board Roll" : "বোর্ড রোল"}: <strong className="text-foreground font-mono">{user.board_roll}</strong></span>}
              <span className="truncate">{language === 'en' ? "Dept" : "বিভাগ"}: <strong className="text-foreground">{user?.department || "—"}</strong></span>
              <span className="truncate">{language === 'en' ? "Semester" : "সেমিস্টার"}: <strong className="text-foreground">{user?.semester || "—"}</strong></span>
              <span className="truncate">{language === 'en' ? "Session" : "সেশন"}: <strong className="text-foreground">{user?.session || "—"}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-sm border bg-card p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">{t("db_enrolled_courses")}</span>
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold">{courses.length}</div>
        </div>
        <div className="rounded-sm border bg-card p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">{t("db_cgpa")}</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{cgpa}</div>
        </div>
        <div className="rounded-sm border bg-card p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">{t("db_pending_bills")}</span>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{pendingBills.length}</div>
          {totalPending > 0 && (
            <div className="text-[10px] sm:text-xs text-yellow-600 mt-1">{language === 'en' ? 'due' : 'বকেয়া'} BDT {totalPending.toLocaleString()}</div>
          )}
        </div>
        <div className="rounded-sm border bg-card p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">{t("db_results_pub")}</span>
            <Award className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{courseResults.length}</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{language === 'en' ? 'semesters' : 'সেমিস্টার'}</div>
        </div>
      </div>

      {/* Board Results Summary */}
      {boardResults.length > 0 && (
        <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              {t("db_board_results")}
            </h3>
            <Link to="/dashboard/results" className="text-xs text-primary hover:underline shrink-0">{t("db_view_all_results")}</Link>
          </div>

          {/* Board GPA Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {SEM_ORDER.map((sem) => {
              const record = sortedBoard.find((r: any) => semIndex(r.semester) === semIndex(sem));
              const isDropped = record?.status === "Referred" && (record.referred_subjects?.length ?? 0) >= 4;
              return (
                <div key={sem} className={`rounded-lg border p-2 text-center flex flex-col items-center gap-0.5 ${
                  !record ? "border-muted/30 bg-muted/10 opacity-40" :
                  isDropped ? "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/30" :
                  record.status === "Passed" ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30" :
                  "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-200"
                }`}>
                  <span className="text-[10px] font-black text-muted-foreground uppercase">{sem}</span>
                  {record ? (
                    isDropped ? (
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">Drop</span>
                    ) : record.status === "Passed" ? (
                      <span className="text-base font-black text-green-700 dark:text-green-400">
                        {parseFloat(record.gpa || "0").toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-xs font-black text-red-600 dark:text-red-400">Ref</span>
                    )
                  ) : (
                    <span className="text-base font-black text-muted-foreground/40">-</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Board Summary Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 border-t">
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">{language === 'en' ? "Board CGPA" : "বোর্ড CGPA"}</span>
              <p className="text-xl font-black text-primary">{boardCgpa > 0 ? boardCgpa.toFixed(2) : "—"}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">{language === 'en' ? "Passed" : "উত্তীর্ণ"}</span>
              <p className="text-xl font-black text-green-600">{passedSemesters.length}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">{language === 'en' ? "Referred" : "রেফার্ড"}</span>
              <p className={`text-xl font-black ${totalReferredSubjects > 0 ? "text-red-600" : "text-green-600"}`}>
                {totalReferredSubjects > 0 ? `${referredSemesters.length} sem (${totalReferredSubjects} subs)` : "None"}
              </p>
            </div>
            {totalReferredSubjects > 0 && (
              <div className="flex-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">{language === 'en' ? "Referred Subjects" : "রেফার্ড বিষয়সমূহ"}</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {referredSemesters.flatMap((r: any) =>
                    (r.referred_subjects || []).map((sub: string, i: number) => (
                      <span key={`${r.semester}-${i}`} className="text-[10px] font-mono font-bold bg-red-500/10 text-red-600 border border-red-500/20 px-1.5 py-0.5 rounded">
                        {sub.replace(/\([^)]+\)/g, "")}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Board Roll Set */}
      {boardResults.length === 0 && !user?.board_roll && (
        <div className="rounded-sm border border-dashed bg-card p-4 sm:p-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3 bg-muted rounded-xl shrink-0">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-sm">No Board Roll Linked</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add your BTEB board roll number in <Link to="/dashboard/profile" className="text-primary hover:underline font-bold">Profile Settings</Link> to auto-display your board exam results here.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* GPA Trend Chart */}
        {gradeTrend.length > 0 && (
          <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
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
          <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Enrolled Courses */}
        <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
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
        <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Bills */}
        <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
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
        <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
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
