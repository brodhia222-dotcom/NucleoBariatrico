"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatCircleText,
  Stethoscope,
  ShieldCheck,
  Heart,
  CalendarCheck,
  ArrowLeft,
  ArrowRight,
  type Icon,
} from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { proceso } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

const stepIcons: Icon[] = [ChatCircleText, Stethoscope, ShieldCheck, Heart, CalendarCheck];
const AUTO_MS = 5200;

export function Proceso() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = proceso.pasos.length;

  const go = (next: number) => setIdx(((next % total) + total) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % total), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const current = proceso.pasos[idx];
  const CurrentIcon = stepIcons[idx] ?? stepIcons[0];

  return (
    <Section
      id="proceso"
      tone="subtle"
      marker={{ index: "04", label: "Proceso", aside: "5 pasos · 12 meses" }}
    >
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-10 lg:mb-14 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{proceso.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                  textWrap: "balance",
                  maxWidth: "16ch",
                }}
              >
                {proceso.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <p className="body-sm text-[color:var(--ink-soft)] max-w-prose">{proceso.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Carousel — main slide */}
        <Reveal>
          <motion.div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="relative grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--border)] lg:grid-cols-[6fr_5fr]"
          >
            {/* LEFT — visual stage */}
            <div className="relative flex min-h-[420px] overflow-hidden bg-[color:var(--bg-elevated)] lg:min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: easeEditorial }}
                  className="absolute inset-0"
                >
                  <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, color-mix(in srgb, var(--bg-inverse) 70%, transparent) 100%)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Step counter — top left */}
              <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-10 flex items-center gap-3">
                <span
                  className="font-display tabular text-[color:var(--ink-inverse)]"
                  style={{
                    fontSize: "clamp(40px, 5vw, 64px)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 64',
                  }}
                >
                  {current.n}
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/75">
                  / {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Icon badge — bottom right */}
              <span
                aria-hidden
                className="absolute bottom-6 right-6 z-10 grid h-14 w-14 place-items-center rounded-full bg-[color:var(--accent)] text-white shadow-[var(--shadow-lg)] lg:bottom-8 lg:right-8"
              >
                <CurrentIcon weight="regular" className="h-6 w-6" />
              </span>

              {/* Placeholder caption */}
              <div className="absolute bottom-6 left-6 z-10 hidden lg:block">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/65">
                  Foto · pendiente
                </span>
              </div>
            </div>

            {/* RIGHT — text + nav */}
            <div className="relative flex flex-col justify-between gap-10 bg-[color:var(--bg-elevated)] p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.55, ease: easeEditorial }}
                  className="flex flex-col gap-5"
                >
                  <span className="eyebrow text-[color:var(--accent)]">Paso {current.n}</span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(30px, 3.4vw, 48px)",
                      lineHeight: 1.04,
                      letterSpacing: "-0.025em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 64',
                      textWrap: "balance",
                    }}
                  >
                    {current.titulo}
                  </h3>
                  <p className="body text-[color:var(--ink-soft)] max-w-prose">{current.body}</p>
                </motion.div>
              </AnimatePresence>

              {/* Controls + timeline */}
              <div className="flex flex-col gap-6">
                {/* Timeline progress */}
                <div className="flex items-stretch gap-2">
                  {proceso.pasos.map((p, i) => (
                    <button
                      key={p.n}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Ir al paso ${p.n}`}
                      className="group relative h-1 flex-1 overflow-hidden rounded-full bg-[color:var(--border-strong)]"
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-y-0 left-0 origin-left rounded-full bg-[color:var(--ink)] transition-transform duration-500 ease-out ${
                          i < idx ? "scale-x-100" : i === idx ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={
                          i === idx && !paused
                            ? { animation: `progress-fill ${AUTO_MS}ms linear` }
                            : undefined
                        }
                      />
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-soft)]">
                    {String(idx + 1).padStart(2, "0")} · {String(total).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(idx - 1)}
                      aria-label="Paso anterior"
                      className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--border-strong)] text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] hover:border-[color:var(--ink)]"
                    >
                      <ArrowLeft weight="bold" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(idx + 1)}
                      aria-label="Paso siguiente"
                      className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--ink)] text-[color:var(--ink-inverse)] transition-colors hover:bg-[color:var(--accent)] hover:text-white"
                    >
                      <ArrowRight weight="bold" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Quick-jump strip — all steps as tiny editorial chips */}
        <Reveal delay={0.08}>
          <ul className="mt-10 hidden lg:grid grid-cols-5 gap-2 border-t border-[color:var(--border)] pt-6">
            {proceso.pasos.map((p, i) => (
              <li key={p.n}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  className={`flex w-full flex-col items-start gap-1 py-2 text-left transition-opacity ${
                    i === idx ? "opacity-100" : "opacity-50 hover:opacity-90"
                  }`}
                  aria-current={i === idx}
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                    {p.n}
                  </span>
                  <span className="font-display text-[15px] leading-tight">{p.titulo}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
