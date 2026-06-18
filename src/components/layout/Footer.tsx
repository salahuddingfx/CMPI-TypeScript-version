import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { institute } from "@/utils/constants";

const footerLinks = [
  { title: "Academics", href: "/academics" },
  { title: "Admission", href: "/admission" },
  { title: "Notice Board", href: "/notices" },
  { title: "Events", href: "/events" },
  { title: "Student Corner", href: "/student-corner" },
  { title: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-cmpe-gray text-white">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
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
          <h2 className="text-base font-bold uppercase tracking-[0.2em] text-secondary">Quick Links</h2>
          <ul className="mt-5 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-white/75 transition hover:text-secondary hover:underline" to={link.href}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-bold uppercase tracking-[0.2em] text-secondary">Departments</h2>
          <ul className="mt-5 space-y-3">
            <li><Link className="text-white/75 transition hover:text-secondary hover:underline" to="/academics/civil-technology">Civil Technology</Link></li>
            <li><Link className="text-white/75 transition hover:text-secondary hover:underline" to="/academics/computer-science-technology">Computer Science & Technology</Link></li>
            <li><Link className="text-white/75 transition hover:text-secondary hover:underline" to="/academics/electrical-technology">Electrical Technology</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {institute.name}. All rights reserved.
      </div>
    </footer>
  );
}
