"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { equipo } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

export function Equipo() {
  return (
    <Section id="equipo" tone="subtle">
      <Container>
        {/* Header — título + descripción debajo del eyebrow, no al lado */}
        <div className="flex flex-col items-center text-center gap-4 mb-14 lg:mb-20">
          <Reveal>
            <Eyebrow>{equipo.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(36px, 4.6vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 72',
                textWrap: "balance",
              }}
            >
              {equipo.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">
              {equipo.body}
            </p>
          </Reveal>
        </div>

        {/* 3 retratos — sin numerales, sin tags */}
        <ul className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {equipo.miembros.map((m, i) => (
            <motion.li
              key={m.nombre}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.1, ease: easeEditorial }}
              className="group flex flex-col gap-5"
            >
              <figure className="relative overflow-hidden rounded-[var(--radius-lg)]">
                <div className="placeholder relative aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]" />
              </figure>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                  {m.rol}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px, 2.8vw, 36px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.022em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 56',
                  }}
                >
                  {m.nombre}
                </h3>
                <p className="body-sm text-[color:var(--ink-soft)] mt-1 max-w-[38ch]">{m.bio}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
