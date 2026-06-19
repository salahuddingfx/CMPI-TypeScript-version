import { useState, useRef } from "react";
import { FileText, Upload, Eye, Download, X } from "lucide-react";
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

const syllabuses = {
  CST: [
    { sem: "1st", courses: ["Mathematics I", "Physics", "English", "Basic IT", "Programming I"], pdfUrl: null as string | null },
    { sem: "2nd", courses: ["Mathematics II", "Programming II", "Data Structures", "Digital Logic", "English II"], pdfUrl: null as string | null },
    { sem: "3rd", courses: ["Web Development", "Database Management", "Computer Networks", "Software Engineering", "Operating Systems"], pdfUrl: null as string | null },
    { sem: "4th", courses: ["Network Security", "AI Fundamentals", "Mobile App Dev", "Cloud Computing", "Project Work I"], pdfUrl: null as string | null },
  ],
  Civil: [
    { sem: "1st", courses: ["Mathematics I", "Physics", "Engineering Drawing", "Basic IT", "Workshop Practice"], pdfUrl: null as string | null },
    { sem: "2nd", courses: ["Mathematics II", "Strength of Materials", "Fluid Mechanics", "Surveying I", "Building Materials"], pdfUrl: null as string | null },
    { sem: "3rd", courses: ["Structural Analysis", "Surveying II", "Construction Materials", "Geotechnical Engg", "Environmental Engg"], pdfUrl: null as string | null },
    { sem: "4th", courses: ["Transportation Engg", "Water Resources", "Estimation & Costing", "Project Management", "Project Work I"], pdfUrl: null as string | null },
  ],
  EEE: [
    { sem: "1st", courses: ["Mathematics I", "Physics", "Basic Electrical", "Basic IT", "Workshop Practice"], pdfUrl: null as string | null },
    { sem: "2nd", courses: ["Mathematics II", "Circuit Theory", "Electronics I", "Electrical Machines I", "English II"], pdfUrl: null as string | null },
    { sem: "3rd", courses: ["Power Electronics", "Control Systems", "Electrical Machines II", "Power Systems", "Measurement & Instrumentation"], pdfUrl: null as string | null },
    { sem: "4th", courses: ["Renewable Energy", "Microprocessor", "Industrial Automation", "Embedded Systems", "Project Work I"], pdfUrl: null as string | null },
  ],
};

type SyllabusEntry = { sem: string; courses: string[]; pdfUrl: string | null };
type SyllabusState = Record<Dept, SyllabusEntry[]>;

export function Syllabus() {
  const [activeDept, setActiveDept] = useState<Dept>("CST");
  const [data, setData] = useState<SyllabusState>(syllabuses as SyllabusState);
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileUpload = (dept: Dept, semIndex: number, file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setData((prev) => ({
      ...prev,
      [dept]: prev[dept].map((s, i) => (i === semIndex ? { ...s, pdfUrl: url } : s)),
    }));
  };

  const handleRemovePdf = (dept: Dept, semIndex: number) => {
    const currentUrl = data[dept][semIndex]?.pdfUrl;
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    setData((prev) => ({
      ...prev,
      [dept]: prev[dept].map((s, i) => (i === semIndex ? { ...s, pdfUrl: null } : s)),
    }));
  };

  const depts = Object.keys(syllabuses) as Dept[];

  return (
    <PageTransition>
      <SEO title="Syllabus & Curriculum" description="Curriculum and syllabus for all diploma programs at CMPI." />

      {preview && (
        <PdfPreviewModal url={preview.url} title={preview.title} onClose={() => setPreview(null)} />
      )}

      <section className="container section-pad">
        <SectionHeader
          eyebrow="Curriculum"
          title="Syllabus & Curriculum"
          description="Complete course structure for each department. Upload official BTEB syllabus PDFs to make them available for students."
          align="center"
          className="mb-10"
        />

        {/* Department Tabs */}
        <div className="mb-8 flex justify-center gap-2 flex-wrap">
          {depts.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDept(d)}
              className={`rounded-sm px-5 py-2 text-sm font-bold transition ${
                activeDept === d ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {deptLabel[d]}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {data[activeDept].map((sem, semIndex) => {
            const key = `${activeDept}-${semIndex}`;
            return (
              <div key={sem.sem} className="rounded-sm border bg-card shadow-sm overflow-hidden">
                {/* Semester Header */}
                <div className="flex items-center justify-between bg-primary px-5 py-3">
                  <h3 className="font-bold text-white">
                    {sem.sem} Semester — {deptLabel[activeDept]}
                  </h3>
                  <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold text-white">
                    {sem.courses.length} courses
                  </span>
                </div>

                <div className="grid sm:grid-cols-[1fr_auto] gap-0">
                  {/* Course List */}
                  <ul className="divide-y p-4 space-y-0">
                    {sem.courses.map((c, ci) => (
                      <li key={c} className="flex items-center gap-3 py-2 text-sm">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                          {ci + 1}
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>

                  {/* PDF Zone */}
                  <div className="border-t sm:border-t-0 sm:border-l p-4 flex flex-col items-center justify-center gap-3 min-w-[180px] bg-muted/30">
                    {sem.pdfUrl ? (
                      <>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <FileText className="h-8 w-8 text-primary" />
                          <p className="text-xs font-semibold text-muted-foreground">Syllabus PDF</p>
                          <p className="text-xs text-green-600 font-bold">✓ Uploaded</p>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() =>
                              setPreview({
                                url: sem.pdfUrl!,
                                title: `${deptLabel[activeDept]} — ${sem.sem} Semester Syllabus`,
                              })
                            }
                          >
                            <Eye className="mr-1 h-3 w-3" /> Preview
                          </Button>
                          <a href={sem.pdfUrl} download={`syllabus-${activeDept}-${sem.sem}.pdf`}>
                            <Button size="sm" variant="outline" className="w-full">
                              <Download className="mr-1 h-3 w-3" /> Download
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-destructive hover:text-destructive"
                            onClick={() => handleRemovePdf(activeDept, semIndex)}
                          >
                            <X className="mr-1 h-3 w-3" /> Remove
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground/50" />
                          <p className="text-xs text-muted-foreground">No PDF uploaded</p>
                        </div>
                        <input
                          ref={(el) => { fileInputRefs.current[key] = el; }}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(activeDept, semIndex, file);
                            e.target.value = "";
                          }}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => fileInputRefs.current[key]?.click()}
                        >
                          <Upload className="mr-1 h-3 w-3" /> Upload PDF
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
