import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Department, Notice, InstituteEvent, BlogPost, FacultyMember } from "@/services/types";

interface SearchPanelProps {
  departments: Department[];
  faculty: FacultyMember[];
  notices: Notice[];
  events: InstituteEvent[];
  blogs: BlogPost[];
  onOpenChange: (open: boolean) => void;
}

type SearchItem = {
  label: string;
  type: string;
  href: string;
};

export function SearchPanel({ departments, faculty, notices, events, blogs, onOpenChange }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const allItems = useMemo<SearchItem[]>(
    () => [
      ...departments.map((item) => ({ label: item.title, type: "Department", href: `/academics/${item.slug}` })),
      ...faculty.map((item) => ({ label: item.name, type: "Faculty", href: "/faculty" })),
      ...notices.map((item) => ({ label: item.title, type: "Notice", href: `/notices/${item.id}` })),
      ...events.map((item) => ({ label: item.title, type: "Event", href: `/events/${item.id}` })),
      ...blogs.map((item) => ({ label: item.title, type: "Blog", href: `/blog/${item.slug}` })),
    ],
    [departments, faculty, notices, events, blogs],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return allItems;
    return allItems.filter((item) => item.label.toLowerCase().includes(normalizedQuery) || item.type.toLowerCase().includes(normalizedQuery));
  }, [allItems, query]);

  return (
    <div className="rounded-sm border bg-background p-4 shadow-2xl">
      <div className="mb-4 flex items-center gap-2">
        <Search className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">Search CMPI</h2>
      </div>
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notices, events, departments..." aria-label="Search CMPI" />
      <div className="mt-4 max-h-72 overflow-auto divide-y">
        {filteredItems.length > 0 ? (
          filteredItems.slice(0, 10).map((item) => (
            <a
              key={`${item.type}-${item.label}`}
              href={item.href}
              className="flex items-center justify-between gap-4 rounded-sm px-3 py-3 text-sm hover:bg-muted"
              onClick={() => onOpenChange(false)}
            >
              <span>
                <span className="font-semibold">{item.label}</span>
                <span className="ml-2 text-xs text-muted-foreground">{item.type}</span>
              </span>
              <span className="text-primary">Open</span>
            </a>
          ))
        ) : (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">No search results found.</p>
        )}
      </div>
      <Button variant="outline" className="mt-4 w-full" onClick={() => onOpenChange(false)}>
        Close Search
      </Button>
    </div>
  );
}
