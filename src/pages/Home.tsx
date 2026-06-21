import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { CTASection } from "@/components/features/CTASection";
import { DepartmentCard } from "@/components/features/DepartmentCard";
import { EventCard } from "@/components/features/EventCard";
import { GalleryAlbumCard } from "@/components/features/GalleryAlbumCard";
import { NoticeCard } from "@/components/features/NoticeCard";
import { StatCard } from "@/components/features/StatCard";
import { BlogCard } from "@/components/features/BlogCard";
import { FacilityCard } from "@/components/features/FacilityCard";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";
import { institute } from "@/utils/constants";

const heroSlides = [
  {
    eyebrow: "Admission 2026-2027",
    title: "Building skilled technologists for a modern Bangladesh",
    description:
      "Cox's Bazar Model Polytechnic Institute offers practical diploma programs in Civil, Computer Science, and Electrical Technology with a focus on ethics, innovation, and employability.",
    cta: "Apply Now",
    ctaHref: "/admission",
    secondaryLabel: "Explore Academics",
    secondaryHref: "/academics",
    panelTitle: "Admission session 2026-2027",
    panelDescription:
      "Follow official circulars, submit required documents, and start your diploma engineering journey with structured guidance.",
    stats: [
      { value: "03", label: "Technology Departments" },
      { value: "450+", label: "Seat Capacity" },
      { value: "18", label: "Modern Labs" },
    ],
  },
  {
    eyebrow: "Practical Learning",
    title: "Industry-ready diploma programs for tomorrow",
    description:
      "Learn through workshops, project-based labs, technical demonstrations, and industry-aligned curriculum designed for real workplace readiness.",
    cta: "View Departments",
    ctaHref: "/academics",
    secondaryLabel: "Student Resources",
    secondaryHref: "/student-corner",
    panelTitle: "Hands-on technical ecosystem",
    panelDescription:
      "Students get continuous access to labs, faculty mentoring, project reviews, and practical skill development throughout the semester.",
    stats: [
      { value: "70%", label: "Practical Focus" },
      { value: "120+", label: "Student Projects" },
      { value: "40+", label: "Industry Links" },
    ],
  },
  {
    eyebrow: "Campus Life",
    title: "Innovation, leadership, and student success",
    description:
      "CMPI strengthens technical education with clubs, seminars, cultural programs, sports events, and student welfare initiatives.",
    cta: "Explore Events",
    ctaHref: "/events",
    secondaryLabel: "View Gallery",
    secondaryHref: "/gallery",
    panelTitle: "Beyond the classroom",
    panelDescription:
      "A supportive campus environment helps students grow as disciplined professionals, team leaders, and responsible citizens.",
    stats: [
      { value: "12+", label: "Student Clubs" },
      { value: "60+", label: "Annual Events" },
      { value: "35+", label: "Workshops" },
    ],
  },
];

function useTypewriter(text: string) {
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    let cancelled = false;
    const timer = window.setInterval(() => {
      indexRef.current += 1;
      if (!cancelled) {
        setDisplay(text.slice(0, indexRef.current));
      }
      if (indexRef.current >= text.length) {
        window.clearInterval(timer);
      }
    }, 34);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [text]);

  return display;
}

