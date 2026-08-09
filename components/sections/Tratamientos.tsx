"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Syringe,
  Drop,
  Scissors,
  ArrowsClockwise,
  ArrowRight,
  X,
  type Icon,
} from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, tratamientos } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

const iconById: Record<string, Icon> = {
  inyectables: Syringe,
  balon: Drop,
  manga: Scissors,
  bypass: ArrowsClockwise,
};

// Todos los tratamientos en una sola lista plana, con su categoría de
// origen conservada como dato — ya no hay tabs/filtros, se muestran
// las 4 tarjetas una al lado de la otra.
const opciones = tratamientos.categorias.flatMap((cat) =>
  cat.opciones.map((op) => ({ ...op, categoria: cat.categoria })),
);

export function Tratamientos() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openOption = opciones.find((o) => o.id === openId) ?? null;

  // Bloquear el scroll del body mientras el detalle está abierto
  useEffect(() => {
    document.body.style.overflow = openId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openId]);

  // Cerrar con Escape
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

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

        {/* 4 tarjetas una al lado de la otra — clic expande el detalle completo */}
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {opciones.map((op, i) => {
            const OpIcon = iconById[op.id] ?? Syringe;
            const layoutId = `tratamiento-${op.id}`;
            return (
              <motion.li
                key={op.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.06, ease: easeEditorial }}
              >
                <motion.button
                  type="button"
                  layoutId={layoutId}
                  onClick={() => setOpenId(op.id)}
                  className="group relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 lg:h-80"
                >
                  <motion.div
                    layoutId={`${layoutId}-media`}
                    aria-hidden
                    className="placeholder absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ borderRadius: 0 }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) 12%, transparent) 0%, color-mix(in srgb, var(--bg-inverse) 82%, transparent) 100%)",
                    }}
                  />

                  <div className="relative z-10 flex items-start justify-end p-4">
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--ink-inverse)]/14 backdrop-blur-md text-[color:var(--ink-inverse)] transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-white"
                    >
                      <OpIcon weight="regular" className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col gap-1 p-4 pt-0 text-[color:var(--ink-inverse)]">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase opacity-70">
                      {op.categoria}
                    </span>
                    <span
                      className="font-display"
                      style={{
                        fontSize: "clamp(16px, 1.6vw, 20px)",
                        lineHeight: 1.12,
                        fontWeight: 400,
                        fontVariationSettings: '"opsz" 32',
                      }}
                    >
                      {op.nombre}
                    </span>
                  </div>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>

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

      {/* Detalle expandido — shared layout transition desde la tarjeta clickeada */}
      <AnimatePresence>
        {openOption && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenId(null)}
              aria-hidden
              className="absolute inset-0 bg-[color:var(--bg-inverse)]/55 backdrop-blur-md"
            />

            <motion.div
              layoutId={`tratamiento-${openOption.id}`}
              className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] shadow-[var(--shadow-lg)] md:h-[520px] md:flex-row"
              role="dialog"
              aria-modal="true"
              aria-label={openOption.nombre}
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)]"
              >
                <X weight="bold" className="h-4 w-4" />
              </button>

              <motion.div
                layoutId={`tratamiento-${openOption.id}-media`}
                aria-hidden
                className="placeholder relative h-48 shrink-0 md:h-auto md:w-2/5"
                style={{ borderRadius: 0 }}
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15, duration: 0.35, ease: easeEditorial }}
                className="flex flex-1 flex-col gap-5 overflow-y-auto p-8 lg:p-10"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                  >
                    {(() => {
                      const OpenIcon = iconById[openOption.id] ?? Syringe;
                      return <OpenIcon weight="regular" className="h-5 w-5" />;
                    })()}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                    {openOption.categoria}
                  </span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px, 2.8vw, 36px)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 56',
                  }}
                >
                  {openOption.nombre}
                </h3>

                <p className="body-lg text-[color:var(--ink-soft)]">{openOption.body}</p>

                <a
                  href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                    `Hola, quiero consultar por ${openOption.nombre.toLowerCase()}.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary group mt-auto w-fit"
                >
                  Consultar por este tratamiento
                  <ArrowRight
                    weight="bold"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
