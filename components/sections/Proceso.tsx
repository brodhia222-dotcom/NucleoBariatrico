"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { proceso } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

// Zigzag: foto de un lado y texto del otro, alternando, y cada paso entra al scrollear.
// Fede probó la fila compacta de 5 columnas y prefirió este diseño ("quedaba más estética", 2026-10-01),
// pero sin tanto scroll: por eso el bloque va centrado y angosto (900 px), con la foto en 16:10
// (antes 3:2 a todo el ancho) y menos aire entre pasos. En celular, foto arriba en 16:9.
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

        <ol className="mx-auto flex max-w-[900px] flex-col gap-8 lg:gap-9">
          {proceso.pasos.map((paso, i) => {
            const alReves = i % 2 === 1;
            return (
              <motion.li
                key={paso.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.75, delay: Math.min(i, 3) * 0.08, ease: easeEditorial }}
                className={`grid items-center gap-4 sm:gap-7 lg:gap-10 ${
                  alReves ? "sm:grid-cols-[3fr_2fr]" : "sm:grid-cols-[2fr_3fr]"
                }`}
              >
                {/* Foto: primero en el código (arriba en celular); en los pasos pares pasa a la derecha */}
                <div className={`overflow-hidden rounded-[var(--radius-lg)] ${alReves ? "sm:order-2" : ""}`}>
                  {paso.foto ? (
                    <img
                      src={paso.foto}
                      alt={paso.titulo}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover sm:aspect-[16/10]"
                      style={{ objectPosition: paso.fotoPos ?? "center" }}
                    />
                  ) : (
                    <div className="placeholder aspect-[16/9] sm:aspect-[16/10]" />
                  )}
                </div>

                {/* Texto: en celular el número va en el mismo renglón que el título */}
                <div className="flex flex-col gap-2 sm:gap-2.5">
                  <div className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-2.5">
                    <span
                      className="font-display tabular text-[color:var(--accent)]"
                      style={{
                        fontSize: "clamp(28px, 3vw, 42px)",
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
                        fontSize: "clamp(20px, 1.9vw, 25px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.018em",
                        fontWeight: 300,
                        fontVariationSettings: '"opsz" 48',
                      }}
                    >
                      {paso.titulo}
                    </h3>
                  </div>
                  <p className="balance-hasta-lg text-[color:var(--ink-soft)] max-sm:text-[length:var(--text-body-sm)] max-sm:leading-[var(--leading-normal)]">
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
