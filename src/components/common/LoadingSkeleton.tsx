import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="container section-pad" aria-label="Loading content">
      <div className="mx-auto max-w-5xl space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}

export function NoticeBoardSkeleton() {
  return (
    <div className="container section-pad" aria-label="Loading notices">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-sm border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="rounded-sm border bg-card p-5 space-y-3">
      <Skeleton className="h-40 w-full rounded-sm" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function EventsSkeleton() {
  return (
    <div className="container section-pad" aria-label="Loading events">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-sm border bg-card overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="container section-pad" aria-label="Loading blogs">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FacultySkeleton() {
  return (
    <div className="container section-pad" aria-label="Loading faculty">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-sm border bg-card p-6 text-center space-y-4">
              <Skeleton className="mx-auto h-24 w-24 rounded-full" />
              <Skeleton className="h-5 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6" aria-label="Loading dashboard">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-sm border bg-card p-5 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border bg-card p-5 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="rounded-sm border bg-card p-5 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6 p-6" aria-label="Loading profile">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-sm border bg-card p-4 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-label="Loading table">
      <div className="grid grid-cols-4 gap-4 rounded-sm border bg-muted/50 p-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 border-b p-3">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
