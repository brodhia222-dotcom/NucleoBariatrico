# Nucleo Bariátrico — Landing

Sitio web para el equipo médico de cirugía bariátrica de la Dra. Agustina y Sergio (Villa del Parque + San Isidro).

## Stack

- Next.js 16.2.6 · React 19 · TypeScript · Tailwind v4 (`@theme` block en `app/globals.css`)
- Framer Motion 12 · Lenis 1.3 (smooth scroll)
- three 0.184 + @react-three/fiber + @react-three/drei (escenas 3D del Hero y "No estás solo")
- Resend 6 + Zod 4 (form de contacto)
- Fonts: Fraunces (display, variable) + Manrope (body) vía `next/font/google`

## Scripts

```bash
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
npm run lint
```

## Variables de entorno (ver `.env.example`)

| Var | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend. Si no está, `/api/contact` responde `{ ok: true, devMode: true }`. |
| `CONTACT_TO_EMAIL` | Email destino que recibe los leads. |
| `CONTACT_FROM_EMAIL` | Email "from" verificado en Resend. En dev se puede usar `onboarding@resend.dev`. |

## Estructura

```
app/
  layout.tsx              # fonts, IMCProvider, LenisProvider, WhatsAppFloat, JSON-LD MedicalBusiness
  page.tsx                # compone todas las secciones
  globals.css             # tokens + Tailwind @theme bridge
  api/contact/route.ts    # Resend + Zod + honeypot + rate-limit + IMC en payload
  opengraph-image.tsx     # OG image dinámica
  robots.ts               # noindex hasta aprobación del cliente
components/
  primitives/             # Container, Section, Eyebrow, Hairline, Reveal, WipeWords, Isotipo
  sections/               # Hero, IMCCalculator, Diferencial, Equipo, Proceso, Testimonios,
                          # ObrasSociales, Ubicaciones, NoEstasSolo, FAQ, Contacto, Navbar, Footer
  ui/                     # WhatsAppFloat, MapEmbed
lib/
  copy.ts                 # TODO el copy editable — único archivo a tocar para cambios de texto
  fonts.ts, motion.ts, utils.ts
  imc.ts                  # cálculo + clasificación OMS + criterio bariátrico (≥35/≥40)
  imc-context.tsx         # React Context para persistir el IMC entre secciones
```

## Calculadora de IMC

La pieza central. Cuando un usuario calcula su IMC en `#imc`, el resultado vive en `IMCContext` y se inyecta automáticamente:

- En el formulario de contacto (campo visible "Tu IMC calculado: X · Categoría").
- En el botón flotante de WhatsApp (el mensaje pre-armado incluye el dato).
- En el payload del endpoint `/api/contact` cuando se envía la consulta.

## Diseño

La landing se basa en una grilla editorial asimétrica (estilo revista), tipografía Fraunces (display) + Manrope (body), grain overlay global sutil, e iconografía Phosphor Icons. La paleta es índigo + beige + naranja con uso medido — el naranja aparece solo como acento crítico (CTAs, cifras destacadas, palabras italicizadas).

El isotipo Nucleo está implementado como SVG inline con stroke escalable, sin three.js (saqué el WebGL — la calidad editorial venía de las imágenes reales y la composición, no de geometría 3D).

**Imagery:** las fotos del Hero, Equipo y Ubicaciones usan placeholders curados de Unsplash con tratamiento warm/sepia para alinear con la paleta. Cuando el cliente provea sus fotos reales, se reemplazan los `src`.

## Pendientes antes del deploy

1. Reemplazar el WhatsApp en `lib/copy.ts:brand.whatsappNumber` por el número real.
2. Setear `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` en Vercel.
3. Cambiar `app/robots.ts` para permitir indexación.
4. Subir fotos de Agustina + Sergio a `public/images/` y referenciarlas en `components/sections/Equipo.tsx`.
5. Bios reales de cada uno en `lib/copy.ts:equipo.miembros`.
6. Lista de obras sociales reales con logos en `public/logos/` (referenciar en `ObrasSociales.tsx`).
7. Testimonios reales (con autorización firmada) en `lib/copy.ts:testimonios.items`.
8. Disclaimer médico legal del footer revisado/aprobado por Agustina.
9. Direcciones exactas de los dos consultorios + URLs reales de Google Maps embed.
10. Pixel de Meta + GA4 si se va a hacer pauta paga.
