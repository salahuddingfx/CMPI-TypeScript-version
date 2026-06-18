import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const syllabuses = {
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
  const depts = Object.keys(syllabuses) as (keyof typeof syllabuses)[];

  return (
    <PageTransition>
      <SEO title="Syllabus & Curriculum" description="Curriculum and syllabus for all diploma programs at CMPI." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Curriculum" title="Syllabus & Curriculum" description="Complete course structure and syllabus for each department." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl space-y-8">
          {depts.map((dept) => (
            <div key={dept} className="rounded-sm border bg-card shadow-sm overflow-hidden">
              <div className="bg-primary px-4 py-3">
                <h3 className="font-bold text-white">
                  {dept === "CST" ? "Computer Science & Technology" : dept === "Civil" ? "Civil Technology" : "Electrical Technology"} — 4 Semester Diploma
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
                {syllabuses[dept].map((sem) => (
                  <div key={sem.sem} className="p-4">
                    <h4 className="mb-3 text-sm font-bold text-primary">{sem.sem} Semester</h4>
                    <ul className="space-y-2">
                      {sem.courses.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
