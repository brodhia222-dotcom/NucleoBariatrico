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
        <div className="flex flex-col items-center text-center gap-4 mb-14 lg:mb-20">
          <Reveal>
            <Eyebrow>{testimonios.eyebrow}</Eyebrow>
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
              {testimonios.headline}
            </h2>
          </Reveal>
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
                {main.foto ? (
                  <img
                    src={main.foto}
                    alt={`Testimonio de ${main.nombre}`}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-[var(--radius-lg)] object-cover"
                  />
                ) : (
                  <div className="placeholder relative aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden" />
                )}
              </div>
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <Quotes weight="fill" className="h-9 w-9 text-[color:var(--accent)]" aria-hidden />
                <blockquote
                  className="font-display italic-serif"
                  style={{
                    fontSize: "clamp(20px, 2.2vw, 28px)",
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
              {t.foto ? (
                <img
                  src={t.foto}
                  alt={`Testimonio de ${t.nombre}`}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-[var(--radius-lg)] object-cover"
                />
              ) : (
                <div className="placeholder relative aspect-[3/4] rounded-[var(--radius-lg)] overflow-hidden" />
              )}
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
