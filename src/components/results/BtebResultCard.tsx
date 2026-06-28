import { useState } from "react";
import { AlertCircle, BookOpen, Calculator, Printer, Trophy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEM_ORDER, semIndex, computeDepartment, parseSubjectSuffix, CheckCircle } from "./ResultHelpers";
import type { BtebResultPayload } from "./ResultTypes";
import { getSubjectName as getLocalSubjectName } from "@/utils/btebSubjectCodes";

interface BtebResultCardProps {
  btebResults: BtebResultPayload[];
  query: string;
  searchType?: "roll" | "center";
  onCalculateCgpa: (results: BtebResultPayload[], regulation: string) => void;
}

export function BtebResultCard({ btebResults, query, searchType = "roll", onCalculateCgpa }: BtebResultCardProps) {
  const [internalFilter, setInternalFilter] = useState("");

  // Search by Roll Number layout
  if (searchType === "roll") {
    const sorted = [...btebResults].sort((a, b) => semIndex(a.semester) - semIndex(b.semester));

    // Group by semester, deduplicate preferring regular over rescrutiny
    const semMap = new Map<number, BtebResultPayload[]>();
    for (const record of sorted) {
      const idx = semIndex(record.semester);
      if (!semMap.has(idx)) semMap.set(idx, []);
      semMap.get(idx)!.push(record);
    }

    const deduped: BtebResultPayload[] = [];
    for (let i = 0; i < 8; i++) {
      const records = semMap.get(i);
      if (!records || records.length === 0) continue;
      const regular = records.find((r) => (r.exam_type ?? "regular") === "regular");
      const rescrutiny = records.find((r) => (r.exam_type ?? "regular") !== "regular");
      if (regular) deduped.push(regular);
      else if (records[0]) deduped.push(records[0]);
      if (rescrutiny && rescrutiny !== regular) deduped.push(rescrutiny);
    }
    for (const [key, records] of semMap) {
      if (key < 0 || key > 7) deduped.push(...records);
    }

    const department = computeDepartment(btebResults);
    const regulation = deduped[0]?.regulation ?? "2022";
    const passedSemesters = deduped.filter((r) => r.status === "Passed");
    const referredSemesters = deduped.filter((r) => r.status === "Referred");
    const totalReferredSubjects = referredSemesters.reduce((sum, r) => sum + (r.referred_subjects?.length ?? 0), 0);
    const avgGpa =
      passedSemesters.length > 0
        ? passedSemesters.reduce((sum, r) => sum + parseFloat(r.gpa || "0"), 0) / passedSemesters.length
        : 0;
    const allPassed = referredSemesters.length === 0 && passedSemesters.length > 0;
    const droppedSemesters = deduped
      .filter((r) => r.status === "Referred" && (r.referred_subjects?.length ?? 0) >= 4)
      .map((r) => r.semester);
    const hasSemesterDrop = droppedSemesters.length > 0;

    return (
      <div id="printable-result" className="mx-auto mt-10 max-w-3xl space-y-6">
        {/* Student header */}
        <div className="rounded-xl border bg-card shadow-md p-6 flex flex-wrap justify-between items-start gap-4 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent">
          <div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                BTEB Board Records
              </span>
              {btebResults.some((r) => (r.exam_type ?? "regular") !== "regular") && (
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full animate-pulse">
                  Board Challenge / Correction Result
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black mt-2">Roll No. {query}</h2>
            <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
              <p>
                Institute:{" "}
                <span className="font-bold text-foreground">
                  {deduped[0]?.institute_name
                    ? `${deduped[0].institute_name}${deduped[0].center_code ? ` (${deduped[0].center_code})` : ""}`
                    : "Cox's Bazar Model Polytechnic Institute (CMPI)"}
                </span>
              </p>
              <p>Department: <span className="font-bold text-foreground">{department}</span></p>
              <p>Regulation: <span className="font-bold text-foreground">BTEB Probidhan-{regulation}</span></p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onCalculateCgpa(btebResults, regulation)}>
              <Calculator className="mr-1 h-3 w-3" /> Calculate CGPA
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-1 h-3 w-3" /> Print Results
            </Button>
          </div>
        </div>

        {/* GPA summary grid */}
        <div className="rounded-xl border bg-card shadow-sm p-5">
          <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Semester GPA Summary</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {SEM_ORDER.map((sem) => {
              const regularRecord = deduped.find((r) => semIndex(r.semester) === semIndex(sem) && (r.exam_type ?? "regular") === "regular");
              const rescrutinyRecord = deduped.find((r) => semIndex(r.semester) === semIndex(sem) && (r.exam_type ?? "regular") !== "regular");
              const record = regularRecord ?? rescrutinyRecord;
              const isDropped = droppedSemesters.includes(sem);
              return (
                <div
                  key={sem}
                  className={`rounded-lg border p-2 text-center flex flex-col items-center gap-0.5 ${
                    !record
                      ? "border-muted/30 bg-muted/10 opacity-40"
                      : isDropped
                      ? "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/30"
                      : record.status === "Passed"
                      ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30"
                      : "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-400"
                  }`}
                >
                  <span className="text-[10px] font-black text-muted-foreground uppercase">{sem}</span>
                  {record ? (
                    isDropped ? (
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">Drop</span>
                    ) : record.status === "Passed" ? (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-base font-black text-green-700 dark:text-green-400">
                          {parseFloat(record.gpa || "0").toFixed(2)}
                        </span>
                        {rescrutinyRecord && (
                          <span className="text-[8px] font-black uppercase text-amber-600 dark:text-amber-400 leading-none">Challenge</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs font-black text-red-600 dark:text-red-400">Ref</span>
                        {(record.exam_type ?? "regular") !== "regular" && (
                          <span className="text-[8px] font-black uppercase text-amber-600 dark:text-amber-400 leading-none">Challenge</span>
                        )}
                      </div>
                    )
                  ) : (
                    <span className="text-base font-black text-muted-foreground/40">–</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Passed</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Dropped</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Referred</span>
            {passedSemesters.length > 0 && (
              <span className="ml-auto font-bold">
                Avg GPA: <span className="text-primary">{avgGpa.toFixed(2)}</span> (across {passedSemesters.length} passed)
              </span>
            )}
          </div>
        </div>

        {/* Summary card */}
        {allPassed ? (
          <div className="rounded-xl border bg-card shadow-sm p-5 flex items-center gap-4 border-l-4 border-l-green-500">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
              <Trophy className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Overall Performance</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <p className="text-3xl font-black text-green-600 dark:text-green-400">{avgGpa.toFixed(2)}</p>
                <p className="text-sm font-bold text-muted-foreground">Average GPA across {passedSemesters.length} semesters</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Student has passed all {passedSemesters.length} semesters with no referred subjects.
              </p>
            </div>
          </div>
        ) : referredSemesters.length > 0 ? (
          <div className={`rounded-xl border bg-card shadow-sm p-5 flex flex-wrap items-center gap-6 border-l-4 ${hasSemesterDrop ? "border-l-red-600 bg-red-500/[0.02]" : "border-l-amber-500"}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${hasSemesterDrop ? "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400" : "bg-amber-100 text-amber-500"}`}>
                <AlertCircle className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  {hasSemesterDrop ? "Semester Drop Status" : "Referred Summary"}
                </p>
                <p className={`text-3xl font-black mt-0.5 ${hasSemesterDrop ? "text-red-600" : "text-amber-600"}`}>
                  {hasSemesterDrop ? `Dropped (${droppedSemesters.join(", ")})` : referredSemesters.length}
                </p>
                {!hasSemesterDrop && (
                  <p className="text-sm font-bold text-muted-foreground">
                    semester{referredSemesters.length > 1 ? "s" : ""} referred
                  </p>
                )}
                {hasSemesterDrop && (
                  <p className="text-xs font-extrabold text-red-600 mt-1 uppercase tracking-wide">Wait 1 Year (BTEB Regulation)</p>
                )}
              </div>
            </div>
            <div className="h-10 w-px bg-border hidden sm:block" />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Total Referred Subjects</p>
              <p className={`text-3xl font-black mt-0.5 ${hasSemesterDrop ? "text-red-600" : "text-primary"}`}>{totalReferredSubjects}</p>
              <p className="text-xs text-muted-foreground mt-0.5">across {referredSemesters.length} semester{referredSemesters.length > 1 ? "s" : ""}</p>
            </div>
            {passedSemesters.length > 0 && (
              <>
                <div className="h-10 w-px bg-border hidden sm:block" />
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Passed GPA</p>
                  <p className="text-3xl font-black text-green-600 mt-0.5">{avgGpa.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">avg across {passedSemesters.length} passed</p>
                </div>
              </>
            )}
          </div>
        ) : null}

        {/* Semester detail cards */}
        <div className="space-y-4">
          {hasSemesterDrop && (
            <div className="rounded-xl border border-dashed border-red-500/30 p-5 text-center bg-red-50/5">
              <AlertCircle className="mx-auto h-8 w-8 text-red-600 opacity-80 mb-2" />
              <p className="font-extrabold text-sm">Active Semester Drop Status Detected</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Under BTEB regulations, having 4 or more referred subjects in a semester examination triggers a{" "}
                <strong>Semester Drop</strong> (in {droppedSemesters.join(", ")} Semester).
              </p>
            </div>
          )}

          {deduped.map((record) => {
            const referredCount = record.referred_subjects?.length ?? 0;
            const isSemesterDrop = record.status === "Referred" && referredCount >= 4;
            const isRescrutiny = record.exam_type === "rescrutiny";
            let challengeChanged = false;
            if (isRescrutiny) {
              const regularRec = btebResults.find(
                (r) => semIndex(r.semester) === semIndex(record.semester) && (r.exam_type ?? "regular") === "regular"
              );
              challengeChanged = regularRec
                ? regularRec.gpa !== record.gpa ||
                  regularRec.status !== record.status ||
                  JSON.stringify(regularRec.referred_subjects) !== JSON.stringify(record.referred_subjects)
                : true;
            }

            return (
              <div
                key={record.id}
                className={`rounded-xl border bg-card p-6 shadow-sm ${
                  isSemesterDrop
                    ? "border-l-4 border-l-red-600 bg-red-500/[0.02]"
                    : (record.exam_type ?? "regular") !== "regular"
                    ? "border-l-4 border-l-amber-400"
                    : ""
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSemesterDrop ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"}`}>
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg">
                        {record.semester} Semester Result
                        {record.exam_type && record.exam_type !== "regular"
                          ? ` (${record.exam_type === "rescrutiny" ? "Board Challenge" : record.exam_type})`
                          : ""}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground">
                          Regulation: {record.regulation} · Holding Year: {record.holding_year}
                        </p>
                        {record.exam_type && record.exam_type !== "regular" && (
                          <div className="flex flex-wrap gap-1.5 items-center mt-1">
                            <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 text-[10px] font-black uppercase">
                              {record.exam_type === "rescrutiny" ? "Board Challenge" : record.exam_type}
                            </span>
                            {record.exam_type === "rescrutiny" && (
                              challengeChanged ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 text-[10px] font-black uppercase gap-1">
                                  <span>Result Changed</span><span className="font-bold text-xs">✓</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 text-[10px] font-black uppercase">
                                  Result Not Changed
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {record.status === "Passed" ? (
                      <div>
                        <p className="text-3xl font-black text-primary">{parseFloat(record.gpa || "0").toFixed(2)}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">SGPA</p>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-full font-black text-xs ${isSemesterDrop ? "bg-red-600 text-white" : "bg-amber-100 text-amber-700"}`}>
                        {isSemesterDrop ? `Semester Drop — ${referredCount} referred` : `Referred — ${referredCount} subject${referredCount > 1 ? "s" : ""}`}
                      </span>
                    )}
                  </div>
                </div>

                {record.status === "Passed" ? (
                  <div className="flex items-center gap-3 text-sm text-green-700 bg-green-50 dark:bg-green-950/20 dark:text-green-400 p-3 rounded-lg border border-green-100">
                    <CheckCircle className="h-5 w-5" />
                    <span>Student has successfully passed the semester examinations.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {isSemesterDrop ? (
                      <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 dark:bg-red-950/10 dark:text-red-400 p-3 rounded-lg border border-red-100">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-extrabold text-red-800 dark:text-red-300">Semester Drop Status (BTEB Rules)</p>
                          <p className="mt-0.5 text-xs font-semibold leading-relaxed text-red-600">
                            You have 4 or more referred subjects. Under official BTEB regulations, this constitutes a{" "}
                            <strong>Semester Drop</strong>. You must wait 1 year to repeat this semester.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm text-amber-700 bg-amber-50 dark:bg-amber-950/10 dark:text-amber-400 p-3 rounded-lg border border-amber-100">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <span>Student is promoted but has referred subjects. Must clear them in subsequent examinations.</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-red-600 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Referred Subjects
                      </p>
                      <span className="text-xs font-black text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                        {record.referred_subjects?.length ?? 0} total
                      </span>
                    </div>
                    <div className="border rounded-lg overflow-hidden bg-muted/10">
                      <table className="w-full text-xs text-left">
                        <td className="p-0">
                          <table className="w-full">
                            <thead className="bg-red-50 dark:bg-red-900/10 border-b">
                              <tr>
                                <th className="px-4 py-2.5 font-black text-xs text-red-800 dark:text-red-300 uppercase">#</th>
                                <th className="px-4 py-2.5 font-black text-xs text-red-800 dark:text-red-300 uppercase">Subject Code</th>
                                <th className="px-4 py-2.5 font-black text-xs text-red-800 dark:text-red-300 uppercase">Subject Name</th>
                                <th className="px-4 py-2.5 font-black text-xs text-red-800 dark:text-red-300 uppercase">Type</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y bg-card">
                              {record.referred_subjects?.map((subCode, idx) => (
                                <tr key={subCode} className="hover:bg-red-50/50 dark:hover:bg-red-900/5">
                                  <td className="px-4 py-2.5 text-muted-foreground font-bold">{idx + 1}</td>
                                  <td className="px-4 py-2.5 font-mono font-bold text-primary">{subCode.replace(/\([^)]+\)/g, "")}</td>
                                  <td className="px-4 py-2.5 font-semibold">{getLocalSubjectName(subCode)}</td>
                                  <td className="px-4 py-2.5 text-muted-foreground font-medium">{parseSubjectSuffix(subCode)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Search by Center/Institute Code layout
  const filteredRecords = btebResults.filter((record) => {
    const term = internalFilter.toLowerCase().trim();
    if (!term) return true;
    return (
      record.roll.includes(term) ||
      (record.department ?? "").toLowerCase().includes(term) ||
      (record.semester ?? "").toLowerCase().includes(term) ||
      (record.status ?? "").toLowerCase().includes(term)
    );
  });

  return (
    <div id="printable-result" className="mx-auto mt-10 max-w-4xl space-y-6">
      {/* Center header */}
      <div className="rounded-xl border bg-card shadow-md p-6 flex flex-wrap justify-between items-center gap-4 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            Institute Code Search Results
          </span>
          <h2 className="text-2xl font-black mt-2">Institute / Center Code: {query}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Showing all student ledger records matched under Center Code.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1 h-3 w-3" /> Print Ledger
          </Button>
        </div>
      </div>

      {/* Internal Filter and Total Stat */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-muted/20 border p-4 rounded-xl">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={internalFilter}
            onChange={(e) => setInternalFilter(e.target.value)}
            placeholder="Filter by roll, dept, status..."
            className="pl-9 text-xs h-9 bg-card"
          />
        </div>
        <div className="text-xs font-bold text-muted-foreground">
          Showing {filteredRecords.length} of {btebResults.length} records
        </div>
      </div>

      {/* Table list */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/40 border-b">
            <tr>
              {["Roll No", "Department", "Semester", "Regulation", "GPA", "Status", "Referred Subjects"].map((h) => (
                <th key={h} className="px-4 py-3 font-black text-xs text-muted-foreground uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y font-medium">
            {filteredRecords.map((r) => {
              const referredCount = r.referred_subjects?.length ?? 0;
              return (
                <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-primary">{r.roll}</td>
                  <td className="px-4 py-3 text-xs">{r.department}</td>
                  <td className="px-4 py-3 text-xs">{r.semester}</td>
                  <td className="px-4 py-3 text-xs font-mono">{r.regulation}</td>
                  <td className="px-4 py-3 font-black">
                    {r.gpa ? parseFloat(r.gpa).toFixed(2) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      r.status === "Passed"
                        ? "bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                        : referredCount >= 4
                        ? "bg-red-600 text-white"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {r.status === "Passed" ? "Passed" : referredCount >= 4 ? "Dropped" : "Referred"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-[200px]" title={r.referred_subjects?.join(", ") ?? ""}>
                    {r.referred_subjects && r.referred_subjects.length > 0 ? (
                      <span className="text-red-500 font-bold">
                        {r.referred_subjects.length} sub ({r.referred_subjects.map(s => s.replace(/\([^)]+\)/g, "")).join(", ")})
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-muted-foreground font-semibold text-xs">
                  No records match the filter query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
