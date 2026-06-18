import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudentResource } from "@/services/types";

interface ResourceListProps {
  resources: StudentResource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="grid gap-4">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Badge variant="secondary">{resource.type}</Badge>
              <span className="text-xs text-muted-foreground">Updated {new Date(resource.updatedAt).toLocaleDateString("en-GB")}</span>
            </div>
            <CardTitle>{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4" />
              {resource.type === "Link" ? (
                <>
                  <FileText className="h-4 w-4" />
                  Open
                </>
              ) : (
                "Download"
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
