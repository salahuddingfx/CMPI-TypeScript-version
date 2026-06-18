import { useState } from "react";
import { X } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const photos = [
  { id: 1, caption: "Main Campus Building", category: "campus", color: "bg-blue-100 dark:bg-blue-900/30" },
  { id: 2, caption: "Computer Lab", category: "labs", color: "bg-green-100 dark:bg-green-900/30" },
  { id: 3, caption: "Annual Sports Day", category: "events", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  { id: 4, caption: "Civil Engineering Workshop", category: "labs", color: "bg-orange-100 dark:bg-orange-900/30" },
  { id: 5, caption: "Graduation Ceremony 2025", category: "events", color: "bg-purple-100 dark:bg-purple-900/30" },
  { id: 6, caption: "Electrical Lab", category: "labs", color: "bg-red-100 dark:bg-red-900/30" },
  { id: 7, caption: "Campus Entrance", category: "campus", color: "bg-teal-100 dark:bg-teal-900/30" },
  { id: 8, caption: "Tech Fair 2026", category: "events", color: "bg-indigo-100 dark:bg-indigo-900/30" },
  { id: 9, caption: "Library", category: "campus", color: "bg-pink-100 dark:bg-pink-900/30" },
];

export function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<typeof photos[number] | null>(null);

  const filtered = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <PageTransition>
      <SEO title="Gallery" description="Photo gallery of CMPI campus, labs, and events." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Gallery" title="Campus Gallery" description="A glimpse of life at Cox's Bazar Model Polytechnic Institute." align="center" className="mb-10" />

        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center gap-2">
            {["all", "campus", "labs", "events"].map((f) => (
              <button key={f} type="button" className={`rounded-sm px-4 py-2 text-sm font-bold transition ${filter === f ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filtered.map((photo) => (
              <button key={photo.id} type="button" className={`group relative aspect-[4/3] ${photo.color} rounded-sm overflow-hidden transition hover:shadow-md`} onClick={() => setLightbox(photo)}>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-muted-foreground/30 group-hover:text-muted-foreground/50 transition">
                  {photo.id}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-xs font-bold text-white">{photo.caption}</p>
                  <p className="text-[10px] text-white/70 capitalize">{photo.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setLightbox(null)}>
          <button type="button" className="absolute right-4 top-4 text-white" onClick={() => setLightbox(null)}>
            <X className="h-8 w-8" />
          </button>
          <div className={`${lightbox.color} flex aspect-video max-h-[80vh] w-full max-w-2xl items-center justify-center rounded-sm`} onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <p className="text-6xl font-bold text-muted-foreground/20">{lightbox.id}</p>
              <p className="mt-4 font-bold">{lightbox.caption}</p>
              <p className="text-sm text-muted-foreground capitalize">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
