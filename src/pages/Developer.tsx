import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { 
  Globe, ArrowUpRight, Sparkles, Terminal, Layers, Briefcase, Award, ShieldCheck, Cpu
} from 'lucide-react';

interface SkillGroup {
  category: string;
  skills: string[];
}

interface SecuritySpec {
  title: string;
  desc: string;
  badge: string;
  color: string;
}

interface PortalMetric {
  value: string;
  label: string;
  desc: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  status: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const skillsGroup: SkillGroup[] = [
  {
    category: "Frontend Engineering",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"]
  },
  {
    category: "Backend & Systems",
    skills: ["Laravel (PHP)", "Node.js (Express)", "REST API Scaffolding", "JWT Auth Engines", "Docker Containers"]
  },
  {
    category: "Database & Security",
    skills: ["MySQL / PostgreSQL", "SQL Injection Protection", "XSS & CSRF Prevention", "Database Indexing & Locks"]
  }
];

const securitySpecs: SecuritySpec[] = [
  {
    title: "SQL Injection Guard",
    desc: "Strict parameterized bindings and ORM layer abstraction prevent raw query tampering.",
    badge: "Active",
    color: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
  },
  {
    title: "CSRF & CORS Shielding",
    desc: "Domain restriction and token validation filters isolate access nodes to official origins.",
    badge: "Active",
    color: "border-sky-500/30 text-sky-500 bg-sky-500/10"
  },
  {
    title: "JWT Authorization Gate",
    desc: "Stateless JSON Web Token verification controls page permissions across client/admin levels.",
    badge: "Active",
    color: "border-amber-500/30 text-amber-500 bg-amber-500/10"
  }
];

const portalMetrics: PortalMetric[] = [
  { value: "< 45ms", label: "Page Transition", desc: "Powered by lazy routing & Suspense triggers" },
  { value: "100%", label: "SQLi Shielded", desc: "Rigorous input sanitization on all endpoints" },
  { value: "0ms", label: "Cart Lock Drift", desc: "Redis-backed session locks prevent booking races" },
  { value: "A+", label: "Lighthouse Score", desc: "Optimized asset loads and clean DOM nesting" }
];

const projects: Project[] = [
  {
    title: "CMPI Website & Portal",
    description:
      "Full-stack institutional website with admin panel, student dashboard, admission system, and real-time content management. Configured with secure SQL injection mitigation layers.",
    tech: ["React", "TypeScript", "Laravel", "MySQL", "Tailwind CSS"],
    link: "https://www.cmpi.edu.bd",
    status: "Live",
  },
  {
    title: "Nextora Studio Portal",
    description:
      "Digital agency website showcasing services, portfolio, and team. Built with modern web technologies and high-fidelity micro-interactions.",
    tech: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://nextorastudio.tech",
    status: "Live",
  },
  {
    title: "BTEB Results Board Engine",
    description:
      "Board of Technical Education Bangladesh results management system with PDF import, regex grade parser, and Google Drive storage integration.",
    tech: ["Laravel", "PHP", "MySQL", "PDFParser"],
    link: "#",
    status: "Internal",
  },
];

const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "Core Portal Architecture Initiated",
    description:
      "Began building the CMPI website framework from scratch with modern technical education modules."
  },
  {
    year: "2025",
    title: "Admin Control Panel Launch",
    description:
      "Deployed the backend admin dashboard with full CRUD operations for notices, events, and faculty files."
  },
  {
    year: "2025",
    title: "Interactive Student Portal",
    description:
      "Built the student dashboard featuring online routines, results tracker, bill status ledger, and webmail integrations."
  },
  {
    year: "2026",
    title: "Secure Online Admission System",
    description:
      "Launched automated online application channels equipped with verification safeguards and mail triggers."
  },
];

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/salahuddingfx",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    label: "Portfolio",
    href: "https://salahuddin.codes",
    icon: <Globe className="w-4 h-4" />
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/salahuddingfx",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    label: "Facebook",
    href: "https://facebook.com/salahuddingfx",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    label: "Instagram",
    href: "https://instagram.com/salahuddingfx",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    )
  }
];

