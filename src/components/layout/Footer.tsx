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

const platformIcons: Record<string, { d: string; fill?: string; stroke?: string; strokeWidth?: string }> = {
  facebook: {
    d: "M9.101 23.685v-10.34H6.5v-3.66h2.601V7c0-3.626 2.164-5.617 5.421-5.617 1.56 0 3.193.279 3.193.279v3.51h-1.798c-1.798 0-2.359 1.116-2.359 2.26v2.712h3.955l-.632 3.66h-3.323v10.34z",
    fill: "currentColor",
    stroke: "none",
  },
  youtube: {
    d: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.516 3.545 12 3.545 12 3.545s-7.516 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.872.508 9.388.508 9.388.508s7.516 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    fill: "currentColor",
    stroke: "none",
  },
  instagram: {
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
    fill: "currentColor",
    stroke: "none",
  },
  linkedin: {
    d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    fill: "currentColor",
    stroke: "none",
  },
  twitter: {
    d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    fill: "currentColor",
    stroke: "none",
  },
  github: {
    d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    fill: "currentColor",
    stroke: "none",
  },
  tiktok: {
    d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.48V13a8.28 8.28 0 0 0 5.58 2.15v-3.44a4.85 4.85 0 0 1-5.58-2.7V2.69h3.45v4z",
    fill: "currentColor",
    stroke: "none",
  },
  whatsapp: {
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
    fill: "currentColor",
    stroke: "none",
  },
  telegram: {
    d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    fill: "currentColor",
    stroke: "none",
  },
  email: {
    d: "M3 4h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm-1 2l10 7 10-7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
  },
  phone: {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
  },
  website: {
    d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
  },
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
              <div className="flex flex-col">
                <span className="text-lg font-black text-white leading-none">{institute.shortName}</span>
                <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase mt-1 leading-none">
                  {institute.name}
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {institute.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((link) => {
                const icon = platformIcons[link.platform.toLowerCase()] || platformIcons.website;
                if (!icon) return null;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-secondary hover:text-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={icon.fill || "none"}
                      stroke={icon.stroke || "currentColor"}
                      strokeWidth={icon.strokeWidth || "2"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d={icon.d} />
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
              <li><Link to="/principal" className="transition hover:text-secondary">Principal</Link></li>
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
