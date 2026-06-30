import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ChevronDown, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RefundPolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    {
      title: "1. Institutional Scope of Refund Policy",
      content: "This document governs the processing of refunds and adjustments for all financial payments collected by Cox's Bazar Model Polytechnic Institute (CMPI). This includes, but is not limited to, new admission fees, tuition fees, semester final exam fees, laboratory usage charges, hostel fee deposits, and extracurricular club subscriptions. All claims for refunds must comply with the rules established by the Governing Body of CMPI, the Ministry of Education, and the Bangladesh Technical Education Board (BTEB)."
    },
    {
      title: "2. Registration & Seat Processing Charges",
      content: "A portion of the admission fee covers the direct administrative cost of processing registration papers, creating permanent student profiles, and securing student seat allocations under BTEB limits. This processing cost is non-refundable."
    },
    {
      title: "3. Admission Cancellations Prior to Orientation",
      content: "If an admitted applicant submits a formal seat cancellation request in writing at least seven (7) calendar days prior to the official orientation date, they are eligible for a refund of their tuition deposits, minus an administrative processing charge of 10% of the total paid admission fee."
    },
    {
      title: "4. Admission Cancellations Post-Orientation",
      content: "Once classes commence or the academic orientation is completed, the registration files are submitted to the BTEB central databases. Consequently, the core admission fee becomes entirely non-refundable and non-transferable under any circumstances."
    },
    {
      title: "5. Session Technology Closures by CMPI",
      content: "If CMPI is forced to cancel an academic program, session technology, or individual seat selection due to administrative issues or regulatory decisions by the Ministry of Education, the applicant will receive a full 100% refund of all fees paid, processed within fifteen (15) working days."
    },
    {
      title: "6. Semester Tuition Refund: Prior to Week 1",
      content: "Students who formally request a semester break or leave before the start of the first week of classes are eligible for a 90% tuition refund. Dues will be adjusted in the accounts ledger or sent via check to the guardian."
    },
    {
      title: "7. Semester Tuition Refund: Weeks 1 to 2",
      content: "Withdrawal requests submitted during the first and second week of active classes are eligible for a 50% refund. Direct bank transfers or credit adjustments will be made in the accounts system."
    },
    {
      title: "8. Semester Tuition Refund: Weeks 3 to 4",
      content: "Withdrawals submitted within the third and fourth weeks of classes are eligible for a 25% refund. No cash refunds are made; instead, the balance is adjusted as credit for the following semester only."
    },
    {
      title: "9. Semester Tuition Refund: After Week 4",
      content: "Any withdrawal requests submitted after the fourth week of active classes are completely ineligible for refund. All semester fees must be paid in full to prevent registration locks."
    },
    {
      title: "10. BTEB Board Exam Form Fill-up Fees",
      content: "Fees collected for Board Examinations and Board Registration Form Fill-up are direct payments processed and submitted directly to the treasury of the Bangladesh Technical Education Board (BTEB) on behalf of the student. Once these forms are submitted to BTEB, these fees are 100% non-refundable and non-adjustable."
    },
    {
      title: "11. Hostel and Dormitory Rent Exclusions",
      content: "Hostel seat deposits and monthly dormitory rent once the room has been occupied are non-refundable. Fines for room damages will be deducted from the security deposits upon checkout."
    },
    {
      title: "12. Library Fines and Auxiliary Charges",
      content: "Fines for late return of books, damaged laboratory gear, re-issuance of library cards, or lost item replacements are non-refundable. These are updated as outstanding bills in the dashboard."
    },
    {
      title: "13. Document Issuance Fees",
      content: "Fees paid for compiling and issuing transcripts, duplicate ID cards, recommendations, letters of verification, or certified copies of BTEB certificates are fully non-refundable once the application is received."
    },
    {
      title: "14. Duplicate Payments & System Transaction Errors",
      content: "In the event that a student or guardian makes a duplicate payment, enters an incorrect bill amount, or experiences a network error during online payment, the payer must immediately report the issue with the transaction ID (TrxID) and transaction screenshot. Verified excess payments will either be refunded in full or adjusted as credit against the student's next semester dues."
    },
    {
      title: "15. Written Refund Request Submissions",
      content: "To initiate a refund, you must submit a written request form to the Registrar's Office. You must attach copies of all payment slips, bank transactions, and your student ID card."
    },
    {
      title: "16. Department Head (HoD) Clearance Requirement",
      content: "No refund check or ledger balance adjustments can be issued without a signed clearance certificate from your Department Head (HoD) proving that you have cleared all departmental library and lab keys."
    },
    {
      title: "17. Refund Processing Times and Audits",
      content: "Verified refund claims are reviewed by the Accounts Department and approved by the Principal. Disbursals are processed via checking or electronic bank transfers within thirty (30) working days."
    },
    {
      title: "18. Accounts and Finance Office Helpdesk",
      content: "For status updates on refunds, cash book audits, or payment errors, please contact: Accounts Department, Cox's Bazar Model Polytechnic Institute, College Road, Cox's Bazar 4750, Bangladesh. Email: accounts@cmpi.edu.bd."
    }
  ];

  return (
    <PageTransition className="container section-pad">
      <SEO title="Refund Policy" description="Detailed fee refund and adjustment policy for CMPI." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Refund Policy" description="Last updated: June 2026" align="left" className="mb-8" />
        
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 text-primary border border-primary/20">
          <CreditCard className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">Click on any section header to expand and read the details of our Refund Policy.</p>
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
