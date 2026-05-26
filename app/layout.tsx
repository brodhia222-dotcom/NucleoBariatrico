import type { Metadata } from "next";
import { fraunces, manrope } from "@/lib/fonts";
import { IMCProvider } from "@/lib/imc-context";
import { LenisProvider } from "@/components/LenisProvider";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { brand } from "@/lib/copy";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: {
    default: `${brand.name} · ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Equipo médico especializado en cirugía bariátrica. Acompañamiento integral antes, durante y después del proceso. Villa del Parque y San Isidro.",
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  keywords: [
    "cirugía bariátrica",
    "obesidad",
    "Argentina",
    "Villa del Parque",
    "San Isidro",
    "bypass gástrico",
    "manga gástrica",
    "equipo médico bariátrico",
  ],
  openGraph: {
    title: `${brand.name} · ${brand.tagline}`,
    description: "Acompañamiento médico integral para cirugía bariátrica.",
    url: `https://${brand.domain}`,
    siteName: brand.name,
    locale: "es_AR",
    type: "website",
  },
  robots: { index: false, follow: false }, // PENDIENTE: cambiar a true antes del deploy
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: brand.name,
  description: "Equipo médico especializado en cirugía bariátrica",
  url: `https://${brand.domain}`,
  medicalSpecialty: "Bariatrics",
  areaServed: { "@type": "Country", name: "Argentina" },
  location: [
    {
      "@type": "Place",
      name: "Villa del Parque",
      address: { "@type": "PostalAddress", addressLocality: "CABA", addressCountry: "AR" },
    },
    {
      "@type": "Place",
      name: "San Isidro",
      address: { "@type": "PostalAddress", addressLocality: "San Isidro", addressCountry: "AR" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IMCProvider>
          <LenisProvider />
          {children}
          <WhatsAppFloat />
        </IMCProvider>
      </body>
    </html>
  );
}
