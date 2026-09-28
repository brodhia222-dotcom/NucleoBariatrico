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
                fontSize: "clamp(30px, 3.6vw, 46px)",
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
                {m.foto ? (
                  <img
                    src={m.foto}
                    alt={`${m.nombre} · ${m.rol}`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{ objectPosition: "center 22%" }}
                  />
                ) : (
                  <div className="placeholder relative aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]" />
                )}
              </figure>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--accent)]">
                  {m.rol}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 30px)",
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

        {/* Otras disciplinas del proceso (psicología y nutrición), más chicas que los cirujanos:
            en celular foto al costado; desde tablet, 3 columnas alineadas con las de los cirujanos
            y la foto arriba, para que el texto no quede angosto */}
        {equipo.acompanamiento.miembros.length > 0 && (
          <div className="mt-14 border-t border-[color:var(--border)] pt-10 lg:mt-20 lg:pt-12">
            <Reveal>
              <Eyebrow>{equipo.acompanamiento.eyebrow}</Eyebrow>
            </Reveal>
            <ul className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
              {equipo.acompanamiento.miembros.map((m, i) => (
                <motion.li
                  key={`${m.rol}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: easeEditorial }}
                  className="group flex items-start gap-4 sm:gap-5 md:flex-col md:gap-4"
                >
                  <figure className="w-24 shrink-0 overflow-hidden rounded-[var(--radius-lg)] sm:w-28">
                    {m.foto ? (
                      <img
                        src={m.foto}
                        alt={`${m.nombre} · ${m.rol}`}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        style={{ objectPosition: "center 20%" }}
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="grid aspect-[4/5] w-full place-items-center bg-[color:var(--accent-soft)] font-display text-[color:var(--accent)]"
                        style={{
                          fontSize: "44px",
                          lineHeight: 1,
                          fontWeight: 300,
                          fontVariationSettings: '"opsz" 72',
                        }}
                      >
                        {m.nombre.charAt(0)}
                      </span>
                    )}
                  </figure>
                  <div className="flex flex-1 flex-col gap-2">
                    <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--accent)]">
                      {m.rol}
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "clamp(20px, 1.8vw, 24px)",
                        lineHeight: 1.06,
                        letterSpacing: "-0.02em",
                        fontWeight: 300,
                        fontVariationSettings: '"opsz" 48',
                      }}
                    >
                      {m.nombre}
                    </h3>
                    <p className="body-sm text-[color:var(--ink-soft)] mt-1">{m.bio}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  );
}
