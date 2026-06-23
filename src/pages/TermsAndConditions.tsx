import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function TermsAndConditions() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Terms & Conditions" description="Terms and conditions for using the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Terms & Conditions" description="Last updated: June 2026" align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">

          <h3 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h3>
          <p>By accessing and using the official website of Cox's Bazar Model Polytechnic Institute (CMPI), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use this website.</p>

          <h3 className="text-lg font-bold text-foreground">2. Use of Website</h3>
          <p>This website is provided for lawful, educational, and informational purposes related to CMPI and its academic community. You agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the website only for legitimate educational and administrative purposes.</li>
            <li>Provide accurate and truthful information when submitting forms or creating accounts.</li>
            <li>Keep your login credentials confidential and not share them with others.</li>
            <li>Not use the website to upload malicious files, viruses, or harmful code.</li>
            <li>Not attempt to gain unauthorized access to restricted areas of the website or its backend systems.</li>
            <li>Not engage in any activity that disrupts or interferes with website functionality or services.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">3. Account Registration</h3>
          <p>Some features of the website, including the student dashboard, require account registration. When you register, you must provide accurate, current, and complete information. CMPI reserves the right to suspend or terminate accounts that violate these terms, provide false information, or are used for unauthorized purposes. Student accounts are approved pending verification by institute administration.</p>

          <h3 className="text-lg font-bold text-foreground">4. Intellectual Property</h3>
          <p>All content published on this website including text, images, logos, notices, academic materials, design, and layout is the property of CMPI unless otherwise stated. You may not reproduce, distribute, modify, or republish any content without prior written permission from the institute. Official notices and publicly shared academic information may be shared for personal, non-commercial purposes with proper attribution.</p>

          <h3 className="text-lg font-bold text-foreground">5. Accuracy of Information</h3>
          <p>CMPI makes every effort to ensure that the information published on this website including notices, exam routines, class schedules, admission details, and results is accurate and up to date. However, we recommend that users verify critical information through official institute communications or by contacting the relevant department. CMPI shall not be held liable for any loss or inconvenience caused by reliance on website information.</p>

          <h3 className="text-lg font-bold text-foreground">6. External Links</h3>
          <p>This website may contain links to external websites including government portals, BTEB, and partner organizations. These links are provided for user convenience only. CMPI does not endorse, control, or take responsibility for the content, accuracy, or practices of any linked third-party websites. Users access external links at their own risk.</p>

          <h3 className="text-lg font-bold text-foreground">7. Limitation of Liability</h3>
          <p>CMPI, its faculty, staff, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website. This includes but is not limited to damages for loss of data, unauthorized access, service interruption, or technical errors beyond our reasonable control.</p>

          <h3 className="text-lg font-bold text-foreground">8. Prohibited Activities</h3>
          <p>The following activities are strictly prohibited:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Impersonating another person or entity.</li>
            <li>Accessing or attempting to access other users' accounts without authorization.</li>
            <li>Using automated scripts, bots, or scrapers to extract data from the website.</li>
            <li>Uploading or distributing malware, viruses, or harmful software.</li>
            <li>Engaging in any form of harassment, abuse, or discrimination through website communication features.</li>
            <li>Violating any applicable Bangladesh law or BTEB regulation.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">9. Termination of Access</h3>
          <p>CMPI reserves the right to suspend, restrict, or terminate access to the website or any user account at any time, without prior notice, for conduct that violates these Terms and Conditions or is otherwise harmful to the institute, its students, or its community.</p>

          <h3 className="text-lg font-bold text-foreground">10. Changes to Terms</h3>
          <p>CMPI may revise these Terms and Conditions at any time without prior notice. Changes are effective immediately upon posting on this page. Your continued use of the website after any modifications indicates your acceptance of the updated terms. We encourage you to review this page periodically.</p>

          <h3 className="text-lg font-bold text-foreground">11. Governing Law</h3>
          <p>These Terms and Conditions are governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any disputes arising from the use of this website shall be subject to the jurisdiction of the courts in Cox's Bazar, Bangladesh.</p>

          <h3 className="text-lg font-bold text-foreground">12. Contact Information</h3>
          <p>For questions or concerns regarding these Terms and Conditions, please contact:</p>
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
