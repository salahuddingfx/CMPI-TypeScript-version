import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Mail, CreditCard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/common/PageTransition";
import { Header } from "@/components/layout/Header";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cmpi-user");
  return raw ? JSON.parse(raw) : null;
}

const tabs = [
  { to: "/dashboard", end: true, icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/courses", icon: null, label: "Enrolled Courses" },
  { to: "/dashboard/results", icon: null, label: "Results" },
  { to: "/dashboard/bills", icon: null, label: "Bills & Payments" },
  { to: "/dashboard/webmail", icon: Mail, label: "Webmail" },
  { to: "/dashboard/profile", icon: null, label: "Profile & Settings" },
  { to: "/dashboard/id-card", icon: CreditCard, label: "Student ID Card" },
];

export function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();
  const isPending = user?.role === "student" && user?.status === "pending";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isPending && location.pathname !== "/dashboard") {
      navigate("/dashboard");
    }
  }, [isPending, location.pathname, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const allowedTabs = isPending
    ? tabs.filter((t) => t.to === "/dashboard")
    : tabs;

  return (
    <PageTransition>
      <Header />
      <section className="min-h-screen bg-muted/60">
        <div className="container py-4 sm:py-10 px-4 sm:px-6">
          {/* Mobile Header */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-sm text-muted-foreground">Student Portal</p>
              <h2 className="text-lg font-bold">Dashboard</h2>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 shrink-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside
              className={`w-full lg:w-64 shrink-0 z-40 ${
                sidebarOpen
                  ? "fixed inset-y-0 left-0 top-0 flex h-full w-72 flex-col"
                  : "hidden lg:block"
              }`}
            >
              <div className="flex h-full flex-col rounded-sm border bg-card p-5 shadow-sm overflow-auto">
                {/* Desktop header */}
                <div className="mb-6 hidden lg:block">
                  <p className="text-sm text-muted-foreground">Student Portal</p>
                  <h2 className="text-xl font-bold">Dashboard</h2>
                  {user?.email && <p className="mt-1 truncate text-xs font-mono text-primary">{user.email}</p>}
                  {user?.status && (
                    <span className={`inline-block mt-2 rounded-full px-2 py-0.5 text-[10px] font-black uppercase border ${
                      user.status === "active"
                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                        : user.status === "suspended"
                        ? "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }`}>
                      {user.status}
                    </span>
                  )}
                </div>

                {/* Mobile close button */}
                <div className="mb-4 flex items-center justify-between lg:hidden">
                  <div>
                    <p className="text-sm text-muted-foreground">Student Portal</p>
                    <h2 className="text-lg font-bold">Dashboard</h2>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSidebarOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <nav className="space-y-1">
                  {allowedTabs.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-semibold transition ${
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
              <div className="rounded-sm border bg-card p-4 sm:p-6 shadow-sm">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
