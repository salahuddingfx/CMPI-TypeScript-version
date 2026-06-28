import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Users, Briefcase, GraduationCap, MapPin, Search, Filter, Sparkles, Send } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialAlumni = [
  { name: "Md. Ariful Islam", dept: "CST", batch: "2018-2022", year: "2022", currentRole: "Software Engineer at bKash", location: "Dhaka", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ariful", spotlight: true, quote: "CMPI built the core programming foundation that shaped my tech career." },
  { name: "Fatema Begum", dept: "Civil", batch: "2017-2021", year: "2021", currentRole: "Site Engineer at Square Construction", location: "Chittagong", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Fatema", spotlight: true, quote: "Hands-on lab experiences at CMPI prepared me to manage real construction projects." },
  { name: "Rakibul Hasan", dept: "EEE", batch: "2019-2023", year: "2023", currentRole: "Maintenance Engineer at DPDC", location: "Cox's Bazar", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rakibul", spotlight: true, quote: "CMPI faculty provided amazing mentorship to help me land a role in power distribution." },
  { name: "Sumaiya Akter", dept: "CST", batch: "2020-2024", year: "2024", currentRole: "Junior Developer at Brain Station 23", location: "Dhaka", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sumaiya", spotlight: false },
  { name: "Mohammad Ali", dept: "Civil", batch: "2016-2020", year: "2020", currentRole: "Highway Engineer at LGED", location: "Cox's Bazar", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mohammad", spotlight: false },
  { name: "Nusrat Jahan", dept: "EEE", batch: "2018-2022", year: "2022", currentRole: "Sub-Engineer at BPDB", location: "Chittagong", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Nusrat", spotlight: false },
  { name: "Tanvir Ahmed", dept: "CST", batch: "2019-2023", year: "2023", currentRole: "Full-Stack Developer (Freelance)", location: "Remote", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tanvir", spotlight: false },
  { name: "Ruma Khatun", dept: "Civil", batch: "2021-2025", year: "2025", currentRole: "Jr. Architect at ACS Architects", location: "Dhaka", image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ruma", spotlight: false },
];

export function Alumni() {
  const [alumniList, setAlumniList] = useState(initialAlumni);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Form State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regDept, setRegDept] = useState("CST");
  const [regBatch, setRegBatch] = useState("");
  const [regRole, setRegRole] = useState("");
  const [regLocation, setRegLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Available unique graduation years & departments for filter dropdown
  const departments = ["All", "CST", "Civil", "EEE"];
  const years = useMemo(() => {
    const yrSet = new Set(alumniList.map((a) => a.year));
    return ["All", ...Array.from(yrSet).sort().reverse()];
  }, [alumniList]);

  // Filtered list
  const filteredAlumni = useMemo(() => {
    return alumniList.filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.currentRole.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === "All" || a.dept === selectedDept;
      const matchYear = selectedYear === "All" || a.year === selectedYear;
      return matchSearch && matchDept && matchYear;
    });
  }, [alumniList, search, selectedDept, selectedYear]);

  // Spotlight alumni
  const spotlightAlumni = useMemo(() => {
    return alumniList.filter((a) => a.spotlight);
  }, [alumniList]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regBatch || !regRole) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      // Prepend new registrant as a mock success response
      const newAlum = {
        name: regName,
        dept: regDept,
        batch: regBatch,
        year: regBatch.split("-")[1] || new Date().getFullYear().toString(),
        currentRole: regRole,
        location: regLocation || "Remote",
        image: `https://api.dicebear.com/7.x/adventurer/svg?seed=${regName}`,
        spotlight: false,
      };
      setAlumniList((prev) => [newAlum, ...prev]);
      toast.success("Successfully registered into our Alumni database! Welcome to the network.");
      
      // Reset form
      setRegName("");
      setRegEmail("");
      setRegBatch("");
      setRegRole("");
      setRegLocation("");
      setSubmitting(false);
    }, 1200);
  };

  return (
    <PageTransition>
      <SEO title="Alumni Network" description="Join the Cox's Bazar Model Polytechnic Institute alumni network. Meet our graduates and review success stories." />
      
      {/* Premium Hero Stats Panel */}
      <section className="relative overflow-hidden bg-muted/30 py-16 dark:bg-muted/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative z-10">
          <SectionHeader
            eyebrow="Alumni Association"
            title="CMPI Alumni Network"
            description="Our graduates shape industries, engineering firms, and tech hubs across Bangladesh."
            align="center"
            className="mb-12"
          />

          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Total Graduates", value: "2,400+" },
              { icon: Briefcase, label: "Employment Rate", value: "88%" },
              { icon: GraduationCap, label: "Academic Sectors", value: "3 Techs" },
              { icon: Sparkles, label: "Global Reach", value: "6 countries" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center p-6 bg-card border rounded-2xl shadow-sm text-center transform hover:scale-[1.02] transition">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-black text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-semibold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Spotlight Section */}
      <section className="container py-16">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
          <h2 className="text-2xl font-black tracking-tight text-center">Graduate Spotlights</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {spotlightAlumni.map((alum) => (
            <div
              key={alum.name}
              className="relative rounded-2xl border bg-card p-6 shadow-sm overflow-hidden flex flex-col justify-between border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-500/[0.02] via-transparent to-transparent hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={alum.image}
                    alt={alum.name}
                    className="w-14 h-14 rounded-full border bg-muted"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-foreground leading-tight">{alum.name}</h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wide">
                      {alum.dept} · Batch {alum.batch}
                    </p>
                  </div>
                </div>
                {alum.quote && (
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
                    &ldquo;{alum.quote}&rdquo;
                  </p>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-muted/50 text-xs flex justify-between items-center text-muted-foreground font-semibold">
                <span className="flex items-center gap-1 font-bold">
                  <Briefcase className="h-3 w-3" /> {alum.currentRole}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {alum.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Filterable Directory */}
      <section className="container py-12 border-t">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Alumni Directory</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Explore our graduate ledger and filter profiles.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search name, job title, city..."
                className="pl-9 w-64 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Dept Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    Dept: {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <select
              className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  Year: {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {filteredAlumni.map((alum) => (
            <div
              key={alum.name}
              className="group rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between hover:border-primary/20"
            >
              <div className="flex items-center gap-3.5 mb-3.5">
                <img
                  src={alum.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${alum.name}`}
                  alt={alum.name}
                  className="w-12 h-12 rounded-full border bg-muted transform group-hover:scale-105 transition"
                />
                <div>
                  <h3 className="font-extrabold text-sm leading-snug text-foreground">{alum.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {alum.dept} · Batch {alum.batch}
                  </p>
                </div>
              </div>
              <div className="space-y-1 mt-2 pt-2 border-t border-muted/50 text-xs">
                <p className="font-extrabold text-foreground">{alum.currentRole}</p>
                <p className="text-muted-foreground flex items-center gap-1 font-semibold">
                  <MapPin className="h-3 w-3 shrink-0" /> {alum.location}
                </p>
              </div>
            </div>
          ))}

          {filteredAlumni.length === 0 && (
            <div className="col-span-full py-16 text-center rounded-2xl border border-dashed">
              <Users className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="font-bold text-foreground">No graduates match the filters</p>
              <p className="text-xs text-muted-foreground mt-1">Try resetting search query or category parameters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Alumni Registration CTA Form */}
      <section className="bg-muted/30 py-16 dark:bg-muted/10 border-t">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black tracking-tight">Are you a Graduate?</h2>
            <p className="text-sm text-muted-foreground mt-1">Join the database to keep in touch with current students and explore alumni career paths.</p>
          </div>

          <form onSubmit={handleRegister} className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                <Input
                  type="text"
                  placeholder="e.g. Arif Rahman"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                <Input
                  type="email"
                  placeholder="e.g. arif@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Department *</label>
                <select
                  className="w-full h-10 px-3 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={regDept}
                  onChange={(e) => setRegDept(e.target.value)}
                >
                  <option value="CST">Computer Science (CST)</option>
                  <option value="Civil">Civil Technology</option>
                  <option value="EEE">Electrical Technology (EEE)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Batch *</label>
                <Input
                  type="text"
                  placeholder="e.g. 2018-2022"
                  value={regBatch}
                  onChange={(e) => setRegBatch(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Role & Company *</label>
                <Input
                  type="text"
                  placeholder="e.g. Lead Engineer at GP"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Location</label>
                <Input
                  type="text"
                  placeholder="e.g. Dhaka, Bangladesh"
                  value={regLocation}
                  onChange={(e) => setRegLocation(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2 mt-4" disabled={submitting}>
              <Send className="h-4 w-4" /> {submitting ? "Registering..." : "Submit Profile Request"}
            </Button>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
