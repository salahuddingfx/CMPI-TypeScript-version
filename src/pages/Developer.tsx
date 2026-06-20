import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const techStack = [
  "React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS",
  "Framer Motion", "Laravel", "PHP", "MySQL", "PostgreSQL",
  "Docker", "Git", "Figma", "Adobe XD",
];

const projects = [
  {
    title: "CMPI Website",
    description: "Full-stack institutional website with admin panel, student dashboard, admission system, and real-time content management.",
    tech: ["React", "TypeScript", "Laravel", "MySQL", "Tailwind CSS"],
    link: "https://www.cmpi.edu.bd",
    status: "Live",
  },
  {
    title: "Nextora Studio",
    description: "Digital agency website showcasing services, portfolio, and team. Built with modern web technologies.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    link: "https://nextorastudio.tech",
    status: "Live",
  },
  {
    title: "BTEB Results Board",
    description: "Board of Technical Education Bangladesh results management system with PDF import and Google Drive integration.",
    tech: ["Laravel", "PHP", "MySQL"],
    link: "#",
    status: "Internal",
  },
];

const timeline = [
  { year: "2024", title: "Started Development", description: "Began building the CMPI website from scratch with a vision for modern technical education." },
  { year: "2025", title: "Admin Panel Launch", description: "Deployed the admin dashboard with full CRUD operations for notices, events, blogs, and faculty." },
  { year: "2025", title: "Student Portal", description: "Built the student dashboard with course management, results, bills, and webmail integration." },
  { year: "2026", title: "Admission System", description: "Launched online admission with automated account creation and email notifications." },
  { year: "2026", title: "Continuous Improvement", description: "Adding charts, dark mode, search, SEO optimization, and performance improvements." },
];

const testimonials = [
  {
    quote: "Salah delivered an exceptional website that exceeded our expectations. The admin panel is intuitive and the student portal is a game-changer.",
    name: "Principal, CMPI",
    role: "Institute Administration",
  },
  {
    quote: "Professional, creative, and technically brilliant. The admission system alone saved us hundreds of hours of manual work.",
    name: "Faculty Member, CMPI",
    role: "Academic Department",
  },
  {
    quote: "Working with Salah was a pleasure. He understood our vision and translated it into a beautiful, functional website.",
    name: "Student Representative",
    role: "Student Body",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/salahuddingfx", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg> },
  { label: "Portfolio", href: "https://salahuddin.codes", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
  { label: "LinkedIn", href: "https://linkedin.com/in/salahuddingfx", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { label: "Facebook", href: "https://facebook.com/salahuddingfx", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  { label: "Instagram", href: "https://instagram.com/salahuddingfx", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg> },
];

export function Developer() {
  return (
    <PageTransition className="container section-pad">
      <SEO
        title="Developer"
        description="Meet the developer behind the CMPI website — Salah Uddin Kader, full-stack developer and founder of Nextora Studio."
      />

      <article className="mx-auto max-w-4xl space-y-12">
        {/* Profile */}
        <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <SectionHeader eyebrow="Developer" title="Salah Uddin Kader" description="The mind behind this website." align="center" className="mb-10" />

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
            <div className="shrink-0">
              <img src="https://github.com/salahuddingfx.png" alt="Salah Uddin Kader" className="h-36 w-36 rounded-full object-cover ring-4 ring-primary/20 shadow-lg" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground">Salah Uddin Kader</h2>
              <p className="mt-1 text-sm font-medium text-primary">Full-Stack Developer &amp; UI/UX Designer</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">A passionate full-stack developer with a love for clean code and modern web experiences. From concept to deployment, I craft digital solutions that make a difference.</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">Currently running <span className="font-semibold text-foreground">Nextora Studio</span>, a creative digital agency focused on building innovative products and empowering businesses through technology.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/60 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary">
                    {link.icon}{link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <h3 className="text-lg font-bold text-foreground">Tech Stack</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary">{tech}</span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <h3 className="text-lg font-bold text-foreground">Featured Projects</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.title} className="rounded-sm border border-border/60 bg-muted/30 p-5 transition hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-foreground">{project.title}</h4>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${project.status === "Live" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>{project.status}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{t}</span>
                  ))}
                </div>
                {project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    View Live
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <h3 className="text-lg font-bold text-foreground">Timeline</h3>
          <div className="mt-6 relative border-l-2 border-primary/20 ml-4 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <span className="text-xs font-bold text-primary">{item.year}</span>
                <h4 className="mt-1 font-bold text-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <h3 className="text-lg font-bold text-foreground">What People Say</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-sm border border-border/60 bg-muted/30 p-5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary/30"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" /></svg>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.quote}</p>
                <div className="mt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nextora Studio */}
        <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-10 text-center">
          <h3 className="text-lg font-bold text-foreground">Nextora Studio</h3>
          <p className="mt-3 text-muted-foreground">A digital agency building modern web experiences, mobile apps, and creative solutions.</p>
          <a href="https://nextorastudio.tech" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Visit Website
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
        </div>
      </article>
    </PageTransition>
  );
}
