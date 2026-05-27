"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PaperPlaneTilt, ArrowsClockwise, Heart, X } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { noEstasSolo } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type Mode = "idle" | "read" | "write" | "thanks";

export function NoEstasSolo() {
  const [mode, setMode] = useState<Mode>("idle");
  const [readIdx, setReadIdx] = useState(0);
  const [draft, setDraft] = useState("");

  const mensajes = noEstasSolo.mensajesEntrantes;
  const current = useMemo(() => mensajes[readIdx % mensajes.length], [mensajes, readIdx]);

  const startRead = () => {
    setReadIdx((i) => (i + 1) % mensajes.length);
    setMode("read");
  };
  const startWrite = () => setMode("write");
  const close = () => {
    setMode("idle");
    setDraft("");
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (draft.trim().length < 4) return;
    setMode("thanks");
    setTimeout(() => {
      setDraft("");
      setMode("idle");
    }, 5200);
  };

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
            className="flex items-center gap-3"
          >
            <span aria-hidden className="block h-px w-10 bg-[color:var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[color:var(--ink-inverse)]/70">
              {noEstasSolo.eyebrow}
            </span>
            <span aria-hidden className="block h-px w-10 bg-[color:var(--accent)]" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, delay: 0.25, ease: easeEditorial }}
            className="font-display"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
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
                    <button
                      type="button"
                      onClick={startRead}
                      className="btn btn-ghost !border-[color:var(--ink-inverse)]/30 !text-[color:var(--ink-inverse)] hover:!bg-[color:var(--ink-inverse)] hover:!text-[color:var(--bg-inverse)]"
                    >
                      <BookOpen weight="regular" className="h-4 w-4" />
                      {noEstasSolo.cta.leer}
                    </button>
                    <button type="button" onClick={startWrite} className="btn btn-primary group">
                      <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                      {noEstasSolo.cta.dejar}
                    </button>
                  </div>
                </motion.div>
              )}

              {mode === "read" && (
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

              {mode === "write" && (
                <motion.form
                  key="write"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: easeEditorial }}
                  className="mx-auto flex max-w-2xl flex-col items-stretch gap-5 rounded-[var(--radius-xl)] border border-[color:var(--ink-inverse)]/14 bg-[color:var(--ink-inverse)]/[0.04] p-6 lg:p-8 text-left"
                >
                  <label className="flex flex-col gap-3">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/65">
                      Tu mensaje (anónimo)
                    </span>
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      rows={5}
                      autoFocus
                      placeholder={noEstasSolo.formLabels.placeholder}
                      className="w-full resize-none rounded-[var(--radius-md)] border border-[color:var(--ink-inverse)]/20 bg-[color:var(--ink-inverse)]/[0.04] px-4 py-3 text-[16px] leading-relaxed text-[color:var(--ink-inverse)] placeholder:text-[color:var(--ink-inverse)]/40 outline-none transition-colors focus:border-[color:var(--accent)]"
                    />
                  </label>
                  <div className="flex items-center justify-between gap-3">
                    <span className="caption text-[color:var(--ink-inverse)]/55">
                      {draft.length} / 500
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={close}
                        className="btn btn-ghost !border-transparent !text-[color:var(--ink-inverse)]/60 hover:!text-[color:var(--ink-inverse)]"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={draft.trim().length < 4}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                        {noEstasSolo.formLabels.submit}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}

              {mode === "thanks" && (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: easeEditorial }}
                  className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-[var(--radius-xl)] border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/[0.08] p-8 lg:p-10"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                    aria-hidden
                    className="grid h-14 w-14 place-items-center rounded-full bg-[color:var(--accent)] text-white shadow-[var(--shadow-accent)]"
                  >
                    <Heart weight="fill" className="h-6 w-6" />
                  </motion.span>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "clamp(20px, 2.2vw, 26px)",
                      lineHeight: 1.22,
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                      textWrap: "balance",
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {noEstasSolo.formLabels.thanks}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/45 mt-2"
          >
            — Equipo Nucleo Bariátrico
          </motion.div>
        </div>
      </Container>
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
        <motion.span
          key={`${w}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeEditorial } },
          }}
          className="inline-block"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.blockquote>
  );
}
