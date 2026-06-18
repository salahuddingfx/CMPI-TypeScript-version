import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SearchPanel } from "@/components/features/SearchPanel";
import { useInstituteData } from "@/hooks/useInstituteData";
import { institute } from "@/utils/constants";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Academics", href: "/academics", mega: [
    { label: "Civil Technology", href: "/academics/civil-technology" },
    { label: "Computer Science & Technology", href: "/academics/computer-science-technology" },
    { label: "Electrical Technology", href: "/academics/electrical-technology" },
  ]},
  { label: "Notice Board", href: "/notices" },
  { label: "Admission", href: "/admission" },
  { label: "Contact", href: "/contact" },
];

function NavLinkItem({ item }: { item: (typeof navItems)[number] }) {
  return (
    <div className="group relative">
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `inline-flex items-center rounded-sm px-4 py-2 text-sm font-bold transition-colors ${
            isActive ? "bg-primary text-white" : "text-foreground hover:bg-muted hover:text-primary"
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
  const { data } = useInstituteData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label={`${institute.name} home`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary text-lg font-black text-white ring-4 ring-secondary/30">CMPI</span>
          <span className="hidden sm:block">
            <span className="block max-w-56 text-sm font-black leading-5">{institute.shortName}</span>
            <span className="block text-xs text-muted-foreground">{institute.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLinkItem key={item.href} item={item} />
          ))}
          <div className="ml-2 flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="icon" aria-label="Open search" onClick={() => setSearchOpen(true)} className="hidden lg:flex">
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button type="button" variant="outline" size="icon" className="lg:hidden" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="container max-h-[75vh] overflow-auto py-4">
              {navItems.map((item) => (
                <div key={item.href} className="py-2">
                    <NavLink to={item.href} className={({ isActive }) => `block rounded-sm px-3 py-2 font-bold ${isActive ? "bg-primary text-white" : "hover:bg-muted"}`} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </NavLink>
                  {item.mega && (
                    <div className="ml-4 mt-1 space-y-1 border-l pl-3">
                      {item.mega.map((megaItem) => (
                        <Link key={megaItem.href} to={megaItem.href} className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                          {megaItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 p-4 backdrop-blur-sm sm:p-6"
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
    </header>
  );
}
