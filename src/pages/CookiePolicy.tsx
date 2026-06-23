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

          <h3 className="text-lg font-bold text-foreground">1. What Are Cookies</h3>
          <p>Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work efficiently, remember user preferences, and provide useful information to website owners. Cookies do not contain viruses or malicious code.</p>

          <h3 className="text-lg font-bold text-foreground">2. How We Use Cookies</h3>
          <p>CMPI uses cookies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Essential / Necessary Cookies:</strong> These are required for the website to function properly. They enable user authentication, secure login sessions, and access to protected areas like the student dashboard. Without these cookies, certain services cannot be provided.</li>
            <li><strong className="text-foreground">Preference Cookies:</strong> These remember your choices such as theme preference (light/dark mode), language selection, and form data. They improve your browsing experience.</li>
            <li><strong className="text-foreground">Analytics Cookies:</strong> These help us understand how visitors interact with the website, which pages are most popular, and how users navigate the site. This data helps us improve website content and usability.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">3. Cookies We Use</h3>
          <p>The following cookies may be set on your device when you use our website:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-bold text-foreground">Cookie Name</th>
                  <th className="text-left py-2 pr-4 font-bold text-foreground">Type</th>
                  <th className="text-left py-2 pr-4 font-bold text-foreground">Purpose</th>
                  <th className="text-left py-2 font-bold text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">cmpi-token</td>
                  <td className="py-2 pr-4">Essential</td>
                  <td className="py-2 pr-4">User authentication token</td>
                  <td className="py-2">Session</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">cmpi-user</td>
                  <td className="py-2 pr-4">Essential</td>
                  <td className="py-2 pr-4">Stores user profile data for dashboard</td>
                  <td className="py-2">Session</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">cmpi-remember-email</td>
                  <td className="py-2 pr-4">Preference</td>
                  <td className="py-2 pr-4">Remembers your email for faster login</td>
                  <td className="py-2">7 days</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">cmpi-cookie-consent</td>
                  <td className="py-2 pr-4">Essential</td>
                  <td className="py-2 pr-4">Records your cookie consent choice</td>
                  <td className="py-2">7 days</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">cmpi-theme</td>
                  <td className="py-2 pr-4">Preference</td>
                  <td className="py-2 pr-4">Stores theme preference (light/dark)</td>
                  <td className="py-2">Persistent</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-foreground">4. Third-Party Cookies</h3>
          <p>We do not currently use third-party analytics or advertising services that set cookies on your device. If we integrate such services in the future, we will update this policy and seek appropriate consent.</p>

          <h3 className="text-lg font-bold text-foreground">5. Managing Cookies</h3>
          <p>You can control and manage cookies in several ways:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Browser Settings:</strong> Most web browsers allow you to view, block, or delete cookies through their settings. Instructions vary by browser (Chrome, Firefox, Safari, Edge).</li>
            <li><strong className="text-foreground">Cookie Consent Banner:</strong> When you first visit our website, a cookie consent banner gives you the option to Accept or Deny non-essential cookies.</li>
            <li><strong className="text-foreground">Withdraw Consent:</strong> You can withdraw your consent at any time by clearing your browser cookies. A fresh consent banner will appear on your next visit.</li>
          </ul>
          <p>Please note that blocking essential cookies may prevent certain features of the website from functioning correctly, including login and dashboard access.</p>

          <h3 className="text-lg font-bold text-foreground">6. Changes to This Policy</h3>
          <p>This Cookie Policy may be updated periodically to reflect changes in our practices or legal requirements. The latest revision date is displayed at the top of this page. We encourage you to review this policy from time to time.</p>

          <h3 className="text-lg font-bold text-foreground">7. Contact Us</h3>
          <p>If you have any questions about our use of cookies, please contact us:</p>
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
