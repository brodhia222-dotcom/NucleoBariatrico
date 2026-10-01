"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
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
  const [abierta, setAbierta] = useState(false);
  const idBio = useId();
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, delay: i * 0.1, ease: easeEditorial }}
      className="group grid grid-cols-[88px_1fr] items-center gap-x-4 gap-y-3 md:flex md:flex-col md:items-stretch md:gap-4"
    >
      {/* Desde tablet, retrato apaisado (4:3, antes 4:5): la página era muy larga. Como el recorte dejaba
          mucho aire arriba y las caras quedaban hundidas (Fede, 2026-10-01), la foto se acerca y se sube:
          la cabeza ocupa del 6 al 67 % del alto y la cara queda centrada a lo ancho. En celular (miniatura
          cuadrada) se acerca más, para que la cara llene el cuadro. Los 6 retratos tienen la cara en el
          mismo lugar del archivo, así que el mismo encuadre sirve para todos. */}
      <figure className="relative overflow-hidden rounded-[var(--radius-lg)]">
        {m.foto ? (
          <img
            src={m.foto}
            alt={`${m.nombre} · ${m.rol}`}
            loading="lazy"
            className="aspect-square w-full origin-[45.8%_15%] scale-[1.5] object-cover md:aspect-[4/3] md:origin-[41.6%_65.3%] md:scale-[1.2]"
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
        <button
          type="button"
          onClick={() => setAbierta((v) => !v)}
          aria-expanded={abierta}
          aria-controls={idBio}
          className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-medium text-[color:var(--ink)] underline-offset-4 hover:underline md:hidden"
        >
          {abierta ? "Ocultar bio" : "Ver bio"}
          <CaretDown weight="bold" className={`h-3.5 w-3.5 transition-transform duration-300 ${abierta ? "rotate-180" : ""}`} />
        </button>
      </div>
      {/* En celular la bio arranca cerrada y se abre con "Ver bio": la sección medía 2 pantallas.
          Desde tablet se ve siempre. */}
      <div
        id={idBio}
        className={`col-span-2 grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
          abierta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <p className="overflow-hidden body-sm text-[color:var(--ink-soft)] md:max-w-[38ch]">{m.bio}</p>
      </div>
    </motion.li>
  );
}
