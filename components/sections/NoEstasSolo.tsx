"use client";

import { Fragment, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PaperPlaneTilt, ArrowsClockwise, X } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { TestimonioForm } from "@/components/ui/TestimonioForm";
import { enlaceTestimonio } from "@/components/sections/Testimonios";
import { noEstasSolo } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type Mode = "idle" | "read";

export function NoEstasSolo({ envioPorMail }: { envioPorMail: boolean }) {
  const [mode, setMode] = useState<Mode>("idle");
  const [readIdx, setReadIdx] = useState(0);
  // "Dejar un mensaje" abre el formulario de testimonios, el mismo de la sección de abajo: llega al
  // equipo, que lo revisa antes de publicarlo. Si el sitio todavía no envía mails (envioPorMail), abre
  // WhatsApp con el mensaje ya empezado.
  const [formAbierto, setFormAbierto] = useState(false);

  const mensajes = noEstasSolo.mensajesEntrantes;
  const current = useMemo(() => mensajes[readIdx % mensajes.length], [mensajes, readIdx]);

  const startRead = () => {
    setReadIdx((i) => (i + 1) % mensajes.length);
    setMode("read");
  };
  const close = () => setMode("idle");

  return (
    <section
      id="no-estas-solo"
      data-nav-tone="dark"
      className="relative bg-[color:var(--bg-inverse)] text-[color:var(--ink-inverse)]"
      style={{ paddingBlock: "clamp(56px, 7vw, 96px)" }}
    >
      <Container className="text-[color:var(--ink-inverse)]">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center"
          >
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--ink-inverse)]/70">
              {noEstasSolo.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, delay: 0.25, ease: easeEditorial }}
            className="font-display"
            style={{
              fontSize: "clamp(34px, 4.6vw, 60px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 96',
              textWrap: "balance",
            }}
          >
            {noEstasSolo.headline.replace(".", "")}
            <span className="italic-serif text-[color:var(--accent)]">.</span>
          </motion.h2>

          {/* Mode-switching content */}
          <div className="relative w-full mt-2">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: easeEditorial }}
                  className="flex flex-col items-center gap-7"
                >
                  <p className="body-lg max-w-md text-[color:var(--ink-inverse)]/78">
                    {noEstasSolo.body}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {/* "Leer un mensaje" solo aparece si hay mensajes reales cargados */}
                    {mensajes.length > 0 && (
                      <button
                        type="button"
                        onClick={startRead}
                        className="btn btn-ghost !border-[color:var(--ink-inverse)]/30 !text-[color:var(--ink-inverse)] hover:!bg-[color:var(--ink-inverse)] hover:!text-[color:var(--bg-inverse)]"
                      >
                        <BookOpen weight="regular" className="h-4 w-4" />
                        {noEstasSolo.cta.leer}
                      </button>
                    )}
                    {envioPorMail ? (
                      <button
                        type="button"
                        onClick={() => setFormAbierto(true)}
                        aria-haspopup="dialog"
                        className="btn btn-primary group"
                      >
                        <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                        {noEstasSolo.cta.dejar}
                      </button>
                    ) : (
                      <a href={enlaceTestimonio} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                        <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                        {noEstasSolo.cta.dejar}
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {mode === "read" && current && (
                <motion.figure
                  key={`read-${readIdx}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: easeEditorial }}
                  className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[var(--radius-xl)] border border-[color:var(--ink-inverse)]/14 bg-[color:var(--ink-inverse)]/[0.04] p-8 lg:p-10"
                >
                  <span
                    aria-hidden
                    className="font-display italic-serif text-[color:var(--accent)]"
                    style={{ fontSize: "56px", lineHeight: 0.5 }}
                  >
                    “
                  </span>
                  <Staggered text={current.texto} />
                  <motion.figcaption
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="caption text-[color:var(--ink-inverse)]/60"
                  >
                    {current.autor}
                  </motion.figcaption>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={startRead}
                      className="btn btn-ghost !border-[color:var(--ink-inverse)]/30 !text-[color:var(--ink-inverse)] hover:!bg-[color:var(--ink-inverse)] hover:!text-[color:var(--bg-inverse)]"
                    >
                      <ArrowsClockwise weight="regular" className="h-4 w-4" />
                      Otro mensaje
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="btn btn-ghost !border-transparent !text-[color:var(--ink-inverse)]/65 hover:!text-[color:var(--ink-inverse)]"
                    >
                      <X weight="bold" className="h-4 w-4" />
                      Cerrar
                    </button>
                  </div>
                </motion.figure>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--ink-inverse)]/45 mt-2"
          >
            Equipo Nucleo Bariátrico
          </motion.div>
        </div>
      </Container>
      {envioPorMail && <TestimonioForm abierto={formAbierto} onCerrar={() => setFormAbierto(false)} />}
    </section>
  );
}

function Staggered({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.blockquote
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
      }}
      className="font-display italic-serif"
      style={{
        fontSize: "clamp(20px, 2.2vw, 26px)",
        lineHeight: 1.4,
        fontWeight: 300,
        fontVariationSettings: '"opsz" 36',
        textWrap: "balance",
      }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeEditorial } },
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.blockquote>
  );
}
