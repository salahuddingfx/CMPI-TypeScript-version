import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Department } from "@/services/types";

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Card className="group overflow-hidden border shadow-sm">
      <div className="h-1 bg-secondary" />
      <CardHeader>
        <Badge className="w-fit">{department.shortTitle}</Badge>
        <CardTitle className="mt-3">{department.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="min-h-20 text-sm leading-6 text-muted-foreground">{department.description}</p>
        <Button asChild className="mt-5 w-full">
          <Link to={`/academics/${department.slug}`}>View Department</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
