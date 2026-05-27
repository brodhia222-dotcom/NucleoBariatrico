"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { brand, hero } from "@/lib/copy";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[color:var(--bg-inverse)] text-[color:var(--ink-inverse)]"
      data-nav-tone="dark"
      style={{
        paddingTop: "var(--nav-height)",
        minHeight: "min(880px, 94vh)",
      }}
    >
      {/* Full-bleed placeholder de foto */}
      <div aria-hidden className="absolute inset-0 placeholder" />

      {/* Overlay para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) 25%, transparent) 0%, color-mix(in srgb, var(--bg-inverse) 45%, transparent) 55%, color-mix(in srgb, var(--bg-inverse) 88%, transparent) 100%)",
        }}
      />

      {/* Placeholder badge */}
      <div className="pointer-events-none absolute top-[calc(var(--nav-height)+20px)] right-6 z-10 flex items-center gap-2 rounded-full bg-[color:var(--bg-inverse)]/55 backdrop-blur-md px-3 py-1.5 border border-[color:var(--ink-inverse)]/15">
        <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/80">
          Foto · placeholder · 16:9
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col">
        {/* Top masthead */}
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-between border-b border-[color:var(--ink-inverse)]/15 pb-3 pt-5"
          >
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase tabular text-[color:var(--ink-inverse)]/75">
              Mayo · 2026
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/75 hidden sm:block">
              Equipo médico · Cirugía bariátrica
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase tabular text-[color:var(--ink-inverse)]/75">
              № 01
            </span>
          </motion.div>
        </Container>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom-left aligned title block */}
        <Container>
          <div className="pb-12 lg:pb-20 max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/80 mb-6 block"
            >
              {hero.eyebrow}
            </motion.span>

            <h1
              className="font-display"
              style={{
                fontSize: "clamp(48px, 8vw, 112px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144',
                textWrap: "balance",
              }}
            >
              <HeroHeadline reduced={Boolean(reduced)} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="body-lg mt-7 max-w-[52ch] text-[color:var(--ink-inverse)]/82"
            >
              {hero.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href={hero.primary.href} className="btn btn-primary group">
                {hero.primary.label}
                <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !border-[color:var(--ink-inverse)]/30 !text-[color:var(--ink-inverse)] hover:!bg-[color:var(--ink-inverse)] hover:!text-[color:var(--bg-inverse)]"
              >
                <WhatsappLogo weight="fill" className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function HeroHeadline({ reduced }: { reduced: boolean }) {
  const lines = ["Tu salud", "empieza acá."];
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.55 } },
      }}
      className="inline-block"
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            variants={
              reduced
                ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                : {
                    hidden: { y: "108%" },
                    visible: { y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                  }
            }
            className="inline-block will-change-transform"
          >
            {i === 1 ? (
              <>
                empieza <span className="italic-serif text-[color:var(--accent)]">acá.</span>
              </>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
