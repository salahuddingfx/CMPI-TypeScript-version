import { useCountUp } from "@/hooks/useCountUp";
import { CheckCircle, GraduationCap, Users, Cpu, Flame, BookOpen } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const hasNumber = !isNaN(numericValue);

  const { count, ref } = useCountUp(hasNumber ? numericValue : 0, 2000);

  const getIcon = () => {
    const l = label.toLowerCase();
    if (l.includes("department") || l.includes("academic")) return GraduationCap;
    if (l.includes("faculty") || l.includes("teacher")) return Users;
    if (l.includes("laborator") || l.includes("lab") || l.includes("computer")) return Cpu;
    if (l.includes("club") || l.includes("student")) return Flame;
    return BookOpen;
  };

  const IconComponent = getIcon();

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 backdrop-blur-md flex items-center gap-5"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
        <IconComponent className="h-7 w-7" />
      </div>
      <div>
        <p className="text-3xl font-black text-primary group-hover:text-primary-dark transition-all duration-300">
          {hasNumber ? count : value}
          {hasNumber ? suffix : ""}
        </p>
        <p className="mt-1 text-sm font-semibold text-muted-foreground tracking-tight">{label}</p>
      </div>
    </div>
  );
}

interface CheckListProps {
  items: string[];
}

export function CheckList({ items }: CheckListProps) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
