import { useCountUp } from "@/hooks/useCountUp";
import { CheckCircle } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const hasNumber = !isNaN(numericValue);

  const { count, ref } = useCountUp(hasNumber ? numericValue : 0, 2000);

  return (
    <div ref={ref} className="rounded-sm bg-white p-6 text-center shadow-sm dark:bg-card">
      <p className="text-4xl font-black text-primary sm:text-5xl">
        {hasNumber ? count : value}{hasNumber ? suffix : ""}
      </p>
      <p className="mt-2 font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

interface CheckListProps {
  items: string[];
}

export function CheckList({ items }: CheckListProps) {
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