export function Home() {
  const { data, loading, error } = useInstituteContext();
  const [current, setCurrent] = useState(0);
  const slide = heroSlides[current]!;
  const typedTitle = useTypewriter(slide.title);

  const nextSlide = useCallback(() => {
    setCurrent((previous) => (previous + 1) % heroSlides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrent((previous) => (previous - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(nextSlide, 6500);
    return () => window.clearInterval(timer);
  }, [nextSlide]);

  if (loading) return <LoadingSkeleton />;
  if (error || !data) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">
          Unable to load institute information. Please try again later.
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO
        title="Home"
        description="Official frontend portal of Cox's Bazar Model Polytechnic Institute with admissions, academics, notices, events, and student resources."
        keywords={["CMPI", "Cox's Bazar Polytechnic", "Diploma Engineering", "Technical Education"]}
      />

      <section className="relative min-h-[550px] overflow-hidden bg-primary text-white" style={{ scrollMarginTop: "5rem" }}>
        <div className="container relative grid min-h-[550px] items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.38 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-bold text-secondary">
                {slide.eyebrow}
              </span>
              <h1 className="mt-6 min-h-[132px] text-4xl font-black text-white sm:min-h-[154px] sm:text-5xl lg:text-6xl">
                <span aria-hidden="true">{typedTitle}</span>
                <span className="animate-pulse text-white">|</span>
                <span className="sr-only">{slide.title}</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white sm:text-xl">{slide.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link to={slide.ctaHref}>
                    {slide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="border border-white bg-white text-primary hover:bg-white/90">
                  <Link to={slide.secondaryHref}>{slide.secondaryLabel}</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 font-bold text-white transition hover:bg-white/20"
                  onClick={previousSlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 font-bold text-white transition hover:bg-white/20"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
                <div className="ml-auto flex items-center gap-2">
                  {heroSlides.map((item, index) => (
                    <button
                      key={item.eyebrow}
                      type="button"
                      className={`h-2 rounded-full transition-all ${index === current ? "w-10 bg-secondary" : "w-2 bg-white/40 hover:bg-white/70"}`}
                      onClick={() => setCurrent(index)}
                      aria-label={`Show slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={slide.panelTitle}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.42, delay: 0.08 }}
            className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Institute Focus</p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">{slide.panelTitle}</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-black text-secondary">
                0{current + 1}/0{heroSlides.length}
              </span>
            </div>
            <p className="mt-4 leading-7 text-white/90">{slide.panelDescription}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {slide.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black text-secondary sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/90">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary p-5 text-primary">
              <p className="text-sm font-bold uppercase tracking-[0.18em]">Institute Identity</p>
              <p className="mt-2 text-xl font-black">{institute.name}</p>
              <p className="mt-2 text-sm text-primary/80">{institute.tagline}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader
          eyebrow="Institute Introduction"
          title="A center for technical excellence in Cox's Bazar"
          description="CMPI provides diploma-level technical education through structured curricula, modern laboratories, and student-centered support."
        />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-sm bg-primary p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold">Principal Message</h2>
            <p className="mt-5 leading-8 text-white/80">
              We are committed to nurturing disciplined, skilled, and innovative diploma engineers who can contribute meaningfully to national development. Our campus culture
              encourages practical learning, ethical conduct, and lifelong growth.
            </p>
            <p className="mt-6 font-semibold">Principal, {institute.shortName}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(data.stats && data.stats.length > 0 ? data.stats : [
              { label: "Academic Departments", value: "3" },
              { label: "Experienced Faculty", value: "86+" },
              { label: "Modern Laboratories", value: "24" },
              { label: "Student Clubs", value: "12" },
            ]).map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Institute Introduction Video ── */}
      <section className="bg-primary py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Watch & Learn"
            title="See CMPI in action"
            description="Get a glimpse of our campus, laboratories, faculty, and student life through our official introduction video."
            className="mb-10"
            eyebrowClassName="text-secondary"
            titleClassName="text-white"
            descriptionClassName="text-white/80"
          />
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10 aspect-video bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="CMPI Institute Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/60 font-semibold">
              Cox's Bazar Model Polytechnic Institute — Official Introduction
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Departments" title="Diploma programs designed for industry readiness" description="Choose from three core technology departments with dedicated labs, faculty, and practical workshops." />
          <div className="grid gap-6 md:grid-cols-3">
            {data.departments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader eyebrow="Latest Notices" title="Stay updated with official announcements" />
        <div className="grid gap-4 lg:grid-cols-3">
          {data.notices.slice(0, 3).map((notice) => (
            <NoticeCard key={notice.id} notice={notice} compact />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/notices">View All Notices</Link>
          </Button>
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Upcoming Events" title="Campus events, seminars, and workshops" />
          <div className="grid gap-6 md:grid-cols-3">
            {data.events.filter((event) => event.status === "Upcoming").slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader eyebrow="Featured Blog Posts" title="Insights from campus and academics" />
        <div className="grid gap-6 md:grid-cols-3">
          {data.blogs.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Campus Facilities" title="Modern learning spaces for practical education" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.facilities.map((facility) => (
              <FacilityCard key={facility.title} icon={CalendarDays} title={facility.title} description={facility.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader eyebrow="Gallery Preview" title="Explore campus life and student activities" />
        <div className="grid gap-6 md:grid-cols-3">
          {data.albums.map((album) => (
            <GalleryAlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Student Achievements" title="Recognizing talent, leadership, and innovation" />
          <div className="grid gap-6 lg:grid-cols-3">
            {data.achievements.map((achievement) => (
              <div key={achievement.title} className="rounded-sm border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">{achievement.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to start your technical education journey?"
        description="Explore admission requirements, application procedures, and important dates for the upcoming session."
        primaryLabel="View Admission Details"
        secondaryLabel="Contact Admission Office"
        primaryHref="/admission"
        secondaryHref="/contact"
      />

      <section className="section-pad bg-muted/60">
        <div className="container">
          <SectionHeader eyebrow="Contact Information" title="Get in touch with CMPI" align="left" />
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-sm border bg-card p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Send an Inquiry</h3>
              <p className="mt-2 text-muted-foreground">Use the contact form on the Contact page for detailed messages.</p>
              <Button asChild className="mt-5">
                <Link to="/contact">Go to Contact Page</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
