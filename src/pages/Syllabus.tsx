import { useState, useRef, useEffect } from "react";
import { FileText, Upload, Eye, Download, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PdfPreviewModal } from "@/components/common/PdfPreviewModal";
import { getSubjects, uploadFile } from "@/services/api";
import type { Subject } from "@/services/types";

type Dept = "CST" | "Civil" | "EEE";

const deptLabel: Record<Dept, string> = {
  CST: "Computer Science & Technology",
  Civil: "Civil Technology",
  EEE: "Electrical Technology",
};

const semestersList = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

// Fallback mock data in case the API database is empty or unreachable
const fallbackSyllabuses = {
  CST: [
    { sem: "1st", courses: ["Mathematics I", "Physics", "English", "Basic IT", "Programming I"] },
    { sem: "2nd", courses: ["Mathematics II", "Programming II", "Data Structures", "Digital Logic", "English II"] },
    { sem: "3rd", courses: ["Web Development", "Database Management", "Computer Networks", "Software Engineering", "Operating Systems"] },
    { sem: "4th", courses: ["Network Security", "AI Fundamentals", "Mobile App Dev", "Cloud Computing", "Project Work I"] },
  ],
  Civil: [
    { sem: "1st", courses: ["Mathematics I", "Physics", "Engineering Drawing", "Basic IT", "Workshop Practice"] },
    { sem: "2nd", courses: ["Mathematics II", "Strength of Materials", "Fluid Mechanics", "Surveying I", "Building Materials"] },
    { sem: "3rd", courses: ["Structural Analysis", "Surveying II", "Construction Materials", "Geotechnical Engg", "Environmental Engg"] },
    { sem: "4th", courses: ["Transportation Engg", "Water Resources", "Estimation & Costing", "Project Management", "Project Work I"] },
  ],
  EEE: [
    { sem: "1st", courses: ["Mathematics I", "Physics", "Basic Electrical", "Basic IT", "Workshop Practice"] },
    { sem: "2nd", courses: ["Mathematics II", "Circuit Theory", "Electronics I", "Electrical Machines I", "English II"] },
    { sem: "3rd", courses: ["Power Electronics", "Control Systems", "Electrical Machines II", "Power Systems", "Measurement & Instrumentation"] },
    { sem: "4th", courses: ["Renewable Energy", "Microprocessor", "Industrial Automation", "Embedded Systems", "Project Work I"] },
  ],
};

