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
                fontSize: "clamp(30px, 3.6vw, 46px)",
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
        </div>

        {/* Zigzag steps — foto ancha (mitad del grid), texto pegado, poco scroll */}
        <ol className="flex flex-col gap-8 lg:gap-12">
          {proceso.pasos.map((paso, i) => {
            const isReverse = i % 2 === 1;
            return (
              <motion.li
                key={paso.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.75, ease: easeEditorial }}
                className={`grid items-center gap-5 lg:gap-8 lg:grid-cols-2 ${isReverse ? "lg:[direction:rtl]" : ""}`}
              >
                {/* Foto column */}
                <div className={`relative ${isReverse ? "lg:[direction:ltr]" : ""}`}>
                  {paso.foto ? (
                    <img
                      src={paso.foto}
                      alt={paso.titulo}
                      loading="lazy"
                      className={`${paso.fotoAspect ?? "aspect-[16/9]"} w-full rounded-[var(--radius-lg)] object-cover`}
                      style={{ objectPosition: paso.fotoPos ?? "center" }}
                    />
                  ) : (
                    <div className="placeholder relative aspect-[16/9] rounded-[var(--radius-lg)]" />
                  )}
                </div>

                {/* Text column */}
                <div className={`flex flex-col gap-3 ${isReverse ? "lg:[direction:ltr]" : ""}`}>
                  <span
                    className="font-display tabular text-[color:var(--accent)]"
                    style={{
                      fontSize: "clamp(34px, 3.6vw, 48px)",
                      lineHeight: 0.85,
                      letterSpacing: "-0.035em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 72',
                    }}
                  >
                    {paso.n}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(20px, 2vw, 27px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.018em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 48',
                    }}
                  >
                    {paso.titulo}
                  </h3>
                  <p className="body text-[color:var(--ink-soft)]" style={{ maxWidth: "52ch" }}>
                    {paso.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
