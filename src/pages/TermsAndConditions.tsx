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

          <h3 className="text-lg font-bold text-foreground">1. Comprehensive Acceptance of Agreement</h3>
          <p>By accessing, browsing, registering for, or using the official web portal of Cox's Bazar Model Polytechnic Institute (CMPI), you explicitly acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions in their entirety, alongside our Privacy Policy, Cookie Policy, Refund Policy, and Disclaimer. This document represents a binding legal contract between you (the user, whether student, guardian, applicant, staff member, or guest) and CMPI. If you do not agree to these terms, you must immediately cease all access to and usage of our digital assets, databases, and portal networks.</p>

          <h3 className="text-lg font-bold text-foreground">2. User Eligibility & Account Registration Protocols</h3>
          <p>Access to certain services, including the student dashboard, semester routines, bills, and grades, requires the creation of an institutional portal account. By registering, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Accuracy of Identity:</strong> Provide completely accurate, truthful, and updated academic details (such as BTEB Roll, Registration Number, technology, and session). The submission of false, fabricated, or third-party details will result in immediate termination of the application and possible disciplinary actions.</li>
            <li><strong>Account Security Responsibilities:</strong> Maintain absolute confidentiality of your portal credentials (username and password). You are fully liable for all activities, messages, downloads, and requests processed under your authenticated session. You must notify the CMPI IT department immediately at security@cmpi.edu.bd if you suspect any unauthorized access or password breach.</li>
            <li><strong>Single-User License:</strong> Accounts are assigned exclusively to individual students or staff members. Sharing credentials with coaching centers, external agents, or unauthorized third parties is strictly prohibited.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">3. Permitted & Prohibited Digital Activities</h3>
          <p>Users are granted a limited, non-exclusive, non-transferable, revocable license to access the CMPI web portal strictly for lawful educational and administrative purposes. The following activities are strictly prohibited and will result in immediate block of portal access and referral to the Cyber Security Unit of Bangladesh:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Exploitation & Data Mining:</strong> Launching automated scrapers, indexers, spiders, or scripts to harvest student directories, examination results, email addresses, or database content.</li>
            <li><strong>System Vandalism:</strong> Attempting to bypass web security configurations, brute-force admin logins, upload malicious payloads (viruses, trojans, ransomware), or disrupt services using Distributed Denial of Service (DDoS) methods.</li>
            <li><strong>Impersonation & Forgery:</strong> Accessing portals using someone else's student credentials, falsifying payment slips, or forge academic records.</li>
            <li><strong>Harassment & Misconduct:</strong> Distributing profane, offensive, threatening, or discriminatory comments through webmail, feedback modules, or academic message boards.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">4. Academic & Institutional Information Validity</h3>
          <p>While CMPI makes every effort to publish correct schedules, routines, syllabus links, notices, and exam schedules, the digital portal is an informational aid. It does not replace the physical academic notice boards of the departments or direct orders issued by the Principal's Office and the Bangladesh Technical Education Board (BTEB). In the event of a discrepancy between online results or schedules and the BTEB central databases, BTEB's official publication shall take absolute precedence. Users are required to verify critical deadlines (such as exam registrations and form fill-up dates) directly with the registrar office.</p>

          <h3 className="text-lg font-bold text-foreground">5. Billing, Fee Structures & Digital Payments</h3>
          <p>By registering for courses or applying for examinations, you agree to clear all associated institutional bills (tuition fees, lab fees, session charges, library dues) in accordance with the deadlines set by the accounts department. Late fees will be applied automatically to overdue bills. If using the digital payment submission panel, you are responsible for providing valid transaction details (TrxID, mobile number, bank branch). Fraudulent payment submissions will result in immediate semester suspension and legal billing investigations.</p>

          <h3 className="text-lg font-bold text-foreground">6. Intellectual Property & Copyright Protection</h3>
          <p>All digital materials hosted on this website including source code, database architectures, logos, UI designs, banners, course materials, departmental slides, and notice formats are the intellectual property of CMPI, protected under the Copyright Act 2000 of Bangladesh. You may download and print academic materials for personal, non-commercial educational use only. Any distribution, commercial reproduction, or unauthorized framing of CMPI assets is strictly prohibited unless authorized in writing by the Principal.</p>

          <h3 className="text-lg font-bold text-foreground">7. Limitation of Liability & Service Continuity</h3>
          <p>CMPI and its administrators shall not be held liable for any direct, indirect, special, incidental, or consequential damages resulting from the use or the inability to use this digital portal. This includes server downtime, data losses, errors in online marks compilation, delays in notice broadcasts, or issues arising from unauthorized account access. The website is provided on an "as is" and "as available" basis without warranties of any kind.</p>

          <h3 className="text-lg font-bold text-foreground">8. Termination of Service</h3>
          <p>CMPI reserves the absolute right to suspend, terminate, or restrict your portal access, student webmail account, or general access to the digital assets at any time without warning if you are found to violate these terms, engage in academic dishonesty, or disrupt the digital community of the institute.</p>

          <h3 className="text-lg font-bold text-foreground">9. Governing Law & Jurisdiction</h3>
          <p>These Terms and Conditions shall be governed by, interpreted, and enforced in accordance with the laws of the People's Republic of Bangladesh. Any dispute, claim, or controversy arising out of your digital usage of the CMPI portal that cannot be resolved amicably through the institutional arbitration committee shall be filed in the courts of Cox's Bazar, Bangladesh.</p>

          <h3 className="text-lg font-bold text-foreground">10. Modifications to this Agreement</h3>
          <p>CMPI reserves the right to modify these Terms and Conditions at any time. Modified terms become active immediately upon being published to this URL. It is the user's responsibility to check this page periodically for updates.</p>

          <h3 className="text-lg font-bold text-foreground">11. Institutional Legal Contact</h3>
          <p>If you have any questions, feedback, or need clarification regarding these Terms and Conditions, please contact the CMPI Administrative Office:</p>
          <p className="text-foreground font-semibold">
            Administrative Office (Legal & Compliance Division)<br />
            Cox's Bazar Model Polytechnic Institute<br />
            College Road, Cox's Bazar 4750, Bangladesh<br />
            Official Email: admin@cmpi.edu.bd / info@cmpi.edu.bd<br />
            Landline: +880 341 62512 | Phone: +880 1812 000000
          </p>

        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