export function Developer() {
  return (
    <PageTransition className="container py-24 select-none">
      <SEO
        title="Developer Info"
        description="Meet the developer behind the CMPI website — Salah Uddin Kader, creative full-stack engineer and founder of Nextora Studio."
      />

      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Main Hero Header - Stark Brutalist Title */}
        <div className="border-[3px] border-slate-900 dark:border-white bg-[#facc15] text-slate-900 p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-900 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest font-mono">system developer node</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mt-4 leading-none select-none">
            Salah Uddin Kader
          </h1>
          <p className="text-sm md:text-lg font-bold tracking-tight mt-2 flex items-center gap-1.5 uppercase">
            Creative Full-Stack Developer &amp; UI/UX Designer <Sparkles className="w-4 h-4 shrink-0" />
          </p>
        </div>

        {/* Profile Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Avatar Area */}
          <div className="md:col-span-4 border-[3px] border-slate-900 dark:border-white bg-white dark:bg-slate-950 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            <div className="relative aspect-square border-2 border-slate-900 dark:border-white overflow-hidden bg-slate-100 dark:bg-slate-900 group">
              <img
                src="https://salahuddin.codes/CV-Images.png"
                alt="Salah Uddin Kader"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute top-2 left-2 bg-[#22c55e] text-black text-[9px] font-black uppercase px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                Live Portfolio
              </div>
            </div>
            <a 
              href="https://salahuddin.codes" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-2.5 text-xs uppercase tracking-wider border-2 border-black hover:bg-[#facc15] hover:text-black dark:hover:bg-[#facc15] dark:hover:text-black hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] transition-all"
            >
              salahuddin.codes <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* About / Credentials */}
          <div className="md:col-span-8 border-[3px] border-slate-900 dark:border-white bg-white dark:bg-slate-950 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#22c55e] text-black text-[10px] font-black uppercase px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <Terminal className="w-3.5 h-3.5" /> open to work
              </div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mt-4">About SAKA CHOWDHURY</h2>
              <p className="mt-3 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                I am a Full Stack AI Engineer and Creative Developer based in Cox's Bazar, Bangladesh, specializing in secure full-stack architecture, relational database design (with protection against SQL Injection and other exploits), and custom LLM model integrations.
              </p>
              <p className="mt-2 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Currently running <span className="font-extrabold text-slate-900 dark:text-white">Nextora Studio</span>, a creative agency focused on building innovative products and empowering businesses through technology.
              </p>
            </div>

            <div className="border-t-[3px] border-slate-900 dark:border-slate-800 pt-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Connect Nodes</h3>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 border-2 border-slate-900 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-[#facc15] hover:text-black dark:hover:bg-[#facc15] dark:hover:text-black hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[3px_3px_0px_#000] dark:hover:shadow-[3px_3px_0px_#fff] transition-all"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Portal Core Analytics / Performance Metrics */}
        <div className="border-[3px] border-slate-900 dark:border-white bg-[#FFF] dark:bg-slate-950 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-primary" /> Technical Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portalMetrics.map((met) => (
              <div key={met.label} className="border-2 border-slate-900 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
                <span className="block text-2xl md:text-3xl font-black text-primary font-mono">{met.value}</span>
                <span className="block text-[10px] font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider mt-1">{met.label}</span>
                <span className="block text-[9px] font-medium text-slate-500 mt-0.5">{met.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cybersecurity & Exploits Guard Matrix */}
        <div className="border-[3px] border-slate-900 dark:border-white bg-[#FFF] dark:bg-slate-950 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#22c55e]" /> Cybersecurity Guard Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {securitySpecs.map((spec) => (
              <div key={spec.title} className="border-2 border-slate-900 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b-2 border-slate-900/10 pb-2">
                    <span className="text-xs font-black uppercase text-slate-900 dark:text-white">{spec.title}</span>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 border ${spec.color}`}>{spec.badge}</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="border-[3px] border-slate-900 dark:border-white bg-white dark:bg-slate-950 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-primary" /> Developer Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillsGroup.map((group) => (
              <div key={group.category} className="border-2 border-slate-900 dark:border-slate-850 p-4 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 tracking-wider mb-3 border-b pb-1.5">{group.category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <span key={s} className="bg-white dark:bg-slate-900 text-[10px] font-bold border border-slate-900/10 px-2 py-1 text-slate-650 dark:text-slate-350">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="border-[3px] border-slate-900 dark:border-white bg-white dark:bg-slate-950 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-primary" /> Featured Works
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="border-2 border-slate-900 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-5 flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-slate-900 dark:border-slate-850 pb-2.5 mb-3.5">
                    <h4 className="font-black text-xs md:text-sm uppercase tracking-tight text-slate-900 dark:text-white">{project.title}</h4>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000] ${
                        project.status === "Live" ? "bg-[#22c55e] text-black" : "bg-[#facc15] text-black"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-350 px-2 py-0.5 text-[9px] font-black uppercase border border-slate-900/10 dark:border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-black text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors uppercase tracking-wider"
                    >
                      Inspect Source <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Timeline */}
        <div className="border-[3px] border-slate-900 dark:border-white bg-white dark:bg-slate-950 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-8">
            <Award className="w-5 h-5 text-primary" /> Project Milestones
          </h3>
          
          <div className="relative border-l-[3px] border-slate-900 dark:border-white ml-3 md:ml-6 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-6 md:pl-10 group">
                <div className="absolute -left-[9.5px] top-1.5 h-4 w-4 rounded-full border-[3px] border-slate-900 dark:border-white bg-[#facc15] shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)]" />
                <span className="bg-slate-900 text-[#facc15] text-[10px] font-mono font-black uppercase px-2.5 py-0.5 border border-slate-900">
                  {item.year}
                </span>
                <h4 className="mt-2 text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
