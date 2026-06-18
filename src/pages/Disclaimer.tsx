import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Disclaimer() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Disclaimer" description="Disclaimer for the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Disclaimer" description="Information accuracy and website usage notice." align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">
          <p>The information published on this website is provided for general educational and administrative purposes.</p>
          <p>CMPI makes reasonable efforts to keep notices, routines, admission details, and academic information accurate and up to date.</p>
          <p>Official circulars, BTEB notifications, and institute office announcements should be treated as final authority in case of any difference.</p>
          <p>CMPI is not responsible for errors caused by delayed updates, third-party links, browser issues, or temporary technical interruptions.</p>
          <p>Users are encouraged to verify important information with the relevant academic or administrative office before taking action.</p>
        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
