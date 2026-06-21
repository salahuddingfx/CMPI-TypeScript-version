import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";
import { registerEvent } from "@/services/api";

export function EventDetails() {
  const { id } = useParams();
  const { data, loading, error } = useInstituteContext();

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRoll, setRegRoll] = useState("");
  const [regDept, setRegDept] = useState("");
  const [regSem, setRegSem] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Prefill details if student is logged in
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("cmpi-user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user) {
          setRegName(user.name || "");
          setRegEmail(user.email || "");
          setRegPhone(user.phone || "");
          setRegRoll(user.student_id || "");
          setRegDept(user.department || "");
          setRegSem(user.semester || "");
        }
      }
    } catch (e) {
      console.error("Failed to parse logged-in user details", e);
    }
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error || !data) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">
          Unable to load event details.
        </div>
      </PageTransition>
    );
  }

  const event = data.events.find((item) => item.id === id);
  if (!event) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border bg-card p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Event not found</h1>
          <p className="mt-3 text-muted-foreground">The requested event does not exist.</p>
        </div>
      </PageTransition>
    );
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await registerEvent(event.id, {
        name: regName,
        email: regEmail,
        phone: regPhone,
        roll_no: regRoll,
        department: regDept,
        semester: regSem,
      });
      setSuccessMsg(res.message || "Registration successful! We look forward to seeing you.");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || err.response?.data?.errors ? "Please ensure all fields are filled out correctly." : "Failed to submit registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <SEO title={event.title} description={event.summary} />
      <section className="container section-pad">
        <article className="mx-auto max-w-4xl rounded-2xl border border-border/80 bg-card p-6 shadow-xl sm:p-10 backdrop-blur-md">
          
          {/* Event Banner Image */}
          {event.image && (
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-8 border border-border/80 shadow-md ring-4 ring-muted/10">
              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant={event.status === "Upcoming" ? "default" : "secondary"} className="px-3 py-1 text-xs font-black uppercase tracking-wider">
              {event.status}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-black uppercase tracking-wider">
              {event.category}
            </Badge>
          </div>

          <SectionHeader title={event.title} description={event.summary} align="left" className="mb-6" />

          {/* Quick Details Card */}
          <div className="grid gap-4 sm:grid-cols-2 border-b border-border/60 pb-8 mb-8">
            <div className="rounded-2xl border border-border/50 bg-muted/40 p-5 flex gap-4 items-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Date</p>
                <p className="mt-0.5 text-sm font-bold text-foreground">
                  {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-muted/40 p-5 flex gap-4 items-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Time & Venue</p>
                <p className="mt-0.5 text-sm font-bold text-foreground">
                  {event.time} @ {event.venue}
                </p>
              </div>
            </div>
          </div>

          {/* Event Content Description */}
          <div className="prose prose-emerald max-w-none dark:prose-invert text-base leading-relaxed font-medium text-foreground/80 pb-8 border-b border-border/60">
            <p className="whitespace-pre-line">{event.details}</p>
          </div>

          {/* Event Registration Section */}
          {event.status === "Upcoming" && (
            <div className="mt-8 pt-4">
              <div className="mb-6">
                <h3 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Register for this Event
                </h3>
                <p className="text-sm text-muted-foreground font-semibold mt-1">
                  Reserve your seat for the upcoming career fair, seminar, or technical session.
                </p>
              </div>

              {successMsg ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center text-emerald-600 dark:text-emerald-400 flex flex-col items-center gap-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-bounce" />
                  <div>
                    <h4 className="text-lg font-bold">Registration Successful!</h4>
                    <p className="text-sm font-medium mt-1">{successMsg}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="glass-card p-6 border rounded-2xl space-y-4 max-w-2xl text-left bg-muted/10">
                  {errorMsg && (
                    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-destructive flex items-center gap-2 text-sm font-semibold">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-muted-foreground block">Your Name</label>
                      <Input value={regName} onChange={(e) => setRegName(e.target.value)} required placeholder="Full Name" className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-muted-foreground block">Email Address</label>
                      <Input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required placeholder="email@example.com" className="rounded-xl" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-muted-foreground block">Phone Number</label>
                      <Input type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} required placeholder="+880 1XXX-XXXXXX" className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-muted-foreground block">Roll Number / Student ID</label>
                      <Input value={regRoll} onChange={(e) => setRegRoll(e.target.value)} required placeholder="e.g. CST-85 2305" className="rounded-xl" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-muted-foreground block">Technology / Department</label>
                      <Input value={regDept} onChange={(e) => setRegDept(e.target.value)} required placeholder="e.g. Computer Science" className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-muted-foreground block">Semester</label>
                      <Input value={regSem} onChange={(e) => setRegSem(e.target.value)} required placeholder="e.g. 4th" className="rounded-xl" />
                    </div>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full sm:w-auto px-6 py-2.5 font-black shadow-md shadow-primary/20 rounded-xl">
                    {submitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                </form>
              )}
            </div>
          )}
        </article>
      </section>
    </PageTransition>
  );
}
