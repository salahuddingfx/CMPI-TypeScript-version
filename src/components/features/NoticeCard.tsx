import { Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Notice } from "@/services/types";

interface NoticeCardProps {
  notice: Notice;
  compact?: boolean;
}

export function NoticeCard({ notice, compact = false }: NoticeCardProps) {
  return (
    <Card className="h-full border-l-4 border-l-primary shadow-sm">
      <CardHeader>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{notice.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(notice.date).toLocaleDateString("en-GB")}
          </span>
        </div>
        <CardTitle>
          <Link to={`/notices/${notice.id}`} className="hover:text-primary">
            {notice.title}
          </Link>
        </CardTitle>
        <CardDescription>{notice.summary}</CardDescription>
      </CardHeader>
      {!compact && (
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link to={`/notices/${notice.id}`}>
              <FileText className="h-4 w-4" />
              Read Details
            </Link>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
