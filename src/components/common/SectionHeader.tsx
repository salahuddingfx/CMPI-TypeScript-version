import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  descriptionClassName?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  eyebrowClassName,
  descriptionClassName,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-sm font-bold uppercase tracking-[0.18em]", eyebrowClassName || "text-primary")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-3xl font-bold sm:text-4xl", titleClassName)}>{title}</h2>
      {description && (
        <p className={cn("mt-4 text-base leading-7 sm:text-lg", descriptionClassName || "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}
