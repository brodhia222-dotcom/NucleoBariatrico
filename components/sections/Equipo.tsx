"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { equipo } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

export function Equipo() {
  return (
    <Section id="equipo" tone="subtle">
      <Container>
        {/* Header — título + descripción debajo del eyebrow, no al lado */}
        <div className="flex flex-col items-center text-center gap-4 mb-8 lg:mb-10">
          <Reveal>
            <Eyebrow>{equipo.eyebrow}</Eyebrow>
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
              {equipo.headline}
            </h2>
          </Reveal>
        </div>

        {/* 3 retratos — sin numerales, sin tags */}
        <ul className="grid gap-7 md:grid-cols-3 md:gap-8 lg:gap-10">
          {equipo.miembros.map((m, i) => (
            <Miembro key={m.nombre} m={m} i={i} />
          ))}
        </ul>

        {/* Psicóloga y nutricionistas: mismo tamaño que los cirujanos, en una segunda fila
            separada solo por una línea fina (pedido de Fede, 2026-09-28) */}
        {equipo.acompanamiento.miembros.length > 0 && (
          <ul className="mt-8 grid gap-7 border-t border-[color:var(--border)] pt-8 md:grid-cols-3 md:gap-8 lg:mt-10 lg:gap-10 lg:pt-10">
            {equipo.acompanamiento.miembros.map((m, i) => (
              <Miembro key={`${m.rol}-${m.nombre}`} m={m} i={i} />
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

type Persona = { nombre: string; rol: string; bio: string; foto: string | null };

function Miembro({ m, i }: { m: Persona; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, delay: i * 0.1, ease: easeEditorial }}
      className="group grid grid-cols-[88px_1fr] items-center gap-x-4 gap-y-3 md:flex md:flex-col md:items-stretch md:gap-4"
    >
      {/* Desde tablet, retrato de pecho para arriba (4:3, antes 4:5): la página era muy larga. Todos los
          retratos tienen la cara a la misma altura, así que el mismo recorte sirve para los 6 */}
      <figure className="relative overflow-hidden rounded-[var(--radius-lg)]">
        {m.foto ? (
          <img
            src={m.foto}
            alt={`${m.nombre} · ${m.rol}`}
            loading="lazy"
            className="aspect-square w-full object-cover md:aspect-[4/3]"
            style={{ objectPosition: "center 3%" }}
          />
        ) : (
          // Sin retrato todavía: la inicial, nunca una caja vacía
          <span
            aria-hidden
            className="grid aspect-square w-full place-items-center bg-[color:var(--accent-soft)] font-display text-[color:var(--accent)] md:aspect-[4/3]"
            style={{
              fontSize: "clamp(64px, 8vw, 120px)",
              lineHeight: 1,
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {m.nombre.charAt(0)}
          </span>
        )}
      </figure>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--accent)]">
          {m.rol}
        </span>
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(22px, 2.2vw, 30px)",
            lineHeight: 1.04,
            letterSpacing: "-0.022em",
            fontWeight: 300,
            fontVariationSettings: '"opsz" 56',
          }}
        >
          {m.nombre}
        </h3>
      </div>
      <p className="col-span-2 body-sm text-[color:var(--ink-soft)] md:max-w-[38ch]">{m.bio}</p>
    </motion.li>
  );
}
