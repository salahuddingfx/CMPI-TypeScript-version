import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function PrivacyPolicy() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Privacy Policy" description="Privacy policy for Cox's Bazar Model Polytechnic Institute website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Privacy Policy" description="Last updated: June 2026" align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">

          <h3 className="text-lg font-bold text-foreground">1. Introduction</h3>
          <p>Cox's Bazar Model Polytechnic Institute (CMPI) values the privacy of its students, guardians, faculty, staff, and website visitors. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you interact with our official website and associated digital services.</p>

          <h3 className="text-lg font-bold text-foreground">2. Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Personal Identification Information:</strong> Full name, email address, phone number, mailing address, date of birth, guardian details, and blood group when provided through admission inquiries, registration forms, feedback forms, or contact forms.</li>
            <li><strong className="text-foreground">Academic Information:</strong> Student ID, department, semester, session, admission date, academic records, and course enrollment details for registered students.</li>
            <li><strong className="text-foreground">Technical Information:</strong> IP address, browser type, device information, operating system, referring URLs, and usage patterns collected automatically for analytics and security purposes.</li>
            <li><strong className="text-foreground">Communication Records:</strong> Correspondence sent through the website contact forms, email inquiries, and support requests.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">3. How We Use Your Information</h3>
          <p>The information we collect is used for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To process and respond to admission inquiries, feedback, and support requests.</li>
            <li>To publish official notices, exam routines, class schedules, and academic results.</li>
            <li>To manage student accounts, including login, profile updates, and dashboard access.</li>
            <li>To send important institute announcements, event updates, and examination notifications.</li>
            <li>To improve website content, user experience, and service delivery.</li>
            <li>To maintain website security, detect fraudulent activity, and prevent misuse.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">4. Data Storage and Retention</h3>
          <p>Your personal data is stored securely on servers operated within Bangladesh. We retain your information for as long as your account remains active or as needed to provide services. Academic records may be retained longer to comply with Bangladesh Technical Education Board (BTEB) regulations and institutional policies. You may request deletion of your account data by contacting the administration, subject to applicable legal and regulatory obligations.</p>

          <h3 className="text-lg font-bold text-foreground">5. Data Sharing and Disclosure</h3>
          <p>CMPI does not sell, rent, or trade your personal information to third parties. We may share information only in the following cases:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>With authorized institute faculty and administrative staff for academic and operational purposes.</li>
            <li>With Bangladesh Technical Education Board (BTEB) and other government authorities as required by law.</li>
            <li>With service providers (e.g., hosting, email delivery) who are bound by confidentiality agreements.</li>
            <li>To comply with legal obligations, court orders, or government requests.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">6. Cookies and Tracking Technologies</h3>
          <p>Our website uses cookies and similar technologies to enhance user experience. Essential cookies are used for authentication and session management. Preference cookies store your theme and language choices. Analytics cookies help us understand how visitors use the site. You can manage cookie preferences through our Cookie Consent banner or your browser settings. For more details, see our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</p>

          <h3 className="text-lg font-bold text-foreground">7. Third-Party Links</h3>
          <p>Our website may contain links to third-party websites including BTEB, government portals, and educational resources. CMPI is not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies before providing any personal information.</p>

          <h3 className="text-lg font-bold text-foreground">8. Data Security</h3>
          <p>We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include SSL/TLS encryption, secure password storage, access controls, and regular security reviews. However, no online transmission or storage method is completely secure, and we cannot guarantee absolute security.</p>

          <h3 className="text-lg font-bold text-foreground">9. Your Rights</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your account and associated data, subject to legal retention requirements.</li>
            <li>Withdraw consent for non-essential cookies and data processing.</li>
            <li>Lodge a complaint with the institute administration regarding data handling practices.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">10. Changes to This Policy</h3>
          <p>CMPI reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. We encourage visitors to review this policy periodically. Continued use of the website after changes constitutes acceptance of the updated policy.</p>

          <h3 className="text-lg font-bold text-foreground">11. Contact Us</h3>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
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
