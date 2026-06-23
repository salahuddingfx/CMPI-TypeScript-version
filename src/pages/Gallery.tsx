import { useEffect, useState } from "react";
import { X, ChevronLeft, Loader2, Image as ImageIcon } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getGalleryAlbums } from "@/services/api";

interface GalleryAlbum {
  id: number;
  title: string;
  description: string;
  accent: string;
  cover: string | null;
  count: number;
  images: GalleryImage[];
  created_at: string;
}

interface GalleryImage {
  id: number;
  url: string;
  caption: string | null;
}

export function Gallery() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    getGalleryAlbums()
      .then(setAlbums)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function handleBack() {
    setSelectedAlbum(null);
    setLightbox(null);
  }

  if (loading) {
    return (
      <PageTransition>
        <SEO title="Gallery" description="Photo gallery of CMPI campus, labs, and events." />
        <section className="container section-pad">
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </section>
      </PageTransition>
    );
  }

  if (selectedAlbum) {
    return (
      <PageTransition>
        <SEO title={selectedAlbum.title} description={selectedAlbum.description || "Photo album"} />
        <section className="container section-pad">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Albums
          </button>

          <SectionHeader
            eyebrow="Gallery"
            title={selectedAlbum.title}
            description={selectedAlbum.description || undefined}
            align="center"
            className="mb-10"
          />

          {selectedAlbum.images.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-12">No images in this album yet.</p>
          ) : (
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {selectedAlbum.images.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-muted transition hover:shadow-md"
                    onClick={() => setLightbox(img)}
                  >
                    <img
                      src={img.url}
                      alt={img.caption || ""}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
                        <p className="text-xs font-bold text-white">{img.caption}</p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {lightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(null)}>
            <button type="button" className="absolute right-4 top-4 z-10 text-white/80 hover:text-white transition" onClick={() => setLightbox(null)}>
              <X className="h-8 w-8" />
            </button>
            <div className="max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.url} alt={lightbox.caption || ""} className="max-h-[85vh] w-auto rounded-sm object-contain" />
              {lightbox.caption && <p className="mt-3 text-center text-sm font-semibold text-white">{lightbox.caption}</p>}
            </div>
          </div>
        )}
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO title="Gallery" description="Photo gallery of CMPI campus, labs, and events." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Gallery" title="Campus Gallery" description="A glimpse of life at Cox's Bazar Model Polytechnic Institute." align="center" className="mb-10" />

        {albums.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-semibold text-muted-foreground">No albums yet</p>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <button
                  key={album.id}
                  type="button"
                  className="group relative overflow-hidden rounded-sm border border-border bg-card transition hover:shadow-md text-left"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="aspect-video w-full overflow-hidden bg-muted" style={{ backgroundColor: album.accent + "20" }}>
                    {album.cover ? (
                      <img src={album.cover} alt={album.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: album.accent }} />
                      <h3 className="text-sm font-black text-foreground truncate">{album.title}</h3>
                    </div>
                    {album.description && <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{album.description}</p>}
                    <p className="text-[10px] font-semibold text-muted-foreground">{album.count} image{album.count !== 1 ? "s" : ""}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
