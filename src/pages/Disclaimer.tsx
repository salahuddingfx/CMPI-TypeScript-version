import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ChevronDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Disclaimer() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    {
      title: "1. Informational Intent of Portal Data",
      content: "The information, graphics, notices, lists, routines, and materials hosted on the official web portal of Cox's Bazar Model Polytechnic Institute (CMPI) are compiled and presented exclusively for general educational and institutional guidance. We make no warranties of any kind regarding completeness, reliability, or timeliness."
    },
    {
      title: "2. Priority of Written Bulletins",
      content: "This website serves as a digital distribution channel. Written bulletins signed by the Principal and displayed on the college's physical notice boards take priority. In case of discrepancy, physical documents are the final authority."
    },
    {
      title: "3. Accuracy of Student Verification Queries",
      content: "The student verification portal is updated monthly. Temporary discrepancies in status, enrollment dates, or GPA records must be reported to the registrar's office. Web previews are not official certified records."
    },
    {
      title: "4. Accuracy of Academic Notice Updates",
      content: "Notice updates, class routines, and exam schedules published online are subject to change. CMPI is not responsible for academic disruption caused by unforeseen delays in online postings."
    },
    {
      title: "5. Syllabus and Course Structure Amendments",
      content: "Syllabi, course modules, practical marks allocation, and class credit systems are subject to updates by BTEB. CMPI reserves the right to amend digital descriptions to match board decisions."
    },
    {
      title: "6. Fee Structure Adjustments and Billing Estimates",
      content: "Dues estimates shown on student dashboard accounts are computed for active semesters. Real balances might differ if special waivers, scholarship deductions, or library fines are updated manually by the cashier."
    },
    {
      title: "7. Links to External Portals and Uptime",
      content: "We provide links to board sites (BTEB, ministry boards) for student support. We are not responsible for the content, privacy protocols, secure forms, or uptime of these third-party domains."
    },
    {
      title: "8. Platform Server Uptime and Maintenance",
      content: "We host portals on scalable infrastructure but do not guarantee uninterrupted server uptime. Access to student profiles and registrations may be suspended during maintenance windows or network failures."
    },
    {
      title: "9. Document Downloading Security Disclaimer",
      content: "While we run automated antivirus scans on our upload folders, CMPI does not guarantee that study sheets, routines, or zip files downloaded from our site are free from viruses. Users should run local scans."
    },
    {
      title: "10. User Responsibility for Application Deadlines",
      content: "Applicants and students are responsible for tracking deadlines for admission submissions, scholarship forms, and board form fill-ups. CMPI is not responsible for missed deadlines due to web downtime."
    },
    {
      title: "11. Copyright Protections on Visual Assets",
      content: "College logos, custom designs, departmental banners, text layouts, and student data schemas are copyright properties of CMPI. Commercial copying, web framing, or scraping is legally forbidden."
    },
    {
      title: "12. Faculty Profile Page Accuracy",
      content: "Faculty designations, qualification details, and research publications listed on department pages are updated by respective teachers. CMPI is not liable for errors in personal teacher profiles."
    },
    {
      title: "13. Student Project Upload Liability",
      content: "Projects and web apps uploaded to portfolio showcases by student groups represent the creations of those students. CMPI does not verify copyright ownership of student-uploaded assets."
    },
    {
      title: "14. Force Majeure & Campus Schedule Disruptions",
      content: "In cases of national lockdowns, natural disasters, severe weather, or state shutdowns, college schedule announcements are updated. CMPI is not liable for delay claims in digital alerts."
    },
    {
      title: "15. Limitation of Legal Liabilities",
      content: "Under no circumstances shall CMPI or its systems managers be held liable for any damages (including data corruption, business disruption, or financial loss) arising from using this digital platform."
    },
    {
      title: "16. User Registration Abuse Penalties",
      content: "Attempting to registers profiles using fake registration rolls, hacking administrative pages, or spamming comment blocks will lead to immediate portal access suspension and college discipline reviews."
    },
    {
      title: "17. Governing Law and Arbitration Disputes",
      content: "This digital platform policy is governed by the laws of Bangladesh. Any claims or disputes regarding platform performance must be submitted to the IT Arbitration desk of CMPI."
    },
    {
      title: "18. Contact Information for Digital Disclaimers",
      content: "For error reports, security audits, or feedback regarding website statements, please contact: Office of the Principal, Cox's Bazar Model Polytechnic Institute, College Road, Cox's Bazar 4750, Bangladesh. Email: info@cmpi.edu.bd."
    }
  ];

  return (
    <PageTransition className="container section-pad">
      <SEO title="Disclaimer" description="General disclaimer and liability limitations for CMPI." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Disclaimer" description="Last updated: June 2026" align="left" className="mb-8" />
        
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 text-primary border border-primary/20">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">Click on any section header to expand and read the details of our Disclaimer.</p>
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
