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

          <h3 className="text-lg font-bold text-foreground">1. Comprehensive Introduction</h3>
          <p>Cox's Bazar Model Polytechnic Institute (CMPI), established in 2008 and registered under the Bangladesh Technical Education Board (BTEB), is committed to safeguarding the privacy and digital security of our students, guardians, applicants, faculty, staff, alumni, and website visitors. This Privacy Policy forms a legally binding agreement between you and CMPI. It explains in exhaustive detail how we collect, process, store, protect, and disclose your personal, academic, and technical information when you access our public website, portals, webmail services, online payment verification systems, and associated electronic networks.</p>
          <p>By accessing or interacting with our services, you explicitly consent to the collection, storage, and processing of your data as described in this policy, which is designed to align with the Cyber Security Act 2023 of the People's Republic of Bangladesh and international data protection practices.</p>

          <h3 className="text-lg font-bold text-foreground">2. Exhaustive Categories of Information We Collect</h3>
          <p>We collect and manage various categories of data to provide high-quality educational services and administrative functions. These include:</p>
          <div className="space-y-4 pl-4 border-l-2 border-primary/20">
            <div>
              <h4 className="font-semibold text-foreground">A. Personal Identification Information</h4>
              <p className="text-sm">We collect identifiable details when you submit forms, apply for admission, or create portal accounts. This includes your full legal name, national identification number (NID) or birth registration certificate number, gender, date of birth, blood group, passport-sized photographs, father's and mother's names, legal guardian information, permanent and present addresses, personal email address, and mobile phone numbers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">B. Academic & Institutional Information</h4>
              <p className="text-sm">For enrolled students, we generate and store detailed academic records including your BTEB student roll number, registration number, session year, enrolled department/technology (e.g., Computer, Civil, Electrical), semester progression, attendance logs, mid-term and semester final results, CGPA transcripts, scholarship awards, and disciplinary records.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">C. Financial & Billing Transaction Records</h4>
              <p className="text-sm">When you pay tuition fees or exam fees, we collect payment verification logs. This includes the transaction date, bill references, payment amounts, payment modes (e.g., manual cash receipts, bKash, Nagad, Rocket, bank deposits), transaction IDs (TrxID), sender phone numbers, and digital copies of payment slips. We do not store credit card PINs or mobile banking account passwords.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">D. Technical, Session & Diagnostic Logs</h4>
              <p className="text-sm">When browsing our public or restricted portals, our servers automatically log technical metadata. This includes your IP address, device hostname, operating system version, web browser user-agent string, page referral URLs, exact timestamps of visits, session states, and diagnostic crash reports to maintain portal integrity.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground">3. How and Why We Process Your Information</h3>
          <p>We process your personal and academic data strictly for legitimate educational, regulatory, and administrative purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Educational Administration:</strong> To manage classroom enrollment, generate academic routines, track daily attendance, issue admit cards, compile transcript results, and facilitate graduation clearances.</li>
            <li><strong>Official Communication:</strong> To broadcast emergency alerts, exam schedule updates, holiday notices, and payment reminders via SMS, WhatsApp, and the webmail system.</li>
            <li><strong>Identity Verification:</strong> To host the public Student Verification portal, allowing employers, board authorities, and registrars to confirm the authenticity of student credentials.</li>
            <li><strong>Financial Transparency:</strong> To track outstanding balances, process manual and automated transaction approvals, and maintain accurate institutional accounting audits.</li>
            <li><strong>System Maintenance:</strong> To debug server errors, secure portal access points against unauthorized login attempts, and optimize page load speeds.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">4. Strict Data Security & Technical Encryption Standards</h3>
          <p>CMPI implements robust, enterprise-grade physical, administrative, and technical security measures to protect your database entries and uploaded media from unauthorized access, modification, destruction, or disclosure. Our security framework includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Transport Security:</strong> All connections to our portals are encrypted using Transport Layer Security (TLS 1.2 and TLS 1.3) protocols, marked by secure HTTPS URLs.</li>
            <li><strong>Credential Protection:</strong> All portal user accounts and passwords are encrypted in our databases using strong one-way hashing algorithms (bcrypt) and are never stored in plaintext format.</li>
            <li><strong>Strict Access Control:</strong> Access to database management systems (DBMS) is restricted to authorized personnel (principals, registrars, and system administrators) through multi-factor authentication (MFA) and IP whitelisting.</li>
            <li><strong>Database Backup Integrity:</strong> Automated daily backups are securely archived and stored in encrypted offline configurations to prevent data loss in the event of hardware failures.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">5. Data Retention, Archive & Account Deletion Policies</h3>
          <p>We retain your personal data for as long as you maintain an active enrollment status at CMPI. Upon graduation, withdrawal, or transfer, your core academic record (name, roll number, registration number, technology, and final CGPA transcript) is moved to a permanent digital archive to comply with BTEB archiving policies and verify your credentials to future employers or institutions indefinitely.</p>
          <p>Non-permanent data, including daily login session records, portal access logs, and draft admission applications, are deleted or anonymized after two (2) years of inactivity. Students who wish to request correction of inaccurate data or deletion of their optional portal profile information can submit a written request to the Registrar's Office at any time.</p>

          <h3 className="text-lg font-bold text-foreground">6. Disclosures & Shared Data Protocols</h3>
          <p>CMPI does not sell, rent, trade, or distribute your personal data to commercial marketing agencies. We disclose information only under the following strict protocols:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>BTEB Board Compliance:</strong> We submit mandatory registration data, examination roll logs, and course performance metrics directly to the Bangladesh Technical Education Board (BTEB) and Ministry of Education.</li>
            <li><strong>Legal & Law Enforcement Mandate:</strong> We may disclose user information to judicial authorities, cyber security units, or police investigators if required to comply with court orders, regulatory decrees, or to investigate fraudulent activities.</li>
            <li><strong>Emergency Situations:</strong> In cases where a student's safety is compromised, critical medical information (such as blood group and emergency guardian contacts) may be shared with healthcare personnel.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">7. Compliance with the Cyber Security Act 2023</h3>
          <p>In accordance with the Cyber Security Act 2023 of Bangladesh, CMPI maintains a strict policy against unauthorized data mining, hacking, database modification, or session hijacking. Any attempt to exploit, scraping, or breach database systems will result in immediate suspension of student/staff portals and formal prosecution under Bangladesh cyber laws.</p>

          <h3 className="text-lg font-bold text-foreground">8. Changes to this Privacy Policy</h3>
          <p>CMPI reserves the exclusive right to modify or append sections of this Privacy Policy at any time to reflect updates in BTEB regulations, technological changes, or national legislation. When changes are made, we will update the "Last updated" timestamp at the top of this document. Continued use of the website and portal services after modifications are published constitutes your official agreement to the updated policy terms.</p>

          <h3 className="text-lg font-bold text-foreground">9. Institutional Privacy Contact</h3>
          <p>For questions, data access requests, corrections of records, or to submit feedback regarding our data handling procedures, please contact the CMPI Administration:</p>
          <p className="text-foreground font-semibold">
            Office of the Registrar (IT Division)<br />
            Cox's Bazar Model Polytechnic Institute<br />
            College Road, Cox's Bazar 4750, Bangladesh<br />
            Official Email: privacy@cmpi.edu.bd / info@cmpi.edu.bd<br />
            Landline: +880 341 62512 | Mobile: +880 1812 000000
          </p>

        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
