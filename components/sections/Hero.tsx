"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Isotipo } from "@/components/primitives/Isotipo";
import { brand, hero } from "@/lib/copy";
import { easeEditorial, easeOut } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{ paddingTop: "calc(var(--nav-height) + 16px)" }}
    >
      {/* Editorial metadata strip — like a magazine masthead */}
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between border-b border-[color:var(--border)] pb-3 mb-10 lg:mb-14"
        >
          <span className="eyebrow tabular">Mayo · 2026</span>
          <span className="eyebrow hidden sm:block">Equipo Médico · Cirugía Bariátrica</span>
          <span className="eyebrow tabular">№ 01</span>
        </motion.div>
      </Container>

      <Container className="relative grid items-end gap-10 lg:grid-cols-12 lg:gap-12 pb-16 lg:pb-24">
        {/* Left: type column */}
        <div className="lg:col-span-7 flex flex-col gap-7 lg:gap-9">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="flex items-center gap-3"
          >
            <span className="block h-2 w-2 rounded-full bg-[color:var(--accent)]" aria-hidden />
            <span className="eyebrow">{hero.eyebrow}</span>
          </motion.div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(48px, 7.5vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144',
              textWrap: "balance",
            }}
          >
            <HeroHeadline reduced={Boolean(reduced)} />
          </h1>

          <motion.p
            className="body-lg max-w-[52ch] text-[color:var(--ink-soft)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easeEditorial }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 mt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: easeEditorial }}
          >
            <a href={hero.primary.href} className="btn btn-primary group">
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

          {/* Metric strip */}
          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: easeEditorial }}
            className="mt-6 grid grid-cols-3 gap-4 lg:gap-6 border-t border-[color:var(--border)] pt-6"
          >
            <Metric value="2" label="Consultorios" sublabel="Villa del Parque · San Isidro" />
            <Metric value="100%" label="Cobertura PMO" sublabel="con efector autorizado" />
            <Metric value="12m" label="Seguimiento" sublabel="post-quirúrgico incluido" />
          </motion.dl>
        </div>

        {/* Right: image + isotipo composition */}
        <div className="lg:col-span-5 relative">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

function HeroHeadline({ reduced }: { reduced: boolean }) {
  const words = ["Tu salud", "empieza"];
  const accentWord = "acá";
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
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
                    hidden: { y: "108%" },
                    visible: { y: 0, transition: { duration: 0.85, ease: easeEditorial } },
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
                  hidden: { y: "108%" },
                  visible: { y: 0, transition: { duration: 0.85, ease: easeEditorial } },
                }
          }
          className="inline-block will-change-transform italic-serif text-[color:var(--accent)]"
        >
          {accentWord}.
        </motion.span>
      </span>
    </motion.span>
  );
}

function Metric({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-display tabular text-[color:var(--ink)]"
        style={{
          fontSize: "clamp(28px, 3vw, 40px)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          fontWeight: 300,
          fontVariationSettings: '"opsz" 48',
        }}
      >
        {value}
      </span>
      <span className="eyebrow leading-tight">{label}</span>
      <span className="caption hidden md:block leading-tight">{sublabel}</span>
    </div>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.3, ease: easeEditorial }}
      className="relative w-full aspect-[3/4] lg:aspect-[4/5] max-h-[680px]"
    >
      {/* Main photo with editorial treatment */}
      <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-xl)]">
        <img
          src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=900&q=80&auto=format&fit=crop"
          alt="Mujer caminando con calma en luz natural"
          className="h-full w-full object-cover img-treatment"
          loading="eager"
          fetchPriority="high"
        />
        {/* Indigo vignette to align with palette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, rgba(42,35,73,0.18) 70%, rgba(42,35,73,0.45) 100%)",
          }}
        />
        {/* Caption strip overlay — like a documentary photo caption */}
        <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between text-[color:var(--ink-inverse)]">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-90">
            № 01 · Vida después
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-90">
            Caso real · 2026
          </span>
        </div>
      </div>

      {/* Floating isotipo badge — top right */}
      <div
        className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 grid h-20 w-20 lg:h-24 lg:w-24 place-items-center rounded-full bg-[color:var(--bg)] shadow-[var(--shadow-md)]"
        aria-hidden
      >
        <Isotipo className="h-9 w-9 lg:h-11 lg:w-11 text-[color:var(--ink)]" strokeWidth={10} />
      </div>

      {/* Editorial quote tag — bottom left */}
      <div
        className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 max-w-[200px] bg-[color:var(--ink)] text-[color:var(--ink-inverse)] px-4 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]"
        aria-hidden
      >
        <span className="block text-[10px] tracking-[0.18em] uppercase opacity-70 font-mono mb-1">
          Equipo médico
        </span>
        <span className="font-display italic text-[15px] leading-tight" style={{ fontWeight: 400 }}>
          “Acompañamos cada paso del recorrido.”
        </span>
      </div>
    </motion.div>
  );
}
