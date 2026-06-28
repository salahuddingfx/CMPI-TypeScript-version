import { BookOpen, GraduationCap, Printer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradePill } from "./ResultHelpers";
import type { StudentResult } from "./ResultTypes";

interface TranscriptCardProps {
  result: StudentResult;
  openSemesters: Record<string, boolean>;
  onToggleSem: (sem: string) => void;
}

export function TranscriptCard({ result, openSemesters, onToggleSem }: TranscriptCardProps) {
  return (
    <div id="printable-result" className="space-y-6">
      {/* Header card */}
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

      {/* Semester accordion cards */}
      {result.semesters.map((sem) => (
        <div key={sem.semester} className="rounded-sm border bg-card shadow-sm overflow-hidden mb-4">
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition"
            onClick={() => onToggleSem(sem.semester)}
          >
            <div className="flex items-center gap-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-black text-foreground">{sem.semester} Semester</p>
                <p className="text-xs text-muted-foreground">
                  Session: {sem.session} · Holding Year: {sem.holdingYear}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-black text-primary">{sem.sgpa.toFixed(2)}</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">SGPA</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${
                  sem.status === "Passed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {sem.status}
              </span>
            </div>
          </button>

          {openSemesters[sem.semester] && (
            <div className="border-t overflow-x-auto bg-muted/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60">
                    {["Code", "Course Name", "Credit", "Grade", "Grade Point", "Remarks"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-black uppercase tracking-wider text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sem.courses.map((c, i) => (
                    <tr key={c.code} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="px-4 py-2.5 font-mono text-xs font-bold text-primary">{c.code}</td>
                      <td className="px-4 py-2.5 font-medium">{c.name}</td>
                      <td className="px-4 py-2.5 text-center font-semibold">{c.credit}</td>
                      <td className="px-4 py-2.5 text-center">
                        <GradePill grade={c.grade} />
                      </td>
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
                    <td className="px-4 py-2 text-xs text-green-600">
                      {sem.earnedCredit}/{sem.totalCredit} credits earned
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
