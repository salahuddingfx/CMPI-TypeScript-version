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

          <h3 className="text-lg font-bold text-foreground">1. Comprehensive Institutional Policy Overview</h3>
          <p>This document governs the processing of refunds and adjustments for all financial payments collected by Cox's Bazar Model Polytechnic Institute (CMPI). This includes, but is not limited to, new admission fees, tuition fees, semester final exam fees, laboratory usage charges, hostel fee deposits, and extracurricular club subscriptions. All claims for refunds must comply with the rules established by the Governing Body of CMPI, the Ministry of Education, and the Bangladesh Technical Education Board (BTEB).</p>

          <h3 className="text-lg font-bold text-foreground">2. Admission Fee Refund Clauses</h3>
          <p>Admission fees cover the administrative cost of processing registration papers, creating permanent server nodes, and securing seat allocations under BTEB limits. Refund terms are strictly tied to key academic dates:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Withdrawal Before the Official Orientation Class:</strong> If an admitted applicant submits a formal seat cancellation request in writing at least seven (7) calendar days prior to the official orientation date, they are eligible for a refund of their tuition deposits, minus an administrative processing charge of 10% of the total paid admission fee.</li>
            <li><strong>Withdrawal After the Orientation Date:</strong> Once classes commence or orientation is completed, the registration files are submitted to the BTEB central databases. Consequently, the core admission fee becomes entirely non-refundable and non-transferable under any circumstances.</li>
            <li><strong>Seat Cancellation by the Institute:</strong> If CMPI is forced to cancel an academic program, session technology, or individual seat selection due to administrative issues or regulatory decisions by the Ministry of Education, the applicant will receive a full 100% refund of all fees paid, processed within fifteen (15) working days.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">3. Tuition Fee Refund & Adjustment Tiers</h3>
          <p>Tuition fees are charged per semester. If a student decides to withdraw from the institute or take a semester break, tuition fees are refunded or adjusted based on the following schedule from the date of official class start:</p>
          <div className="overflow-x-auto my-4 border rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">Timeframe of Official Request</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Refund Percentage</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Method of Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4">Before the start of the first week of classes</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">90% Refund</td>
                  <td className="py-3 px-4">Direct bank transfer to guardian's verified bank account</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Within the first 1 to 2 weeks of classes</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">50% Refund</td>
                  <td className="py-3 px-4">Direct bank transfer or adjusted as credit for next session</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Within the 3rd to 4th week of classes</td>
                  <td className="py-3 px-4 text-amber-600 font-semibold">25% Refund</td>
                  <td className="py-3 px-4">Adjusted as credit for the following semester only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">After the 4th week of classes</td>
                  <td className="py-3 px-4 text-red-600 font-semibold">0% Refund</td>
                  <td className="py-3 px-4">Fees remain fully due and non-refundable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-foreground">4. BTEB Board Examination & Form Fill-up Fees</h3>
          <p>Fees collected for Board Examinations and Board Registration Form Fill-up are direct payments processed and submitted directly to the treasury of the Bangladesh Technical Education Board (BTEB) on behalf of the student. Once these forms are submitted to BTEB, these fees are **100% non-refundable and non-adjustable** as the funds are no longer held by the institute. Any dispute regarding examination cancellations must be referred to BTEB central authorities.</p>

          <h3 className="text-lg font-bold text-foreground">5. Non-Refundable Administrative Items</h3>
          <p>The following categories of institutional fees are strictly excluded from refund claims under any circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Public Admission Form & Prospectus purchase charges.</li>
            <li>Late payment penalties, fines, and re-admission charges.</li>
            <li>Library fines for overdue, damaged, or lost books.</li>
            <li>Fees paid for issuing transcripts, duplicate ID cards, recommendation letters, or duplicate certificates.</li>
            <li>Monthly Hostel/Dormitory rent once the room has been occupied.</li>
          </ul>

          <h3 className="text-lg font-bold text-foreground">6. Step-by-Step Refund Application & Audit Process</h3>
          <p>To request a refund, students and guardians must strictly follow the institutional auditing workflow:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Submit Application:</strong> Obtain and fill out the "Official Fee Refund Claim Form" from the Registrar's Office. Attach the original payment receipts, student ID card copy, and a written letter of clearance signed by the Head of the Department (HoD).</li>
            <li><strong>Account Auditing:</strong> The Accounts Department will audit the student's billing record to verify the payment matches the bank statement or cash counter log.</li>
            <li><strong>Academic Board Clearance:</strong> The application is forwarded to the Academic Committee to verify attendance percentages and academic eligibility.</li>
            <li><strong>Disbursal:</strong> Upon approval by the Principal, the refund check will be issued in the name of the registered guardian or disbursed via direct electronic bank transfer (EFT) within thirty (30) working days.</li>
          </ol>

          <h3 className="text-lg font-bold text-foreground">7. Error Adjustments & Duplicate Payments</h3>
          <p>In the event that a student or guardian makes a duplicate payment, enters an incorrect bill amount, or experiences a network error during online payment, the payer must immediately report the issue with the transaction ID (TrxID) and transaction screenshot. Verified excess payments will either be refunded in full or adjusted as credit against the student's next semester dues, based on the guardian's written preference.</p>

          <h3 className="text-lg font-bold text-foreground">8. Contact the Accounts & Cashier Office</h3>
          <p>For inquiries regarding refund status, billing disputes, or payment errors, please contact the Accounts Office:</p>
          <p className="text-foreground font-semibold">
            Accounts & Finance Department (Disbursal Unit)<br />
            Cox's Bazar Model Polytechnic Institute<br />
            College Road, Cox's Bazar 4750, Bangladesh<br />
            Official Email: accounts@cmpi.edu.bd / info@cmpi.edu.bd<br />
            Landline: +880 341 62512 | Phone: +880 1812 000000
          </p>

        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
