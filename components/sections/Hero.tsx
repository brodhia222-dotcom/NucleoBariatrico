"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, WhatsappLogo, Play } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { brand, hero } from "@/lib/copy";
import { easeEditorial, easeOut } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex flex-col overflow-hidden"
      style={{
        paddingTop: "var(--nav-height)",
        minHeight: "min(820px, 92vh)",
      }}
    >
      <HeroBackground />

      {/* Editorial masthead */}
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 flex items-center justify-between border-b border-[color:var(--border)] pb-3 pt-5"
        >
          <span className="eyebrow tabular">Mayo · 2026</span>
          <span className="eyebrow hidden sm:block">Equipo Médico · Cirugía Bariátrica</span>
          <span className="eyebrow tabular">№ 01</span>
        </motion.div>
      </Container>

      {/* Centered content */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 py-10 text-center lg:gap-8 lg:py-14">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeOut, delay: 0.2 }}
              className="flex items-center gap-3 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)]/70 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
              <span className="eyebrow">{hero.eyebrow}</span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(44px, 6.8vw, 96px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144',
                textWrap: "balance",
              }}
            >
              <HeroHeadline reduced={Boolean(reduced)} />
            </h1>

            {/* Body */}
            <motion.p
              className="body text-[color:var(--ink-soft)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: easeEditorial }}
              style={{ maxWidth: "52ch" }}
            >
              {hero.body}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
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
          className="relative z-10 mb-8 grid items-end gap-6 border-t border-[color:var(--border)] pt-4 sm:grid-cols-[1fr_auto_1fr]"
        >
          <div className="hidden sm:flex flex-col gap-0.5">
            <span className="eyebrow">Cobertura PMO</span>
            <span className="caption">100% · efector autorizado</span>
          </div>
          <a
            href="#imc"
            aria-label="Bajar a la calculadora"
            className="mx-auto flex flex-col items-center gap-1.5 text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
          >
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase">Scroll</span>
            <span aria-hidden className="scroll-hint">
              <ArrowDown weight="regular" className="h-4 w-4" />
            </span>
          </a>
          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <span className="eyebrow">Sedes</span>
            <span className="caption">Villa del Parque · San Isidro</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ============================================================
   Background — placeholder de video transparentado + texture
   ============================================================ */
function HeroBackground() {
  return (
    <>
      {/* Layer 1 — placeholder de video (full bleed, semi-transparente) */}
      <div
        aria-hidden
        className="placeholder absolute inset-0"
        style={{ borderRadius: 0, opacity: 0.42 }}
      />

      {/* Layer 2 — gradient overlay para legibilidad del centro */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--bg) 70%, transparent) 0%, color-mix(in srgb, var(--bg) 45%, transparent) 45%, color-mix(in srgb, var(--bg) 65%, transparent) 100%)",
        }}
      />

      {/* Layer 3 — vignette para concentrar la atención en el centro */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, transparent 0%, color-mix(in srgb, var(--bg) 30%, transparent) 70%, color-mix(in srgb, var(--bg) 60%, transparent) 100%)",
        }}
      />

      {/* Layer 4 — dot pattern muy sutil */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dots opacity-[0.04]"
        style={{ color: "var(--ink)" }}
      />

      {/* Layer 5 — video placeholder badge */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-[5] hidden md:flex items-center gap-2 rounded-full bg-[color:var(--bg-elevated)]/85 backdrop-blur-md px-3 py-1.5 border border-[color:var(--border)]">
        <span aria-hidden className="grid h-4 w-4 place-items-center rounded-full bg-[color:var(--accent)] text-white">
          <Play weight="fill" className="h-2 w-2 translate-x-[0.5px]" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink-soft)]">
          Video · placeholder
        </span>
      </div>
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
