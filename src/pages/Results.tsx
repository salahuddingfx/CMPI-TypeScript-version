import { useState } from "react";
import { Search, Trophy, GraduationCap, BookOpen, Printer, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getSubjectName, detectDepartmentFromSubjects } from "@/utils/btebSubjectCodes";
import { api } from "@/services/api";

// ── Types ────────────────────────────────────────────────────────────────────
interface CourseResult {
  code: string;
  name: string;
  credit: number;
  grade: string;
  gp: number;
  remarks: string;
}
interface SemesterResult {
  semester: string;
  session: string;
  holdingYear: string;
  sgpa: number;
  totalCredit: number;
  earnedCredit: number;
  status: "Passed" | "Failed" | "Withheld";
  courses: CourseResult[];
}
interface StudentResult {
  studentId: string;
  name: string;
  dept: string;
  roll: string;
  reg: string;
  institute: string;
  board: string;
  cgpa: number;
  semesters: SemesterResult[];
}

interface BtebResultPayload {
  id: number;
  roll: string;
  department: string;
  semester: string;
  regulation: string;
  holding_year: string;
  gpa: string | null;
  status: "Passed" | "Referred";
  referred_subjects: string[] | null;
  raw_text: string | null;
  created_at: string;
}

// ── Grade helpers ─────────────────────────────────────────────────────────────
const gradeColor: Record<string, string> = {
  "A+": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200",
  A:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200",
  "A-":"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 border border-sky-200",
  "B+":"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200",
  B:   "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200",
  "B-":"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200",
  F:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200",
};

