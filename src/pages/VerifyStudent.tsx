import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyStudent } from "@/services/api";
import { SEO } from "@/components/common/SEO";
import { ShieldCheck, ShieldAlert, ChevronLeft, Calendar, UserCheck, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface VerifiedStudentData {
  name: string;
  student_id: string;
  department: string;
  semester: string;
  session: string;
  blood_group: string;
  status: string;
  avatar: string;
  verified_at: string;
}

export function VerifyStudent() {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<VerifiedStudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setError("No student ID provided for verification.");
      setLoading(false);
      return;
    }

    verifyStudent(studentId)
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError("This Student ID is not registered in the CMPI institutional database. The credential could be invalid or counterfeit.");
        } else {
          setError("Could not complete verification process due to a server error.");
        }
      })
      .finally(() => setLoading(false));
  }, [studentId]);

  return (
    <>
      <SEO title="Student ID Verification" description="Scan and verify student credentials at Cox's Bazar Model Polytechnic Institute." />
      
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-10 sm:py-16">
        <div className="w-full max-w-md">
          {/* Back button */}
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {loading ? (
            <Card className="border border-muted animate-pulse">
              <CardHeader className="space-y-2 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted" />
                <div className="mx-auto h-6 w-3/4 rounded bg-muted" />
                <div className="mx-auto h-4 w-1/2 rounded bg-muted" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-10 w-full rounded bg-muted" />
                <div className="h-6 w-5/6 rounded bg-muted" />
                <div className="h-6 w-2/3 rounded bg-muted" />
              </CardContent>
            </Card>
          ) : error ? (
            /* Error / Invalid Student Card */
            <Card className="border-destructive/30 bg-destructive/5 text-destructive shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <ShieldAlert className="h-9 w-9 text-destructive" />
                </div>
                <CardTitle className="mt-4 text-xl font-bold tracking-tight">Invalid Credential</CardTitle>
                <CardDescription className="text-destructive/80 font-medium">Verification Failed</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm leading-relaxed text-destructive/90 px-6 pb-6">
                <p>{error}</p>
                <div className="mt-6 rounded-lg bg-destructive/10 p-4 text-xs font-mono text-left border border-destructive/20 space-y-1">
                  <p className="font-bold uppercase tracking-wider text-[9px] text-destructive/70">Scanned Parameter</p>
                  <p className="truncate text-destructive font-semibold">{studentId}</p>
                </div>
              </CardContent>
              <div className="bg-destructive/10 flex justify-center py-4 rounded-b-xl border-t border-destructive/20">
                <p className="text-[10px] text-destructive/70 font-semibold uppercase tracking-widest flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> Unauthorized ID Card Warning
                </p>
              </div>
            </Card>
          ) : student ? (
            /* Verified Student Card */
            <Card className={`border-emerald-500/30 bg-emerald-500/5 shadow-lg border-2 ${
              !(student.status === "active" || student.status === "approved") ? "border-amber-500/30 bg-amber-500/5" : ""
            }`}>
              <CardHeader className="text-center relative">
                {/* Visual indicator of success */}
                <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600">
                  <UserCheck className="h-3.5 w-3.5" />
                </div>
                
                {/* Profile Pic or default symbol */}
                <div className="mx-auto relative">
                  <div className={`mx-auto h-20 w-20 overflow-hidden rounded-full border-4 shadow-md ${
                    (student.status === "active" || student.status === "approved") ? "border-emerald-500 bg-emerald-100" : "border-amber-500 bg-amber-100"
                  }`}>
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center text-xl font-bold ${
                        (student.status === "active" || student.status === "approved") ? "text-emerald-700" : "text-amber-750"
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Verified Icon Badge */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 flex items-center gap-1 rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm text-white ${
                    (student.status === "active" || student.status === "approved") ? "bg-emerald-600" : "bg-amber-600"
                  }`}>
                    {(student.status === "active" || student.status === "approved") ? (
                      <>
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-3.5 w-3.5" /> {student.status}
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <CardTitle className="text-2xl font-black text-foreground tracking-tight">{student.name}</CardTitle>
                  <CardDescription className="font-mono font-bold text-primary mt-1 text-xs">
                    {student.student_id}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 px-6 pb-6">
                <div className="divide-y rounded-lg border bg-card p-4 shadow-sm text-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-slate-100 dark:border-slate-800">
                    <span className="text-muted-foreground font-medium text-xs">Technology/Dept</span>
                    <span className="font-bold text-foreground">{student.department}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 pb-2 border-slate-100 dark:border-slate-800">
                    <span className="text-muted-foreground font-medium text-xs">Academic Semester</span>
                    <span className="font-bold text-foreground">{student.semester} Semester</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 pb-2 border-slate-100 dark:border-slate-800">
                    <span className="text-muted-foreground font-medium text-xs">Session Group</span>
                    <span className="font-mono font-bold text-foreground">{student.session}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 pb-2 border-slate-100 dark:border-slate-800">
                    <span className="text-muted-foreground font-medium text-xs">Blood Group</span>
                    <span className="font-extrabold text-red-650">{student.blood_group || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground font-medium text-xs">Verification Check</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase border ${
                      (student.status === "active" || student.status === "approved")
                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }`}>
                      {student.status}
                    </span>
                  </div>
                </div>

                {!(student.status === "active" || student.status === "approved") && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400 font-medium flex items-start gap-2 leading-relaxed">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                    <p>
                      <strong>Status Alert:</strong> This student status is marked as <strong>{student.status}</strong>. Please contact the CMPI Registrar Office for verification of enrollment status.
                    </p>
                  </div>
                )}
              </CardContent>

              <div className={`flex flex-col items-center gap-2 py-4 rounded-b-xl border-t text-xs font-medium text-slate-500 ${
                student.status === "active" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"
              }`}>
                <span className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
                  <Calendar className="h-3.5 w-3.5" /> Checked On
                </span>
                <span className="font-mono text-slate-400">{new Date(student.verified_at).toLocaleString()}</span>
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}
