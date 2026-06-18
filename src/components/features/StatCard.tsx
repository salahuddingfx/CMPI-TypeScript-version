import { CheckCircle2 } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-sm bg-white p-6 text-center shadow-sm dark:bg-card">
      <p className="text-4xl font-black text-primary sm:text-5xl">{value}</p>
      <p className="mt-2 font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