function GradePill({ grade }: { grade: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-black ${gradeColor[grade] ?? "bg-muted text-muted-foreground"}`}>
      {grade}
    </span>
  );
}

// Parses subject code suffixes (T, P) to clear language
function parseSubjectSuffix(subjectCode: string): string {
  const match = subjectCode.match(/\(([^)]+)\)/);
  if (!match || !match[1]) return "Regular Examination";
  const types = match[1].split(",").map(t => {
    if (t.trim() === "T") return "Theory";
    if (t.trim() === "P") return "Practical";
    return t.trim();
  });
  return `Referred: ${types.join(", ")}`;
}

// Sort semester records 1st → 8th
const SEM_ORDER = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
function semIndex(s: string | null | undefined): number {
  const idx = SEM_ORDER.findIndex((x) => (s ?? "").toLowerCase().startsWith(x.charAt(0)));
  return idx === -1 ? 99 : idx;
}

// Infer most accurate department from all records for this student
function computeDepartment(records: BtebResultPayload[]): string {
  // Collect all referred subjects across all records
  const allSubjectCodes: string[] = [];
  records.forEach(r => {
    if (r.referred_subjects) allSubjectCodes.push(...r.referred_subjects);
  });
  if (allSubjectCodes.length > 0) {
    const detected = detectDepartmentFromSubjects(allSubjectCodes);
    if (detected !== "General Technology") return detected;
  }
  // Fall back to stored department from any record that has a real one
  const stored = records.find(r => r.department && r.department !== "General Technology" && r.department !== "Auto Detect");
  return stored?.department ?? records[0]?.department ?? "General Technology";
}

// ── Mock data (mimics BTEB profile transcripts) ──────────────────────────────
const mockResults: Record<string, StudentResult> = {
  "CMPI-2023-0456": {
    studentId: "CMPI-2023-0456", name: "Rahim Miah", dept: "Computer Science & Technology",
    roll: "232345", reg: "2023456789", institute: "Cox's Bazar Model Polytechnic Institute",
    board: "Bangladesh Technical Education Board (BTEB)", cgpa: 3.68,
    semesters: [
      {
        semester: "3rd", session: "2024–25", holdingYear: "2025", sgpa: 3.75,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CST-301", name: "Web Development", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CST-302", name: "Database Management", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-303", name: "Computer Networks", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-304", name: "Software Engineering", credit: 3, grade: "B+", gp: 3.25, remarks: "Passed" },
          { code: "CST-305", name: "Operating Systems", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
        ],
      },
      {
        semester: "2nd", session: "2023–24", holdingYear: "2024", sgpa: 3.60,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CST-201", name: "Programming II", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-202", name: "Mathematics II", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
          { code: "CST-203", name: "Data Structures", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-204", name: "Digital Logic", credit: 3, grade: "B+", gp: 3.25, remarks: "Passed" },
          { code: "CST-205", name: "English II", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
        ],
      },
      {
        semester: "1st", session: "2023–24", holdingYear: "2023", sgpa: 3.70,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CST-101", name: "Mathematics I", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-102", name: "Physics", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
          { code: "CST-103", name: "English I", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CST-104", name: "Basic IT", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CST-105", name: "Programming I", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
        ],
      },
    ],
  },
  "CMPI-2023-0312": {
    studentId: "CMPI-2023-0312", name: "Fatima Khatun", dept: "Civil Technology",
    roll: "232078", reg: "2023102233", institute: "Cox's Bazar Model Polytechnic Institute",
    board: "Bangladesh Technical Education Board (BTEB)", cgpa: 3.85,
    semesters: [
      {
        semester: "3rd", session: "2024–25", holdingYear: "2025", sgpa: 3.85,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CIV-301", name: "Structural Analysis", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CIV-302", name: "Surveying II", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CIV-303", name: "Construction Materials", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CIV-304", name: "Geotechnical Engineering", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
          { code: "CIV-305", name: "Environmental Engineering", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
        ],
      },
    ],
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export function Results() {
  const [searchMode, setSearchMode] = useState<"transcript" | "bteb">("transcript");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [btebResults, setBtebResults] = useState<BtebResultPayload[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSemesters, setOpenSemesters] = useState<Record<string, boolean>>({});


  const handleSearch = async () => {
    const key = query.trim();
    if (!key) return;

    setError(null);
    setResult(null);
    setBtebResults([]);
    setSearched(true);

    if (searchMode === "transcript") {
      const found = mockResults[key.toUpperCase()] ?? null;
      setResult(found);
      if (found) {
        setOpenSemesters({ [found.semesters[0]?.semester ?? ""]: true });
      }
    } else {
      setLoading(true);
      try {
        const response = await api.get("/bteb-results/search", {
          params: { roll: key }
        });
        const data = Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
        setBtebResults(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to retrieve results from BTEB board database.");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleSem = (sem: string) =>
    setOpenSemesters((prev) => ({ ...prev, [sem]: !prev[sem] }));

  return (
    <PageTransition>
      <SEO title="Results Portal" description="Check your semester examination BTEB results at CMPI." />
      
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Results Portal"
          title="Examination Results"
          description="Search your profile transcript or query live BTEB board results by roll number."
          align="center"
          className="mb-10"
        />

        {/* Toggle Mode Buttons */}
        <div className="mx-auto max-w-xl flex gap-3 mb-8 border p-1.5 rounded-xl bg-muted/30">
          <button
            type="button"
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              searchMode === "transcript"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => { setSearchMode("transcript"); setSearched(false); setError(null); setQuery(""); }}
          >
            Student Transcript (Student ID)
          </button>
          <button
            type="button"
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              searchMode === "bteb"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => { setSearchMode("bteb"); setSearched(false); setError(null); setQuery(""); }}
          >
            BTEB Board Result (Roll No.)
          </button>
        </div>

        {/* Search Input Panel */}
        <div className="mx-auto max-w-xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchMode === "transcript"
                    ? "Enter Student ID (e.g. CMPI-2023-0456)"
                    : "Enter BTEB Roll Number (e.g. 232345)"
                }
                className="pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {searchMode === "transcript" ? (
              <>Try: <span className="font-mono">CMPI-2023-0456</span> or <span className="font-mono">CMPI-2023-0312</span></>
            ) : (
              <>Enter your 6-digit BTEB board roll number (e.g. 232345)</>
            )}
          </p>
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-destructive text-sm flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        {/* ── BTEB Board Result Output ─── */}
        {searched && searchMode === "bteb" && !loading && (
          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {btebResults.length > 0 ? (
              (() => {
                // Sort results 1st → 8th
                const sorted = [...btebResults].sort((a, b) => semIndex(a.semester) - semIndex(b.semester));
                const department = computeDepartment(btebResults);
                const regulation = sorted[0]?.regulation ?? "2022";

                return (
                  <>
                    {/* ── Student Header Card ── */}
                    <div className="rounded-xl border bg-card shadow-md p-6 flex flex-wrap justify-between items-start gap-4 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          BTEB Board Records
                        </span>
                        <h2 className="text-2xl font-black mt-2">Roll No. {query}</h2>
                        <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                          <p>
                            Institute:{" "}
                            <span className="font-bold text-foreground">
                              Cox's Bazar Model Polytechnic Institute (CMPI)
                            </span>
                          </p>
                          <p>
                            Department:{" "}
                            <span className="font-bold text-foreground">{department}</span>
                          </p>
                          <p>
                            Regulation:{" "}
                            <span className="font-bold text-foreground">BTEB Probidhan-{regulation}</span>
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Printer className="mr-1 h-3 w-3" /> Print Results
                      </Button>
                    </div>

                    {/* ── GPA Summary Grid ── */}
                    <div className="rounded-xl border bg-card shadow-sm p-5">
                      <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">
                        Semester GPA Summary
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {SEM_ORDER.map((sem) => {
                          const record = sorted.find(
                            (r) => (r.semester ?? "").toLowerCase().startsWith(sem.charAt(0))
                          );
                          return (
                            <div
                              key={sem}
                              className={`rounded-lg border p-2 text-center flex flex-col items-center gap-0.5 ${
                                !record
                                  ? "border-muted/30 bg-muted/10 opacity-40"
                                  : record.status === "Passed"
                                  ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30"
                                  : "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30"
                              }`}
                            >
                              <span className="text-[10px] font-black text-muted-foreground uppercase">
                                {sem}
                              </span>
                              {record ? (
                                record.status === "Passed" ? (
                                  <span className="text-base font-black text-green-700 dark:text-green-400">
                                    {parseFloat(record.gpa || "0").toFixed(2)}
                                  </span>
                                ) : (
                                  <span className="text-xs font-black text-red-600 dark:text-red-400">
                                    Ref
                                  </span>
                                )
                              ) : (
                                <span className="text-base font-black text-muted-foreground/40">–</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Semester Cards ── */}
                    <div className="space-y-4">
                      {sorted.map((record) => (
                        <div key={record.id} className="rounded-xl border bg-card p-6 shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <BookOpen className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-extrabold text-lg">{record.semester} Semester Result</h3>
                                <p className="text-xs text-muted-foreground">
                                  Regulation: {record.regulation} · Holding Year: {record.holding_year}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              {record.status === "Passed" ? (
                                <div>
                                  <p className="text-3xl font-black text-primary">{parseFloat(record.gpa || "0").toFixed(2)}</p>
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase">SGPA</p>
                                </div>
                              ) : (
                                <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full font-black text-xs">
                                  Referred
                                </span>
                              )}
                            </div>
                          </div>

                          {record.status === "Passed" ? (
                            <div className="flex items-center gap-3 text-sm text-green-700 bg-green-50 dark:bg-green-950/20 dark:text-green-400 p-3 rounded-lg border border-green-100 dark:border-green-900/30">
                              <CheckCircle className="h-5 w-5" />
                              <span>Student has successfully passed the semester examinations.</span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-sm font-bold text-red-600 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                List of Referred Subjects ({record.referred_subjects?.length} courses):
                              </p>
                              <div className="border rounded-lg overflow-hidden bg-muted/10">
                                <table className="w-full text-xs text-left">
                                  <thead className="bg-muted">
                                    <tr>
                                      <th className="px-4 py-2">Subject Code</th>
                                      <th className="px-4 py-2">Subject Name</th>
                                      <th className="px-4 py-2">Exam Type</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y bg-card">
                                    {record.referred_subjects?.map((subCode) => (
                                      <tr key={subCode} className="hover:bg-muted/10">
                                        <td className="px-4 py-2 font-mono font-bold text-primary">{subCode.replace(/\([^)]+\)/g, "")}</td>
                                        <td className="px-4 py-2 font-semibold">{getSubjectName(subCode)}</td>
                                        <td className="px-4 py-2 text-muted-foreground font-medium">
                                          {parseSubjectSuffix(subCode)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()
            ) : (
              <div className="rounded-sm border bg-card p-10 text-center shadow-sm">
                <Search className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="font-bold text-foreground">No board results found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No BTEB board records match roll number "{query}". Please check the roll and try again.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Student Transcript (Mock Profile) Output ─── */}
        {searched && searchMode === "transcript" && (
          <div className="mx-auto mt-10 max-w-3xl">
            {result ? (
              <div className="space-y-6">
                <div className="rounded-sm border bg-card shadow-sm overflow-hidden">
                  <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70">Result Transcript</p>
                      <h2 className="text-xl font-black text-white mt-0.5">{result.name}</h2>
                    </div>
                    <GraduationCap className="h-10 w-10 text-white/30" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 divide-x divide-y text-sm">
                    {[
                      { label: "Student ID", value: result.studentId },
                      { label: "Roll No.", value: result.roll },
                      { label: "Registration", value: result.reg },
                      { label: "Department", value: result.dept },
                      { label: "Institute", value: result.institute },
                      { label: "Board", value: result.board },
                    ].map((item) => (
                      <div key={item.label} className="px-4 py-3">
                        <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">{item.label}</p>
                        <p className="font-semibold text-foreground mt-0.5 text-xs">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/5 border-t px-6 py-4 flex items-center gap-6">
                    <Trophy className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Cumulative GPA (CGPA)</p>
                      <p className="text-4xl font-black text-primary">{result.cgpa.toFixed(2)}</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Printer className="mr-1 h-3 w-3" /> Print Transcript
                      </Button>
                    </div>
                  </div>
                </div>

                {result.semesters.map((sem) => (
                  <div key={sem.semester} className="rounded-sm border bg-card shadow-sm overflow-hidden mb-4">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition"
                      onClick={() => toggleSem(sem.semester)}
                    >
                      <div className="flex items-center gap-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="font-black text-foreground">{sem.semester} Semester</p>
                          <p className="text-xs text-muted-foreground">Session: {sem.session} · Holding Year: {sem.holdingYear}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-black text-primary">{sem.sgpa.toFixed(2)}</p>
                          <p className="text-[10px] font-bold uppercase text-muted-foreground">SGPA</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-black ${sem.status === "Passed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700"}`}>
                          {sem.status}
                        </span>
                      </div>
                    </button>

                    {/* Course Table */}
                    {openSemesters[sem.semester] && (
                      <div className="border-t overflow-x-auto bg-muted/10">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/60">
                              {["Code", "Course Name", "Credit", "Grade", "Grade Point", "Remarks"].map((h) => (
                                <th key={h} className="px-4 py-2.5 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sem.courses.map((c, i) => (
                              <tr key={c.code} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                                <td className="px-4 py-2.5 font-mono text-xs font-bold text-primary">{c.code}</td>
                                <td className="px-4 py-2.5 font-medium">{c.name}</td>
                                <td className="px-4 py-2.5 text-center font-semibold">{c.credit}</td>
                                <td className="px-4 py-2.5 text-center"><GradePill grade={c.grade} /></td>
                                <td className="px-4 py-2.5 text-center font-bold">{c.gp.toFixed(2)}</td>
                                <td className="px-4 py-2.5 text-xs text-green-600 font-semibold">{c.remarks}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-primary/5 border-t font-black">
                              <td colSpan={2} className="px-4 py-2 text-sm">Total</td>
                              <td className="px-4 py-2 text-center">{sem.totalCredit}</td>
                              <td />
                              <td className="px-4 py-2 text-center text-primary">{sem.sgpa.toFixed(2)}</td>
                              <td className="px-4 py-2 text-xs text-green-600">{sem.earnedCredit}/{sem.totalCredit} credits earned</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-sm border bg-card p-10 text-center shadow-sm">
                <Search className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="font-bold text-foreground">No result found</p>
                <p className="mt-1 text-sm text-muted-foreground">No records match Student ID "{query}". Please verify and try again.</p>
              </div>
            )}
          </div>
        )}

      </section>
    </PageTransition>
  );
}

// Inline fallback CheckCircle element
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

