"use client";

import { motion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { testimonios } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

export function Testimonios() {
  // Tomamos solo los primeros 4 — feature card grande arriba + 3 secundarios abajo
  const items = testimonios.items.slice(0, 4);
  const [main, ...rest] = items;

  return (
    <Section id="testimonios" tone="elevated">
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{testimonios.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
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
                  maxWidth: "20ch",
                }}
              >
                {testimonios.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Feature card — retrato grande + quote */}
        {main && (
          <Reveal>
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.85, ease: easeEditorial }}
              className="grid gap-8 lg:grid-cols-12 lg:gap-16 mb-16 lg:mb-20"
            >
              <div className="lg:col-span-5">
                <div className="placeholder relative aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden">
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md px-2.5 py-1">
                    <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]">
                      Testimonio · 01
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]/60">
                    Foto · 4:5
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <Quotes weight="fill" className="h-9 w-9 text-[color:var(--accent)]" aria-hidden />
                <blockquote
                  className="font-display italic-serif"
                  style={{
                    fontSize: "clamp(24px, 2.8vw, 36px)",
                    lineHeight: 1.24,
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 56',
                    textWrap: "balance",
                  }}
                >
                  {main.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-[color:var(--border)] pt-5">
                  <Avatar name={main.nombre} />
                  <div className="flex flex-col">
                    <span className="font-medium">{main.nombre}</span>
                    <span className="caption">{main.tiempo}</span>
                  </div>
                </figcaption>
              </div>
            </motion.figure>
          </Reveal>
        )}

        {/* Secondary grid */}
        <ul className="grid gap-6 md:grid-cols-3 lg:gap-8 border-t border-[color:var(--border)] pt-12 lg:pt-16">
          {rest.map((t, i) => (
            <motion.li
              key={`${t.nombre}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easeEditorial }}
              className="flex flex-col gap-5"
            >
              <div className="placeholder relative aspect-[3/4] rounded-[var(--radius-lg)] overflow-hidden">
                <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]/70 bg-[color:var(--bg)]/80 backdrop-blur-md rounded-full px-2 py-0.5">
                  № 0{i + 2}
                </div>
              </div>
              <Quotes weight="regular" className="h-5 w-5 text-[color:var(--accent)]" aria-hidden />
              <blockquote
                className="font-display"
                style={{
                  fontSize: "17px",
                  lineHeight: 1.42,
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 24',
                }}
              >
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-[color:var(--border)] pt-4 mt-auto">
                <Avatar name={t.nombre} small />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{t.nombre}</span>
                  <span className="caption">{t.tiempo}</span>
                </div>
              </figcaption>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  const initial = name.charAt(0).toUpperCase();
  const sizeClass = small ? "h-9 w-9 text-sm" : "h-11 w-11 text-base";
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-full bg-[color:var(--accent)]/15 text-[color:var(--accent)] font-display font-medium ${sizeClass}`}
      style={{ fontVariationSettings: '"opsz" 36' }}
    >
      {initial}
    </span>
  );
}
