import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const books = [
  { id: 1, title: "Introduction to Computer Science", author: "Peter Norton", category: "CST", dept: "CST", status: "available", copies: 3 },
  { id: 2, title: "Database System Concepts", author: "Silberschatz", category: "CST", dept: "CST", status: "available", copies: 2 },
  { id: 3, title: "Computer Networks", author: "Andrew Tanenbaum", category: "CST", dept: "CST", status: "borrowed", copies: 1 },
  { id: 4, title: "Structural Analysis", author: "R.C. Hibbeler", category: "Civil", dept: "Civil", status: "available", copies: 4 },
  { id: 5, title: "Surveying Vol 1", author: "B.C. Punmia", category: "Civil", dept: "Civil", status: "available", copies: 3 },
  { id: 6, title: "Construction Materials", author: "M.S. Shetty", category: "Civil", dept: "Civil", status: "borrowed", copies: 2 },
  { id: 7, title: "Electrical Machinery", author: "P.S. Bimbhra", category: "EEE", dept: "EEE", status: "available", copies: 3 },
  { id: 8, title: "Power Electronics", author: "M.H. Rashid", category: "EEE", dept: "EEE", status: "available", copies: 2 },
  { id: 9, title: "Control Systems Engineering", author: "Norman Nise", category: "EEE", dept: "EEE", status: "borrowed", copies: 1 },
  { id: 10, title: "Engineering Mathematics", author: "B.S. Grewal", category: "General", dept: "All", status: "available", copies: 5 },
  { id: 11, title: "English for Technical Education", author: "National Board", category: "General", dept: "All", status: "available", copies: 4 },
  { id: 12, title: "Physics for Engineers", author: "S.L. Kakani", category: "General", dept: "All", status: "available", copies: 3 },
];

export function Library() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = books.filter((b) => {
    const matchesQuery = !query.trim() || b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || b.dept === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <PageTransition>
      <SEO title="Library" description="CMPI digital library catalog - browse books, journals, and resources." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Library" title="Digital Library Catalog" description="Browse available books and resources across departments." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or author..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              {["All", "CST", "Civil", "EEE", "General"].map((f) => (
                <button key={f} type="button" className={`rounded-sm px-3 py-2 text-xs font-bold transition ${filter === f ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-sm border bg-card shadow-sm overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_80px] bg-muted/60 px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>Title / Author</span>
              <span className="text-center">Department</span>
              <span className="text-center">Status</span>
            </div>
            {filtered.map((book, i) => (
              <div key={book.id} className={`grid grid-cols-[1fr_120px_80px] px-4 py-3 text-sm ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                <div>
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
                <span className="flex items-center justify-center text-xs text-muted-foreground">{book.dept}</span>
                <span className={`flex items-center justify-center text-xs font-bold ${book.status === "available" ? "text-green-600" : "text-orange-500"}`}>
                  {book.status === "available" ? `${book.copies} avail` : "Borrowed"}
                </span>
              </div>
            ))}
            {filtered.length === 0 && <p className="px-4 py-8 text-center text-sm text-muted-foreground">No books found.</p>}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
