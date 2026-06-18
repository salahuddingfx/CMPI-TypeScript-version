import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const mockResults: Record<string, { name: string; dept: string; semester: string; sgpa: number; courses: { name: string; grade: string; gp: number }[] }[]> = {
  "CMPI-2023-0456": [
    { name: "Rahim Miah", dept: "CST", semester: "3rd", sgpa: 3.75, courses: [{ name: "Web Development", grade: "A+", gp: 4.0 }, { name: "Database Management", grade: "A", gp: 3.75 }, { name: "Computer Networks", grade: "A", gp: 3.75 }] },
    { name: "Rahim Miah", dept: "CST", semester: "2nd", sgpa: 3.60, courses: [{ name: "Programming II", grade: "A", gp: 3.75 }, { name: "Mathematics II", grade: "A-", gp: 3.50 }] },
  ],
  "CMPI-2023-0312": [
    { name: "Fatima Khatun", dept: "Civil", semester: "3rd", sgpa: 3.85, courses: [{ name: "Structural Analysis", grade: "A+", gp: 4.0 }, { name: "Surveying", grade: "A", gp: 3.75 }] },
  ],
  "CMPI-2024-0108": [
    { name: "Arif Rahman", dept: "EEE", semester: "1st", sgpa: 3.50, courses: [{ name: "Basic Electronics", grade: "A", gp: 3.75 }, { name: "Electrical Circuits", grade: "B+", gp: 3.25 }] },
  ],
};

export function Results() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof mockResults[string] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const trimmed = query.trim().toUpperCase();
    setResults(mockResults[trimmed] ?? null);
    setSearched(true);
  };

  return (
    <PageTransition>
      <SEO title="Results" description="Check your semester examination results at CMPI." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Results Portal" title="Check your examination results" description="Enter your Student ID to view semester results and grade points." align="center" className="mb-10" />

        <div className="mx-auto max-w-xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter Student ID (e.g. CMPI-2023-0456)" className="pl-10" onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <div className="mt-2 text-xs text-muted-foreground">Try: CMPI-2023-0456, CMPI-2023-0312, CMPI-2024-0108</div>
        </div>

        {searched && (
          <div className="mx-auto mt-8 max-w-2xl">
            {results ? (
              <div className="space-y-6">
                <div className="rounded-sm border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Student</p>
                  <p className="text-lg font-bold">{results[0]?.name}</p>
                  <p className="text-sm text-muted-foreground">{results[0]?.dept} Department</p>
                </div>
                {results.map((sem) => (
                  <div key={sem.semester} className="rounded-sm border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{sem.semester} Semester</h3>
                      <span className="rounded-sm bg-primary/10 px-3 py-1 text-sm font-bold text-primary">SGPA: {sem.sgpa}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {sem.courses.map((c) => (
                        <div key={c.name} className="flex items-center justify-between rounded-sm bg-muted/60 px-4 py-2 text-sm">
                          <span className="font-medium">{c.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold">Grade: {c.grade}</span>
                            <span className="text-muted-foreground">GP: {c.gp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-sm border bg-card p-8 text-center shadow-sm">
                <p className="text-muted-foreground">No results found for this Student ID.</p>
                <p className="mt-2 text-sm text-muted-foreground/60">Please check your ID and try again.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
