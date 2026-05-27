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
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20 items-end">
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
                  fontSize: "clamp(36px, 4.6vw, 64px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 72',
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

        {/* 3 retratos editoriales */}
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
              {/* Retrato */}
              <figure className="relative overflow-hidden rounded-[var(--radius-lg)]">
                <div className="placeholder relative aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md px-2.5 py-1">
                    <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]">
                      № {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]/65">
                    Foto · 4:5
                  </div>
                </div>
              </figure>

              {/* Info */}
              <div className="flex flex-col gap-3">
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

                <ul className="flex flex-wrap gap-1.5 mt-3">
                  {m.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-2.5 py-1 text-[11px] tracking-wide rounded-full border border-[color:var(--border-strong)] text-[color:var(--ink-soft)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
