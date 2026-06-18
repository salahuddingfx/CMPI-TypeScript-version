import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Civil Technology", href: "/academics/civil-technology" },
  { label: "Computer Science & Technology", href: "/academics/computer-science-technology" },
  { label: "Electrical Technology", href: "/academics/electrical-technology" },
  { label: "Faculty", href: "/faculty" },
  { label: "Notice Board", href: "/notices" },
  { label: "Admission", href: "/admission" },
  { label: "Contact", href: "/contact" },
  { label: "Student Corner", href: "/student-corner" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Sitemap() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Sitemap" description="Full page list for Cox's Bazar Model Polytechnic Institute." />
      <article className="mx-auto max-w-5xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Sitemap" description="All accessible pages on the CMPI website." align="left" className="mb-8" />
        <div className="grid gap-3 md:grid-cols-2">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="flex items-center justify-between rounded-sm border border-border/60 bg-muted/60 px-4 py-3 font-semibold transition hover:border-primary hover:text-primary">
              {link.label}
              <span className="text-xs text-muted-foreground">{link.href}</span>
            </Link>
          ))}
        </div>
      </article>
    </PageTransition>
  );
}
