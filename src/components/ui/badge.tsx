import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva("inline-flex items-center rounded-sm border px-3 py-1 text-xs font-bold transition-colors", {
  variants: {
    variant: {
      default: "border-primary bg-primary/10 text-primary",
      secondary: "border-secondary bg-secondary/20 text-secondary-foreground",
      outline: "border-border text-foreground",
      destructive: "border-destructive bg-destructive/10 text-destructive dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />;
}
