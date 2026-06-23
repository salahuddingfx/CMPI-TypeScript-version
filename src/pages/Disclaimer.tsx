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

          <h3 className="text-lg font-bold text-foreground">1. General Information</h3>
          <p>The information provided on the official website of Cox's Bazar Model Polytechnic Institute (CMPI) is for general informational and educational purposes only. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on the website.</p>

          <h3 className="text-lg font-bold text-foreground">2. Official Communications</h3>
          <p>Official notices, circulars, and announcements published on physical notice boards, sent via official email, or issued through the academic departments shall take precedence over website content. In the event of any discrepancy between website information and official institute communications, the latter shall be considered final and authoritative.</p>

          <h3 className="text-lg font-bold text-foreground">3. Academic Information</h3>
          <p>Information regarding admission requirements, academic programs, examination schedules, fee structures, and results is subject to change based on directives from the Bangladesh Technical Education Board (BTEB), the Ministry of Education, and CMPI academic council decisions. Prospective students and guardians are advised to confirm critical details directly with the admission office.</p>

          <h3 className="text-lg font-bold text-foreground">4. External Links</h3>
          <p>This website may contain links to external websites and resources including government portals, BTEB, partner organizations, and educational platforms. CMPI does not control the content, privacy practices, or availability of these external sites. Inclusion of any link does not imply endorsement by CMPI. Users access external links at their own discretion and risk.</p>

          <h3 className="text-lg font-bold text-foreground">5. Limitation of Liability</h3>
          <p>CMPI, its governing body, faculty, staff, and representatives shall not be held liable for any loss, damage, or inconvenience arising from:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Reliance on information published on this website.</li>
            <li>Technical issues, server downtime, or website unavailability.</li>
            <li>Unauthorized access to user accounts due to password sharing or security negligence.</li>
            <li>Use of third-party websites linked from this site.</li>
            <li>Errors or omissions in content caused by delayed updates or data entry mistakes.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">6. Availability</h3>
          <p>Every effort is made to keep the website running smoothly. However, CMPI takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues, maintenance, network problems, or factors beyond our reasonable control.</p>

          <h3 className="text-lg font-bold text-foreground">7. User Responsibility</h3>
          <p>Users of this website are responsible for verifying important information through official channels before making decisions based on website content. This includes but is not limited to admission deadlines, fee payments, examination schedules, and application procedures.</p>

          <h3 className="text-lg font-bold text-foreground">8. Copyright</h3>
          <p>All content published on this website including text, images, logos, design elements, and documents is the intellectual property of CMPI unless otherwise credited. Reproduction, distribution, or commercial use of any content without prior written permission from CMPI is prohibited.</p>

          <h3 className="text-lg font-bold text-foreground">9. Changes and Updates</h3>
          <p>CMPI reserves the right to modify, update, or remove any content on this website at any time without prior notice. This disclaimer may be updated periodically. Continued use of the website after changes constitutes acceptance of the updated disclaimer.</p>

          <h3 className="text-lg font-bold text-foreground">10. Governing Law</h3>
          <p>This disclaimer is governed by the laws of the People's Republic of Bangladesh. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Cox's Bazar, Bangladesh.</p>

          <h3 className="text-lg font-bold text-foreground">11. Contact Us</h3>
          <p>If you have any questions or concerns regarding this disclaimer, please contact:</p>
          <p className="text-foreground font-semibold">
            Cox's Bazar Model Polytechnic Institute<br />
            Cox's Bazar, Bangladesh<br />
            Email: info@cmpi.edu.bd<br />
            Phone: +880 341 000100
          </p>

        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
