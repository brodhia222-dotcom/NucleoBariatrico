"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, tratamientos, type Tratamiento } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

const opciones = tratamientos.opciones;
const reganancia = tratamientos.reganancia;

function whatsappDe(texto: string) {
  return `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(texto)}`;
}

function Foto({
  op,
  className,
  apaisadaEnCelular = false,
}: {
  op: { foto: string | null; nombre: string; fotoPos?: string; fotoHorizontal?: string };
  className?: string;
  apaisadaEnCelular?: boolean;
}) {
  return op.foto ? (
    <picture>
      {apaisadaEnCelular && op.fotoHorizontal && <source media="(max-width: 767px)" srcSet={op.fotoHorizontal} />}
      <img
        src={op.foto}
        alt=""
        aria-hidden
        loading="lazy"
        className={`h-full w-full object-cover ${className ?? ""}`}
        style={{ objectPosition: op.fotoPos ?? "center" }}
      />
    </picture>
  ) : (
    <div aria-hidden className={`placeholder h-full w-full ${className ?? ""}`} style={{ borderRadius: 0 }} />
  );
}

export function Tratamientos() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openOption: Tratamiento | null = opciones.find((o) => o.id === openId) ?? null;

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

  return (
    <Section id="tratamientos" tone="elevated">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-8 lg:mb-10">
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
            <p className="body-lg text-[color:var(--ink-soft)] max-w-[62ch]">{tratamientos.body}</p>
          </Reveal>
        </div>

        {/* 4 tratamientos de menor a mayor complejidad: cada tarjeta es un botón directo a su detalle */}
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {opciones.map((op, i) => {
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
                  aria-haspopup="dialog"
                  aria-label={`${op.nombre}: ver el detalle`}
                  className="group relative flex h-48 w-full flex-col justify-end overflow-hidden rounded-[var(--radius-xl)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 sm:h-56 lg:h-64"
                >
                  <motion.div
                    layoutId={`${layoutId}-media`}
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
                  >
                    <Foto op={op} />
                  </motion.div>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) 0%, transparent) 35%, color-mix(in srgb, var(--bg-inverse) 88%, transparent) 100%)",
                    }}
                  />

                  <div className="relative z-10 flex flex-col gap-1.5 p-4 text-[color:var(--ink-inverse)] lg:p-5">
                    <span className="font-mono text-[12px] tracking-[0.12em] uppercase opacity-80">{op.categoria}</span>
                    <span className="flex items-end justify-between gap-3">
                      <span
                        className="font-display"
                        style={{
                          fontSize: "clamp(17px, 1.7vw, 22px)",
                          lineHeight: 1.1,
                          fontWeight: 400,
                          fontVariationSettings: '"opsz" 32',
                        }}
                      >
                        {op.nombre}
                      </span>
                      <span
                        aria-hidden
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--ink-inverse)]/16 backdrop-blur-md transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-white"
                      >
                        <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </div>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>

        {/* Reganancia de peso: apartado propio, al final y a lo ancho, para que se lea separado */}
        <Reveal delay={0.1}>
          <article
            id="reganancia"
            className="mt-5 grid overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg)] md:grid-cols-[5fr_7fr] lg:mt-6"
          >
            <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[260px]">
              <div className="absolute inset-0">
                <Foto op={reganancia} />
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5 sm:p-7 lg:p-8">
              <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-[color:var(--accent)]">
                {reganancia.subtitulo}
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(24px, 2.4vw, 32px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                }}
              >
                {reganancia.nombre}
              </h3>
              {reganancia.parrafos.map((p, i) => (
                <p key={i} className="body text-[color:var(--ink-soft)] max-w-[60ch]">
                  {p}
                </p>
              ))}
              <a
                href={whatsappDe("Hola, me operé y quiero consultar por reganancia de peso o retomar el seguimiento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group mt-2 w-fit"
              >
                {reganancia.cta}
                <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </article>
        </Reveal>
      </Container>

      {/* Detalle expandido: shared layout transition desde la tarjeta clickeada */}
      <AnimatePresence>
        {openOption && (
          <div data-lenis-prevent className="fixed inset-0 z-[900] flex items-center justify-center p-4 lg:p-8">
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
              className="relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] shadow-[var(--shadow-lg)] md:min-h-[420px] md:flex-row"
              role="dialog"
              aria-modal="true"
              aria-label={openOption.nombre}
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Cerrar"
                autoFocus
                className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)]"
              >
                <X weight="bold" className="h-4 w-4" />
              </button>

              <motion.div
                layoutId={`tratamiento-${openOption.id}-media`}
                className="relative h-48 shrink-0 overflow-hidden md:h-auto md:w-2/5"
              >
                <Foto op={openOption} apaisadaEnCelular />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15, duration: 0.35, ease: easeEditorial }}
                data-lenis-prevent
                className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-7 lg:p-10"
              >
                <span
                  className="font-mono text-[12px] tracking-[0.12em] uppercase text-[color:var(--accent)] pr-10"
                  style={{ textWrap: "balance" }}
                >
                  {openOption.subtitulo}
                </span>

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

                {openOption.parrafos.map((p, i) => (
                  <p key={i} className="body text-[color:var(--ink-soft)]">
                    {p}
                  </p>
                ))}

                <a
                  href={whatsappDe(`Hola, quiero consultar por ${openOption.nombre.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary group mt-2 w-fit"
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
