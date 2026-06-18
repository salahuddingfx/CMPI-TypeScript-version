import { Link, useLocation } from "react-router-dom";
import { routeLabels } from "@/utils/constants";

export function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (pathname === "/") return null;

  return (
    <nav className="border-b bg-background/80 backdrop-blur" aria-label="Breadcrumb">
      <div className="container flex min-h-12 items-center gap-2 overflow-x-auto py-3 text-sm">
        <Link to="/" className="whitespace-nowrap font-semibold text-primary hover:underline">
          Home
        </Link>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = routeLabels[segment] || segment.replaceAll("-", " ");

          return (
            <span key={href} className="flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              {isLast ? (
                <span className="whitespace-nowrap font-semibold text-foreground" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link to={href} className="whitespace-nowrap text-muted-foreground hover:text-primary hover:underline">
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
