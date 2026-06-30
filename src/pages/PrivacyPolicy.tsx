import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    {
      title: "1. Comprehensive Scope & Acceptance",
      content: "Cox's Bazar Model Polytechnic Institute (CMPI), established in 2008 and registered under the Bangladesh Technical Education Board (BTEB), is committed to safeguarding the digital privacy of our students, guardians, applicants, faculty, and website visitors. This policy applies to all portals, student databases, and webmail services hosted under the cmpi.edu.bd domain. By accessing our services, you explicitly consent to the data collection and processing methods described herein."
    },
    {
      title: "2. Compliance with Bangladesh Cyber Laws",
      content: "All data processing, user logs maintenance, security reviews, and portal logins are maintained in strict compliance with the Cyber Security Act 2023 of the People's Republic of Bangladesh. We actively cooperate with cyber security units and judicial authorities to maintain a safe, secure educational ecosystem."
    },
    {
      title: "3. Personal Identity Information Collected",
      content: "We collect identifiable student records when you apply for admission or register profiles. This includes your full legal name, national identification number (NID) or birth registration certificate, gender, date of birth, blood group, photographs, guardian credentials, present and permanent addresses, personal email addresses, and active mobile numbers."
    },
    {
      title: "4. Institutional & Academic Record Keeping",
      content: "For registered students, we archive and process academic data including BTEB student rolls, registration numbers, session technology (e.g., Computer, Civil, Electrical), semester progression, attendance histories, exam grades, GPA transcripts, scholarship allocations, and institutional conduct reports."
    },
    {
      title: "5. Financial Transaction and Billing Logs",
      content: "When submitting tuition fees or board exam fees, we collect transaction dates, bill numbers, payment amounts, payment channels (such as cash receipts, bank deposits, bKash, Nagad, Rocket), Transaction IDs (TrxID), and sender phone numbers. We do not store mobile banking account PINs or bank passwords."
    },
    {
      title: "6. Student Webmail Usage & Email Integrity",
      content: "CMPI student webmail accounts (e.g., username.cst@cmpi.edu.bd) are monitored for server storage management and spam prevention. We archive emails sent and received through the server to comply with educational audits and prevent communication abuses."
    },
    {
      title: "7. Technical Metadata & Session Logger",
      content: "Our servers automatically log access metadata when you browse our portals. This includes your IP address, device hostname, operating system, web browser type, referring URLs, access timestamps, active session tokens, and crash diagnostics to maintain database stability."
    },
    {
      title: "8. Purpose of Processing Personal Data",
      content: "We process your details strictly for legitimate educational, operational, and regulatory purposes, including managing classroom enrollment, taking class attendance, issuing exam admit cards, compiling results, broadcasting notices, and auditing accounts."
    },
    {
      title: "9. Consent & Guardian Representation for Minors",
      content: "For students who are minors (under 18 years of age), all admissions registrations, portal accounts, and payment claims must be submitted under the guidance and explicit consent of their legal parent or guardian, who represents them in all administrative processes."
    },
    {
      title: "10. Data Retention Framework",
      content: "Core academic records (names, roll numbers, registration numbers, final transcripts) are archived permanently to verify student credentials to employers. Temporary session tokens, login history logs, and inactive applicant drafts are purged after two (2) years of absolute inactivity."
    },
    {
      title: "11. Enterprise Security & Hashing Standards",
      content: "We implement robust security controls including SSL/TLS encryption (HTTPS URLs) for all traffic. All student and admin credentials are encrypted using strong bcrypt hashing in our database layers, making them unreadable to unauthorized parties."
    },
    {
      title: "12. Database Access Controls",
      content: "Database access is restricted to whitelisted IPs and authorized administrative staff (Principals, Registrars, IT Officers, and Accountants) using multi-factor authentication (MFA). Students and teachers are only granted access to their specific views."
    },
    {
      title: "13. Backup Routines and Disaster Recovery",
      content: "Our servers execute automated daily database and system backups. These backup archives are encrypted and stored in secondary server configurations to prevent data loss in the event of hardware failures or natural disasters."
    },
    {
      title: "14. Statutory Submissions to BTEB",
      content: "We submit registration rolls, board exam forms, mid-term marks, and final semester logs directly to the Bangladesh Technical Education Board (BTEB) database as required by national technical education mandates."
    },
    {
      title: "15. Third-Party Hosting and Service Dependencies",
      content: "We share necessary technical logs with whitelisted hosting partners and SMTP mail providers (such as Brevo) under confidentiality agreements. We do not sell or trade your details to commercial third-party marketing companies."
    },
    {
      title: "16. Right to Access and Review Records",
      content: "Enrolled students have the right to request a copy of the personal and academic data held in the CMPI databases. This can be viewed directly on the student profile panel or requested formally from the Registrar's Office."
    },
    {
      title: "17. Right to Correction and Rectification",
      content: "If you notice any inaccuracies in your student records (e.g. name spellings, blood groups, addresses), you must report the errors to the administration immediately. Inaccurate profile entries will be corrected after verification."
    },
    {
      title: "18. IT Helpdesk and Grievance Support",
      content: "If you have any questions, concerns, or requests regarding this Privacy Policy, your database data, or suspected data vulnerabilities, please contact our IT Division: IT Support Department, Cox's Bazar Model Polytechnic Institute, College Road, Cox's Bazar 4750, Bangladesh. Email: privacy@cmpi.edu.bd."
    }
  ];

  return (
    <PageTransition className="container section-pad">
      <SEO title="Privacy Policy" description="Detailed privacy policy for CMPI website and portals." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Privacy Policy" description="Last updated: June 2026" align="left" className="mb-8" />
        
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 text-primary border border-primary/20">
          <ShieldCheck className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">Click on any section header to expand and read the details of our Privacy Policy.</p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="rounded-xl border border-border overflow-hidden bg-card">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-foreground hover:bg-muted/30 transition-all duration-300"
              >
                <span className="text-sm sm:text-base">{section.title}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-border bg-muted/10 text-muted-foreground leading-relaxed text-sm font-medium">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center border-t pt-6">
          <Link to="/" className="font-bold text-primary hover:underline">Back to Home</Link>
          <p className="text-xs text-muted-foreground font-semibold">Cox's Bazar Model Polytechnic Institute © {new Date().getFullYear()}</p>
        </div>
      </article>
    </PageTransition>
  );
}
