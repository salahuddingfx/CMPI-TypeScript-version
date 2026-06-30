import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ChevronDown, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookiePolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    {
      title: "1. Definition of Web Browser Cookies",
      content: "Cookies are small, secure text documents written by web servers to your internet browsing browser (such as Chrome, Safari, Edge) when loading a page. They store unique tags, login states, and user setup parameters. Cookies cannot read files on your local hard drive, run software, or execute commands."
    },
    {
      title: "2. The Role of First-Party vs. Third-Party Cookies",
      content: "First-party cookies are set directly by the cmpi.edu.bd server. They are secure and utilized for active sessions. Third-party cookies would be set by external modules. Currently, CMPI does not permit third-party trackers, pixels, or profiling networks on our platforms."
    },
    {
      title: "3. Core Purposes of Cookies on the CMPI Portal",
      content: "We use cookies to maintain user accounts, protect student data entries, handle browser styling modes, optimize server responses, and log diagnostic failures anonymized. We do not use cookies for targeted marketing or ads."
    },
    {
      title: "4. Strictly Necessary Authentication Tokens",
      content: "The cookie key `cmpi_session_token` acts as a secure container for your JSON Web Token (JWT). It verifies your active login status when loading private dashboard panels. Without this token, you would have to log in on every single click."
    },
    {
      title: "5. Cross-Site Request Forgery (CSRF) Prevention",
      content: "To protect forms against CSRF exploits, we use the `cmpi_csrf_secure` token. This cookie validates that form submittals (like payment uploads or routine queries) originate directly from your authenticated browser, blocking external automated bots."
    },
    {
      title: "6. Saving User Preferences and Theme Toggles",
      content: "The cookie key `cmpi_theme_mode` records your preference for light mode or dark mode styles. This prevents UI flashes on page loads and guarantees your preferred color scheme is preserved persistently."
    },
    {
      title: "7. Remember Me Functional Credentials",
      content: "If you check 'Remember Me' on the login screen, we write the `cmpi_remember_username` cookie. This stores your encrypted student ID or email on your local browser for up to 7 days, allowing for faster logins."
    },
    {
      title: "8. Anonymized Aggregate Visitor Metrics",
      content: "We collect minimal performance details (such as total page clicks and load speeds) using local session variables. This information does not contain student names, email IDs, or IP locations and is used strictly to improve server efficiency."
    },
    {
      title: "9. Session Cookies vs. Persistent Storage",
      content: "Session cookies (like auth tokens) are transient and are purged immediately when you exit the browser or clear active tabs. Persistent cookies (like theme choices) remain on your local disk for a specified duration unless cleared manually."
    },
    {
      title: "10. Comprehensive Catalog of Active Cookies",
      content: "Our active cookies include: cmpi_session_token (Essential, session-long), cmpi_csrf_secure (Security, session-long), cmpi_remember_username (Functional, 7 days), cmpi_theme_mode (Functional, 1 year), and cmpi_cookie_acceptance (Necessary, 7 days)."
    },
    {
      title: "11. Google Chrome Cookie Preferences Guide",
      content: "To manage cookies on Google Chrome: Open settings &gt; Privacy and security &gt; Site settings &gt; Cookies and site data. You can delete existing cookies, block specific sites, or disable all cookies entirely."
    },
    {
      title: "12. Mozilla Firefox Cookie Options Guide",
      content: "To configure Firefox: Select Options &gt; Privacy &amp; Security &gt; Browser Privacy. Choose Standard, Strict, or Custom configurations. You can purge all local site cookies under Cookies and Site Data."
    },
    {
      title: "13. Apple Safari Cookie Settings Guide",
      content: "To update Safari: Select Preferences &gt; Privacy &gt; Prevent cross-site tracking and Block all cookies. Safari automatically clears unused persistent cookies after a set duration of inactivity."
    },
    {
      title: "14. Microsoft Edge Cookie Controls Guide",
      content: "To control Edge: Select Settings &gt; Cookies and site permissions &gt; Manage and delete cookies and site data. Edge supports blocking third-party tracking cookies by default."
    },
    {
      title: "15. Cookie Consent Acceptance Banner",
      content: "When first loading our public pages, you will see a cookie consent banner. Clicking 'Accept' sets the `cmpi_cookie_acceptance` cookie, which hides the notification bar on subsequent pages for 7 days."
    },
    {
      title: "16. Impact of Disabling All Browser Cookies",
      content: "If you completely block cookies, you can still view public notice boards, routines, and contact info. However, you will not be able to log in to the student dashboard, view bills, or download ID cards."
    },
    {
      title: "17. Secure Hashing of Local Cookies",
      content: "To prevent cookie hijacking, all first-party session variables written by our backend are encrypted and marked with HTTPOnly and Secure flags when deployed in production, preventing javascript scripts from accessing them."
    },
    {
      title: "18. IT Department Cookie Support Contacts",
      content: "For questions about website cookies, security hashes, or login errors, please reach out to: Systems Operations Division, Cox's Bazar Model Polytechnic Institute, College Road, Cox's Bazar 4750, Bangladesh. Email: it-support@cmpi.edu.bd."
    }
  ];

  return (
    <PageTransition className="container section-pad">
      <SEO title="Cookie Policy" description="Detailed cookie policy for CMPI website and portals." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Cookie Policy" description="Last updated: June 2026" align="left" className="mb-8" />
        
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 text-primary border border-primary/20">
          <Cookie className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">Click on any section header to expand and read the details of our Cookie Policy.</p>
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
