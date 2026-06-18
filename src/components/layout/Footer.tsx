import { Mail, MapPin, Phone } from "lucide-react";
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
  { title: "Academic Programs", href: "/academics" },
  { title: "Civil Technology", href: "/academics/civil-technology" },
  { title: "Computer Science & Technology", href: "/academics/computer-science-technology" },
  { title: "Electrical Technology", href: "/academics/electrical-technology" },
  { title: "Admission", href: "/admission" },
  { title: "Notice Board", href: "/notices" },
];

const resourceLinks = [
  { title: "Contact Us", href: "/contact" },
  { title: "Student Resources", href: "/student-corner" },
  { title: "Campus Events", href: "/events" },
  { title: "Institute Blog", href: "/blog" },
  { title: "Photo Gallery", href: "/gallery" },
];

const policyLinks = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-and-conditions" },
  { title: "Cookie Policy", href: "/cookie-policy" },
  { title: "Refund Policy", href: "/refund-policy" },
  { title: "Disclaimer", href: "/disclaimer" },
  { title: "Accessibility", href: "/accessibility" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-cmpe-gray text-white">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.35fr_0.85fr_0.85fr_0.85fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-secondary font-black text-primary">CMPI</span>
            <span>
              <span className="block text-lg font-bold">{institute.shortName}</span>
              <span className="block text-sm text-white/70">{institute.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            Cox's Bazar Model Polytechnic Institute is committed to producing skilled, ethical, and innovative diploma engineers for national development.
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/80">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              {institute.address}
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-secondary" />
              {institute.phone}
            </p>
            <a className="flex items-center gap-3 hover:underline" href={`mailto:${institute.email}`}>
              <Mail className="h-5 w-5 shrink-0 text-secondary" />
              {institute.email}
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold uppercase tracking-[0.18em] text-secondary">Quick Links</h2>
          <ul className="mt-5 space-y-3">
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
          <h2 className="text-base font-bold uppercase tracking-[0.18em] text-secondary">Academics</h2>
          <ul className="mt-5 space-y-3">
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
          <h2 className="text-base font-bold uppercase tracking-[0.18em] text-secondary">Resources & Policies</h2>
          <ul className="mt-5 space-y-3">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-white/75 transition hover:text-secondary hover:underline" to={link.href}>
                  {link.title}
                </Link>
              </li>
            ))}
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-white/75 transition hover:text-secondary hover:underline" to={link.href}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {institute.name}. All rights reserved.
      </div>
    </footer>
  );
}
