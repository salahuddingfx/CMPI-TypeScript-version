import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  keywords?: string[];
  jsonLd?: Record<string, any>;
}

const defaultJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Cox's Bazar Model Polytechnic Institute",
  alternateName: "CMPI",
  url: "https://www.cmpi.edu.bd",
  logo: "https://www.cmpi.edu.bd/CMPI.png",
  description: "Excellence in Technical Education",
  address: {
    "@type": "PostalAddress",
    streetAddress: "College Road",
    addressLocality: "Cox's Bazar",
    postalCode: "4750",
    addressCountry: "BD",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+880-341-000000",
    contactType: "admissions",
    email: "info@cmpi.edu.bd",
  },
  sameAs: [
    "https://facebook.com/cmpi",
    "https://youtube.com/cmpi",
    "https://linkedin.com/company/cmpi",
  ],
};

export function SEO({ title, description, canonical, image, keywords = [], jsonLd }: SEOProps) {
  const fullTitle = `${title} | Cox's Bazar Model Polytechnic Institute`;
  const ogImage = image || "https://www.cmpi.edu.bd/og-default.png";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="CMPI" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
    </Helmet>
  );
}
