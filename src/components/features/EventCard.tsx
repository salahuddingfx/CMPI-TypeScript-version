import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { InstituteEvent } from "@/services/types";

interface EventCardProps {
  event: InstituteEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant={event.status === "Upcoming" ? "default" : "outline"}>{event.status}</Badge>
          <Badge variant="secondary">{event.category}</Badge>
        </div>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.summary}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} · {event.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.venue}
        </div>
        <Button asChild className="w-full">
          <Link to={`/events/${event.id}`}>View Event</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
