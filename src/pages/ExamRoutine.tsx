import { useState, useRef } from "react";
import { Calendar, Upload, Eye, Download, X, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PdfPreviewModal } from "@/components/common/PdfPreviewModal";

type Dept = "CST" | "Civil" | "EEE";

const deptLabel: Record<Dept, string> = {
  CST: "Computer Science & Technology",
  Civil: "Civil Technology",
  EEE: "Electrical Technology",
};

const examRoutine: Record<Dept, { date: string; day: string; time: string; course: string; courseCode: string }[]> = {
  CST: [
    { date: "2026-07-01", day: "Wednesday", time: "9:00 AM - 12:00 PM", course: "Web Development", courseCode: "CST-301" },
    { date: "2026-07-03", day: "Friday",    time: "9:00 AM - 12:00 PM", course: "Database Management", courseCode: "CST-302" },
    { date: "2026-07-05", day: "Sunday",    time: "9:00 AM - 12:00 PM", course: "Computer Networks", courseCode: "CST-303" },
    { date: "2026-07-07", day: "Tuesday",   time: "9:00 AM - 12:00 PM", course: "Software Engineering", courseCode: "CST-304" },
  ],
  Civil: [
    { date: "2026-07-01", day: "Wednesday", time: "2:00 PM - 5:00 PM", course: "Structural Analysis", courseCode: "CIV-301" },
    { date: "2026-07-03", day: "Friday",    time: "2:00 PM - 5:00 PM", course: "Surveying II", courseCode: "CIV-302" },
    { date: "2026-07-05", day: "Sunday",    time: "2:00 PM - 5:00 PM", course: "Construction Materials", courseCode: "CIV-303" },
  ],
  EEE: [
    { date: "2026-07-02", day: "Thursday",  time: "9:00 AM - 12:00 PM", course: "Power Electronics", courseCode: "EEE-301" },
    { date: "2026-07-04", day: "Saturday",  time: "9:00 AM - 12:00 PM", course: "Control Systems", courseCode: "EEE-302" },
    { date: "2026-07-06", day: "Monday",    time: "9:00 AM - 12:00 PM", course: "Electrical Machines", courseCode: "EEE-303" },
  ],
};

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function ExamRoutine() {
  const [dept, setDept] = useState<Dept>("CST");
  const [pdfs, setPdfs] = useState<Record<Dept, string | null>>({ CST: null, Civil: null, EEE: null });
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const currentPdf = pdfs[dept];

  const handleUpload = (file: File) => {
    if (file.type !== "application/pdf") { alert("Please upload a PDF."); return; }
    const url = URL.createObjectURL(file);
    setPdfs((prev) => ({ ...prev, [dept]: url }));
  };

  const handleRemove = () => {
    if (currentPdf) URL.revokeObjectURL(currentPdf);
    setPdfs((prev) => ({ ...prev, [dept]: null }));
  };

  return (
    <PageTransition>
      <SEO title="Exam Routine" description="Mid-term and final examination routine for all departments at CMPI." />

      {preview && (
        <PdfPreviewModal url={preview.url} title={preview.title} onClose={() => setPreview(null)} />
      )}

      <section className="container section-pad">
        <SectionHeader
          eyebrow="Examinations"
          title="Exam Routine 2026"
          description="Department-wise examination schedule for the current semester. Upload official BTEB exam routine PDF."
          align="center"
          className="mb-10"
        />

        <div className="mx-auto max-w-3xl">
          {/* Dept Tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {(["CST", "Civil", "EEE"] as const).map((d) => (
              <button
                key={d}
                type="button"
                className={`rounded-sm px-5 py-2 text-sm font-bold transition ${dept === d ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                onClick={() => setDept(d)}
              >
                {deptLabel[d]}
              </button>
            ))}
          </div>

          {/* PDF Upload Strip */}
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-sm border bg-muted/40 px-4 py-3">
            <Calendar className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm font-semibold flex-1">
              {currentPdf
                ? `Official exam routine PDF uploaded for ${deptLabel[dept]}`
                : `Upload official PDF exam routine for ${deptLabel[dept]}`}
            </span>
            {currentPdf ? (
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" onClick={() => setPreview({ url: currentPdf, title: `${deptLabel[dept]} — Exam Routine 2026` })}>
                  <Eye className="mr-1 h-3 w-3" /> Preview PDF
                </Button>
                <a href={currentPdf} download={`exam-routine-${dept}.pdf`}>
                  <Button size="sm" variant="outline"><Download className="mr-1 h-3 w-3" /> Download</Button>
                </a>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={handleRemove}>
                  <X className="mr-1 h-3 w-3" /> Remove
                </Button>
              </div>
            ) : (
              <>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }}
                />
                <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
                  <Upload className="mr-1 h-3 w-3" /> Upload PDF
                </Button>
              </>
            )}
          </div>

          {/* Exam List */}
          <div className="rounded-sm border bg-card shadow-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_auto] bg-muted/60 px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>Date & Day</span>
              <span>Time</span>
              <span>Course</span>
              <span>Status</span>
            </div>

            {examRoutine[dept].map((item, i) => {
              const days = daysUntil(item.date);
              const isPast = days < 0;
              const isToday = days === 0;
              const isSoon = days > 0 && days <= 3;

              return (
                <div
                  key={item.courseCode}
                  className={`grid grid-cols-[2fr_1.5fr_1.5fr_auto] px-4 py-4 text-sm border-t items-center ${i % 2 === 0 ? "" : "bg-muted/20"} ${isToday ? "bg-yellow-50 dark:bg-yellow-900/10" : ""}`}
                >
                  <div>
                    <p className="font-bold">
                      {new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.day}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {item.time}
                  </span>
                  <div>
                    <p className="font-semibold">{item.course}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.courseCode}</p>
                  </div>
                  <div>
                    {isPast ? (
                      <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">Done</span>
                    ) : isToday ? (
                      <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <AlertCircle className="h-3 w-3" /> Today
                      </span>
                    ) : isSoon ? (
                      <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        {days}d left
                      </span>
                    ) : (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                        {days}d left
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
