import { Monitor, MessageSquare, Bot, Trophy, Camera, HeartHandshake } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const clubs = [
  { name: "CMPI Tech Club", Icon: Monitor, description: "Programming contests, hackathons, and tech workshops.", members: 45, contact: "techclub@cmpi.edu.bd" },
  { name: "Debate & Literary Society", Icon: MessageSquare, description: "Inter-college debates, essay competitions, and cultural events.", members: 32, contact: "debate@cmpi.edu.bd" },
  { name: "Robotics & Innovation Lab", Icon: Bot, description: "Building robots, IoT projects, and participating in national competitions.", members: 28, contact: "robotics@cmpi.edu.bd" },
  { name: "CMPI Sports Club", Icon: Trophy, description: "Football, cricket, badminton tournaments, and fitness activities.", members: 60, contact: "sports@cmpi.edu.bd" },
  { name: "Photography & Videography", Icon: Camera, description: "Campus events coverage, photo walks, and creative media production.", members: 20, contact: "photo@cmpi.edu.bd" },
  { name: "Social Service Unit", Icon: HeartHandshake, description: "Blood donation drives, community outreach, and environmental initiatives.", members: 35, contact: "social@cmpi.edu.bd" },
];

export function Clubs() {
  return (
    <PageTransition>
      <SEO title="Student Clubs" description="Student clubs and extracurricular activities at CMPI." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Campus Life" title="Student Clubs & Societies" description="Join student clubs to develop leadership, teamwork, and extracurricular skills." align="center" className="mb-10" />

        <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
          {clubs.map((club) => (
            <div key={club.name} className="group rounded-sm border bg-card p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-start gap-3">
                <club.Icon className="h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">{club.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{club.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{club.members} members</span>
                <a href={`mailto:${club.contact}`} className="font-semibold text-primary hover:underline">{club.contact}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
