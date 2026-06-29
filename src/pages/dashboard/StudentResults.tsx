import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getStudentResults } from "@/services/api";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";
import { 
  Calculator, 
  Award, 
  TrendingUp, 
  History, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  RefreshCw,
  Sparkles,
  BarChart3,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEM_ORDER, REGULATION_WEIGHTS, gradeColor, semIndex } from "@/components/results/ResultHelpers";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from "recharts";

interface Course {
  name: string;
  grade: string;
  gp: string;
}

interface CourseResult {
  semester: string;
  sgpa: string;
  courses?: Course[];
}

interface BtebResult {
  roll: string;
  semester: string;
  regulation: string;
  holding_year: string;
  gpa: string;
  status: string;
  exam_type: string;
  referred_subjects?: string[];
}

export function StudentResults() {
  const [courseResults, setCourseResults] = useState<CourseResult[]>([]);
  const [boardResults, setBoardResults] = useState<BtebResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transcript" | "tracker" | "challenges" | "history" | "analytics">("transcript");

  // CGPA Tracker States
  const [calculatorGpas, setCalculatorGpas] = useState<string[]>(Array(8).fill(""));
  const [calculatorReg, setCalculatorReg] = useState<"2016" | "2022">("2022");
  const [targetCgpa, setTargetCgpa] = useState<number>(3.50);

  useEffect(() => {
    getStudentResults()
      .then((data) => {
        // Handle both older array response and new object structure
        const courses = data.course_results || (Array.isArray(data) ? data : []);
        const boards = data.board_results || [];
        
        setCourseResults(courses);
        setBoardResults(boards);
        
        // Auto-sync history to calculator on load
        syncHistory(courses, boards);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const syncHistory = (courses: CourseResult[], boards: BtebResult[]) => {
    const updated = Array(8).fill("");
    
    // First fill from institute courses
    courses.forEach((sem) => {
      const idx = SEM_ORDER.indexOf(sem.semester);
      if (idx !== -1 && sem.sgpa) {
        updated[idx] = parseFloat(sem.sgpa).toFixed(2);
      }
    });

    // Overlay board results if not already set or if board result has passed status
    boards.forEach((r) => {
      const idx = SEM_ORDER.indexOf(r.semester);
      if (idx !== -1 && r.gpa && r.status === "Passed") {
        updated[idx] = parseFloat(r.gpa).toFixed(2);
      }
    });

    setCalculatorGpas(updated);

    // Auto-detect regulation from board results if available
    const boardReg = boards.find((b) => b.regulation)?.regulation;
    if (boardReg === "2016" || boardReg === "2022") {
      setCalculatorReg(boardReg);
    }
  };

  const handleGpaChange = (idx: number, val: string) => {
    const updated = [...calculatorGpas];
    updated[idx] = val;
    setCalculatorGpas(updated);
  };

  const handleClearCalculator = () => {
    setCalculatorGpas(Array(8).fill(""));
  };

  const handleResetToHistory = () => {
    syncHistory(courseResults, boardResults);
  };

  // Prediction calculations
  const weights = (REGULATION_WEIGHTS[calculatorReg] || REGULATION_WEIGHTS["2022"]) as number[];
  let completedWeightSum = 0;
  let completedWeightedSum = 0;
  let completedCount = 0;

  for (let i = 0; i < 8; i++) {
    const val = parseFloat(calculatorGpas[i] ?? "");
    if (!isNaN(val) && val > 0 && val <= 4) {
      completedWeightSum += weights[i] ?? 0;
      completedWeightedSum += val * (weights[i] ?? 0);
      completedCount++;
    }
  }

  const currentCgpa = completedWeightSum > 0 ? completedWeightedSum / completedWeightSum : 0;
  
  let remainingWeightSum = 0;
  for (let i = 0; i < 8; i++) {
    const val = parseFloat(calculatorGpas[i] ?? "");
    if (isNaN(val) || val <= 0) {
      remainingWeightSum += weights[i] ?? 0;
    }
  }

  // Calculate required average SGPA for remaining semesters
  // Formula: (completedWeightedSum + requiredAvg * remainingWeightSum) / 1.0 = targetCgpa
  let requiredAverageSgpa = 0;
  if (remainingWeightSum > 0) {
    requiredAverageSgpa = (targetCgpa - completedWeightedSum) / remainingWeightSum;
  }

  // Filter board challenge/rescrutiny results
  const rescrutinyResults = boardResults.filter(
    (r) => r.exam_type?.toLowerCase() === "rescrutiny" || r.exam_type?.toLowerCase() === "challenge"
  );

  // Sorted board results for history/analytics
  const sortedBoard = [...boardResults].sort((a, b) => semIndex(a.semester) - semIndex(b.semester));

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader eyebrow="Results" title="Semester results and grades" description="Loading academic grades..." align="left" />
        <TableSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Academic Results & Tracker</h2>
          <p className="text-sm text-muted-foreground">
            Review your grades, track BTEB board challenges, and predict your target CGPA.
          </p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex overflow-x-auto border-b border-muted -mb-px scrollbar-none">
        <button
          onClick={() => setActiveTab("transcript")}
          className={`flex items-center gap-2 border-b-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "transcript"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Transcript
        </button>
        <button
          onClick={() => setActiveTab("tracker")}
          className={`flex items-center gap-2 border-b-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "tracker"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calculator className="h-4 w-4" />
          CGPA Tracker
        </button>
        <button
          onClick={() => setActiveTab("challenges")}
          className={`flex items-center gap-2 border-b-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all relative whitespace-nowrap shrink-0 ${
            activeTab === "challenges"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <History className="h-4 w-4" />
          Board Challenges
          {rescrutinyResults.length > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white shadow-sm animate-pulse">
              {rescrutinyResults.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 border-b-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "history"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="h-4 w-4" />
          Semester History
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 border-b-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === "analytics"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Grade Analytics
        </button>
      </div>

      {/* Tab Contents */}

      {/* 1st Tab: Institute Transcript */}
      {activeTab === "transcript" && (
        <div className="space-y-6">
          {courseResults.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
              <Award className="mx-auto h-12 w-12 opacity-30 mb-3" />
              <p className="font-semibold text-lg">No Transcript Records Found</p>
              <p className="text-sm text-muted-foreground mt-1">Official course results have not been assigned to your portal profile yet.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {/* Highlight Current CGPA */}
              {completedCount > 0 && (
                <div className="rounded-xl border bg-card shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between bg-gradient-to-r from-primary/5 via-transparent to-transparent border-l-4 border-l-primary">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-lg font-extrabold flex items-center justify-center sm:justify-start gap-1.5">
                      <Sparkles className="h-5 w-5 text-amber-500" /> Academic Standing Summary
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Calculated weighted CGPA based on {completedCount} completed semesters (Regulation {calculatorReg}).
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Cumulative GPA</span>
                      <p className="text-3xl font-black text-primary leading-none mt-1">{currentCgpa.toFixed(2)}</p>
                    </div>
                    <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("tracker")} className="gap-1 text-xs hidden sm:flex">
                      Predict Future Goals <TrendingUp className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Semesters list */}
              <div className="space-y-6">
                {courseResults.map((sem) => (
                  <div key={sem.semester} className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    {/* Semester Header */}
                    <div className="bg-muted/40 px-5 py-4 border-b flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase font-black tracking-wider text-muted-foreground">Semester Result</span>
                        <h4 className="font-extrabold text-base text-foreground mt-0.5">{sem.semester} Semester</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Semester GPA</span>
                        <p className="text-lg font-black text-primary leading-tight mt-0.5">{sem.sgpa ? parseFloat(sem.sgpa).toFixed(2) : "—"}</p>
                      </div>
                    </div>

                    {/* Courses Listing */}
                    <div className="p-5">
                      {sem.courses && sem.courses.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {sem.courses.map((course) => (
                            <div key={course.name} className="flex items-center justify-between rounded-lg border bg-muted/20 p-4 hover:bg-muted/30 transition-colors">
                              <div className="space-y-0.5">
                                <span className="font-semibold text-sm text-foreground">{course.name}</span>
                                <p className="text-xs text-muted-foreground">Grade Point: {course.gp || "—"}</p>
                              </div>
                              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-black border ${
                                gradeColor[course.grade] || "bg-muted text-muted-foreground"
                              }`}>
                                {course.grade || "—"}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No course grade breakdowns reported.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2nd Tab: CGPA Tracker & Goal Predictor */}
      {activeTab === "tracker" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top description banner */}
          <div className="rounded-xl border bg-card shadow-sm p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold">CGPA Goal Predictor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pre-filled automatically with your historical transcript marks. Set a target CGPA to forecast study plans.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
            {/* Input list */}
            <div className="rounded-xl border bg-card shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between border-b pb-3.5">
                <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Semester GPA Inputs
                </p>
                <div className="flex items-center gap-2">
                  {(["2022", "2016"] as const).map((reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setCalculatorReg(reg)}
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full transition-all border ${
                        calculatorReg === reg
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Probidhan {reg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SEM_ORDER.map((sem, idx) => (
                  <div key={sem} className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground flex justify-between">
                      <span>{sem} Semester</span>
                      <span className="font-mono opacity-50">
                        (Wt: {((weights[idx] ?? 0) * 100)}%)
                      </span>
                    </label>
                    <Input
                      type="number"
                      min="2.00"
                      max="4.00"
                      step="0.01"
                      placeholder="0.00"
                      value={calculatorGpas[idx] ?? ""}
                      onChange={(e) => handleGpaChange(idx, e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t flex justify-between items-center text-xs">
                <Button variant="outline" size="sm" onClick={handleResetToHistory} className="flex items-center gap-1.5 h-8 text-[11px]">
                  <RefreshCw className="h-3.5 w-3.5" /> Re-Sync Transcript
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearCalculator} className="flex items-center gap-1.5 h-8 text-[11px]">
                  Clear GPAs
                </Button>
              </div>
            </div>

            {/* Calculations & Warnings */}
            <div className="space-y-6">
              {/* Calculated CGPA */}
              <div className="rounded-xl border bg-card shadow-sm p-6 text-center space-y-4">
                <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Current Computed CGPA
                </p>
                <div className="inline-flex items-center justify-center h-28 w-28 rounded-full border-4 border-primary/20 bg-primary/5 text-primary">
                  <span className="text-3xl font-black">
                    {currentCgpa > 0 ? currentCgpa.toFixed(2) : "0.00"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-normal px-4">
                  {completedCount > 0
                    ? `Derived from ${completedCount} completed semesters under Probidhan ${calculatorReg}.`
                    : "Fill in one or more GPAs to compute your current standing."}
                </p>
              </div>

              {/* Predictor Panel */}
              <div className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground border-b pb-2">
                  Target CGPA Goal Calculator
                </h4>
                
                {completedCount === 8 ? (
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-800 dark:text-emerald-400 space-y-1.5">
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="font-bold">Journey Completed!</p>
                    <p className="leading-relaxed">All 8 semesters are marked as completed. Your final graduation CGPA is {currentCgpa.toFixed(2)}!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground flex justify-between">
                        <span>Desired Target CGPA</span>
                        <span className="font-mono text-primary font-bold">{targetCgpa.toFixed(2)}</span>
                      </label>
                      <input
                        type="range"
                        min="2.00"
                        max="4.00"
                        step="0.05"
                        value={targetCgpa}
                        onChange={(e) => setTargetCgpa(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    {/* Result Alerts */}
                    {completedCount === 0 ? (
                      <div className="rounded-lg bg-slate-500/10 border border-slate-500/20 p-4 text-xs text-slate-700 dark:text-slate-400 flex gap-2">
                        <Info className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                        <p>Provide at least one semester GPA score to forecast required grades.</p>
                      </div>
                    ) : requiredAverageSgpa > 4.0 ? (
                      <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-800 dark:text-red-400 space-y-2">
                        <div className="flex gap-2 font-bold items-center">
                          <AlertTriangle className="h-4 w-4 text-red-650 shrink-0" />
                          <span>Goal mathematically impossible</span>
                        </div>
                        <p className="leading-relaxed">
                          To reach **{targetCgpa.toFixed(2)}** CGPA, you would need an average SGPA of **{requiredAverageSgpa.toFixed(2)}** in the remaining {8 - completedCount} semesters, which exceeds BTEB's maximum scale of 4.00.
                        </p>
                      </div>
                    ) : requiredAverageSgpa < 2.0 ? (
                      <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-800 dark:text-emerald-400 space-y-2">
                        <div className="flex gap-2 font-bold items-center">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-450 shrink-0" />
                          <span>Goal easily achievable</span>
                        </div>
                        <p className="leading-relaxed">
                          You only need to maintain an average of **2.00** SGPA (basic passing grade) in the remaining semesters to secure your target of **{targetCgpa.toFixed(2)}** CGPA.
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-xs text-primary space-y-2">
                        <div className="flex gap-2 font-bold items-center">
                          <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                          <span>Prediction Forecast</span>
                        </div>
                        <p className="leading-relaxed">
                          To achieve your target CGPA of **{targetCgpa.toFixed(2)}**, you must maintain an average SGPA of **{requiredAverageSgpa.toFixed(2)}** across the remaining **{8 - completedCount}** semesters.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3rd Tab: Board Challenge Logs */}
      {activeTab === "challenges" && (
        <div className="space-y-6 animate-fadeIn">
          {rescrutinyResults.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
              <History className="mx-auto h-12 w-12 opacity-30 mb-3" />
              <p className="font-semibold text-lg">No Board Challenges Found</p>
              <p className="text-sm text-muted-foreground mt-1">
                You do not have any BTEB board challenges (rescrutiny results) registered in the institute records.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border bg-card shadow-sm p-6 border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground">BTEB Board Challenges (Rescrutiny)</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      The board result database automatically imports corrections. Highlights changes made via challenge.
                    </p>
                  </div>
                </div>
              </div>

              {rescrutinyResults.map((challenge, idx) => (
                <div key={idx} className="rounded-xl border bg-card shadow-sm overflow-hidden border-emerald-500/20">
                  <div className="bg-emerald-500/5 px-5 py-4 border-b border-emerald-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-emerald-500 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                        Result Changed ✓
                      </span>
                      <h4 className="font-extrabold text-sm text-foreground">{challenge.semester} Semester Rescrutiny</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">Year: {challenge.holding_year}</span>
                  </div>

                  <div className="p-5 text-sm space-y-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg bg-muted/30 p-3 border">
                        <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Original Roll</span>
                        <p className="font-bold text-foreground mt-1 font-mono">{challenge.roll}</p>
                      </div>
                      <div className="rounded-lg bg-muted/30 p-3 border">
                        <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Updated Grade GPA</span>
                        <p className="font-black text-emerald-600 mt-1 text-base">{parseFloat(challenge.gpa).toFixed(2)}</p>
                      </div>
                      <div className="rounded-lg bg-muted/30 p-3 border">
                        <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground">Regulation</span>
                        <p className="font-bold text-foreground mt-1">Probidhan {challenge.regulation}</p>
                      </div>
                    </div>

                    {challenge.referred_subjects && challenge.referred_subjects.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Remaining Referred Subjects</span>
                        <div className="flex flex-wrap gap-2">
                          {challenge.referred_subjects.map((sub, i) => (
                            <span key={i} className="text-xs font-mono font-bold bg-red-500/10 text-red-650 border border-red-500/20 px-2 py-0.5 rounded">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4th Tab: Semester History Timeline */}
      {activeTab === "history" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-xl border bg-card shadow-sm p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold">Semester History Timeline</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your complete academic journey from 1st to 8th semester with progress tracking.
                </p>
              </div>
            </div>
          </div>

          {/* All semesters combined (board + institute) */}
          {(() => {
            const allSemesters = SEM_ORDER.map((sem, idx) => {
              const boardRecord = sortedBoard.find((r: any) => semIndex(r.semester) === semIndex(sem));
              const courseRecord = courseResults.find((c) => c.semester === sem);
              const gpa = boardRecord?.gpa || courseRecord?.sgpa || null;
              const status = boardRecord?.status || (courseRecord ? "Completed" : null);
              const referred = boardRecord?.referred_subjects || [];
              return { sem, idx, gpa, status, referred, year: boardRecord?.holding_year, regulation: boardRecord?.regulation };
            });

            const completedCount = allSemesters.filter((s) => s.gpa).length;

            return (
              <div className="space-y-0">
                {allSemesters.map((s, i) => {
                  const isLast = i === allSemesters.length - 1;
                  const hasData = s.gpa !== null;
                  const isDropped = s.status === "Referred" && s.referred.length >= 4;
                  const passed = s.status === "Passed" || s.status === "Completed";

                  return (
                    <div key={s.sem} className="flex gap-3 sm:gap-4">
                      {/* Timeline line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black shrink-0 border-2 ${
                          !hasData ? "border-muted bg-muted/20 text-muted-foreground" :
                          isDropped ? "border-amber-500 bg-amber-500/10 text-amber-600" :
                          passed ? "border-green-500 bg-green-500/10 text-green-600" :
                          "border-red-500 bg-red-500/10 text-red-600"
                        }`}>
                          {hasData ? (passed ? parseFloat(s.gpa!).toFixed(1) : "Ref") : (s.idx + 1)}
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 flex-1 min-h-[40px] ${hasData ? "bg-green-300 dark:bg-green-700" : "bg-muted"}`} />
                        )}
                      </div>
                      {/* Content */}
                        <div className={`flex-1 pb-6 ${!hasData ? "opacity-50" : ""}`}>
                        <div className="rounded-xl border bg-card p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm">{s.sem} Semester</h4>
                              {s.year && <p className="text-[10px] text-muted-foreground mt-0.5">Year: {s.year} | Regulation: {s.regulation}</p>}
                            </div>
                            <div className="text-right">
                              {hasData ? (
                                <span className={`text-xl font-black ${passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                  {parseFloat(s.gpa!).toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-sm text-muted-foreground">Not yet</span>
                              )}
                            </div>
                          </div>
                          {s.referred.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {s.referred.map((sub: string, j: number) => (
                                <span key={j} className="text-[10px] font-mono font-bold bg-red-500/10 text-red-600 border border-red-500/20 px-1.5 py-0.5 rounded">
                                  {sub.replace(/\([^)]+\)/g, "")}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* Summary */}
                <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm flex items-center gap-4 border-l-4 border-l-primary">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Progress Summary</p>
                    <p className="text-sm font-bold mt-0.5">
                      {completedCount} of 8 semesters completed ({((completedCount / 8) * 100).toFixed(0)}%)
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 5th Tab: Grade Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-xl border bg-card shadow-sm p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold">Grade Analytics & Performance Stats</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Visual breakdown of your academic performance across all semesters.
                </p>
              </div>
            </div>
          </div>

          {(() => {
            const passedAll = sortedBoard.filter((r: any) => r.status === "Passed" && r.gpa);
            const chartData = SEM_ORDER.map((sem) => {
              const record = sortedBoard.find((r: any) => semIndex(r.semester) === semIndex(sem));
              return { name: sem, gpa: record?.gpa ? parseFloat(record.gpa) : 0, hasData: !!record?.gpa };
            });

            const avgGpa = passedAll.length > 0
              ? passedAll.reduce((sum: number, r: any) => sum + parseFloat(r.gpa), 0) / passedAll.length
              : 0;
            const highest = passedAll.length > 0 ? Math.max(...passedAll.map((r: any) => parseFloat(r.gpa))) : 0;
            const lowest = passedAll.length > 0 ? Math.min(...passedAll.map((r: any) => parseFloat(r.gpa))) : 0;
            const bestSem = passedAll.find((r: any) => parseFloat(r.gpa) === highest);
            const worstSem = passedAll.find((r: any) => parseFloat(r.gpa) === lowest);
            const totalReferred = sortedBoard.reduce((sum: number, r: any) => sum + (r.referred_subjects?.length ?? 0), 0);
            const referredSems = sortedBoard.filter((r: any) => r.status === "Referred").length;
            const passedSems = passedAll.length;

            // GPA trend direction
            const sortedPassed = passedAll.sort((a: any, b: any) => semIndex(a.semester) - semIndex(b.semester));
            const recentGpas = sortedPassed.slice(-3).map((r: any) => parseFloat(r.gpa));
            const trendDirection = recentGpas.length >= 2
              ? recentGpas[recentGpas.length - 1] > recentGpas[0] ? "improving" : recentGpas[recentGpas.length - 1] < recentGpas[0] ? "declining" : "stable"
              : "insufficient";

            return (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Average GPA", value: avgGpa.toFixed(2), icon: TrendingUp, color: "text-primary" },
                    { label: "Highest GPA", value: highest > 0 ? highest.toFixed(2) : "—", icon: Award, color: "text-green-600" },
                    { label: "Lowest GPA", value: lowest > 0 ? lowest.toFixed(2) : "—", icon: AlertTriangle, color: "text-red-500" },
                    { label: "Trend", value: trendDirection === "improving" ? "Upward" : trendDirection === "declining" ? "Downward" : "Stable", icon: trendDirection === "improving" ? TrendingUp : AlertTriangle, color: trendDirection === "improving" ? "text-green-600" : trendDirection === "declining" ? "text-red-500" : "text-muted-foreground" },
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                          <Icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <p className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Bar Chart */}
                {passedAll.length > 0 && (
                  <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-sm font-black mb-4">Semester GPA Comparison</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 4]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="gpa" radius={[6, 6, 0, 0]}>
                          {chartData.map((entry, i) => (
                            <Cell key={i} fill={entry.hasData ? (entry.gpa >= 3.5 ? "#22c55e" : entry.gpa >= 2.5 ? "#f59e0b" : "#ef4444") : "#e2e8f0"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Performance Summary */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border bg-card p-6 shadow-sm space-y-3">
                    <h3 className="text-sm font-black">Performance Breakdown</h3>
                    <div className="space-y-2">
                      {[
                        { label: "Passed Semesters", value: passedSems, color: "bg-green-500" },
                        { label: "Referred Semesters", value: referredSems, color: "bg-red-500" },
                        { label: "Total Referred Subjects", value: totalReferred, color: "bg-amber-500" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.color}`} />
                            <span className="text-muted-foreground">{item.label}</span>
                          </div>
                          <span className="font-black">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-6 shadow-sm space-y-3">
                    <h3 className="text-sm font-black">Milestones</h3>
                    <div className="space-y-3">
                      {bestSem && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                          <Award className="h-5 w-5 text-green-600 shrink-0" />
                          <div>
                            <p className="text-xs font-black text-green-700 dark:text-green-400">Best Semester</p>
                            <p className="text-sm font-bold">{bestSem.semester} — {parseFloat(bestSem.gpa).toFixed(2)}</p>
                          </div>
                        </div>
                      )}
                      {worstSem && worstSem !== bestSem && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                          <div>
                            <p className="text-xs font-black text-red-600">Needs Improvement</p>
                            <p className="text-sm font-bold">{worstSem.semester} — {parseFloat(worstSem.gpa).toFixed(2)}</p>
                          </div>
                        </div>
                      )}
                      {passedSems >= 4 && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                          <div>
                            <p className="text-xs font-black text-primary">Halfway There</p>
                            <p className="text-sm font-bold">{passedSems} of 8 semesters completed</p>
                          </div>
                        </div>
                      )}
                      {passedSems === 0 && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
                          <Info className="h-5 w-5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="text-xs font-black text-muted-foreground">Getting Started</p>
                            <p className="text-sm font-bold">Board results will appear here once published</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
