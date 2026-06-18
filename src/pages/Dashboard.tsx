import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cmpi-user");
  return raw ? JSON.parse(raw) : null;
}

export function Dashboard() {
  const [user, setUser] = useState(getStoredUser);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setUser(getStoredUser());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cmpi-user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <PageTransition>
      <SEO title="Dashboard" description="Your CMPI dashboard." />
      <section className="bg-muted/60 py-8">
        <div className="container flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">{user.name || "User"}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/">Visit website</Link>
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader eyebrow="Portal" title="Your CMPI workspace" description="Access your most needed resources from one place." align="left" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Notice Board", href: "/notices", description: "Latest announcements and circulars." },
            { title: "Academic Resources", href: "/student-corner", description: "Class schedules, forms, and downloads." },
            { title: "Events", href: "/events", description: "Upcoming seminars and campus programs." },
            { title: "Gallery", href: "/gallery", description: "Campus memories and activities." },
            { title: "Blog", href: "/blog", description: "Campus stories and academic insights." },
            { title: "Contact", href: "/contact", description: "Reach administration for help." },
          ].map((item) => (
            <Link key={item.href} to={item.href} className="rounded-sm border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
