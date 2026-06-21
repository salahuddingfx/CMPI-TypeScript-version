import { useState, useEffect } from "react";
import { FileText, Download, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PdfPreviewModal } from "@/components/common/PdfPreviewModal";
import { api } from "@/services/api";

type Dept = "CST" | "Civil" | "EEE";

const deptLabel: Record<Dept, string> = {
  CST: "Computer Science & Technology",
  Civil: "Civil Technology",
  EEE: "Electrical Technology",
};

const deptMap: Record<Dept, string> = {
  CST: "Computer Science & Technology",
  Civil: "Civil Technology",
  EEE: "Electrical Technology",
};

const allSemesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

interface Routine {
  id: number;
  department: string;
  semester: string;
  academic_year: string;
  title: string;
  pdf_path: string;
  original_name: string;
  created_at: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function ClassRoutine() {
  const [dept, setDept] = useState<Dept>("CST");
  const [semester, setSemester] = useState("1st");
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    loadRoutines();
  }, []);

  async function loadRoutines() {
    setLoading(true);
    try {
      const response = await api.get("/class-routines");
      setRoutines(response.data);
    } catch {}
    setLoading(false);
  }

  const currentDeptRoutines = routines.filter(
    (r) => r.department === deptMap[dept]
  );

  const semesterRoutine = currentDeptRoutines.find(
    (r) => r.semester === semester || r.semester === "all"
  );

  const getDownloadUrl = (routine: Routine) => {
    return `${API_BASE}/class-routines/${routine.id}/download`;
  };

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
          description="Department-wise weekly class schedule. Sunday - Thursday, 9:00 AM - 1:40 PM. 4 periods x 40 minutes."
          align="center"
          className="mb-10"
        />

        <div className="mx-auto max-w-5xl">
          {/* Department Tabs */}
          <div className="mb-4 flex flex-wrap justify-center gap-2">
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

          {/* Semester Tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-1">
            {allSemesters.map((s) => (
              <button
                key={s}
                type="button"
                className={`rounded-sm px-3 py-1 text-xs font-medium transition ${semester === s ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setSemester(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Routine Content */}
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading routines...
            </div>
          ) : semesterRoutine ? (
            <div className="rounded-sm border bg-card shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{semesterRoutine.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {deptLabel[dept]} — {semester} Semester — {semesterRoutine.academic_year}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setPreview({ url: getDownloadUrl(semesterRoutine), title: semesterRoutine.title })}>
                    <Eye className="mr-1 h-3 w-3" /> View PDF
                  </Button>
                  <a href={getDownloadUrl(semesterRoutine)} download={semesterRoutine.original_name}>
                    <Button size="sm" variant="outline">
                      <Download className="mr-1 h-3 w-3" /> Download
                    </Button>
                  </a>
                </div>
              </div>

              {/* Embedded PDF viewer */}
              <div className="w-full rounded-sm border overflow-hidden" style={{ height: "700px" }}>
                <iframe
                  src={getDownloadUrl(semesterRoutine)}
                  className="w-full h-full"
                  title={semesterRoutine.title}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-sm border bg-card shadow-sm p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground">No routine available</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {deptLabel[dept]} — {semester} semester routine has not been uploaded yet.
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Contact the admin to upload the class routine PDF.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
