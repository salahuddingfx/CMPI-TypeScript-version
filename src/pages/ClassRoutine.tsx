import { useState, useRef } from "react";
import { FileText, Upload, Eye, Download, X, Clock } from "lucide-react";
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

const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const timeSlots = ["8:00 - 9:30", "9:45 - 11:15", "11:30 - 1:00", "2:00 - 3:30", "3:45 - 5:15"];

const routines: Record<Dept, Record<string, Record<string, string>>> = {
  CST: {
    Saturday:  { "8:00 - 9:30": "Web Dev (CST-301)", "9:45 - 11:15": "DB Lab (CST-302)", "11:30 - 1:00": "Networks (CST-303)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Sunday:    { "8:00 - 9:30": "", "9:45 - 11:15": "Web Dev (CST-301)", "11:30 - 1:00": "", "2:00 - 3:30": "Networks Lab (CST-303)", "3:45 - 5:15": "" },
    Monday:    { "8:00 - 9:30": "SE (CST-304)", "9:45 - 11:15": "", "11:30 - 1:00": "Web Dev Lab (CST-301)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Tuesday:   { "8:00 - 9:30": "", "9:45 - 11:15": "DB (CST-302)", "11:30 - 1:00": "", "2:00 - 3:30": "SE (CST-304)", "3:45 - 5:15": "" },
    Wednesday: { "8:00 - 9:30": "Networks (CST-303)", "9:45 - 11:15": "", "11:30 - 1:00": "DB (CST-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Thursday:  { "8:00 - 9:30": "", "9:45 - 11:15": "Lab (CST-304)", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
  },
  Civil: {
    Saturday:  { "8:00 - 9:30": "Structural (CIV-301)", "9:45 - 11:15": "", "11:30 - 1:00": "Surveying Lab (CIV-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Sunday:    { "8:00 - 9:30": "", "9:45 - 11:15": "Materials (CIV-303)", "11:30 - 1:00": "", "2:00 - 3:30": "Structural (CIV-301)", "3:45 - 5:15": "" },
    Monday:    { "8:00 - 9:30": "Surveying (CIV-302)", "9:45 - 11:15": "", "11:30 - 1:00": "Materials Lab (CIV-303)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Tuesday:   { "8:00 - 9:30": "", "9:45 - 11:15": "", "11:30 - 1:00": "Structural (CIV-301)", "2:00 - 3:30": "Surveying (CIV-302)", "3:45 - 5:15": "" },
    Wednesday: { "8:00 - 9:30": "Materials (CIV-303)", "9:45 - 11:15": "", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Thursday:  { "8:00 - 9:30": "", "9:45 - 11:15": "CAD Lab (CIV-304)", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
  },
  EEE: {
    Saturday:  { "8:00 - 9:30": "Power Electronics (EEE-301)", "9:45 - 11:15": "", "11:30 - 1:00": "Control Systems (EEE-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Sunday:    { "8:00 - 9:30": "", "9:45 - 11:15": "Machines (EEE-303)", "11:30 - 1:00": "", "2:00 - 3:30": "Power Electronics Lab (EEE-301)", "3:45 - 5:15": "" },
    Monday:    { "8:00 - 9:30": "Control Systems (EEE-302)", "9:45 - 11:15": "", "11:30 - 1:00": "", "2:00 - 3:30": "Machines (EEE-303)", "3:45 - 5:15": "" },
    Tuesday:   { "8:00 - 9:30": "", "9:45 - 11:15": "", "11:30 - 1:00": "Power Electronics (EEE-301)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Wednesday: { "8:00 - 9:30": "", "9:45 - 11:15": "Machines Lab (EEE-303)", "11:30 - 1:00": "Control Systems (EEE-302)", "2:00 - 3:30": "", "3:45 - 5:15": "" },
    Thursday:  { "8:00 - 9:30": "Electronics Lab (EEE-304)", "9:45 - 11:15": "", "11:30 - 1:00": "", "2:00 - 3:30": "", "3:45 - 5:15": "" },
  },
};

// Per-dept routine PDFs (uploaded by admin)
type RoutinePdfs = Record<Dept, string | null>;

export function ClassRoutine() {
  const [dept, setDept] = useState<Dept>("CST");
  const [pdfs, setPdfs] = useState<RoutinePdfs>({ CST: null, Civil: null, EEE: null });
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const routine = routines[dept];

  const handleUpload = (file: File) => {
    if (file.type !== "application/pdf") { alert("Please upload a PDF."); return; }
    const url = URL.createObjectURL(file);
    setPdfs((prev) => ({ ...prev, [dept]: url }));
  };

  const handleRemove = () => {
    if (pdfs[dept]) URL.revokeObjectURL(pdfs[dept]!);
    setPdfs((prev) => ({ ...prev, [dept]: null }));
  };

  const currentPdf = pdfs[dept];

  return (
    <PageTransition>
      <SEO title="Class Routine" description="Weekly class routine for all departments at CMPI." />

      {preview && (
        <PdfPreviewModal url={preview.url} title={preview.title} onClose={() => setPreview(null)} />
      )}

      <section className="container section-pad">
        <SectionHeader
          eyebrow="Academics"
          title="Weekly Class Routine"
          description="Department-wise weekly class schedule for the current semester."
          align="center"
          className="mb-10"
        />

        <div className="mx-auto max-w-5xl">
          {/* Tabs */}
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

          {/* PDF Upload strip */}
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-sm border bg-muted/40 px-4 py-3">
            <FileText className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm font-semibold flex-1">
              {currentPdf ? `Official routine PDF uploaded for ${deptLabel[dept]}` : `Upload official PDF routine for ${deptLabel[dept]}`}
            </span>
            {currentPdf ? (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setPreview({ url: currentPdf, title: `${deptLabel[dept]} — Class Routine` })}>
                  <Eye className="mr-1 h-3 w-3" /> Preview PDF
                </Button>
                <a href={currentPdf} download={`routine-${dept}.pdf`}>
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

          {/* Routine Table */}
          <div className="overflow-x-auto rounded-sm border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60">
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Time</span>
                  </th>
                  {days.map((d) => (
                    <th key={d} className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {d.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, i) => (
                  <tr key={slot} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                    <td className="whitespace-nowrap border-t px-3 py-2.5 font-semibold text-muted-foreground text-xs">{slot}</td>
                    {days.map((d) => {
                      const cell = routine[d]?.[slot] ?? "";
                      const isLab = cell.toLowerCase().includes("lab");
                      return (
                        <td
                          key={d}
                          className={`border-t px-3 py-2.5 text-center text-xs ${cell ? "font-semibold" : "text-muted-foreground/30"} ${isLab ? "text-primary" : "text-foreground"}`}
                        >
                          {cell ? (
                            <span className={`rounded px-1.5 py-0.5 ${isLab ? "bg-primary/10" : ""}`}>{cell}</span>
                          ) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-right text-xs text-muted-foreground">Lab periods highlighted in blue.</p>
        </div>
      </section>
    </PageTransition>
  );
}
