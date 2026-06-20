import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { institute } from "@/utils/constants";
import { fetchSocialLinks } from "@/services/api";

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  is_active: boolean;
  sort_order: number;
}

const platformIcons: Record<string, string> = {
  Facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  YouTube: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z m10-5-5-3 5-3z",
  Instagram: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01",
  LinkedIn: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  Twitter: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.7 4.6 4.5 5.6 16 5.3 22 4z",
  GitHub: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
  TikTok: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.48V13a8.28 8.28 0 0 0 5.58 2.15v-3.44a4.85 4.85 0 0 1-5.58-2.7V2.69h3.45v4z",
  WhatsApp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
  Telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  Website: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
};

const defaultSocials: SocialLink[] = [
  { id: 1, platform: "Facebook", url: "#", is_active: true, sort_order: 0 },
  { id: 2, platform: "YouTube", url: "#", is_active: true, sort_order: 1 },
  { id: 3, platform: "Instagram", url: "#", is_active: true, sort_order: 2 },
  { id: 4, platform: "LinkedIn", url: "#", is_active: true, sort_order: 3 },
];

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocials);

  useEffect(() => {
    fetchSocialLinks()
      .then((data) => {
        const active = data.filter((l: SocialLink) => l.is_active);
        if (active.length > 0) setSocialLinks(active);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-white/10 bg-cmpe-gray">
      <div className="container py-8">
        {/* Top — Brand + Get in Touch */}
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-start">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/CMPI.png" alt="CMPI Logo" className="h-10 w-10 object-contain" />
              <span className="text-lg font-bold text-white">{institute.shortName}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {institute.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((link) => {
                const d = platformIcons[link.platform] || platformIcons.Website;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-secondary hover:text-secondary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d={d} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Stay Connected (Newsletter) */}
          <div className="max-w-md w-full lg:max-w-xs xl:max-w-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">Stay Connected</h3>
            <p className="mt-4 text-sm text-white/60">
              Subscribe to our newsletter for latest notices, event updates, and academic announcements.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }} className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
                required
              />
              <button
                type="submit"
                className="rounded-sm bg-secondary px-4 py-2 text-sm font-bold text-primary hover:bg-secondary/90 hover:scale-105 active:scale-95 transition-all"
              >
                Join
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">Get in Touch</h3>
            <div className="mt-4 space-y-3 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-secondary">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {institute.address}
              </span>
              <a href={`tel:${institute.phone}`} className="flex items-center gap-2 transition hover:text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-secondary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                {institute.phone}
              </a>
              <a href={`mailto:${institute.email}`} className="flex items-center gap-2 transition hover:text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-secondary">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {institute.email}
              </a>
            </div>
          </div>
        </div>

        {/* Middle — Links */}
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link to="/about" className="transition hover:text-secondary">About Us</Link></li>
              <li><Link to="/faculty" className="transition hover:text-secondary">Faculty</Link></li>
              <li><Link to="/events" className="transition hover:text-secondary">Events</Link></li>
              <li><Link to="/gallery" className="transition hover:text-secondary">Gallery</Link></li>
              <li><Link to="/blog" className="transition hover:text-secondary">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">Academics</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link to="/academics/computer-science-technology" className="transition hover:text-secondary">CST</Link></li>
              <li><Link to="/academics/civil-technology" className="transition hover:text-secondary">Civil Tech</Link></li>
              <li><Link to="/academics/electrical-technology" className="transition hover:text-secondary">Electrical Tech</Link></li>
              <li><Link to="/admission" className="transition hover:text-secondary">Admission</Link></li>
              <li><Link to="/results" className="transition hover:text-secondary">Results</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link to="/notices" className="transition hover:text-secondary">Notice Board</Link></li>
              <li><Link to="/class-routine" className="transition hover:text-secondary">Class Routine</Link></li>
              <li><Link to="/exam-routine" className="transition hover:text-secondary">Exam Routine</Link></li>
              <li><Link to="/syllabus" className="transition hover:text-secondary">Syllabus</Link></li>
              <li><Link to="/library" className="transition hover:text-secondary">Library</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">Student</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link to="/student-corner" className="transition hover:text-secondary">Student Corner</Link></li>
              <li><Link to="/clubs" className="transition hover:text-secondary">Clubs</Link></li>
              <li><Link to="/scholarship" className="transition hover:text-secondary">Scholarships</Link></li>
              <li><Link to="/placement" className="transition hover:text-secondary">Career &amp; Placement</Link></li>
              <li><Link to="/alumni" className="transition hover:text-secondary">Alumni</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom — Copyright + Legal + Developer */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} {institute.name}. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
              <Link to="/privacy-policy" className="transition hover:text-secondary">Privacy</Link>
              <span className="text-white/20">·</span>
              <Link to="/terms-and-conditions" className="transition hover:text-secondary">Terms</Link>
              <span className="text-white/20">·</span>
              <Link to="/cookie-policy" className="transition hover:text-secondary">Cookies</Link>
              <span className="text-white/20">·</span>
              <Link to="/sitemap" className="transition hover:text-secondary">Sitemap</Link>
              <span className="text-white/20">·</span>
              <Link to="/accessibility" className="transition hover:text-secondary">Accessibility</Link>
            </div>

            <Link
              to="/developer"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-secondary"
            >
              <img
                src="https://github.com/salahuddingfx.png"
                alt="Salah Uddin Kader"
                className="h-5 w-5 rounded-full object-cover ring-1 ring-white/10"
              />
              <span>
                <span className="text-white/35">Architected by </span>
                <span className="font-semibold">Salah Uddin Kader</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
