import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ChevronDown, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TermsAndConditions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    {
      title: "1. Scope of the Digital Services Agreement",
      content: "This agreement governs your use of the public web portals, administrative directories, syllabus catalogs, notice boards, and student information systems operated by Cox's Bazar Model Polytechnic Institute (CMPI). By navigating our site, registering accounts, or using services, you agree to comply with all guidelines here."
    },
    {
      title: "2. Compliance with BTEB Academic Frameworks",
      content: "All academic processes (including grading sheets, registrations, class schedules, exam controllers updates) are subject to BTEB rules. Any discrepancy in grades or registration is verified against physical board sheets, which remain the absolute final authority."
    },
    {
      title: "3. Portal User Eligibility and Verification",
      content: "Access to the student and faculty dashboards is restricted to active students, legal guardians, and authorized staff. Accounts are verified manually by department heads and registers. Submission of false academic roll numbers will result in account bans."
    },
    {
      title: "4. Secure Management of Portal Credentials",
      content: "You are responsible for keeping your login email and password confidential. You are solely responsible for all actions, comments, and uploads under your account. Report any credential compromises immediately to it-support@cmpi.edu.bd."
    },
    {
      title: "5. Permitted Academic & Lawful Usage",
      content: "The portals must be used for genuine academic progress. Permitted actions include viewing notices, checking exam routines, downloading syllabus sheets, reviewing payment ledgers, and accessing student webmail boxes."
    },
    {
      title: "6. Strict Ban on Database Scraping and Bots",
      content: "Automated data mining, web scraping, indexing, or harvesting student records, emails, or phone numbers using scripts or bots is strictly forbidden. Violators will have their IP addresses permanently blacklisted and reported under cyber law."
    },
    {
      title: "7. Cybersecurity Violations & System Abuse",
      content: "Any attempt to bypass portal firewalls, upload malware or shell scripts, run dictionary attacks on logins, or flood servers via DDoS will result in immediate termination of student profiles and referral to the Cyber Security Unit of Bangladesh."
    },
    {
      title: "8. Digital Code of Conduct & Communication Rules",
      content: "All communications through student webmail, feedback boards, and message panels must remain professional. Sending spam, abusive text, harassment, or using profane language will result in disciplinary suspensions."
    },
    {
      title: "9. Notice Board and Calendar Timelines",
      content: "The notice boards and calendars are published as administrative guides. Students must check departmental bulletin boards and BTEB circulars to verify critical dates (such as exam registrations and fee payment deadlines)."
    },
    {
      title: "10. Tuition and Fee Payment Commitments",
      content: "By registering for a semester, you agree to clear all tuition, lab, library, and examination fees in accordance with the timelines. Late penalties will be added to unpaid invoices. Unpaid accounts will be locked from viewing transcripts."
    },
    {
      title: "11. Verification of Payment Submissions",
      content: "When using manual fee submission, you must upload valid Transaction IDs (TrxID) and sender numbers. Submission of fake or duplicate TrxIDs will be treated as financial fraud and leads to immediate disciplinary actions."
    },
    {
      title: "12. Intellectual Property and Copyright Protections",
      content: "All codebase source, design layouts, graphics, logo icons, notice formats, and study slides are copyrighted assets of CMPI under Bangladesh laws. You may copy materials for individual educational use only. Commercial distribution is forbidden."
    },
    {
      title: "13. Third-Party Link Guidelines",
      content: "Our website points to official government and board sites (like BTEB, Ministry portals). CMPI is not responsible for the uptime, security, or contents of those external websites. You browse them at your own risk."
    },
    {
      title: "14. Limitation of Liability for Digital Failures",
      content: "CMPI is not liable for data losses, compiler errors in grade calculations, notice delays, or temporary system outages caused by internet breakdowns, power cuts, or database server failures."
    },
    {
      title: "15. Indemnification Provisions",
      content: "You agree to indemnify, defend, and hold harmless CMPI, its governing body, departments, and IT managers from any claims, losses, or legal liabilities arising from your breach of these digital guidelines or misuse of accounts."
    },
    {
      title: "16. Suspending Portal Access and Accounts",
      content: "The institute reserves the absolute right to freeze, suspend, or terminate any student portal, admin login, or webmail account if the user is suspended from the college, breaks code rules, or shows malicious digital behaviors."
    },
    {
      title: "17. Governing Law & Judicial Jurisdiction",
      content: "These Terms and Conditions are governed by the laws of Bangladesh. Any legal disputes regarding digital services that cannot be settled by the institute arbitration desk must be filed in the courts of Cox's Bazar, Bangladesh."
    },
    {
      title: "18. Modifications to Terms and Guidelines",
      content: "CMPI reserves the right to modify these Terms and Conditions at any time without warning. Updates are effective immediately upon being published on this page. It is your responsibility to review these terms periodically."
    }
  ];

  return (
    <PageTransition className="container section-pad">
      <SEO title="Terms & Conditions" description="Terms and conditions for using CMPI website and portals." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Terms & Conditions" description="Last updated: June 2026" align="left" className="mb-8" />
        
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 text-primary border border-primary/20">
          <FileText className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">Click on any section header to expand and read the details of our Terms & Conditions.</p>
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
