import { Monitor, MessageSquare, Bot, Trophy, Camera, HeartHandshake, Users, Mail, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export const clubs = [
  {
    id: "tech-club",
    name: "CMPI Tech Club",
    Icon: Monitor,
    tagline: "Code. Create. Compete.",
    description: "Programming contests, hackathons, and tech workshops for aspiring developers.",
    longDescription: "The CMPI Tech Club is the hub of digital innovation on campus. Members participate in national and international coding competitions, organize workshops on emerging technologies, and work on open-source projects. The club runs weekly coding sessions, peer mentoring, and an annual Hackathon that draws participants from across the region.",
    members: 45,
    founded: "2015",
    contact: "techclub@cmpi.edu.bd",
    president: "Rahim Miah",
    activities: ["Weekly coding sessions", "National programming contests", "Annual Hackathon", "Tech talk seminars", "Open source projects"],
    achievements: ["1st Place – Regional Coding Olympiad 2025", "Best Project – ICT Fair 2024", "3rd Place – BTEB Innovation Contest 2023"],
    meetingSchedule: "Every Tuesday, 3:00 PM – Lab 03",
  },
  {
    id: "debate-society",
    name: "Debate & Literary Society",
    Icon: MessageSquare,
    tagline: "Speak. Argue. Inspire.",
    description: "Inter-college debates, essay competitions, and cultural events for articulate minds.",
    longDescription: "The Debate & Literary Society nurtures public speaking, critical thinking, and literary expression. We organize internal and inter-college debate competitions, poetry nights, essay contests, and book discussions. Members gain confidence, analytical skills, and a love for language and ideas.",
    members: 32,
    founded: "2016",
    contact: "debate@cmpi.edu.bd",
    president: "Fatima Khatun",
    activities: ["Monthly debate competitions", "Annual inter-college debate", "Essay writing workshops", "Poetry & literature events", "Book club sessions"],
    achievements: ["Champion – Cox's Bazar Inter-College Debate 2025", "Runner-Up – National Youth Literary Contest 2024"],
    meetingSchedule: "Every Thursday, 4:00 PM – Seminar Hall",
  },
  {
    id: "robotics-lab",
    name: "Robotics & Innovation Lab",
    Icon: Bot,
    tagline: "Build. Automate. Innovate.",
    description: "Building robots, IoT projects, and participating in national competitions.",
    longDescription: "The Robotics & Innovation Lab is where ideas become machines. Students design and build robots, work on IoT and automation projects, and compete at national robotics festivals. The lab is equipped with Arduino kits, Raspberry Pi boards, 3D printing facilities, and electronics workbenches.",
    members: 28,
    founded: "2018",
    contact: "robotics@cmpi.edu.bd",
    president: "Arif Rahman",
    activities: ["Robot building workshops", "IoT project development", "3D printing & prototyping", "National robotics competitions", "Arduino & Raspberry Pi sessions"],
    achievements: ["2nd Place – National Robotics Competition 2025", "Best Innovation – BTEB Tech Fest 2024"],
    meetingSchedule: "Every Wednesday, 2:30 PM – Innovation Lab",
  },
  {
    id: "sports-club",
    name: "CMPI Sports Club",
    Icon: Trophy,
    tagline: "Sweat. Compete. Triumph.",
    description: "Football, cricket, badminton tournaments, and fitness activities for the campus athletes.",
    longDescription: "The Sports Club promotes physical fitness, sportsmanship, and competitive excellence. We organize inter-department tournaments in cricket, football, badminton, and volleyball. The club also runs a morning fitness program and represents CMPI in district-level sports events.",
    members: 60,
    founded: "2012",
    contact: "sports@cmpi.edu.bd",
    president: "Md. Kabir Hossain",
    activities: ["Football & cricket tournaments", "Badminton & volleyball leagues", "Morning fitness sessions", "District sports events", "Annual sports day"],
    achievements: ["Champion – District Inter-Polytechnic Cricket 2025", "Runner-Up – Football Tournament 2024", "Best Sportsman Award – Annual Sports Day 2024"],
    meetingSchedule: "Daily practice, 6:00 AM – Campus Ground",
  },
  {
    id: "photography-club",
    name: "Photography & Videography",
    Icon: Camera,
    tagline: "Frame. Capture. Tell stories.",
    description: "Campus events coverage, photo walks, and creative media production for visual storytellers.",
    longDescription: "The Photography & Videography Club is for those who see the world through a lens. We cover campus events, organize photo walks, run portrait and landscape photography workshops, and produce short films and documentaries. Members build a portfolio and contribute to the institute's media archive.",
    members: 20,
    founded: "2019",
    contact: "photo@cmpi.edu.bd",
    president: "Sumaiya Islam",
    activities: ["Campus event coverage", "Monthly photo walks", "Photography workshops", "Short film production", "Photo exhibition"],
    achievements: ["Best Student Media – Regional Polytechnic Fest 2025", "Photo Exhibition featured in Cox's Bazar Cultural Week 2024"],
    meetingSchedule: "Every Saturday, 10:00 AM – Media Room",
  },
  {
    id: "social-service",
    name: "Social Service Unit",
    Icon: HeartHandshake,
    tagline: "Serve. Care. Transform.",
    description: "Blood donation drives, community outreach, and environmental initiatives for change-makers.",
    longDescription: "The Social Service Unit believes in giving back to the community. We organize blood donation camps, tree plantation drives, digital literacy programs for underprivileged children, and disaster relief support. Members develop empathy, leadership, and a commitment to social responsibility.",
    members: 35,
    founded: "2013",
    contact: "social@cmpi.edu.bd",
    president: "Nasrin Akter",
    activities: ["Blood donation camps", "Tree plantation drives", "Digital literacy for underprivileged", "Environmental awareness campaigns", "Disaster relief support"],
    achievements: ["Best Social Initiative – Regional Volunteer Award 2025", "50+ blood donation camps organized", "1000+ trees planted since 2020"],
    meetingSchedule: "Every Sunday, 11:00 AM – Community Hall",
  },
];

export function Clubs() {
  return (
    <PageTransition>
      <SEO title="Student Clubs" description="Student clubs and extracurricular activities at CMPI." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Campus Life"
          title="Student Clubs & Societies"
          description="Join a club to develop leadership, teamwork, technical skills, and lifelong friendships."
          align="center"
          className="mb-10"
        />

        <div className="mx-auto max-w-4xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <Link
              key={club.id}
              to={`/clubs/${club.id}`}
              className="group rounded-sm border bg-card p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-sm bg-primary/10 p-3 group-hover:bg-primary transition-colors">
                  <club.Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-foreground group-hover:text-primary transition-colors">{club.name}</h3>
                  <p className="text-xs font-bold text-muted-foreground mt-0.5 italic">{club.tagline}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground flex-1">{club.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {club.members} members</span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  View Details <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
