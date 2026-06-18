import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function RefundPolicy() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Refund Policy" description="Refund policy for CMPI admission and institutional services." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Refund Policy" description="General refund and fee adjustment guidelines." align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">
          <p>Admission fees, tuition fees, examination fees, and other institutional charges are handled according to official CMPI circulars and Bangladesh Technical Education Board guidelines.</p>
          <p>Refund or fee adjustment requests must be submitted to the appropriate office with required documents and written application.</p>
          <p>CMPI may review refund requests based on admission status, payment records, institutional rules, and applicable government regulations.</p>
          <p>Once an academic session or service period begins, fees may not be refundable unless approved by the competent authority.</p>
          <p>Applicants and students should keep payment receipts, admission documents, and official notices for future verification.</p>
          <p>For specific refund inquiries, contact the CMPI administration through the Contact page.</p>
        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
