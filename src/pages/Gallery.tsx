import { PlayCircle } from "lucide-react";
import { GalleryAlbumCard } from "@/components/features/GalleryAlbumCard";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteData } from "@/hooks/useInstituteData";

const mediaItems = [
  { title: "Annual Technical Exhibition", type: "Photo", description: "Student projects from Civil, CST, and Electrical departments." },
  { title: "Campus Cultural Program", type: "Photo", description: "Cultural performances during National Technology Day." },
  { title: "Web Development Workshop", type: "Video", description: "Hands-on session on responsive web development." },
  { title: "Sports Meet Highlights", type: "Video", description: "Inter-department sports competition moments." },
  { title: "Laboratory Practice", type: "Photo", description: "Practical sessions in department laboratories." },
  { title: "Community Service", type: "Photo", description: "Student-led community initiatives around Cox's Bazar." },
];

export function Gallery() {
  const { data, loading, error } = useInstituteData();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load gallery data.</div></PageTransition>;

  return (
    <PageTransition>
      <SEO title="Gallery" description="CMPI gallery albums, photos, and videos featuring campus facilities, student activities, and technical events." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Albums"
          title="Campus memories in photos and videos"
          description="Browse curated albums covering campus facilities, laboratories, student activities, and institutional events."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {data.albums.map((album) => (
            <GalleryAlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Photos & Videos" title="Featured media" align="left" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mediaItems.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-sm border bg-card shadow-sm">
                <div className={`flex h-52 items-center justify-center bg-primary`}>
                  {item.type === "Video" && <PlayCircle className="h-16 w-16 text-white" />}
                  {item.type === "Photo" && <span className="text-5xl font-black text-white/90">CMPI</span>}
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold">{item.title}</h3>
                    <span className="rounded-sm bg-muted px-3 py-1 text-xs font-semibold">{item.type}</span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
