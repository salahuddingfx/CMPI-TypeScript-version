import { useState } from "react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

type ActiveDesk = "chairman" | "management" | "principal";

export function Principal() {
  const [activeTab, setActiveTab] = useState<ActiveDesk>("principal");

  const deskTabs: { id: ActiveDesk; label: string; title: string }[] = [
    { id: "chairman", label: "Founder & Chairman", title: "Chairman's Desk" },
    { id: "management", label: "Governing Body", title: "Management's Desk" },
    { id: "principal", label: "Principal", title: "Principal's Desk" },
  ];

  return (
    <PageTransition>
      <SEO title="Administration Messages" description="Read inspirational messages from our Founder, Governing Body, and the Principal of CMPI." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Administration Desk"
          title="Administrative Messages"
          description="Visionary thoughts and educational guidelines from the leadership of CMPI."
          align="center"
          className="mb-10"
        />

        {/* Tab switcher */}
        <div className="mx-auto max-w-xl flex gap-2 mb-8 border p-1.5 rounded-xl bg-muted/30">
          {deskTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                activeTab === tab.id ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Chairman Desk */}
          {activeTab === "chairman" && (
            <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-md">
                  <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=chairman" alt="Founder & Chairman Portrait" className="h-full w-full object-cover bg-muted" />
                </div>
                <h2 className="text-xl font-bold">Engr. Muhammad Shafi</h2>
                <p className="text-sm text-muted-foreground">Founder & Chairman</p>
                <p className="mt-1 text-xs text-muted-foreground/70">Governing Council, CMPI</p>
              </div>
              <blockquote className="border-l-4 border-primary/30 pl-4 text-sm italic leading-relaxed text-muted-foreground">
                "Welcome to Cox's Bazar Model Polytechnic Institute. When we founded this institution, our goal was to break the geographical barrier and provide international-standard technical education right here in the coastal region.<br /><br />
                Technology is changing rapidly, and traditional degrees alone are no longer enough. We focus on outcome-based education that links classroom lectures directly to industry needs. I wish our students a transformative learning experience."
              </blockquote>
              <div className="text-center pt-4 border-t border-muted/50">
                <p className="font-semibold">Engr. Muhammad Shafi</p>
                <p className="text-xs text-muted-foreground">Chairman, CMPI Governing Council</p>
              </div>
            </div>
          )}

          {/* Management Desk */}
          {activeTab === "management" && (
            <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-md">
                  <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=governing" alt="Governing Body Director Portrait" className="h-full w-full object-cover bg-muted" />
                </div>
                <h2 className="text-xl font-bold">Governing Council & Management</h2>
                <p className="text-sm text-muted-foreground">Board of Trustees & Directors</p>
                <p className="mt-1 text-xs text-muted-foreground/70">Cox's Bazar Model Polytechnic Institute</p>
              </div>
              <blockquote className="border-l-4 border-primary/30 pl-4 text-sm italic leading-relaxed text-muted-foreground">
                "The management board of CMPI is committed to ensuring full administrative support, state-of-the-art laboratory infrastructure, and collaborations with foreign tech institutes.<br /><br />
                We are actively looking forward to expanding our campus space, creating internship placements across major technology and construction companies, and offering scholarships to outstanding performers. Our investment is in your future."
              </blockquote>
              <div className="text-center pt-4 border-t border-muted/50">
                <p className="font-semibold">Governing Body</p>
                <p className="text-xs text-muted-foreground">Board of Management, CMPI</p>
              </div>
            </div>
          )}

          {/* Principal Desk */}
          {activeTab === "principal" && (
            <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-md">
                  <img src="/principal.png" alt="Principal Ln. Md. Didar Ullah" className="h-full w-full object-cover" />
                </div>
                <h2 className="text-xl font-bold">Ln. Md. Didar Ullah</h2>
                <p className="text-sm text-muted-foreground">Principal & Visionary</p>
                <p className="mt-1 text-xs text-muted-foreground/70">Cox's Bazar Model Polytechnic Institute</p>
              </div>
              <blockquote className="border-l-4 border-primary/30 pl-4 text-sm italic leading-relaxed text-muted-foreground">
                "Dear Students and Stakeholders,<br /><br />
                Cox's Bazar Model Polytechnic Institute has been a beacon of technical education in the Chittagong Hill Tracts region. Our mission is to produce skilled technologists who can contribute to the nation's development.<br /><br />
                We offer three diploma programs — Computer Science & Technology, Civil Technology, and Electrical Technology — each designed with a blend of theoretical knowledge and practical skills.<br /><br />
                Our dedicated faculty, modern laboratories, and industry partnerships ensure our students are well-prepared for the challenges of the modern workforce. I encourage all students to make the most of the opportunities here.<br /><br />
                Best wishes for your academic journey."
              </blockquote>
              <div className="text-center pt-4 border-t border-muted/50">
                <p className="font-semibold">Principal Desk</p>
                <p className="text-xs text-muted-foreground">CMPI, Cox's Bazar</p>
              </div>
            </div>
          )}

          {/* Quick Stats Panel */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-primary">15+</p>
              <p className="mt-1 text-xs text-muted-foreground font-semibold">Faculty Members</p>
            </div>
            <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-primary">1,200+</p>
              <p className="mt-1 text-xs text-muted-foreground font-semibold">Current Students</p>
            </div>
            <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-primary">3,500+</p>
              <p className="mt-1 text-xs text-muted-foreground font-semibold">Alumni Members</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
