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
  const [main, ...rest] = testimonios.items;

  return (
    <Section id="testimonios" tone="default">
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
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                  textWrap: "balance",
                  maxWidth: "20ch",
                }}
              >
                {testimonios.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid gap-5 lg:grid-cols-12">
          {/* Feature card (left, larger) */}
          {main && (
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeEditorial }}
              className="lg:col-span-7 lg:row-span-2 relative flex flex-col justify-between gap-10 rounded-[var(--radius-2xl)] bg-[color:var(--ink)] p-8 lg:p-12 text-[color:var(--ink-inverse)] overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-dots opacity-[0.05]"
                style={{ color: "var(--ink-inverse)" }}
              />
              <Quotes
                weight="fill"
                className="relative h-10 w-10 text-[color:var(--accent)]"
                aria-hidden
              />
              <blockquote
                className="relative italic-serif"
                style={{
                  fontSize: "clamp(24px, 3vw, 38px)",
                  lineHeight: 1.22,
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                }}
              >
                {main.quote}
              </blockquote>
              <figcaption className="relative flex items-center gap-3 border-t border-[color:var(--ink-inverse)]/15 pt-5">
                <Avatar name={main.nombre} />
                <div className="flex flex-col">
                  <span className="font-medium">{main.nombre}</span>
                  <span className="caption text-[color:var(--ink-inverse)]/65">{main.tiempo}</span>
                </div>
              </figcaption>
            </motion.figure>
          )}

          {/* Secondary cards (right, stacked) */}
          {rest.map((t, i) => (
            <motion.figure
              key={t.nombre + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: easeEditorial }}
              className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-7 hover:border-[color:var(--ink)] transition-colors"
            >
              <Quotes
                weight="regular"
                className="h-6 w-6 text-[color:var(--accent)]"
                aria-hidden
              />
              <blockquote
                className="font-display flex-1"
                style={{
                  fontSize: "18px",
                  lineHeight: 1.42,
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 32',
                }}
              >
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-[color:var(--border)] pt-4">
                <Avatar name={t.nombre} small />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{t.nombre}</span>
                  <span className="caption">{t.tiempo}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  const initial = name.charAt(0).toUpperCase();
  const sizeClass = small ? "h-9 w-9 text-sm" : "h-12 w-12 text-base";
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
