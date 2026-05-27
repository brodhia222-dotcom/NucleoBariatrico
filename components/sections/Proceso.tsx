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
        <div className="flex flex-col items-center text-center gap-4 mb-14 lg:mb-20">
          <Reveal>
            <Eyebrow>{proceso.eyebrow}</Eyebrow>
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
              {proceso.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">{proceso.body}</p>
          </Reveal>
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
                  <div className="placeholder relative aspect-[16/10] rounded-[var(--radius-lg)]" />
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
