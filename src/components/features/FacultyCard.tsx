import type { FacultyMember } from "@/services/types";

interface FacultyCardProps {
  faculty: FacultyMember;
}

export function FacultyCard({ faculty }: FacultyCardProps) {
  const initials = faculty.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <article className="rounded-sm border bg-card p-6 shadow-sm transition hover:shadow-lg">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-sm bg-primary/10 text-2xl font-bold text-primary">
        {initials}
      </div>
      <h3 className="text-xl font-bold">{faculty.name}</h3>
      <p className="mt-1 font-medium text-primary">{faculty.designation}</p>
      <p className="mt-3 text-sm text-muted-foreground">{faculty.qualification}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {faculty.specialization.slice(0, 3).map((item) => (
          <span key={item} className="rounded-sm bg-muted px-3 py-1 text-xs font-medium">
            {item}
          </span>
        ))}
      </div>
      <dl className="mt-5 space-y-2 text-sm">
        <div>
          <dt className="font-semibold">Email</dt>
          <dd className="text-muted-foreground">{faculty.email}</dd>
        </div>
        <div>
          <dt className="font-semibold">Phone</dt>
          <dd className="text-muted-foreground">{faculty.phone}</dd>
        </div>
      </dl>
    </article>
  );
}
