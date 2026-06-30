import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { Sparkles, Terminal, Code, Cpu, ExternalLink, Globe } from "lucide-react";

const techStack = [
  { name: "React", bg: "bg-[#61DAFB]/20 border-[#61DAFB]" },
  { name: "TypeScript", bg: "bg-[#3178C6]/20 border-[#3178C6]" },
  { name: "Laravel", bg: "bg-[#FF2D20]/20 border-[#FF2D20]" },
  { name: "PHP", bg: "bg-[#777BB4]/20 border-[#777BB4]" },
  { name: "MySQL", bg: "bg-[#4479A1]/20 border-[#4479A1]" },
  { name: "Next.js", bg: "bg-slate-500/20 border-slate-500" },
  { name: "Tailwind CSS", bg: "bg-[#38BDF8]/20 border-[#38BDF8]" },
  { name: "Framer Motion", bg: "bg-[#FF007A]/20 border-[#FF007A]" },
  { name: "PostgreSQL", bg: "bg-[#4169E1]/20 border-[#4169E1]" },
  { name: "Docker", bg: "bg-[#2496ED]/20 border-[#2496ED]" },
  { name: "Git", bg: "bg-[#F05032]/20 border-[#F05032]" },
  { name: "Figma", bg: "bg-[#F24E1E]/20 border-[#F24E1E]" }
];

const projects = [
  {
    title: "CMPI Website",
    description: "Full-stack institutional website with admin panel, student dashboard, admission system, and real-time content management.",
    tech: ["React", "TypeScript", "Laravel", "MySQL", "Tailwind CSS"],
    link: "https://www.cmpi.edu.bd",
    status: "Live",
    shadow: "shadow-[6px_6px_0px_0px_#facc15] hover:shadow-[10px_10px_0px_0px_#facc15]"
  },
  {
    title: "Nextora Studio",
    description: "Digital agency website showcasing services, portfolio, and team. Built with modern web technologies.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    link: "https://nextorastudio.tech",
    status: "Live",
    shadow: "shadow-[6px_6px_0px_0px_#ec4899] hover:shadow-[10px_10px_0px_0px_#ec4899]"
  },
  {
    title: "BTEB Results Board",
    description: "Board of Technical Education Bangladesh results management system with PDF import and Google Drive integration.",
    tech: ["Laravel", "PHP", "MySQL"],
    link: "#",
    status: "Internal",
    shadow: "shadow-[6px_6px_0px_0px_#06b6d4] hover:shadow-[10px_10px_0px_0px_#06b6d4]"
  },
];

const timeline = [
  { year: "2024", title: "Started Development", description: "Began building the CMPI website from scratch with a vision for modern technical education.", color: "bg-yellow-400" },
  { year: "2025", title: "Admin Panel Launch", description: "Deployed the admin dashboard with full CRUD operations for notices, events, blogs, and faculty.", color: "bg-pink-500" },
  { year: "2025", title: "Student Portal", description: "Built the student dashboard with course management, results, bills, and webmail integration.", color: "bg-cyan-400" },
  { year: "2026", title: "Admission System", description: "Launched online admission with automated account creation and email notifications.", color: "bg-lime-400" },
  { year: "2026", title: "Continuous Improvement", description: "Adding charts, dark mode, search, SEO optimization, and performance improvements.", color: "bg-purple-500" },
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
  { label: "GitHub", href: "https://github.com/salahuddingfx", bg: "bg-yellow-400 text-black hover:bg-yellow-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" },
  { label: "Portfolio", href: "https://salahuddin.codes", bg: "bg-cyan-400 text-black hover:bg-cyan-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" },
  { label: "LinkedIn", href: "https://linkedin.com/in/salahuddingfx", bg: "bg-pink-400 text-black hover:bg-pink-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" },
  { label: "Facebook", href: "https://facebook.com/salahuddingfx", bg: "bg-lime-400 text-black hover:bg-lime-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" }
];

