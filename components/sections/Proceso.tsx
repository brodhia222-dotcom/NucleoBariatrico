"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { proceso } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

export function Proceso() {
  return (
    <Section id="proceso" tone="default">
      <Container>
        <div className="mb-20 grid gap-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{proceso.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="display-md mt-4"
                style={{ fontVariationSettings: '"opsz" 72', maxWidth: "18ch" }}
              >
                {proceso.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)]">{proceso.body}</p>
            </Reveal>
          </div>
        </div>

        <ol className="relative grid gap-px">
          {proceso.pasos.map((paso, i) => (
            <motion.li
              key={paso.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.05, ease: easeEditorial }}
              className="relative grid gap-6 border-t border-[color:var(--border)] py-10 md:grid-cols-[120px_1fr_2fr] md:gap-12 md:py-14"
            >
              <span
                className="font-display text-[color:var(--accent)] tabular-nums"
                style={{
                  fontSize: "clamp(48px, 5vw, 72px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 96',
                }}
              >
                {paso.n}
              </span>
              <h3 className="h2 self-center" style={{ fontVariationSettings: '"opsz" 48' }}>
                {paso.titulo}
              </h3>
              <p className="body text-[color:var(--ink-soft)] max-w-lg self-center">{paso.body}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
