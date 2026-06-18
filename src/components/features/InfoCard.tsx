import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
}

export function InfoCard({ icon: Icon, title, value, href }: InfoCardProps) {
  const content = (
    <>
      <Icon className="h-5 w-5 text-primary" />
      <span>
        <span className="block text-sm text-muted-foreground">{title}</span>
        <span className="font-semibold">{value}</span>
      </span>
    </>
  );

  if (href) {
    return <a href={href} className="flex items-center gap-3 rounded-sm bg-muted p-4 hover:bg-muted/80">{content}</a>;
  }

  return <div className="flex items-center gap-3 rounded-sm bg-muted p-4">{content}</div>;
}
