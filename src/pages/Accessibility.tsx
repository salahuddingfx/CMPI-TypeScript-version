import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Accessibility() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Accessibility" description="Accessibility statement for the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Accessibility Statement" description="CMPI is working to make the website easier to use for everyone." align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">
          <p>CMPI aims to provide an accessible website that supports students, guardians, faculty, and visitors using different devices and assistive technologies.</p>
          <p>The website uses semantic structure, readable content, keyboard-friendly controls, and responsive layouts for mobile, tablet, laptop, and desktop screens.</p>
          <p>If you face difficulty accessing any content or feature, please contact the administration with details of the issue.</p>
          <p>CMPI will review accessibility feedback and improve the website where practical and possible.</p>
          <p>For accessibility support, use the Contact page or email the institute administration.</p>
        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
