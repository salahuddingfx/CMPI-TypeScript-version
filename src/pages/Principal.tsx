import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Principal() {
  return (
    <PageTransition>
      <SEO title="Principal's Message" description="Message from the Principal of Cox's Bazar Model Polytechnic Institute." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Administration" title="Principal's Message" description="A message from the office of the Principal." align="center" className="mb-10" />

        <div className="mx-auto max-w-2xl">
          <div className="rounded-sm border bg-card p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted text-3xl font-bold text-muted-foreground">
                <span className="text-primary text-2xl">Pr</span>
              </div>
              <h2 className="text-xl font-bold">Principal's Name</h2>
              <p className="text-sm text-muted-foreground">B.Sc. Engg., M.Sc. Engg.</p>
              <p className="mt-1 text-xs text-muted-foreground/70">Cox's Bazar Model Polytechnic Institute</p>
            </div>
            <blockquote className="mt-6 border-l-4 border-primary/30 pl-4 text-sm italic leading-relaxed text-muted-foreground">
              "Dear Students and Stakeholders,<br /><br />
              Cox's Bazar Model Polytechnic Institute has been a beacon of technical education in the Chittagong Hill Tracts region. Our mission is to produce skilled technologists who can contribute to the nation's development.<br /><br />
              We offer three diploma programs — Computer Science & Technology, Civil Technology, and Electrical Technology — each designed with a blend of theoretical knowledge and practical skills.<br /><br />
              Our dedicated faculty, modern laboratories, and industry partnerships ensure our students are well-prepared for the challenges of the modern workforce. I encourage all students to make the most of the opportunities here.<br /><br />
              Best wishes for your academic journey."
            </blockquote>
            <div className="mt-6 text-center">
              <p className="font-semibold">Principal</p>
              <p className="text-xs text-muted-foreground">CMPI, Cox's Bazar</p>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="rounded-sm border bg-card p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">Faculty Members</p>
            </div>
            <div className="rounded-sm border bg-card p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">1,200+</p>
              <p className="mt-1 text-sm text-muted-foreground">Current Students</p>
            </div>
            <div className="rounded-sm border bg-card p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">3,500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Alumni</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
