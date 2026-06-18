import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function CookiePolicy() {
  return (
    <PageTransition className="container section-pad">
      <SEO title="Cookie Policy" description="Cookie policy for the CMPI website." />
      <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
        <SectionHeader title="Cookie Policy" description="How cookies are used on this website." align="left" className="mb-8" />
        <div className="space-y-5 leading-7 text-muted-foreground">
          <p>This website may use cookies to improve performance, remember user preferences, and understand how visitors use the site.</p>
          <p>Cookies are small text files stored on your device. They help the website function smoothly and provide a better browsing experience.</p>
          <p>We may use necessary cookies for website operation and analytics cookies to understand page visits, traffic sources, and popular content.</p>
          <p>You can control or disable cookies through your browser settings. Some website features may not work properly if cookies are disabled.</p>
          <p>By continuing to use this website, you consent to the use of cookies as described in this policy.</p>
        </div>
        <Link to="/" className="mt-8 inline-flex font-bold text-primary hover:underline">Back to Home</Link>
      </article>
    </PageTransition>
  );
}
