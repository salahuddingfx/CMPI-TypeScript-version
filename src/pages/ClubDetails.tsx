import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Mail, Calendar, Trophy, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { clubs } from "@/pages/Clubs";

export function ClubDetails() {
  const { id } = useParams<{ id: string }>();
  const club = clubs.find((c) => c.id === id);

  if (!club) {
    return (
      <PageTransition>
        <div className="container section-pad text-center">
          <p className="text-muted-foreground">Club not found.</p>
          <Button asChild className="mt-4" variant="outline">
            <Link to="/clubs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Clubs</Link>
          </Button>
        </div>
      </PageTransition>
    );
  }

  const { Icon } = club;

  return (
    <PageTransition>
      <SEO title={club.name} description={club.description} />

      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="container py-12 sm:py-16">
          <Button asChild variant="ghost" className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-2">
            <Link to="/clubs"><ArrowLeft className="mr-2 h-4 w-4" /> All Clubs</Link>
          </Button>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="rounded-sm bg-white/10 p-5 backdrop-blur">
              <Icon className="h-14 w-14 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-1">Student Club</p>
              <h1 className="text-4xl font-black text-white">{club.name}</h1>
              <p className="mt-2 text-lg text-white/80 italic">{club.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {club.members} members</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Est. {club.founded}</span>
                <a href={`mailto:${club.contact}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" /> {club.contact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Left */}
          <div className="space-y-8">
            {/* About */}
            <div className="rounded-sm border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-black mb-4">About the Club</h2>
              <p className="leading-7 text-muted-foreground">{club.longDescription}</p>
            </div>

            {/* Activities */}
            <div className="rounded-sm border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-black mb-4">Key Activities</h2>
              <ul className="space-y-3">
                {club.activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div className="rounded-sm border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" /> Achievements
              </h2>
              <ul className="space-y-3">
                {club.achievements.map((ach) => (
                  <li key={ach} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 text-yellow-500">🏆</span>
                    <span className="font-semibold">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="rounded-sm border bg-card p-6 shadow-sm">
              <h3 className="font-black mb-4">Club Information</h3>
              <div className="space-y-4">
                {[
                  { label: "President", value: club.president, icon: Users },
                  { label: "Founded", value: club.founded, icon: Calendar },
                  { label: "Total Members", value: `${club.members} students`, icon: Users },
                  { label: "Contact", value: club.contact, icon: Mail },
                ].map(({ label, value, icon: ItemIcon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <ItemIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Schedule */}
            <div className="rounded-sm border bg-primary/5 p-6 shadow-sm">
              <h3 className="font-black mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Meeting Schedule
              </h3>
              <p className="text-sm font-semibold text-primary">{club.meetingSchedule}</p>
            </div>

            {/* Join CTA */}
            <div className="rounded-sm border bg-card p-6 shadow-sm text-center">
              <h3 className="font-black mb-2">Join this Club</h3>
              <p className="text-sm text-muted-foreground mb-4">Interested in joining? Send an email to the club president.</p>
              <a href={`mailto:${club.contact}?subject=Join Request — ${club.name}`}>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" /> Send Join Request
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
