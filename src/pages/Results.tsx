import { useState } from "react";
import { Search, Trophy, GraduationCap, BookOpen, Printer, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

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

// ── Mock data (mimics BTEB result card) ───────────────────────────────────────
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
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [openSemesters, setOpenSemesters] = useState<Record<string, boolean>>({});

  const handleSearch = () => {
    const key = query.trim().toUpperCase();
    const found = mockResults[key] ?? null;
    setResult(found);
    setSearched(true);
    if (found) {
      // Open the most recent semester by default
      setOpenSemesters({ [found.semesters[0]?.semester ?? ""]: true });
    }
  };

  const toggleSem = (sem: string) =>
    setOpenSemesters((prev) => ({ ...prev, [sem]: !prev[sem] }));

  return (
    <PageTransition>
      <SEO title="Results Portal" description="Check your semester examination results at CMPI." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Results Portal"
          title="BTEB Examination Results"
          description="Enter your Student ID to view official semester-wise results and grade transcripts."
          align="center"
          className="mb-10"
        />

        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Student ID (e.g. CMPI-2023-0456)"
                className="pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Try: <span className="font-mono">CMPI-2023-0456</span> or <span className="font-mono">CMPI-2023-0312</span>
          </p>
        </div>

        {/* Result Output */}
        {searched && (
          <div className="mx-auto mt-10 max-w-3xl">
            {result ? (
              <div className="space-y-6">
                {/* ── Student Info Card (BTEB style) ─── */}
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
                  {/* CGPA Banner */}
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

                {/* ── Semester Results ─── */}
                {result.semesters.map((sem) => (
                  <div key={sem.semester} className="rounded-sm border bg-card shadow-sm overflow-hidden">
                    {/* Semester Header */}
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
                        {openSemesters[sem.semester]
                          ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                    </button>

                    {/* Course Table */}
                    {openSemesters[sem.semester] && (
                      <div className="border-t overflow-x-auto">
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
