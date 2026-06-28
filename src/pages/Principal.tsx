import { useState, useEffect } from "react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { api } from "@/services/api";

type ActiveDesk = "chairman" | "management" | "principal";

interface MessageProfile {
  id: number;
  key: string;
  name: string;
  title: string;
  subtitle: string | null;
  message: string;
  avatar: string | null;
}

export function Principal() {
  const [activeTab, setActiveTab] = useState<ActiveDesk>("principal");
  const [profiles, setProfiles] = useState<Record<string, MessageProfile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get("/admin-messages")
      .then((res) => {
        if (mounted) {
          const list: MessageProfile[] = res.data ?? [];
          const map: Record<string, MessageProfile> = {};
          list.forEach((p) => {
            map[p.key] = p;
          });
          setProfiles(map);
        }
      })
      .catch((err) => console.error("Failed to load administration messages from backend API", err))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const deskTabs: { id: ActiveDesk; label: string; title: string }[] = [
    { id: "chairman", label: "Founder & Chairman", title: "Chairman's Desk" },
    { id: "management", label: "Governing Body", title: "Management's Desk" },
    { id: "principal", label: "Principal", title: "Principal's Desk" },
  ];

  const currentProfile = profiles[activeTab];

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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : currentProfile ? (
            <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-md">
                  <img
                    src={currentProfile.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=" + currentProfile.key}
                    alt={currentProfile.name}
                    className="h-full w-full object-cover bg-muted"
                  />
                </div>
                <h2 className="text-xl font-bold">{currentProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{currentProfile.title}</p>
                {currentProfile.subtitle && (
                  <p className="mt-1 text-xs text-muted-foreground/70">{currentProfile.subtitle}</p>
                )}
              </div>
              <blockquote className="border-l-4 border-primary/30 pl-4 text-sm italic leading-relaxed text-muted-foreground whitespace-pre-line">
                {currentProfile.message}
              </blockquote>
              <div className="text-center pt-4 border-t border-muted/50">
                <p className="font-semibold">{currentProfile.name}</p>
                <p className="text-xs text-muted-foreground">{currentProfile.title}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground border border-dashed rounded-xl">
              No message profile found.
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
