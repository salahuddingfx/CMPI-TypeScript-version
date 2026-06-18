import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function TermsAndConditions() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Terms & Conditions" description="Terms and conditions for using the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Terms & Conditions" description="Rules for using the official CMPI website." align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">
          <p>By using this website, you agree to access and use the content only for lawful, educational, and informational purposes.</p>
          <p>All notices, circulars, admission information, routines, and results published on this website should be verified with official institute communications.</p>
          <p>CMPI may update, remove, or change website content at any time without prior notice to keep information accurate and current.</p>
          <p>Users must not misuse the website, attempt unauthorized access, upload harmful content, or interfere with website services.</p>
          <p>CMPI is not responsible for temporary unavailability caused by maintenance, network issues, or third-party service interruptions.</p>
          <p>External links are provided for convenience only. CMPI does not control third-party websites and is not responsible for their content.</p>
        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
