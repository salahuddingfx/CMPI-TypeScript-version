import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function RefundPolicy() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Refund Policy" description="Refund policy for CMPI admission and institutional services." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Refund Policy" description="Last updated: June 2026" align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">

          <h3 className="text-lg font-bold text-foreground">1. General Policy</h3>
          <p>This Refund Policy applies to fees and payments collected by Cox's Bazar Model Polytechnic Institute (CMPI) including admission fees, tuition fees, examination fees, and other institutional charges. All refunds are processed in accordance with institute rules, Bangladesh Technical Education Board (BTEB) regulations, and applicable government policies.</p>

          <h3 className="text-lg font-bold text-foreground">2. Admission Fees</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Before Orientation:</strong> If a student withdraws admission before the official orientation date, the admission fee may be refunded after deducting a processing fee as determined by institute policy.</li>
            <li><strong className="text-foreground">After Orientation:</strong> Once the academic orientation is conducted, admission fees are generally non-refundable. However, exceptional cases may be reviewed by the admission committee.</li>
            <li><strong className="text-foreground">Cancellation by Institute:</strong> If CMPI cancels a seat or program due to insufficient enrollment or administrative reasons, the full admission fee will be refunded.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">3. Tuition Fees</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Before Semester Start:</strong> Tuition fees paid before the start of a semester may be refundable up to 90% if withdrawal is requested before classes begin.</li>
            <li><strong className="text-foreground">During Semester:</strong> Refund requests during an ongoing semester are reviewed on a case-by-case basis. Fees for completed portions of the semester are generally not refundable.</li>
            <li><strong className="text-foreground">Medical or Emergency Withdrawal:</strong> Students withdrawing due to medical emergencies or unavoidable circumstances may submit supporting documents for special consideration.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">4. Examination Fees</h3>
          <p>Examination fees once paid are generally non-refundable as they are submitted to the Bangladesh Technical Education Board (BTEB) on behalf of the student. If an examination is cancelled by the board or institute, the fee will be adjusted or refunded as per BTEB directives.</p>

          <h3 className="text-lg font-bold text-foreground">5. Payment Errors and Duplicate Payments</h3>
          <p>If a payment is made in error (e.g., wrong amount, duplicate payment, incorrect account), the institute will refund the excess or incorrect amount after verification. Applicants must provide payment receipts and transaction details for verification. Refunds for erroneous payments are typically processed within 15 to 30 working days.</p>

          <h3 className="text-lg font-bold text-foreground">6. Refund Process</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Submit a written refund application to the institute office with supporting documents (payment receipt, student ID, reason for refund).</li>
            <li>The application is reviewed by the accounts department and the relevant academic authority.</li>
            <li>If approved, the refund is processed through bank transfer or cash payment as per institute policy.</li>
            <li>Processing time may vary depending on the volume of requests and verification requirements.</li>
          </ol>

          <h3 className="text-lg font-bold text-foreground">7. Non-Refundable Items</h3>
          <p>The following are generally non-refundable:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Application processing fees.</li>
            <li>Late fee charges.</li>
            <li>Library fines and penalties.</li>
            <li>Laboratory usage fees for completed practical sessions.</li>
            <li>ID card replacement fees.</li>
            <li>Donations or voluntary contributions to the institute.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">8. Payment of Refunds</h3>
          <p>Refunds will be paid in Bangladeshi Taka (BDT). Refunds are typically processed via:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Bank transfer to the student's or guardian's bank account.</li>
            <li>Cash payment at the institute accounts office (for small amounts).</li>
            <li>Adjustment against future fees, if preferred by the applicant.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">9. Dispute Resolution</h3>
          <p>Any dispute regarding fee refunds shall be resolved internally by the institute's refund committee. If not satisfied, applicants may escalate the matter to the governing body of CMPI. Legal recourse may be pursued in accordance with the laws of Bangladesh.</p>

          <h3 className="text-lg font-bold text-foreground">10. Policy Updates</h3>
          <p>CMPI reserves the right to amend this Refund Policy at any time without prior notice. Changes will be posted on this page with an updated revision date. Students and guardians are encouraged to check this page periodically.</p>

          <h3 className="text-lg font-bold text-foreground">11. Contact Information</h3>
          <p>For refund-related inquiries, please contact:</p>
          <p className="text-foreground font-semibold">
            Accounts Office<br />
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
