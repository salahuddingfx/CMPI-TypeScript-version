import { Calculator, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEM_ORDER, REGULATION_WEIGHTS } from "./ResultHelpers";

interface CgpaCalculatorProps {
  gpas: string[];
  regulation: "2016" | "2022";
  onGpaChange: (idx: number, value: string) => void;
  onRegChange: (reg: "2016" | "2022") => void;
  onClear: () => void;
}

function getCalculatedCgpa(gpas: string[], regulation: "2016" | "2022"): number {
  const weights = REGULATION_WEIGHTS[regulation];
  let weightedSum = 0;
  let weightSum = 0;
  for (let i = 0; i < 8; i++) {
    const val = parseFloat(gpas[i] ?? "");
    if (!isNaN(val) && val > 0 && val <= 4) {
    const w = weights?.[i] ?? 0;
      weightedSum += val * w;
      weightSum += w;
    }
  }
  return weightSum > 0 ? weightedSum / weightSum : 0;
}

export function CgpaCalculator({ gpas, regulation, onGpaChange, onRegChange, onClear }: CgpaCalculatorProps) {
  const cgpa = getCalculatedCgpa(gpas, regulation);
  const enteredCount = gpas.filter((g) => parseFloat(g) > 0).length;

  return (
    <div className="mx-auto mt-6 max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card shadow-md p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black">BTEB CGPA Calculator</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Official weighted calculation for BTEB Diploma-in-Engineering (Probidhan 2022 &amp; 2016).
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        {/* Input Form */}
        <div className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <p className="text-sm font-black uppercase tracking-wider text-muted-foreground">
              Enter Semester GPAs
            </p>
            <div className="flex items-center gap-2">
              {(["2022", "2016"] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => onRegChange(reg)}
                  className={`text-xs font-black px-3 py-1.5 rounded-full transition-all border ${
                    regulation === reg
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Probidhan {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {SEM_ORDER.map((sem, idx) => (
              <div key={sem} className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground flex justify-between">
                  <span>{sem} Semester</span>
                  <span className="font-mono opacity-60">
                    (Wt: {((REGULATION_WEIGHTS[regulation]?.[idx] ?? 0) * 100)}%)
                  </span>
                </label>
                <Input
                  type="number"
                  min="2.00"
                  max="4.00"
                  step="0.01"
                  placeholder="0.00"
                  value={gpas[idx] ?? ""}
                  onChange={(e) => onGpaChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t flex justify-end">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs" onClick={onClear}>
              <RefreshCw className="h-3.5 w-3.5" /> Clear All
            </Button>
          </div>
        </div>

        {/* Result Summary */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card shadow-sm p-6 text-center space-y-4">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Calculated CGPA
            </p>
            <div className="inline-flex items-center justify-center h-32 w-32 rounded-full border-4 border-primary/20 bg-primary/5 text-primary">
              <span className="text-4xl font-black">
                {cgpa > 0 ? cgpa.toFixed(2) : "0.00"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {enteredCount > 0
                ? `Based on ${enteredCount} entered semesters under BTEB Probidhan-${regulation}.`
                : "Enter one or more semester GPAs to compute."}
            </p>
          </div>

          <div className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
              Weightage Breakdown
            </h3>
            <div className="space-y-2 text-xs">
              {SEM_ORDER.map((sem, idx) => {
                const isEntered = parseFloat(gpas[idx] ?? "") > 0;
                return (
                  <div
                    key={sem}
                    className={`flex justify-between items-center py-1 border-b last:border-0 ${
                      isEntered ? "font-semibold text-foreground" : "text-muted-foreground opacity-60"
                    }`}
                  >
                    <span>{sem} Semester</span>
                    <span>{((REGULATION_WEIGHTS[regulation]?.[idx] ?? 0) * 100)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
