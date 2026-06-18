import { Link } from "react-router-dom";
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

const icons = {
  map: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-secondary">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-secondary">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  mail: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-secondary">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.7 4.6 4.5 5.6 16 5.3 22 4z" />
      <path d="M16 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.7 4.6 4.5 5.6 16 5.3 16 4z" />
      <path d="M8.8 11.5a5 5 0 0 1 7.8-2.2" />
    </svg>
  ),
};

const socialIconMap = {
  YouTube: icons.youtube,
  Facebook: icons.facebook,
  Instagram: icons.instagram,
  LinkedIn: icons.linkedin,
  Twitter: icons.twitter,
} as const;

const socialIconMapAll: Record<string, React.ReactNode> = {
  ...socialIconMap,
};

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
                {icons.map}
                {institute.address}
              </p>
              <p className="flex items-center gap-3">
                {icons.phone}
                {institute.phone}
              </p>
              <a href={`mailto:${institute.email}`} className="flex items-center gap-3">
                {icons.mail}
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
                  {socialIconMapAll[link.label]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">Quick Links</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-white/75 transition hover:text-secondary" to={link.href}>
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
                  <Link className="text-white/75 transition hover:text-secondary" to={link.href}>
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
                  <Link className="text-white/75 transition hover:text-secondary" to={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm text-white/60 md:text-left">
            © {new Date().getFullYear()} {institute.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-end">
            <Link className="text-white/60 transition hover:text-secondary" to="/privacy-policy">
              Privacy
            </Link>
            <Link className="text-white/60 transition hover:text-secondary" to="/terms-and-conditions">
              Terms
            </Link>
            <Link className="text-white/60 transition hover:text-secondary" to="/cookie-policy">
              Cookies
            </Link>
            <Link className="text-white/60 transition hover:text-secondary" to="/sitemap">
              Sitemap
            </Link>
            <Link className="text-white/60 transition hover:text-secondary" to="/accessibility">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
