"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ShieldCheck, ArrowUpRight, Info } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { obrasSociales } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

export function ObrasSociales() {
  return (
    <Section id="obras-sociales" tone="default" className="relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start mb-12 lg:mb-16">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <Reveal>
              <Eyebrow>{obrasSociales.eyebrow}</Eyebrow>
            </Reveal>
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
                  maxWidth: "14ch",
                }}
              >
                {obrasSociales.headline.split("cirugía").map((part, i, arr) =>
                  i === arr.length - 1 ? (
                    part
                  ) : (
                    <span key={i}>
                      {part}
                      <span className="italic-serif text-[color:var(--accent)]">cirugía</span>
                    </span>
                  ),
                )}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">
                {obrasSociales.body}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a href={obrasSociales.cta.href} className="btn btn-ink group w-fit mt-2">
                <ShieldCheck weight="regular" className="h-4 w-4" />
                {obrasSociales.cta.label}
                <ArrowUpRight
                  weight="bold"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[color:var(--border)]">
            <Reveal delay={0.15}>
              <div className="flex items-start gap-4 rounded-[var(--radius-lg)] bg-[color:var(--bg-elevated)] p-6 border border-[color:var(--border)]">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                >
                  <Info weight="regular" className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="h4">¿Qué es un efector?</p>
                  <p className="body-sm text-[color:var(--ink-soft)] leading-relaxed">
                    {obrasSociales.notaEfector}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3D logo grid */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
          {obrasSociales.planes.map((nombre, i) => (
            <motion.li
              key={nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: i * 0.05, ease: easeEditorial }}
            >
              <LogoCard label={nombre} />
            </motion.li>
          ))}
        </ul>

        <Reveal>
          <p className="caption text-center mt-8">
            Logos pendientes — placeholder con nombre. Lista orientativa, consultá tu cobertura con el equipo.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   LogoCard — 3D tilt, sin texto encima del logo
   ============================================================ */
function LogoCard({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 220, damping: 24 });
  const y = useSpring(rawY, { stiffness: 220, damping: 24 });

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-12, 12]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-wrap group"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="tilt-card relative grid aspect-[16/9] place-items-center overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
      >
        {/* Subtle inner glow */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 60%)",
          }}
        />
        {/* Texture overlay on hover */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
          }}
        />
        {/* "Logo" placeholder — only the name in Fraunces */}
        <span
          className="relative font-display text-[color:var(--ink)] transition-transform duration-300 group-hover:scale-105"
          style={{
            fontSize: "clamp(20px, 2.4vw, 28px)",
            letterSpacing: "-0.015em",
            fontWeight: 400,
            fontVariationSettings: '"opsz" 36',
          }}
        >
          {label}
        </span>
        {/* Corner accent */}
        <span
          aria-hidden
          className="absolute top-3 right-3 block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] opacity-60"
        />
      </motion.div>
    </div>
  );
}
