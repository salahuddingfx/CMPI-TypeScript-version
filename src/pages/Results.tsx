import { useState } from "react";
import { Search, Calculator, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { api } from "@/services/api";
import { mockResults } from "@/components/results/mockResults";
import { BtebResultCard } from "@/components/results/BtebResultCard";
import { TranscriptCard } from "@/components/results/TranscriptCard";
import { CgpaCalculator } from "@/components/results/CgpaCalculator";
import type { StudentResult, BtebResultPayload, SearchMode } from "@/components/results/ResultTypes";
import { SEM_ORDER } from "@/components/results/ResultHelpers";

export function Results() {
  const [searchMode, setSearchMode] = useState<SearchMode>("transcript");
  const [btebSearchType, setBtebSearchType] = useState<"roll" | "center">("roll");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [btebResults, setBtebResults] = useState<BtebResultPayload[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSemesters, setOpenSemesters] = useState<Record<string, boolean>>({});
  const [calculatorGpas, setCalculatorGpas] = useState<string[]>(Array(8).fill(""));
  const [calculatorReg, setCalculatorReg] = useState<"2016" | "2022">("2022");

  const handleSearch = async () => {
    const key = query.trim();
    if (!key) return;
    setError(null);
    setResult(null);
    setBtebResults([]);
    setSearched(true);

    if (searchMode === "transcript") {
      const found = mockResults[key.toUpperCase()] ?? null;
      setResult(found);
      if (found) setOpenSemesters({ [found.semesters[0]?.semester ?? ""]: true });
    } else {
      setLoading(true);
      try {
        const params = btebSearchType === "roll" ? { roll: key } : { center_code: key };
        const response = await api.get("/bteb-results/search", { params });
        const data = Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
        setBtebResults(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to retrieve results from BTEB board database.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAutoPopulateCalculator = (results: BtebResultPayload[], inferredReg: string) => {
    const gpas = Array(8).fill("");
    results.forEach((r) => {
      if (r.status === "Passed" && r.gpa) {
        const idx = SEM_ORDER.indexOf(r.semester);
        if (idx !== -1) gpas[idx] = parseFloat(r.gpa).toFixed(2);
      }
    });
    setCalculatorGpas(gpas);
    setCalculatorReg(inferredReg === "2016" ? "2016" : "2022");
    setSearchMode("cgpa");
  };

  const modes: { id: SearchMode; label: string; shortLabel?: string }[] = [
    { id: "transcript", label: "Student Transcript (ID)" },
    { id: "bteb", label: "BTEB Board Result (Roll / Inst.)", shortLabel: "Board Result" },
    { id: "cgpa", label: "CGPA Calculator" },
  ];

  return (
    <PageTransition>
      <SEO title="Results Portal" description="Check your semester examination BTEB results at CMPI." />

      <section className="container section-pad">
        <SectionHeader
          eyebrow="Results Portal"
          title="Examination Results"
          description="Search your profile transcript or query live BTEB board results by roll number or institute code."
          align="center"
          className="mb-10"
        />

        {/* Mode tabs */}
        <div className="mx-auto max-w-xl flex gap-2 mb-8 border p-1.5 rounded-xl bg-muted/30">
          {modes.map(({ id, label, shortLabel }) => (
            <button
              key={id}
              type="button"
              className={`flex-1 py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                searchMode === id ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => { setSearchMode(id); setSearched(false); setError(null); setQuery(""); }}
            >
              {id === "cgpa" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Calculator className="h-4 w-4" />
                  <span>{shortLabel ?? label}</span>
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">{label}</span>
                  {shortLabel && <span className="sm:hidden">{shortLabel}</span>}
                </>
              )}
            </button>
          ))}
        </div>

        {/* BTEB sub-search-type switcher */}
        {searchMode === "bteb" && (
          <div className="mx-auto max-w-xl flex justify-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm font-bold cursor-pointer text-muted-foreground hover:text-foreground">
              <input
                type="radio"
                name="btebSearchType"
                checked={btebSearchType === "roll"}
                onChange={() => { setBtebSearchType("roll"); setSearched(false); setQuery(""); }}
                className="accent-primary"
              />
              Search by Roll Number
            </label>
            <label className="flex items-center gap-2 text-sm font-bold cursor-pointer text-muted-foreground hover:text-foreground">
              <input
                type="radio"
                name="btebSearchType"
                checked={btebSearchType === "center"}
                onChange={() => { setBtebSearchType("center"); setSearched(false); setQuery(""); }}
                className="accent-primary"
              />
              Search by Institute Code
            </label>
          </div>
        )}

        {/* Search input */}
        {searchMode !== "cgpa" && (
          <div className="mx-auto max-w-xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    searchMode === "transcript"
                      ? "Enter Student ID (e.g. CMPI-2023-0456)"
                      : btebSearchType === "roll"
                      ? "Enter BTEB Roll Number (e.g. 232345)"
                      : "Enter Center/Institute Code (e.g. 64082)"
                  }
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {searchMode === "transcript" ? (
                <>Try: <span className="font-mono">CMPI-2023-0456</span> or <span className="font-mono">CMPI-2023-0312</span></>
              ) : btebSearchType === "roll" ? (
                <>Enter your 6-digit BTEB board roll number (e.g. 232345)</>
              ) : (
                <>Enter BTEB Center/Institute code (e.g. 64082)</>
              )}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-destructive text-sm flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        {/* BTEB board result */}
        {searched && searchMode === "bteb" && !loading && (
          btebResults.length > 0 ? (
            <BtebResultCard
              btebResults={btebResults}
              query={query}
              searchType={btebSearchType}
              onCalculateCgpa={handleAutoPopulateCalculator}
            />
          ) : (
            <div className="mx-auto mt-10 max-w-3xl rounded-sm border bg-card p-10 text-center shadow-sm">
              <Search className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="font-bold text-foreground">No board results found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No BTEB board records match "{query}". Please check and try again.
              </p>
            </div>
          )
        )}

        {/* Student transcript */}
        {searched && searchMode === "transcript" && (
          <div className="mx-auto mt-10 max-w-3xl">
            {result ? (
              <TranscriptCard
                result={result}
                openSemesters={openSemesters}
                onToggleSem={(sem) => setOpenSemesters((prev) => ({ ...prev, [sem]: !prev[sem] }))}
              />
            ) : (
              <div className="rounded-sm border bg-card p-10 text-center shadow-sm">
                <Search className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="font-bold text-foreground">No result found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No records match Student ID "{query}". Please verify and try again.
                </p>
              </div>
            )}
          </div>
        )}

        {/* CGPA calculator */}
        {searchMode === "cgpa" && (
          <CgpaCalculator
            gpas={calculatorGpas}
            regulation={calculatorReg}
            onGpaChange={(idx, val) => {
              const next = [...calculatorGpas];
              next[idx] = val;
              setCalculatorGpas(next);
            }}
            onRegChange={setCalculatorReg}
            onClear={() => setCalculatorGpas(Array(8).fill(""))}
          />
        )}
      </section>
    </PageTransition>
  );
}
