import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/features/ContactForm";
import { InfoCard } from "@/components/features/InfoCard";
import { MapPanel } from "@/components/features/MapPanel";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { institute } from "@/utils/constants";

export function Contact() {
  return (
    <PageTransition>
      <SEO title="Contact" description="Contact Cox's Bazar Model Polytechnic Institute for admission, academic, and administrative inquiries." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Contact Information"
          title="Reach the CMPI administration"
          description="Use the contact details, campus map, or inquiry form to get in touch with the institute."
          align="left"
        />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <InfoCard icon={MapPin} title="Address" value={institute.address} />
            <InfoCard icon={Phone} title="Phone" value={institute.phone} href={`tel:${institute.phone}`} />
            <InfoCard icon={Mail} title="Email" value={institute.email} href={`mailto:${institute.email}`} />
          </div>
          <div className="rounded-sm border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Send a Message</h2>
            <p className="mt-2 text-muted-foreground">Provide your inquiry details and the relevant office will respond according to official procedures.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <MapPanel />
        </div>
      </section>
    </PageTransition>
  );
}
