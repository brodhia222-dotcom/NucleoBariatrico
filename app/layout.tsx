import type { Metadata } from "next";
import { fraunces, manrope } from "@/lib/fonts";
import { IMCProvider } from "@/lib/imc-context";
import { NavStyleProvider } from "@/lib/nav-style-context";
import { LenisProvider } from "@/components/LenisProvider";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { ThemePicker } from "@/components/ui/ThemePicker";
import { NavStylePicker } from "@/components/ui/NavStylePicker";
import { brand } from "@/lib/copy";
import { themes } from "@/lib/themes";
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
  robots: { index: false, follow: false },
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

// Pre-paint theme application — evita flash del tema "default" antes de que
// React hidrate y aplique el guardado en localStorage.
const themeBootstrapScript = `
(function() {
  try {
    var stored = localStorage.getItem('nucleo-theme');
    var themes = ${JSON.stringify(Object.fromEntries(themes.map((t) => [t.key, t.vars])))};
    var key = themes[stored] ? stored : 'manual';
    var vars = themes[key];
    var root = document.documentElement;
    Object.keys(vars).forEach(function(k){ root.style.setProperty(k, vars[k]); });
    root.setAttribute('data-theme', key);
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IMCProvider>
          <NavStyleProvider>
            <LenisProvider />
            {children}
            <WhatsAppFloat />
            <ThemePicker />
            <NavStylePicker />
          </NavStyleProvider>
        </IMCProvider>
      </body>
    </html>
  );
}
