"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight, Info } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { obrasSociales } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

// Mientras no tengamos los logos reales, mostramos los nombres como tipografía
// en un marquee (más editorial que rectángulos vacíos). El cliente reemplaza
// con sus logos SVG.
const planesPlaceholder = [
  "OSDE",
  "Swiss Medical",
  "Galeno",
  "Medifé",
  "Omint",
  "Hospital Italiano",
  "Avalian",
  "Accord Salud",
  "Sancor Salud",
];

export function ObrasSociales() {
  // Repetir para que el loop sea continuo (translate -50%).
  const planesLoop = [...planesPlaceholder, ...planesPlaceholder];

  return (
    <Section id="obras-sociales" tone="default" className="relative overflow-hidden">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start mb-12 lg:mb-16">
          {/* Left: text */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <Reveal>
              <Eyebrow>{obrasSociales.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                  textWrap: "balance",
                  maxWidth: "14ch",
                }}
              >
                {obrasSociales.headline.split("cirugía").map((part, i, arr) =>
                  i === arr.length - 1 ? (
                    part
                  ) : (
                    <span key={i}>
                      {part}
                      <span className="italic-serif text-[color:var(--accent)]">cirugía</span>
                    </span>
                  ),
                )}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">
                {obrasSociales.body}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a href={obrasSociales.cta.href} className="btn btn-ink group w-fit mt-2">
                <ShieldCheck weight="regular" className="h-4 w-4" />
                {obrasSociales.cta.label}
                <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          {/* Right: info box about efector */}
          <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[color:var(--border)]">
            <Reveal delay={0.15}>
              <div className="flex items-start gap-4 rounded-[var(--radius-lg)] bg-[color:var(--bg-elevated)] p-6 border border-[color:var(--border)]">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                >
                  <Info weight="regular" className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="h4">¿Qué es un efector?</p>
                  <p className="body-sm text-[color:var(--ink-soft)] leading-relaxed">
                    {obrasSociales.notaEfector}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Marquee — full-bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: easeEditorial }}
        className="relative overflow-hidden py-10 lg:py-14 border-y border-[color:var(--border)] bg-[color:var(--bg-elevated)]"
      >
        {/* Edge fades */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-40 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--bg-elevated), transparent)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 lg:w-40 z-10"
          style={{
            background:
              "linear-gradient(270deg, var(--bg-elevated), transparent)",
          }}
        />

        <div className="marquee">
          {planesLoop.map((nombre, i) => (
            <div key={`${nombre}-${i}`} className="flex items-center gap-4 shrink-0">
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  letterSpacing: "-0.02em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 48',
                  color: "var(--ink)",
                }}
              >
                {nombre}
              </span>
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]/60" />
            </div>
          ))}
        </div>
      </motion.div>

      <Container>
        <Reveal>
          <p className="caption text-center mt-6">
            Lista orientativa. Consultá tu cobertura con nuestro equipo antes de iniciar el proceso.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
