"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { diferencial } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

export function Diferencial() {
  return (
    <Section id="diferencial" tone="elevated">
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-16 lg:mb-24 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{diferencial.eyebrow}</Eyebrow>
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
                  maxWidth: "22ch",
                }}
              >
                {diferencial.headline.split(", ").map((part, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="italic-serif text-[color:var(--accent)]">{part}</span>
                    ) : (
                      part
                    )}
                    {i < arr.length - 1 && ", "}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Editorial pull list — números grandes a la izquierda, contenido a la derecha */}
        <ul className="flex flex-col gap-12 lg:gap-16">
          {diferencial.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easeEditorial }}
              className="group grid gap-6 lg:grid-cols-12 lg:gap-12 border-t border-[color:var(--border)] pt-10"
            >
              {/* Numeral grande */}
              <div className="lg:col-span-3 flex items-start">
                <span
                  className="font-display tabular text-[color:var(--ink)]"
                  style={{
                    fontSize: "clamp(64px, 8vw, 112px)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.045em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 144',
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Texto */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                  {item.badge}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(24px, 2.6vw, 34px)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.018em",
                    fontWeight: 400,
                    fontVariationSettings: '"opsz" 48',
                    textWrap: "balance",
                    maxWidth: "20ch",
                  }}
                >
                  {item.title}
                </h3>
                <p className="body text-[color:var(--ink-soft)] max-w-[52ch]">{item.body}</p>
              </div>

              {/* Link sutil */}
              <div className="lg:col-span-3 flex items-end">
                <a
                  href={item.href}
                  className="group/cta inline-flex items-center gap-2 text-sm font-medium text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent)]"
                >
                  <span className="block h-px w-6 bg-[color:var(--accent)] transition-all duration-300 group-hover/cta:w-10" />
                  {item.cta}
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
