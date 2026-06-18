import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const sections = [
  { title: "Academics", href: "/academics" },
  { title: "Notice Board", href: "/notices" },
  { title: "Admission", href: "/admission" },
  { title: "Contact", href: "/contact" },
];

const helpLinks = [
  { label: "Home", href: "/" },
  { label: "Site map", href: "/sitemap" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export function NotFound() {
  return (
    <PageTransition>
      <SEO title="404 - Page not found" description="The requested page does not exist or has been moved on the CMPI website." />
      <section className="min-h-[72vh] border-y bg-white">
        <div className="container grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <SectionHeader
              eyebrow="Page not found"
              title="404"
              description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
              align="left"
              className="mb-6"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {sections.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center justify-between rounded-sm border border-border bg-muted/60 px-4 py-3 font-semibold transition hover:border-primary hover:text-primary"
                >
                  {link.title}
                  <ChevronRight className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <Button asChild className="mt-8 rounded-sm px-8">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Helpful links</h2>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-foreground/75 transition hover:text-primary hover:underline" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              If you think this page should be here, contact the CMPI administration team through the Contact page.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
