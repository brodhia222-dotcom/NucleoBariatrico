import type { Metadata } from "next";
import { fraunces, manrope } from "@/lib/fonts";
import { IMCProvider } from "@/lib/imc-context";
import { LenisProvider } from "@/components/LenisProvider";
import { Analytics } from "@/components/Analytics";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { brand } from "@/lib/copy";
import { publicado } from "@/lib/entorno";
import "./globals.css";

// Base de las URLs para compartir. En Vercel usa el dominio real del deploy (el de producción, o el link del
// preview): hasta que nucleobariatrico.com.ar esté conectado, apuntar ahí deja el link sin vista previa.
const sitio =
  process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_BRANCH_URL
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : `https://${brand.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(sitio),
  title: {
    default: `Cirugía bariátrica en CABA y Lomas · ${brand.name}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Cirugía bariátrica en Villa del Parque (CABA) y Lomas de Zamora: inyectables, balón, manga, bypass y reganancia de peso. Primera consulta presencial o virtual.",
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  keywords: [
    "cirugía bariátrica",
    "obesidad",
    "Argentina",
    "CABA",
    "Villa del Parque",
    "Lomas de Zamora",
    "zona sur",
    "bypass gástrico",
    "manga gástrica",
    "balón gástrico",
    "reganancia de peso",
    "equipo médico bariátrico",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${brand.name} · ${brand.tagline}`,
    description: "Acompañamiento médico integral para cirugía bariátrica.",
    url: `https://${brand.domain}`,
    siteName: brand.name,
    locale: "es_AR",
    type: "website",
  },
  // Google: solo se habilita en el sitio publicado con su dominio (ver lib/entorno.ts)
  robots: publicado ? { index: true, follow: true } : { index: false, follow: false },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: brand.name,
  description: "Equipo médico especializado en cirugía bariátrica y metabólica",
  url: `https://${brand.domain}`,
  telephone: brand.whatsappNumber,
  ...(brand.email ? { email: brand.email } : {}),
  areaServed: { "@type": "Country", name: "Argentina" },
  sameAs: [brand.instagram],
  // Sede principal en address; las 2 sedes en location. medicalSpecialty no existe en MedicalBusiness.
  address: {
    "@type": "PostalAddress",
    streetAddress: "Simbrón 3327",
    addressLocality: "Villa del Parque, Ciudad Autónoma de Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  location: [
    {
      "@type": "Place",
      name: `${brand.name} · Villa del Parque`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Simbrón 3327",
        addressLocality: "Villa del Parque, Ciudad Autónoma de Buenos Aires",
        addressRegion: "CABA",
        addressCountry: "AR",
      },
    },
    {
      "@type": "Place",
      name: `${brand.name} · Lomas de Zamora`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "General Bartolomé Mitre 185",
        addressLocality: "Lomas de Zamora",
        addressRegion: "Provincia de Buenos Aires",
        addressCountry: "AR",
      },
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
          <Analytics />
          {children}
          <WhatsAppFloat />
        </IMCProvider>
      </body>
    </html>
  );
}
