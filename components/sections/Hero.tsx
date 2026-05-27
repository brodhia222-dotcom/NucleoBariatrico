"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, WhatsappLogo } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { brand, hero } from "@/lib/copy";
import { easeEditorial, easeOut } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
      style={{ paddingTop: "var(--nav-height)" }}
    >
      <HeroBackground />

      {/* Editorial masthead */}
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 flex items-center justify-between border-b border-[color:var(--border)] pb-3 pt-6"
        >
          <span className="eyebrow tabular">Mayo · 2026</span>
          <span className="eyebrow hidden sm:block">Equipo Médico · Cirugía Bariátrica</span>
          <span className="eyebrow tabular">№ 01</span>
        </motion.div>
      </Container>

      {/* Centered content */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 py-16 text-center lg:gap-10 lg:py-24">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeOut, delay: 0.2 }}
              className="flex items-center gap-3 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)]/60 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
              <span className="eyebrow">{hero.eyebrow}</span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(56px, 9vw, 128px)",
                lineHeight: 0.96,
                letterSpacing: "-0.04em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144',
                textWrap: "balance",
              }}
            >
              <HeroHeadline reduced={Boolean(reduced)} />
            </h1>

            {/* Body */}
            <motion.p
              className="body-lg max-w-[56ch] text-[color:var(--ink-soft)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: easeEditorial }}
            >
              {hero.body}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: easeEditorial }}
            >
              <a href={hero.primary.href} className="btn btn-primary btn-pulse group">
                {hero.primary.label}
                <ArrowDown weight="bold" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <WhatsappLogo weight="fill" className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Bottom strip — metric + scroll hint */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: easeEditorial }}
          className="relative z-10 mb-10 grid items-end gap-8 border-t border-[color:var(--border)] pt-6 sm:grid-cols-[1fr_auto_1fr]"
        >
          <div className="hidden sm:flex flex-col gap-1">
            <span className="eyebrow">Cobertura PMO</span>
            <span className="caption">100% · efector autorizado</span>
          </div>
          <a
            href="#imc"
            aria-label="Bajar a la calculadora"
            className="mx-auto flex flex-col items-center gap-2 text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
          >
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase">Scroll</span>
            <span aria-hidden className="scroll-hint">
              <ArrowDown weight="regular" className="h-4 w-4" />
            </span>
          </a>
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="eyebrow">Sedes</span>
            <span className="caption">Villa del Parque · San Isidro</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ============================================================
   Background — mesh gradient + placeholder image + grid lines
   ============================================================ */
function HeroBackground() {
  return (
    <>
      {/* Mesh gradient layer */}
      <div aria-hidden className="absolute inset-0 mesh-bg" />

      {/* Placeholder image (faint) — esperando foto definitiva del cliente */}
      <div
        aria-hidden
        className="placeholder absolute inset-0 opacity-[0.18]"
        style={{ borderRadius: 0 }}
      />

      {/* Dotted grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dots opacity-[0.05]"
        style={{ color: "var(--ink)" }}
      />

      {/* Decorative SVG line drawing — top-right */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-[-80px] top-[18%] hidden h-[420px] w-[420px] text-[color:var(--ink)] opacity-[0.18] lg:block float-slow"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          cx="100"
          cy="100"
          r="84"
          stroke="currentColor"
          strokeWidth="0.6"
          className="path-draw"
          style={{ ["--dash" as never]: "560" }}
        />
        <circle
          cx="100"
          cy="100"
          r="56"
          stroke="currentColor"
          strokeWidth="0.6"
          className="path-draw"
          style={{ ["--dash" as never]: "380" }}
        />
        <circle
          cx="100"
          cy="100"
          r="28"
          stroke="currentColor"
          strokeWidth="0.6"
          className="path-draw"
          style={{ ["--dash" as never]: "200" }}
        />
      </svg>

      {/* Decorative SVG — bottom-left tubule */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 hidden h-[360px] w-[360px] text-[color:var(--accent)] opacity-[0.25] lg:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M10 160 Q 60 60 100 110 T 190 60"
          stroke="currentColor"
          strokeWidth="0.8"
          className="path-draw"
          style={{ ["--dash" as never]: "300" }}
        />
        <path
          d="M10 180 Q 60 80 100 130 T 190 80"
          stroke="currentColor"
          strokeWidth="0.5"
          className="path-draw"
          style={{ ["--dash" as never]: "300" }}
        />
      </svg>

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, color-mix(in srgb, var(--bg) 35%, transparent) 80%)",
        }}
      />
    </>
  );
}

/* ============================================================
   Headline — staggered word-by-word reveal with gradient accent
   ============================================================ */
function HeroHeadline({ reduced }: { reduced: boolean }) {
  const words = ["Tu salud", "empieza"];
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
      }}
      className="inline-block"
    >
      {words.map((w, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            variants={
              reduced
                ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                : {
                    hidden: { y: "110%" },
                    visible: { y: 0, transition: { duration: 0.9, ease: easeEditorial } },
                  }
            }
            className="inline-block will-change-transform"
          >
            {w}
          </motion.span>
        </span>
      ))}
      <span className="block overflow-hidden">
        <motion.span
          variants={
            reduced
              ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
              : {
                  hidden: { y: "110%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: easeEditorial } },
                }
          }
          className="inline-block will-change-transform italic-serif gradient-text"
        >
          acá.
        </motion.span>
      </span>
    </motion.span>
  );
}
