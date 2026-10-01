"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { proceso } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

// Compacto (pedido de Fede, 2026-10-01: "está todo muy gigante"): en compu grande los 5 pasos van en
// una fila, con la foto chica arriba; en el resto, una lista con la foto al costado del texto.
export function Proceso() {
  return (
    <Section id="proceso" tone="default">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-8 lg:mb-10">
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

        <ol className="grid gap-5 sm:gap-6 xl:grid-cols-5 xl:gap-6">
          {proceso.pasos.map((paso, i) => (
            <motion.li
              key={paso.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.06, ease: easeEditorial }}
              className="grid grid-cols-[96px_1fr] items-start gap-4 sm:grid-cols-[176px_1fr] sm:gap-6 xl:flex xl:flex-col xl:gap-4"
            >
              <div className="overflow-hidden rounded-[var(--radius-lg)]">
                {paso.foto ? (
                  <img
                    src={paso.foto}
                    alt={paso.titulo}
                    loading="lazy"
                    className="aspect-square w-full object-cover sm:aspect-[4/3]"
                    style={{ objectPosition: paso.fotoPos ?? "center" }}
                  />
                ) : (
                  <div className="placeholder aspect-square sm:aspect-[4/3]" />
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <span
                  className="font-display tabular text-[color:var(--accent)]"
                  style={{
                    fontSize: "clamp(24px, 2.2vw, 30px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.03em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 72',
                  }}
                >
                  {paso.n}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(19px, 1.6vw, 22px)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.015em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 48',
                  }}
                >
                  {paso.titulo}
                </h3>
                <p className="body-sm text-[color:var(--ink-soft)]" style={{ maxWidth: "60ch" }}>
                  {paso.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
