import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/common/PageTransition";

const tabs = [
  { to: "/dashboard", end: true, icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/courses", icon: null, label: "Enrolled Courses" },
  { to: "/dashboard/results", icon: null, label: "Results" },
  { to: "/dashboard/bills", icon: null, label: "Bills & Payments" },
  { to: "/dashboard/profile", icon: null, label: "Profile & Settings" },
];

export function StudentLayout() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <section className="min-h-[72vh] bg-muted/60">
        <div className="container py-10">
          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="w-full lg:w-64">
              <div className="rounded-sm border bg-card p-5 shadow-sm">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">Student Portal</p>
                  <h2 className="text-xl font-bold">Dashboard</h2>
                </div>
                <nav className="space-y-1">
                  {tabs.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-semibold transition ${
                          isActive ? "bg-primary text-white" : "text-foreground hover:bg-muted hover:text-primary"
                        }`
                      }
                    >
                      {item.icon ? <item.icon className="h-4 w-4" /> : null}
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-6 space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/">Back to website</Link>
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      localStorage.removeItem("cmpi-user");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="rounded-sm border bg-card p-6 shadow-sm">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
