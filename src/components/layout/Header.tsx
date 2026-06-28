import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X, User, LogOut, ChevronDown } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SearchPanel } from "@/components/features/SearchPanel";
import { useInstituteContext } from "@/contexts/InstituteDataContext";
import { institute } from "@/utils/constants";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About", href: "/about", mega: [
      { label: "About Us", href: "/about" },
      { label: "Administration Messages", href: "/principal" },
      { label: "Faculty", href: "/faculty" },
    ]
  },
  {
    label: "Academics", href: "/academics", mega: [
      { label: "Civil Technology", href: "/academics/civil-technology" },
      { label: "Computer Science & Technology", href: "/academics/computer-science-technology" },
      { label: "Electrical Technology", href: "/academics/electrical-technology" },
      { label: "Results", href: "/results" },
      { label: "Syllabus & Curriculum", href: "/syllabus" },
      { label: "Class Routine", href: "/class-routine" },
      { label: "Exam Routine", href: "/exam-routine" },
    ]
  },
  { label: "Notice Board", href: "/notices" },
  {
    label: "Student Life", href: "/clubs", mega: [
      { label: "Student Clubs", href: "/clubs" },
      { label: "Library", href: "/library" },
      { label: "Gallery", href: "/gallery" },
      { label: "Alumni", href: "/alumni" },
    ]
  },
  { label: "Admission", href: "/admission" },
  { label: "Contact", href: "/contact" },
];

function NavLinkItem({ item }: { item: (typeof navItems)[number] }) {
  return (
    <div className="group relative">
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `inline-flex items-center rounded-sm px-4 py-2 text-sm font-bold transition-colors ${isActive ? "bg-primary text-white" : "text-foreground hover:bg-muted hover:text-primary"
          }`
        }
      >
        {item.label}
      </NavLink>
      {item.mega && (
        <div className="absolute left-0 top-full z-40 hidden w-72 rounded-sm border bg-background p-3 shadow-xl group-hover:block">
          {item.mega.map((megaItem) => (
            <Link key={megaItem.href} to={megaItem.href} className="block rounded-sm px-3 py-2 text-sm font-medium hover:bg-muted">
              {megaItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { data } = useInstituteContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  const userStr = typeof window !== "undefined" ? localStorage.getItem("cmpi-user") : null;
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("cmpi-token");
    localStorage.removeItem("cmpi-user");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <div className="container flex min-h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label={`${institute.name} home`}>
            <img src="/CMPI.png" alt="CMPI Logo" className="h-11 w-11 object-contain" />
            <span className="hidden sm:block">
              <span className="block max-w-56 text-sm font-black leading-5">{institute.shortName}</span>
              <span className="block text-xs text-muted-foreground">{institute.tagline}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLinkItem key={item.href} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <Button type="button" variant="outline" size="icon" aria-label="Open search" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center rounded-full border border-border p-0.5 hover:ring-2 hover:ring-primary/20 transition-all"
                    title="Go to Dashboard"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </div>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-1.5 border-destructive/20 text-destructive hover:bg-destructive hover:text-white dark:border-red-800/40 dark:text-red-400 dark:hover:bg-red-800 dark:hover:text-red-200"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            <Button type="button" variant="outline" size="icon" className="lg:hidden" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[100] w-full max-w-[320px] bg-background border-l shadow-2xl p-6 flex flex-col justify-between overflow-y-auto lg:hidden text-left"
            >
              <div>
                {/* Top Row with Logo & Close Button */}
                <div className="flex items-center justify-between mb-8 border-b pb-4">
                  <div className="flex items-center gap-2.5">
                    <img src="/CMPI.png" alt="CMPI Logo" className="h-8 w-8 object-contain" />
                    <span className="text-sm font-black tracking-tight">{institute.shortName}</span>
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setMobileOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Quick actions for Mobile: Theme switch + Search */}
                <div className="flex items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-muted/40 border border-border/50">
                  <span className="text-xs font-bold text-muted-foreground pl-2">Quick Settings</span>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon" className="rounded-xl h-8 w-8 text-foreground" onClick={() => { setMobileOpen(false); setSearchOpen(true); }}>
                      <Search className="h-4 w-4" />
                    </Button>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Nav items list */}
                <nav className="space-y-2" aria-label="Mobile navigation list">
                  {navItems.map((item) => {
                    const isExpanded = expandedItem === item.label;
                    return (
                      <div key={item.href} className="space-y-1">
                        {item.mega ? (
                          <div>
                            <button
                              onClick={() => toggleExpand(item.label)}
                              className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all text-left ${
                                isExpanded ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                              }`}
                            >
                              <span>{item.label}</span>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden ml-4 border-l pl-3 space-y-1 mt-1"
                                >
                                  {item.mega.map((megaItem) => (
                                    <Link
                                      key={megaItem.href}
                                      to={megaItem.href}
                                      className="block rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {megaItem.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                              `block rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                                isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "text-foreground hover:bg-muted"
                              }`
                            }
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </NavLink>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Account Card */}
              <div className="mt-8 border-t pt-4">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-2xl border border-border/65 p-3 bg-muted/20 hover:bg-muted transition-all"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-base border">
                        {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white dark:border-red-800/40 dark:text-red-400 dark:hover:bg-red-800 dark:hover:text-red-200 font-bold"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full rounded-xl font-bold">
                      <Link to="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                    </Button>
                    <Button asChild className="w-full rounded-xl font-black shadow-md shadow-primary/20">
                      <Link to="/register" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/50 p-4 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Search CMPI"
          >
            <motion.div initial={{ y: 24, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.98 }} className="mx-auto max-w-2xl pt-10">
              <div className="mb-3 flex justify-end">
                <Button type="button" variant="secondary" size="icon" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <SearchPanel departments={data.departments} faculty={data.faculty} notices={data.notices} events={data.events} blogs={data.blogs} onOpenChange={setSearchOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