export function Syllabus() {
  const [activeDept, setActiveDept] = useState<Dept>("CST");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Local storage mapping for syllabus PDFs
  const [storedPdfs, setStoredPdfs] = useState<Record<string, string>>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cmpi-syllabus-pdf-urls");
      if (stored) return JSON.parse(stored);
      
      const defaults = {
        "CST-1st": "/notices/admission-2026.pdf",
        "CST-2nd": "/notices/midterm-routine.pdf",
        "Civil-1st": "/notices/eid-holiday.pdf",
        "EEE-1st": "/notices/tender-lab-equipment.pdf",
      };
      localStorage.setItem("cmpi-syllabus-pdf-urls", JSON.stringify(defaults));
      return defaults;
    }
    return {};
  });

  const userStr = typeof window !== "undefined" ? localStorage.getItem("cmpi-user") : null;
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user && user.role === "admin";

  const fetchSubjectsData = async () => {
    setLoading(true);
    try {
      const deptName = deptLabel[activeDept];
      const data = await getSubjects({ department: deptName });
      setSubjects(data || []);
    } catch (err) {
      console.error("Failed to load subjects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjectsData();
  }, [activeDept]);

  const handleFileUpload = async (dept: Dept, sem: string, file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    try {
      const uploadRes = await uploadFile(file, "others");
      const url = uploadRes.url;
      const key = `${dept}-${sem}`;
      const newPdfs = { ...storedPdfs, [key]: url };
      setStoredPdfs(newPdfs);
      localStorage.setItem("cmpi-syllabus-pdf-urls", JSON.stringify(newPdfs));
    } catch (err) {
      console.error("Failed to upload PDF", err);
      alert("Failed to upload PDF file. Please ensure you are logged in as admin.");
    }
  };

  const handleRemovePdf = (dept: Dept, sem: string) => {
    const key = `${dept}-${sem}`;
    const newPdfs = { ...storedPdfs };
    delete newPdfs[key];
    setStoredPdfs(newPdfs);
    localStorage.setItem("cmpi-syllabus-pdf-urls", JSON.stringify(newPdfs));
  };

  const depts = Object.keys(deptLabel) as Dept[];

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
          description="Complete course structure for each department. View subjects, credits, and marks details for all semesters."
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
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 shadow-sm ${
                activeDept === d 
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]" 
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {deptLabel[d]}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="mx-auto max-w-4xl space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse rounded-2xl border border-border/80 bg-card p-6 shadow-md">
                <div className="h-6 w-1/4 rounded bg-muted mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-muted"></div>
                  <div className="h-4 w-5/6 rounded bg-muted"></div>
                  <div className="h-4 w-4/6 rounded bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-8">
            {semestersList.map((sem) => {
              const semSubjects = subjects.filter((s) => s.semester === sem);
              const key = `${activeDept}-${sem}`;
              const pdfUrl = storedPdfs[key];

              // Determine if we should display fallback mock data for this semester
              const fallbackGroup = fallbackSyllabuses[activeDept];
              const mockSemData = fallbackGroup?.find((m) => m.sem === sem);
              
              const hasDbData = semSubjects.length > 0;
              const hasMockData = !!mockSemData;

              // If no data is available from DB and we have no mock fallback, skip rendering this semester
              if (!hasDbData && !hasMockData) return null;

              // Calculate metrics for DB subjects
              const totalCredits = semSubjects.reduce((sum, s) => sum + Number(s.credit), 0);
              const totalMarksSum = semSubjects.reduce((sum, s) => sum + Number(s.total_marks ?? 0), 0);

              return (
                <div key={sem} className="rounded-2xl border border-border/80 bg-card shadow-xl overflow-hidden backdrop-blur-md">
                  {/* Semester Header */}
                  <div className="flex items-center justify-between bg-primary/95 px-6 py-4 border-b border-primary/20">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-primary-foreground/70">Academic Structure</span>
                      <h3 className="font-black text-lg text-white">
                        {sem} Semester — {deptLabel[activeDept]}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-black text-white backdrop-blur-sm">
                      {hasDbData ? `${semSubjects.length} Courses` : `${mockSemData.courses.length} Courses (Mock)`}
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_auto] gap-0">
                    {/* Courses Listing */}
                    <div className="p-5 flex-1 min-w-0">
                      {hasDbData ? (
                        /* Premium Subject Table */
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs sm:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-border/50 bg-muted/30 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                <th className="px-3 py-2.5">Code</th>
                                <th className="px-3 py-2.5">Subject Name</th>
                                <th className="px-3 py-2.5 text-center">Credits</th>
                                <th className="px-3 py-2.5 text-center hidden sm:table-cell">Theory</th>
                                <th className="px-3 py-2.5 text-center hidden sm:table-cell">Practical</th>
                                <th className="px-3 py-2.5 text-center">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                              {semSubjects.map((s) => (
                                <tr key={s.subject_code} className="hover:bg-muted/10 font-medium">
                                  <td className="px-3 py-2.5 font-mono text-xs text-primary font-bold">{s.subject_code}</td>
                                  <td className="px-3 py-2.5 text-foreground/90 font-semibold">{s.subject_name}</td>
                                  <td className="px-3 py-2.5 text-center font-extrabold text-foreground">{s.credit}</td>
                                  <td className="px-3 py-2.5 text-center text-muted-foreground hidden sm:table-cell">{s.theory_marks ?? 0}</td>
                                  <td className="px-3 py-2.5 text-center text-muted-foreground hidden sm:table-cell">{s.practical_marks ?? 0}</td>
                                  <td className="px-3 py-2.5 text-center font-bold text-primary">{s.total_marks ?? 0}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {/* Dynamic Semester Summary Info */}
                          <div className="bg-muted/10 rounded-xl border border-border/50 px-4 py-2.5 mt-4 flex justify-between items-center text-xs font-bold text-muted-foreground flex-wrap gap-2">
                            <span>{semSubjects.length} Total Subjects</span>
                            <div className="flex gap-4">
                              <span>Total Credits: <span className="text-primary font-black">{totalCredits}</span></span>
                              <span>Total Marks: <span className="text-primary font-black">{totalMarksSum}</span></span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Fallback Mock List */
                        <div>
                          <div className="mb-3 flex items-center gap-2 text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xs font-bold">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>Database record empty for this semester. Displaying standard fallback curriculum.</span>
                          </div>
                          <ul className="divide-y divide-border/40 space-y-0">
                            {mockSemData.courses.map((c, ci) => (
                              <li key={c} className="flex items-center gap-3 py-2.5 text-sm font-semibold text-foreground/80">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                                  {ci + 1}
                                </span>
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* PDF Side Zone */}
                    <div className="border-t lg:border-t-0 lg:border-l border-border/70 p-6 flex flex-col items-center justify-center gap-4 min-w-[200px] bg-muted/20">
                      {pdfUrl ? (
                        <>
                          <div className="flex flex-col items-center gap-1.5 text-center">
                            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-primary/10 text-primary border shadow-sm">
                              <FileText className="h-6 w-6" />
                            </div>
                            <h4 className="text-xs font-extrabold text-foreground">Syllabus PDF</h4>
                            <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">✓ Live Uploaded</p>
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <Button
                              size="sm"
                              className="w-full rounded-xl font-bold"
                              onClick={() =>
                                setPreview({
                                  url: pdfUrl,
                                  title: `${deptLabel[activeDept]} — ${sem} Semester Syllabus`,
                                })
                              }
                            >
                              <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
                            </Button>
                            <Button asChild size="sm" variant="outline" className="w-full rounded-xl font-bold bg-background">
                              <a href={pdfUrl} download={`syllabus-${activeDept}-${sem}.pdf`}>
                                <Download className="mr-1.5 h-3.5 w-3.5" /> Download
                              </a>
                            </Button>
                            {isAdmin && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-full rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive font-bold text-xs"
                                onClick={() => handleRemovePdf(activeDept, sem)}
                              >
                                <X className="mr-1.5 h-3.5 w-3.5" /> Remove PDF
                              </Button>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col items-center gap-1.5 text-center">
                            <Upload className="h-10 w-10 text-muted-foreground/30" />
                            <h4 className="text-xs font-extrabold text-muted-foreground">Syllabus PDF</h4>
                            <p className="text-[10px] text-muted-foreground/60 font-bold uppercase">No Document</p>
                          </div>
                          {isAdmin ? (
                            <div className="w-full">
                              <input
                                ref={(el) => { fileInputRefs.current[key] = el; }}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(activeDept, sem, file);
                                  e.target.value = "";
                                }}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full rounded-xl font-bold border-dashed border-2 hover:border-solid bg-background"
                                onClick={() => fileInputRefs.current[key]?.click()}
                              >
                                <Upload className="mr-1.5 h-3.5 w-3.5" /> Upload PDF
                              </Button>
                            </div>
                          ) : (
                            <p className="text-[11px] text-center text-muted-foreground italic font-medium px-2">
                              No official document uploaded by admin yet.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
