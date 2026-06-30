import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function CookiePolicy() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Cookie Policy" description="Cookie policy for the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Cookie Policy" description="Last updated: June 2026" align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">

          <h3 className="text-lg font-bold text-foreground">1. Comprehensive Definition of Cookies</h3>
          <p>Cookies are minute, secure text files that contain unique identifiers sent by web servers to your internet browser (e.g., Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) when you load a website. These files are stored on your local hard drive or device memory. Cookies serve critical purposes such as remembering user states, storing authentication tokens, preventing cross-site request forgery (CSRF) security attacks, and facilitating custom system preferences. Cookies are inactive data stores; they cannot execute code, infect your computer with malware, or access files on your device.</p>

          <h3 className="text-lg font-bold text-foreground">2. Classification of Cookies We Utilize</h3>
          <p>Cox's Bazar Model Polytechnic Institute (CMPI) uses various types of first-party cookies to manage secure sessions, ensure database load balancing, and remember user display configurations. These cookies are categorized as follows:</p>
          <div className="space-y-4 pl-4 border-l-2 border-primary/20">
            <div>
              <h4 className="font-semibold text-foreground">A. Strictly Necessary & Security Cookies</h4>
              <p className="text-sm">These cookies are essential for the operation of the portals. They manage your login states, prevent unauthorized session duplication, and handle Cross-Site Request Forgery (CSRF) verification. Blocking these cookies via browser configurations will make it impossible to log in to the student dashboard, submit assignments, or verify payment logs.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">B. User Preference & Functional Cookies</h4>
              <p className="text-sm">Functional cookies permit the website to remember choices you make during your sessions. This includes remembering your selected theme (dark or light mode), your language choice, and saving your email address on the login form if you check "Remember Me". This enhances speed and usability.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">C. Performance & Anonymized Analytics Cookies</h4>
              <p className="text-sm">We collect aggregate, non-personally identifiable navigation metrics (such as pages clicked, duration spent on notice panels, and browser dimensions) to optimize the design, layout, and device compatibility of our public portals. We do not use advertising or tracking cookies for commercial marketing.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground">3. Exhaustive Catalog of Active Cookies</h3>
          <p>The table below lists the details of the first-party cookies that our web servers may write to your browser during your interaction with our platforms:</p>
          <div className="overflow-x-auto my-4 border rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">Cookie Key</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Detailed Technical Purpose</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Lifespan & Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4 font-mono text-xs text-primary">cmpi_session_token</td>
                  <td className="py-3 px-4 text-xs font-semibold">Strictly Necessary</td>
                  <td className="py-3 px-4">Stores JWT authentication tokens to permit access to the secure Student and Faculty dashboard views.</td>
                  <td className="py-3 px-4">Session-based (deleted when browser closes)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs text-primary">cmpi_csrf_secure</td>
                  <td className="py-3 px-4 text-xs font-semibold">Security (Essential)</td>
                  <td className="py-3 px-4">Protects forms against CSRF injection attacks by validating secure submission keys.</td>
                  <td className="py-3 px-4">Session-based</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs text-primary">cmpi_remember_username</td>
                  <td className="py-3 px-4 text-xs font-semibold">Functional Preference</td>
                  <td className="py-3 px-4">Saves the student ID/email on the login card to save typing time for future logins.</td>
                  <td className="py-3 px-4">7 Days (Auto-renews on login)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs text-primary">cmpi_theme_mode</td>
                  <td className="py-3 px-4 text-xs font-semibold">Functional Preference</td>
                  <td className="py-3 px-4">Saves your preferred UI style toggle (light mode vs. dark mode stylesheet).</td>
                  <td className="py-3 px-4">Persistent (365 Days)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs text-primary">cmpi_cookie_acceptance</td>
                  <td className="py-3 px-4 text-xs font-semibold">Strictly Necessary</td>
                  <td className="py-3 px-4">Saves your decision on the cookie consent notification bar to prevent showing it again.</td>
                  <td className="py-3 px-4">7 Days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-foreground">4. Strict Absence of Third-Party Ad Tracking</h3>
          <p>Unlike commercial portals, CMPI does not permit Google AdSense, DoubleClick, Facebook Pixel, or other third-party programmatic tracking networks to set cookies or tracking pixels on your devices. Your browsing history on the CMPI portal remains private and is never sold, analyzed, or shared with external advertising companies.</p>

          <h3 className="text-lg font-bold text-foreground">5. Detailed User Control & Browser Configuration Guide</h3>
          <p>You can manage, restrict, block, or purge cookies stored on your computer at any time. All major browsers provide granular settings to control this:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Chrome:</strong> Go to Settings &gt; Privacy and Security &gt; Cookies and other site data. Here, you can block all cookies, third-party cookies, or clear history.</li>
            <li><strong>Mozilla Firefox:</strong> Go to Options &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection. You can set it to Standard, Strict, or Custom.</li>
            <li><strong>Apple Safari:</strong> Go to Preferences &gt; Privacy &gt; Block all cookies.</li>
            <li><strong>Microsoft Edge:</strong> Go to Settings &gt; Cookies and site permissions &gt; Manage and delete cookies and site data.</li>
          </ul>
          <p>Note: If you clear or disable strictly necessary cookies, you will be automatically logged out of the CMPI student dashboard, and you will have to re-enter your credentials and preferences on your next visit.</p>

          <h3 className="text-lg font-bold text-foreground">6. Modifications to our Cookie Practices</h3>
          <p>We may periodically update this Cookie Policy to align with technological advances in web browsers, new web application updates, or cyber security laws. When changes are made, the "Last updated" date at the top of the policy will be updated accordingly.</p>

          <h3 className="text-lg font-bold text-foreground">7. Contact the System Administration</h3>
          <p>If you have any questions or require support regarding our cookie configurations or security practices, please contact the CMPI System Administrator:</p>
          <p className="text-foreground font-semibold">
            System & IT Administration Department<br />
            Cox's Bazar Model Polytechnic Institute<br />
            College Road, Cox's Bazar 4750, Bangladesh<br />
            Official Email: it-support@cmpi.edu.bd / info@cmpi.edu.bd<br />
            Landline: +880 341 62512 | Phone: +880 1812 000000
          </p>

        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
