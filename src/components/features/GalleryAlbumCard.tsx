import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GalleryAlbum } from "@/services/types";

interface GalleryAlbumCardProps {
  album: GalleryAlbum;
}

export function GalleryAlbumCard({ album }: GalleryAlbumCardProps) {
  return (
    <Card className={`overflow-hidden border text-white shadow-sm bg-primary`}>
      <div className="flex h-44 items-end p-6">
        <div>
          <p className="text-sm font-semibold opacity-90">{album.count} media items</p>
          <CardTitle className="mt-2 text-2xl text-white">{album.title}</CardTitle>
        </div>
      </div>
      <CardContent>
        <CardDescription className="text-white/90">{album.description}</CardDescription>
        <Button asChild variant="secondary" className="mt-5">
          <Link to="/gallery">Explore Gallery</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
