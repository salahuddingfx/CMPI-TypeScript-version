import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Accessibility() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Accessibility" description="Accessibility statement for the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Accessibility Statement" description="Last updated: June 2026" align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">

          <h3 className="text-lg font-bold text-foreground">1. Our Commitment</h3>
          <p>Cox's Bazar Model Polytechnic Institute (CMPI) is committed to ensuring that its website is accessible to the widest possible audience, regardless of technology, ability, or circumstance. We actively work to improve the accessibility and usability of our website by following recognized guidelines and best practices.</p>

          <h3 className="text-lg font-bold text-foreground">2. Accessibility Standards</h3>
          <p>Our website is designed and developed with reference to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines help make web content more accessible to people with disabilities including visual impairments, hearing loss, motor disabilities, and cognitive challenges. While we strive for conformance, some older content or third-party materials may not fully meet these standards.</p>

          <h3 className="text-lg font-bold text-foreground">3. Features for Accessibility</h3>
          <p>The CMPI website includes the following accessibility features:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Semantic HTML Structure:</strong> Proper use of headings, landmarks, and ARIA labels to support screen readers and assistive technologies.</li>
            <li><strong className="text-foreground">Keyboard Navigation:</strong> All interactive elements including menus, buttons, forms, and links are fully operable using a keyboard alone (Tab, Enter, Escape, arrow keys).</li>
            <li><strong className="text-foreground">Responsive Design:</strong> The website adapts to different screen sizes and orientations including desktop, tablet, and mobile devices.</li>
            <li><strong className="text-foreground">Color Contrast:</strong> Text and background colors are selected to maintain sufficient contrast ratios for readability.</li>
            <li><strong className="text-foreground">Dark Mode Support:</strong> Users can switch to a dark theme for reduced eye strain in low-light environments.</li>
            <li><strong className="text-foreground">Alternative Text:</strong> Images include descriptive alt text where appropriate to convey meaning to screen reader users.</li>
            <li><strong className="text-foreground">Scalable Text:</strong> Text can be resized using browser zoom without loss of content or functionality.</li>
            <li><strong className="text-foreground">Focus Indicators:</strong> Clear visual focus indicators are provided for keyboard navigation.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">4. Known Limitations</h3>
          <p>We are aware of the following areas that may present accessibility challenges:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Some PDF documents (notices, forms) may not be fully accessible to screen readers. We recommend contacting the office for alternative formats.</li>
            <li>Third-party content embedded from external platforms may not fully comply with accessibility standards.</li>
            <li>Older archived content may not have been created with accessibility in mind.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">5. Ongoing Improvements</h3>
          <p>Accessibility is an ongoing effort at CMPI. We regularly review our website content and features to identify and address accessibility barriers. Our development team follows accessibility best practices when building new features and updating existing content. We also provide accessibility training to our content contributors.</p>

          <h3 className="text-lg font-bold text-foreground">6. Browser and Technology Support</h3>
          <p>The CMPI website supports the latest versions of major browsers including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Apple Safari</li>
            <li>Microsoft Edge</li>
          </ul>
          <p>We recommend using the latest version of your preferred browser for the best experience. The website also supports common assistive technologies including screen readers (JAWS, NVDA, VoiceOver) and speech recognition software.</p>

          <h3 className="text-lg font-bold text-foreground">7. Feedback and Support</h3>
          <p>We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please let us know. We will make every effort to address your concern in a timely manner.</p>
          <p>To provide feedback or request assistance, you can:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contact us through the <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.</li>
            <li>Email us at info@cmpi.edu.bd.</li>
            <li>Call us at +880 341 000100.</li>
            <li>Visit the institute administrative office in person.</li>
          </ul>
          <p className="mt-4 text-foreground font-semibold">
            Cox's Bazar Model Polytechnic Institute<br />
            Cox's Bazar, Bangladesh
          </p>

        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
