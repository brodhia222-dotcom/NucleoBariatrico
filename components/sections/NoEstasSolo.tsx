"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PaperPlaneTilt, ArrowsClockwise, Heart, X } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
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
      className="relative overflow-hidden bg-[color:var(--bg-inverse)]"
      style={{ paddingBlock: "clamp(120px, 16vw, 200px)" }}
    >
      {/* Background pattern + vignette */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dots opacity-[0.06]"
        style={{ color: "var(--ink-inverse)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, color-mix(in srgb, var(--bg-inverse) 55%, transparent) 75%, color-mix(in srgb, var(--bg-inverse) 85%, transparent) 100%)",
        }}
      />

      <Container className="relative z-10 text-[color:var(--ink-inverse)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
          {/* Header — pinned even when mode changes */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="block h-px w-10 bg-[color:var(--accent)]" />
            <Eyebrow className="text-[color:var(--ink-inverse)]/70">{noEstasSolo.eyebrow}</Eyebrow>
            <span aria-hidden className="block h-px w-10 bg-[color:var(--accent)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.0, delay: 0.3, ease: easeEditorial }}
            className="font-display"
            style={{
              fontSize: "clamp(48px, 8vw, 104px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144',
              textWrap: "balance",
            }}
          >
            {noEstasSolo.headline.replace(".", "")}
            <span className="italic-serif text-[color:var(--accent)]">.</span>
          </motion.h2>

          {/* Mode-switching content */}
          <div className="relative w-full">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: easeEditorial }}
                  className="flex flex-col items-center gap-8"
                >
                  <p className="body-lg max-w-md text-[color:var(--ink-inverse)]/80">
                    {noEstasSolo.body}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={startRead}
                      className="btn btn-ghost group !border-[color:var(--ink-inverse)]/30 !text-[color:var(--ink-inverse)] hover:!bg-[color:var(--ink-inverse)] hover:!text-[color:var(--bg-inverse)]"
                    >
                      <BookOpen weight="regular" className="h-4 w-4" />
                      {noEstasSolo.cta.leer}
                    </button>
                    <button
                      type="button"
                      onClick={startWrite}
                      className="btn btn-primary group"
                    >
                      <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                      {noEstasSolo.cta.dejar}
                    </button>
                  </div>
                </motion.div>
              )}

              {mode === "read" && (
                <motion.figure
                  key={`read-${readIdx}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: easeEditorial }}
                  className="mx-auto flex max-w-2xl flex-col items-center gap-7 rounded-[var(--radius-2xl)] border border-[color:var(--ink-inverse)]/14 bg-[color:var(--ink-inverse)]/[0.05] p-8 lg:p-12 backdrop-blur-md"
                >
                  <span
                    aria-hidden
                    className="font-display italic-serif text-[color:var(--accent)]"
                    style={{ fontSize: "64px", lineHeight: 0.5 }}
                  >
                    “
                  </span>
                  <Staggered text={current.texto} />
                  <motion.figcaption
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="caption text-[color:var(--ink-inverse)]/65"
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
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: easeEditorial }}
                  className="mx-auto flex max-w-2xl flex-col items-stretch gap-5 rounded-[var(--radius-2xl)] border border-[color:var(--ink-inverse)]/14 bg-[color:var(--ink-inverse)]/[0.05] p-6 lg:p-8 backdrop-blur-md text-left"
                >
                  <label className="flex flex-col gap-3">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/70">
                      Tu mensaje (anónimo)
                    </span>
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      rows={5}
                      autoFocus
                      placeholder={noEstasSolo.formLabels.placeholder}
                      className="w-full resize-none rounded-[var(--radius-md)] border border-[color:var(--ink-inverse)]/22 bg-[color:var(--ink-inverse)]/[0.04] px-4 py-3 text-[16px] leading-relaxed text-[color:var(--ink-inverse)] placeholder:text-[color:var(--ink-inverse)]/45 outline-none transition-colors focus:border-[color:var(--accent)]"
                    />
                  </label>

                  <div className="flex items-center justify-between gap-3">
                    <span className="caption text-[color:var(--ink-inverse)]/60">
                      {draft.length} / 500
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={close}
                        className="btn btn-ghost !border-transparent !text-[color:var(--ink-inverse)]/65 hover:!text-[color:var(--ink-inverse)]"
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
                  transition={{ duration: 0.65, ease: easeEditorial }}
                  className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-[var(--radius-2xl)] border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/[0.08] p-8 lg:p-10 backdrop-blur-md"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                    aria-hidden
                    className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--accent)] text-white shadow-[var(--shadow-accent)]"
                  >
                    <Heart weight="fill" className="h-7 w-7" />
                  </motion.span>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                      lineHeight: 1.18,
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                      textWrap: "balance",
                      fontVariationSettings: '"opsz" 48',
                    }}
                  >
                    {noEstasSolo.formLabels.thanks}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/55 mt-4"
          >
            — Equipo Nucleo Bariátrico
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   Staggered reveal — word by word, like a quiet typewriter
   ============================================================ */
function Staggered({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.blockquote
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
      }}
      className="font-display italic-serif"
      style={{
        fontSize: "clamp(20px, 2.2vw, 28px)",
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
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeEditorial } },
          }}
          className="inline-block"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.blockquote>
  );
}
