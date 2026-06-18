import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

type Category = "general" | "academic" | "facility" | "hostel" | "other";

const complaints: { id: number; category: Category; title: string; status: "pending" | "in-progress" | "resolved"; upvotes: number; date: string }[] = [
  { id: 1, category: "facility", title: "Projector not working in Lab 302", status: "in-progress", upvotes: 12, date: "2026-06-10" },
  { id: 2, category: "academic", title: "Request for extra class on Database", status: "pending", upvotes: 8, date: "2026-06-09" },
  { id: 3, category: "hostel", title: "Water supply issue in hostel block C", status: "resolved", upvotes: 15, date: "2026-06-01" },
  { id: 4, category: "facility", title: "Wi-Fi connectivity problems in campus", status: "in-progress", upvotes: 22, date: "2026-06-05" },
  { id: 5, category: "general", title: "Request for extended library hours during exam", status: "resolved", upvotes: 30, date: "2026-05-28" },
];

export function Feedback() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [submitted, setSubmitted] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<Category>("general");
  const [formDesc, setFormDesc] = useState("");

  const filtered = category === "all" ? complaints : complaints.filter((c) => c.category === category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormTitle(""); setFormDesc(""); }, 3000);
  };

  return (
    <PageTransition>
      <SEO title="Feedback & Complaints" description="Submit feedback, complaints, and suggestions to CMPI administration." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Student Voice" title="Feedback & Complaints" description="Submit your feedback, complaints, or suggestions. Your voice matters." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl">
          {submitted ? (
            <div className="mb-8 rounded-sm border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950/30">
              <ThumbsUp className="mx-auto h-8 w-8 text-green-600" />
              <p className="mt-2 font-bold text-green-700 dark:text-green-400">Thank you! Your feedback has been submitted.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-8 rounded-sm border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Submit Feedback</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Title</label>
                  <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Brief title of your feedback" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Category</label>
                  <select value={formCategory} onChange={(e) => setFormCategory(e.target.value as Category)} className="flex h-11 w-full rounded-sm border border-input bg-background px-4 py-2 text-sm">
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="facility">Facility</option>
                    <option value="hostel">Hostel</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} rows={4} className="flex w-full rounded-sm border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Describe your feedback in detail..." required />
                </div>
                <Button type="submit" className="w-full">Submit Feedback</Button>
              </div>
            </form>
          )}

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Submissions</h3>
            <div className="flex gap-1">
              {(["all", "general", "academic", "facility", "hostel", "other"] as const).map((f) => (
                <button key={f} type="button" className={`rounded-sm px-2 py-1 text-xs font-bold transition ${category === f ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} onClick={() => setCategory(f)}>
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((c) => (
              <div key={c.id} className="flex items-start gap-4 rounded-sm border bg-card p-4 shadow-sm">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-xs font-bold">{c.upvotes}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-5 items-center rounded-sm px-1.5 text-xs font-bold ${c.status === "resolved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500" : c.status === "in-progress" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {c.status}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">{c.category}</span>
                  </div>
                  <p className="mt-1 font-semibold">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(c.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
