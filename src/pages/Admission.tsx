import { CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CheckList } from "@/components/features/StatCard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteData } from "@/hooks/useInstituteData";
import { institute } from "@/utils/constants";

const requirements = [
  "SSC or equivalent science group result with required GPA criteria",
  "Citizenship certificate or birth registration document",
  "Recent passport-size photographs",
  "Completed application form and prescribed fee receipt",
  "Academic transcripts and certificates attested when required",
];

const fees = [
  { label: "Admission Form", value: "As per official circular" },
  { label: "Semester Tuition", value: "Government-approved diploma fee structure" },
  { label: "Exam Fee", value: "As per BTEB and institute notice" },
  { label: "Library/Card Services", value: "Nominal institutional charges" },
];

export function Admission() {
  const { data, loading, error } = useInstituteData();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load admission information.</div></PageTransition>;

  return (
    <PageTransition>
      <SEO title="Admission" description="Admission information, requirements, fees, FAQs, and application guidance for Cox's Bazar Model Polytechnic Institute." />
      <section className="container section-pad">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-sm bg-primary p-8 text-white shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Admission Information</p>
            <h1 className="mt-3 text-4xl font-black">Join CMPI for diploma engineering</h1>
            <p className="mt-5 leading-8 text-white/80">
              Admission is conducted according to Bangladesh Technical Education Board guidelines and official institute circulars. Applicants should follow published dates, eligibility criteria, and document requirements.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm bg-white/10 p-4">
                <p className="text-sm text-white/70">Contact</p>
                <p className="font-bold">{institute.phone}</p>
              </div>
              <div className="rounded-sm bg-white/10 p-4">
                <p className="text-sm text-white/70">Email</p>
                <p className="font-bold">{institute.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Application Checklist</h2>
            <ul className="mt-5 space-y-3">
              {requirements.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Requirements" title="Eligibility and documents" align="left" />
            <CheckList items={requirements} />
          </div>
          <div>
            <SectionHeader eyebrow="Fees" title="Fee structure overview" align="left" />
            <div className="rounded-sm border bg-card p-6 shadow-sm">
              <dl className="space-y-4">
                {fees.map((fee) => (
                  <div key={fee.label} className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <dt className="font-semibold">{fee.label}</dt>
                    <dd className="text-right text-sm text-muted-foreground">{fee.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-pad">
        <SectionHeader eyebrow="FAQ" title="Admission frequently asked questions" align="left" />
        <div className="grid gap-4">
          {data.faqs.map((faq) => (
            <details key={faq.question} className="rounded-sm border bg-card p-5 shadow-sm">
              <summary className="cursor-pointer font-bold">{faq.question}</summary>
              <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
