"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { proceso } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

export function Proceso() {
  return (
    <Section id="proceso" tone="default">
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{proceso.eyebrow}</Eyebrow>
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
                  maxWidth: "18ch",
                }}
              >
                {proceso.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <p className="body-sm text-[color:var(--ink-soft)] max-w-prose">{proceso.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Zigzag steps */}
        <ol className="flex flex-col gap-14 lg:gap-24">
          {proceso.pasos.map((paso, i) => {
            const isReverse = i % 2 === 1;
            return (
              <motion.li
                key={paso.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.85, ease: easeEditorial }}
                className={`grid items-center gap-8 lg:gap-16 lg:grid-cols-12 ${isReverse ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Foto column */}
                <div className={`relative lg:col-span-7 ${isReverse ? "lg:[direction:ltr]" : ""}`}>
                  <div className="placeholder relative aspect-[16/10] rounded-[var(--radius-lg)]">
                    <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md px-2.5 py-1">
                      <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]">
                        Paso {paso.n}
                      </span>
                    </div>
                    <div className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink)]/60">
                      Foto · 16:10 · pendiente
                    </div>
                  </div>
                </div>

                {/* Text column */}
                <div className={`lg:col-span-5 flex flex-col gap-5 ${isReverse ? "lg:[direction:ltr]" : ""}`}>
                  <span
                    className="font-display tabular text-[color:var(--accent)]"
                    style={{
                      fontSize: "clamp(72px, 9vw, 128px)",
                      lineHeight: 0.82,
                      letterSpacing: "-0.05em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 144',
                    }}
                  >
                    {paso.n}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(26px, 2.8vw, 36px)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.022em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 48',
                    }}
                  >
                    {paso.titulo}
                  </h3>
                  <p className="body text-[color:var(--ink-soft)] max-w-prose">{paso.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