export function Developer() {
  return (
    <PageTransition className="container section-pad">
      <SEO
        title="Developer"
        description="Meet the developer behind the CMPI website — Salah Uddin Kader, full-stack developer and founder of Nextora Studio."
      />

      <article className="mx-auto max-w-4xl space-y-16">
        
        {/* Profile Card (Neo-Brutalist Layout) */}
        <div className="rounded-none border-[3px] border-black dark:border-white bg-[#FFF] dark:bg-[#121212] p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#FFF] transition-all duration-200">
          
          <div className="flex items-center gap-2 mb-6 border-b-[3px] border-black dark:border-white pb-4">
            <Terminal className="h-6 w-6 text-primary stroke-[2.5]" />
            <h1 className="text-xl font-mono font-black uppercase tracking-wider">dev-profile.sh</h1>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
            {/* Image Container with neo-brutal drop shadow */}
            <div className="shrink-0 relative group">
              <div className="absolute inset-0 bg-yellow-400 border-[3px] border-black translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200"></div>
              <img 
                src="https://salahuddin.codes/CV-Images.png" 
                alt="Salah Uddin Kader" 
                className="relative h-40 w-40 rounded-none border-[3px] border-black dark:border-white object-cover shadow-none" 
              />
            </div>

            {/* Profile details */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-3xl font-black text-foreground font-mono uppercase tracking-tight">Salah Uddin Kader</h2>
                <div className="inline-block mt-2 bg-yellow-400 text-black px-3 py-1 font-mono font-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  // Full-Stack Developer &amp; UI Designer
                </div>
              </div>
              
              <p className="leading-relaxed text-foreground font-medium text-sm">
                A passionate full-stack developer with a love for high-contrast, robust code structures and modern web aesthetics. From design systems to backend logic engines, I craft digital products that stand out.
              </p>
              
              <p className="leading-relaxed text-muted-foreground text-sm font-medium">
                Currently running <span className="font-bold text-foreground font-mono underline decoration-yellow-400 decoration-wavy underline-offset-4">Nextora Studio</span>, a creative agency focused on engineering innovative, state-of-the-art software solutions.
              </p>

              {/* Social buttons styled as Neo-Brutalist buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start pt-4 border-t-2 border-slate-100 dark:border-slate-800">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`inline-flex items-center justify-center font-mono font-black text-xs uppercase px-4 py-2 border-[2.5px] border-black dark:border-white transition-all duration-100 active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${link.bg}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Card (Neo-Brutalist Layout) */}
        <div className="rounded-none border-[3px] border-black dark:border-white bg-[#FFF] dark:bg-[#121212] p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#FFF]">
          <div className="flex items-center gap-2 mb-6 border-b-[2px] border-black dark:border-white pb-3">
            <Cpu className="h-5 w-5 text-primary stroke-[2.5]" />
            <h3 className="text-base font-mono font-black uppercase tracking-wider">skills_matrix.conf</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span 
                key={tech.name} 
                className={`rounded-none border-2 border-black dark:border-white px-4 py-2 text-xs font-mono font-extrabold uppercase tracking-wide transition-all shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#FFF] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] dark:hover:shadow-[5px_5px_0px_0px_#FFF] ${tech.bg} text-foreground`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Projects Card (Neo-Brutalist Layout) */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 border-[3px] border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-4 py-2 shadow-[4px_4px_0px_0px_#facc15] font-mono font-black text-sm uppercase">
            <Code className="h-4 w-4 stroke-[2.5]" /> Featured Projects
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div 
                key={project.title} 
                className={`rounded-none border-[3px] border-black dark:border-white bg-[#FFF] dark:bg-[#121212] p-6 flex flex-col justify-between transition-all duration-200 -translate-x-1 -translate-y-1 ${project.shadow}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-[2px] border-black dark:border-white pb-2.5">
                    <h4 className="font-mono font-black text-base uppercase tracking-tight text-foreground">{project.title}</h4>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 border border-black rounded-none ${
                      project.status === "Live" ? "bg-emerald-400 text-black" : "bg-slate-200 text-slate-700"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-foreground/80 leading-relaxed font-sans">{project.description}</p>
                </div>

                <div className="mt-5 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-none border border-black dark:border-slate-600 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.link !== "#" && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 font-mono font-black text-xs text-primary hover:underline group"
                    >
                      Launch Website 
                      <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline & Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          
          {/* Timeline Card */}
          <div className="rounded-none border-[3px] border-black dark:border-white bg-[#FFF] dark:bg-[#121212] p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#FFF]">
            <div className="flex items-center gap-2 mb-6 border-b-[2px] border-black dark:border-white pb-3">
              <Sparkles className="h-5 w-5 text-primary stroke-[2.5]" />
              <h3 className="text-base font-mono font-black uppercase tracking-wider">milestones.log</h3>
            </div>
            
            <div className="relative border-l-[3px] border-black dark:border-white ml-2 space-y-8 pl-6">
              {timeline.map((item, i) => (
                <div key={i} className="relative group">
                  {/* Timeline point */}
                  <div className={`absolute -left-[32px] top-1.5 h-[15px] w-[15px] rounded-none border-[3px] border-black dark:border-white ${item.color} shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#FFF] transition-all`} />
                  
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 border border-primary/20 rounded-none">{item.year}</span>
                  <h4 className="mt-2 font-mono font-black text-sm uppercase tracking-tight text-foreground">{item.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground font-semibold">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Card */}
          <div className="rounded-none border-[3px] border-black dark:border-white bg-[#FFF] dark:bg-[#121212] p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#FFF] space-y-6">
            <div className="flex items-center gap-2 mb-2 border-b-[2px] border-black dark:border-white pb-3">
              <Globe className="h-5 w-5 text-primary stroke-[2.5]" />
              <h3 className="text-base font-mono font-black uppercase tracking-wider">feedbacks.json</h3>
            </div>
            
            <div className="space-y-6">
              {testimonials.map((t, i) => (
                <div key={i} className="rounded-none border-2 border-black dark:border-white bg-slate-50 dark:bg-slate-900/50 p-4 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#FFF] relative">
                  {/* Quote decoration */}
                  <span className="absolute -top-3 right-4 font-serif text-3xl font-black text-black/10 dark:text-white/10">“</span>
                  <p className="text-xs italic font-medium leading-relaxed text-foreground/80">"{t.quote}"</p>
                  <div className="mt-3.5 border-t border-dashed border-slate-350 dark:border-slate-800 pt-2 flex justify-between items-center text-[10px]">
                    <span className="font-mono font-black uppercase text-foreground">{t.name}</span>
                    <span className="font-mono font-bold text-muted-foreground uppercase">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Nextora Studio CTA (Neo-Brutalist Banner) */}
        <div className="rounded-none border-[3px] border-black dark:border-white bg-yellow-400 text-black p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#FFF] text-center space-y-4">
          <h3 className="text-2xl font-mono font-black uppercase tracking-wider">NEXTORA STUDIO</h3>
          <p className="text-sm font-semibold max-w-xl mx-auto leading-relaxed">
            A boutique technical engineering and creative software laboratory. We build modern, blazing-fast web dashboards, custom REST APIs, and digital systems.
          </p>
          <div className="pt-2">
            <a 
              href="https://nextorastudio.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 rounded-none bg-black text-white font-mono font-black text-xs uppercase px-6 py-3 border-[2.5px] border-black shadow-[4px_4px_0px_0px_#fff] hover:bg-black/95 transition-all duration-100 active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]"
            >
              Visit Laboratory Website
              <ExternalLink className="h-4 w-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

      </article>
    </PageTransition>
  );
}
