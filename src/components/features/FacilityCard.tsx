import type { LucideIcon } from "lucide-react";

interface FacilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FacilityCard({ icon: Icon, title, description }: FacilityCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 backdrop-blur-md flex flex-col justify-between h-full">
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
