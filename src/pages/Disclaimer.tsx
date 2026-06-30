import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Disclaimer() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Disclaimer" description="Disclaimer for the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Disclaimer" description="Last updated: June 2026" align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">

          <h3 className="text-lg font-bold text-foreground">1. General Informational Nature of Digital Data</h3>
          <p>The information, graphics, notices, lists, routines, and materials hosted on the official web portal of Cox's Bazar Model Polytechnic Institute (CMPI) are compiled and presented exclusively for general educational and institutional guidance. While the administrative and IT teams make every possible effort to maintain accurate, secure, and up-to-date content, CMPI makes no warranties or representations of any kind, whether express, statutory, or implied, regarding the absolute completeness, accuracy, reliability, timeliness, or uninterrupted availability of the information, software, or media assets found on this platform. Any reliance you place on such content is strictly at your own individual risk.</p>

          <h3 className="text-lg font-bold text-foreground">2. Precedence of departmental Physical & Written Communications</h3>
          <p>This digital website functions as a supplementary distribution channel for institutional notices. Official announcements, academic circulars, exam schedule revisions, and fee structures signed, stamped, and issued by the Principal's Office, the academic department heads, or displayed on the physical notice boards of the institute take absolute priority. In the event of any discrepancies, errors, or delays between the digital portal's notice panel and official physical documentation, the physical written communications shall be considered authoritative, final, and legally binding.</p>

          <h3 className="text-lg font-bold text-foreground">3. Academic Progression & BTEB Regulatory Directives</h3>
          <p>Course outlines, semester syllabi, admission criteria, examination schedules, mark sheets, and CGPA transcript queries are heavily governed by regulations issued by the Bangladesh Technical Education Board (BTEB) and the Ministry of Education. CMPI reserves the right to modify admission quotas, course requirements, grading curves, and fees structures at any time in order to comply with national laws or board updates. Students, parents, and prospective applicants must verify critical academic timelines and financial figures directly with departmental offices.</p>

          <h3 className="text-lg font-bold text-foreground">4. External Web Link Liability Limits</h3>
          <p>The CMPI web portal contains links to external websites (including the official BTEB portal, government education boards, bank portals, and student verification portals). These links are provided solely as a helpful resource for users. CMPI does not monitor, control, influence, or accept responsibility for the content, privacy configurations, technical uptime, or data tracking policies of these third-party platforms. The inclusion of any link does not represent an endorsement of the external site's contents, opinions, or operators.</p>

          <h3 className="text-lg font-bold text-foreground">5. Technology Outages, Disruptions & System Downtime</h3>
          <p>While we use modern server hosting configurations to maintain maximum portal availability, CMPI does not guarantee that our databases, student dashboards, or webmail clients will be continuously online or free from technical glitches. We accept no liability for any temporary or permanent inability to access our services, submit forms, or query results due to server hardware failures, national internet routing issues, power grid disruptions, or regular software maintenance cycles.</p>

          <h3 className="text-lg font-bold text-foreground">6. Strict Cyber Security Disclaimer</h3>
          <p>CMPI implements robust secure socket layers (SSL/TLS), hashed credentials, and database firewalls. However, due to the nature of public internet environments, we cannot guarantee that files downloaded from the portal are entirely free of security exploits, spyware, or malware. Users are responsible for maintaining updated local anti-virus software on their browsing devices. The institute shall not be liable for any system failures, data corruptions, or hardware damages resulting from digital usage of our platforms.</p>

          <h3 className="text-lg font-bold text-foreground">7. Copyright & Brand Asset Protection</h3>
          <p>All source code, graphics, layout designs, and text written on this portal are the copyright-protected intellectual property of Cox's Bazar Model Polytechnic Institute. Users may download academic templates and read notices for private, non-commercial educational purposes. The reproduction, modification, copying, or scraping of any part of this site for commercial purposes or public display without prior written consent from the Principal is strictly prohibited under the Copyright Act 2000 of Bangladesh.</p>

          <h3 className="text-lg font-bold text-foreground">8. Institutional Contact for Disclaimers</h3>
          <p>For questions or requests regarding site disclaimers or to report any bugs, errors, or typos, please contact our administrative desk:</p>
          <p className="text-foreground font-semibold">
            Office of the Principal (IT & Communications Division)<br />
            Cox's Bazar Model Polytechnic Institute<br />
            College Road, Cox's Bazar 4750, Bangladesh<br />
            Official Email: principal@cmpi.edu.bd / info@cmpi.edu.bd<br />
            Landline: +880 341 62512 | Phone: +880 1812 000000
          </p>

        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
