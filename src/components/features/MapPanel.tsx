import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MapPanel() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Campus Location
        </CardTitle>
        <CardDescription>Cox's Bazar Model Polytechnic Institute, Cox's Bazar, Bangladesh.</CardDescription>
      </CardHeader>
      <CardContent>
        <iframe
          title="Google map showing Cox's Bazar Model Polytechnic Institute"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full rounded-sm border"
          src="https://www.google.com/maps?q=Cox%27s+Bazar+Model+Polytechnic+Institute&output=embed"
        />
        <Button asChild variant="outline" className="mt-4 w-full">
          <a href="https://www.google.com/maps/search/?api=1&query=Cox%27s+Bazar+Model+Polytechnic+Institute" target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
