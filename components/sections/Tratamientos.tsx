"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Syringe,
  Drop,
  Scissors,
  ArrowsClockwise,
  ArrowRight,
  type Icon,
} from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, tratamientos } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconById: Record<string, Icon> = {
  inyectables: Syringe,
  balon: Drop,
  manga: Scissors,
  bypass: ArrowsClockwise,
};

// Todas las opciones en una sola lista, con su categoría de origen —
// facilita encontrar la opción activa y armar el panel de detalle.
const opciones = tratamientos.categorias.flatMap((cat) =>
  cat.opciones.map((op) => ({ ...op, categoria: cat.categoria })),
);

export function Tratamientos() {
  const [activeId, setActiveId] = useState<string>("manga");
  const active = useMemo(
    () => opciones.find((o) => o.id === activeId) ?? opciones[0],
    [activeId],
  );
  const ActiveIcon = iconById[active.id] ?? Syringe;

  const whatsappReganancia = `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hola, me operé en otro lugar y quiero consultar por re-ganancia de peso / retomar el seguimiento.",
  )}`;

  return (
    <Section id="tratamientos" tone="elevated">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 lg:mb-16">
          <Reveal>
            <Eyebrow>{tratamientos.eyebrow}</Eyebrow>
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
              {tratamientos.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">{tratamientos.body}</p>
          </Reveal>
        </div>

        {/* Selector — agrupado por categoría, botones directos por tratamiento */}
        <Reveal delay={0.12}>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {tratamientos.categorias.map((cat) => (
              <div key={cat.categoria} className="flex flex-col gap-3">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-soft)]">
                  {cat.categoria}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.opciones.map((op) => {
                    const isActive = op.id === activeId;
                    return (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => setActiveId(op.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                          isActive
                            ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--ink-inverse)]"
                            : "border-[color:var(--border-strong)] bg-transparent text-[color:var(--ink)] hover:border-[color:var(--ink)]",
                        )}
                      >
                        {op.nombre}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Panel de detalle — cross-fade al cambiar de tratamiento */}
        <Reveal delay={0.16}>
          <div className="mt-8 lg:mt-10 overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] shadow-[var(--shadow-sm)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: easeEditorial }}
                className="flex flex-col gap-5 p-8 lg:p-12"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                  >
                    <ActiveIcon weight="regular" className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                    {active.categoria}
                  </span>
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(24px, 2.6vw, 34px)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 56',
                  }}
                >
                  {active.nombre}
                </h3>
                <p className="body-lg text-[color:var(--ink-soft)] max-w-[62ch]">{active.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Re-ganancia de peso / re-derivación — apartado separado a pedido del equipo */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg)] p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="flex flex-col gap-1.5">
              <p className="h4">{tratamientos.reganancia.titulo}</p>
              <p className="body-sm text-[color:var(--ink-soft)] leading-relaxed max-w-[56ch]">
                {tratamientos.reganancia.body}
              </p>
            </div>
            <a
              href={whatsappReganancia}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost group w-fit shrink-0"
            >
              {tratamientos.reganancia.cta}
              <ArrowRight
                weight="bold"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
