import {
  Globe,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { institute } from "@/utils/constants";

const quickLinks = [
  { title: "About Us", href: "/about" },
  { title: "Faculty", href: "/faculty" },
  { title: "Events", href: "/events" },
  { title: "Gallery", href: "/gallery" },
  { title: "Blog", href: "/blog" },
  { title: "Student Corner", href: "/student-corner" },
];

const academicLinks = [
  { title: "Computer Science & Technology", href: "/academics/computer-science-technology" },
  { title: "Civil Technology", href: "/academics/civil-technology" },
  { title: "Electrical Technology", href: "/academics/electrical-technology" },
  { title: "Admission", href: "/admission" },
  { title: "Notice Board", href: "/notices" },
];

const policyLinks = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-and-conditions" },
  { title: "Cookie Policy", href: "/cookie-policy" },
  { title: "Refund Policy", href: "/refund-policy" },
  { title: "Disclaimer", href: "/disclaimer" },
  { title: "Accessibility", href: "/accessibility" },
];

const socialLinks = [
  { label: "YouTube", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-cmpe-gray">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,180,27,0.18),transparent_26rem)]" />
      <div className="relative container">
        <div className="grid gap-12 py-14 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-secondary font-black text-primary">
                CMPI
              </span>
              <span>
                <span className="block text-lg font-bold text-white">{institute.shortName}</span>
                <span className="block text-sm text-white/70">{institute.tagline}</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-white/75">
              Cox&apos;s Bazar Model Polytechnic Institute is committed to producing skilled, ethical, and innovative diploma engineers for national development.
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/80">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                {institute.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-secondary" />
                {institute.phone}
              </p>
              <a href={`mailto:${institute.email}`} className="flex items-center gap-3 hover:underline">
                <Mail className="h-5 w-5 shrink-0 text-secondary" />
                {institute.email}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-secondary hover:text-primary"
                  aria-label={link.label}
                >
                  {link.label === "YouTube" && <Youtube className="h-4 w-4" />}
                  {link.label === "Facebook" && <Globe className="h-4 w-4" />}
                  {link.label === "Instagram" && <Globe className="h-4 w-4" />}
                  {link.label === "LinkedIn" && <Globe className="h-4 w-4" />}
                  {link.label === "Twitter" && <Globe className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">Quick Links</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-white/75 transition hover:text-secondary hover:underline" to={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">Academics</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {academicLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-white/75 transition hover:text-secondary hover:underline" to={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">Support & Policies</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-white/75 transition hover:text-secondary hover:underline" to={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-sm border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-bold text-white">Stay updated</p>
              <p className="mt-2 text-xs leading-6 text-white/70">
                Follow official notices, admissions, and events from CMPI.
              </p>
              <Button asChild size="sm" variant="secondary" className="mt-4 w-full">
                <Link to="/notices">View Notices</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm text-white/60 md:text-left">
            © {new Date().getFullYear()} {institute.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-end">
            <Link className="text-white/60 transition hover:text-secondary hover:underline" to="/privacy-policy">
              Privacy
            </Link>
            <Link className="text-white/60 transition hover:text-secondary hover:underline" to="/terms-and-conditions">
              Terms
            </Link>
            <Link className="text-white/60 transition hover:text-secondary hover:underline" to="/cookie-policy">
              Cookies
            </Link>
            <Link className="text-white/60 transition hover:text-secondary hover:underline" to="/sitemap">
              Sitemap
            </Link>
            <Link className="text-white/60 transition hover:text-secondary hover:underline" to="/accessibility">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
