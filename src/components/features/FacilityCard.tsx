import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FacilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FacilityCard({ icon: Icon, title, description }: FacilityCardProps) {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-primary text-white">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-6">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
