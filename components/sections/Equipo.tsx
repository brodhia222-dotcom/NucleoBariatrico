"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, HeartHalf, Carrot, ArrowRight } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { equipo } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

type IconType = ComponentType<{ className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
const memberIcons: IconType[] = [Stethoscope, HeartHalf, Carrot];

export function Equipo() {
  const [active, setActive] = useState(0);

  return (
    <Section
      id="equipo"
      tone="elevated"
      marker={{ index: "03", label: "Equipo", aside: "3 profesionales" }}
    >
      <Container>
        {/* Editorial header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-10 lg:mb-14 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{equipo.eyebrow}</Eyebrow>
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
                {equipo.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <p className="body-sm text-[color:var(--ink-soft)] max-w-prose">{equipo.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Expanding cards */}
        <Reveal>
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-3 lg:h-[560px]">
            {equipo.miembros.map((m, i) => {
              const Icon = memberIcons[i] ?? memberIcons[0];
              const isActive = i === active;
              return (
                <ExpandingCard
                  key={m.nombre}
                  index={i}
                  isActive={isActive}
                  onActivate={() => setActive(i)}
                  miembro={m}
                  Icon={Icon}
                />
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   ExpandingCard — hover/focus to expand, others collapse
   ============================================================ */
function ExpandingCard({
  index,
  isActive,
  onActivate,
  miembro,
  Icon,
}: {
  index: number;
  isActive: boolean;
  onActivate: () => void;
  miembro: (typeof equipo)["miembros"][number];
  Icon: IconType;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-expanded={isActive}
      animate={{ flexGrow: isActive ? 4 : 1 }}
      transition={{ duration: 0.85, ease: easeEditorial }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={viewportOnce}
      style={{
        // Mobile: each card has its own height; desktop: row layout
        flexBasis: 0,
      }}
      className="group relative flex min-h-[260px] basis-0 overflow-hidden rounded-[var(--radius-xl)] text-left text-[color:var(--ink-inverse)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 lg:min-h-0"
    >
      {/* Placeholder background */}
      <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />

      {/* Dark gradient overlay so text is legible */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) ${
            index % 2 === 0 ? 25 : 35
          }%, transparent) 0%, color-mix(in srgb, var(--bg-inverse) 88%, transparent) 100%)`,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 flex w-full flex-col justify-between gap-6 p-6 lg:p-8">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70">
            № {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ink-inverse)]/12 backdrop-blur-md text-[color:var(--ink-inverse)] transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-white"
          >
            <Icon weight="regular" className="h-5 w-5" />
          </span>
        </div>

        {/* Vertical title (when collapsed) */}
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-1 items-end lg:items-center"
            >
              <h3
                className="font-display lg:[writing-mode:vertical-rl] lg:rotate-180"
                style={{
                  fontSize: "22px",
                  lineHeight: 1.1,
                  fontWeight: 300,
                  letterSpacing: "0.01em",
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                <span className="opacity-80">{miembro.rol}</span>{" "}
                <span className="italic-serif">— {miembro.nombre}</span>
              </h3>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: easeEditorial }}
              className="flex flex-col gap-5"
            >
              <div>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent)] mb-2 block">
                  {miembro.rol}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(28px, 3.6vw, 44px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.025em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 72',
                  }}
                >
                  {miembro.nombre}
                </h3>
              </div>

              <p className="body-sm opacity-85 max-w-[42ch]">{miembro.bio}</p>

              <ul className="flex flex-wrap gap-2 mt-1">
                {miembro.tags.map((t) => (
                  <li
                    key={t}
                    className="px-2.5 py-1 text-[11px] tracking-wide rounded-full border border-[color:var(--ink-inverse)]/22 backdrop-blur-md"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium tracking-wide opacity-90">
                <span className="block h-px w-8 bg-[color:var(--accent)]" />
                Foto · 4:5 · pendiente
                <ArrowRight weight="bold" className="h-3.5 w-3.5 opacity-70" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
