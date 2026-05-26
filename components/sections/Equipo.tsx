"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { equipo } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

// Placeholders curados — son profesionales de la salud en luz cálida.
// Cuando el cliente provea fotos reales, reemplazamos los src.
const placeholderImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80&auto=format&fit=crop", // doctora
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80&auto=format&fit=crop", // doctor
];

const especialidades: string[][] = [
  ["Cirugía bariátrica", "Bypass gástrico", "Manga gástrica"],
  ["Seguimiento clínico", "Coordinación interdisciplinaria"],
];

export function Equipo() {
  return (
    <Section id="equipo" tone="default">
      <Container>
        {/* Editorial header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-16 lg:mb-20 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{equipo.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
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
                  maxWidth: "16ch",
                }}
              >
                {equipo.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <p className="body-sm text-[color:var(--ink-soft)] max-w-prose">{equipo.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Zigzag layout: each member in alternating direction with rich detail */}
        <div className="flex flex-col gap-20 lg:gap-32">
          {equipo.miembros.map((m, i) => {
            const isReverse = i % 2 === 1;
            const especialidad = especialidades[i] ?? especialidades[0];
            return (
              <motion.article
                key={m.nombre}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: easeEditorial }}
                className={`grid items-center gap-8 lg:gap-16 lg:grid-cols-12 ${isReverse ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Image column */}
                <div className={`relative lg:col-span-7 ${isReverse ? "lg:[direction:ltr]" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)]">
                    <img
                      src={placeholderImages[i] ?? placeholderImages[0]}
                      alt={`Retrato editorial de ${m.nombre}`}
                      className="h-full w-full object-cover img-warm transition-transform duration-700 hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {/* Number badge over image */}
                    <div className="absolute top-5 left-5 flex items-center gap-2 bg-[color:var(--bg)]/85 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]">
                        Miembro / {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text column */}
                <div className={`lg:col-span-5 flex flex-col gap-6 ${isReverse ? "lg:[direction:ltr]" : ""}`}>
                  <div>
                    <span className="eyebrow text-[color:var(--accent)]">{m.rol}</span>
                    <h3
                      className="font-display mt-2"
                      style={{
                        fontSize: "clamp(36px, 4.2vw, 56px)",
                        lineHeight: 1.0,
                        letterSpacing: "-0.025em",
                        fontWeight: 300,
                        fontVariationSettings: '"opsz" 72',
                      }}
                    >
                      {m.nombre}
                    </h3>
                  </div>

                  <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">{m.bio}</p>

                  {/* Specialty chips */}
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {especialidad.map((esp) => (
                      <li
                        key={esp}
                        className="px-3 py-1.5 text-xs rounded-full border border-[color:var(--border-strong)] text-[color:var(--ink)]"
                      >
                        {esp}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
