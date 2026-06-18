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
          <p>CMPI respects the privacy of students, guardians, faculty, and website visitors. This policy explains how information is collected and used when you visit this website.</p>
          <p>We may collect basic information such as name, email address, phone number, and inquiry details when you submit a contact form or admission-related request.</p>
          <p>The collected information is used to respond to inquiries, provide admission guidance, publish official notices, and improve website services.</p>
          <p>We do not sell, rent, or trade your personal information to third parties. Information may be shared only when required for official academic, administrative, or legal purposes.</p>
          <p>The website may use cookies to improve user experience, remember preferences, and analyze basic traffic information.</p>
          <p>For privacy-related questions, contact the CMPI administration through the Contact page.</p>
        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
