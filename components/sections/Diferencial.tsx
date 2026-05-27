"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { diferencial } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

export function Diferencial() {
  return (
    <Section id="diferencial" tone="default">
      <Container>
        {/* Editorial header — asymmetric */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{diferencial.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
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
                  maxWidth: "20ch",
                }}
              >
                {diferencial.headline.split(", ").map((part, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="italic-serif text-[color:var(--accent)]">{part}</span>
                    ) : (
                      part
                    )}
                    {i < arr.length - 1 && ", "}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* 3D tilt cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {diferencial.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.75, delay: i * 0.08, ease: easeEditorial }}
              style={{ marginTop: i % 2 === 1 ? 28 : 0 }}
            >
              <TiltCard
                badge={item.badge}
                title={item.title}
                body={item.body}
                cta={item.cta}
                href={item.href}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   TiltCard — mouse-tracked 3D tilt with gradient background
   ============================================================ */
function TiltCard({
  badge,
  title,
  body,
  cta,
  href,
  index,
}: {
  badge: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 200, damping: 22 });
  const y = useSpring(rawY, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <div className="tilt-wrap h-full">
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
        className="tilt-card group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] p-6 lg:p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
      >
        {/* Backdrop: placeholder image area */}
        <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />
        {/* Overlay tint based on index */}
        <CardOverlay index={index} />
        {/* Glare */}
        <CardGlare glareX={glareX} glareY={glareY} />

        {/* Content */}
        <div className="relative z-10 flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-soft)]">
            {badge}
          </span>
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md text-[color:var(--ink)] shadow-[var(--shadow-sm)] transition-colors group-hover:bg-[color:var(--ink)] group-hover:text-[color:var(--ink-inverse)]"
          >
            <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <h3
            className="font-display text-[color:var(--ink)]"
            style={{
              fontSize: "22px",
              lineHeight: 1.16,
              letterSpacing: "-0.014em",
              fontWeight: 400,
              fontVariationSettings: '"opsz" 32',
              textWrap: "balance",
            }}
          >
            {title}
          </h3>
          <p className="body-sm text-[color:var(--ink-soft)]" style={{ maxWidth: "36ch" }}>
            {body}
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[color:var(--ink)]">
            <span className="block h-px w-6 bg-[color:var(--accent)] transition-all duration-300 group-hover:w-10" />
            {cta}
          </span>
        </div>
      </motion.a>
    </div>
  );
}

/* ============================================================
   Visual layers — overlay tint + glare follow
   ============================================================ */
function CardOverlay({ index }: { index: number }) {
  // Cada índice rota una mezcla diferente para que las 4 tarjetas no se vean
  // iguales pero respeten la paleta semántica.
  const styles: React.CSSProperties[] = [
    {
      background:
        "radial-gradient(140% 100% at 0% 0%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 55%), linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--bg-elevated) 70%, transparent))",
    },
    {
      background:
        "radial-gradient(140% 100% at 100% 0%, color-mix(in srgb, var(--ink) 22%, transparent), transparent 55%), linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--bg-elevated) 70%, transparent))",
    },
    {
      background:
        "radial-gradient(140% 100% at 0% 100%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 55%), linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--bg-elevated) 70%, transparent))",
    },
    {
      background:
        "radial-gradient(140% 100% at 100% 100%, color-mix(in srgb, var(--ink) 26%, transparent), transparent 55%), linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--bg-elevated) 70%, transparent))",
    },
  ];
  return <div aria-hidden className="absolute inset-0" style={styles[index % styles.length]} />;
}

function CardGlare({
  glareX,
  glareY,
}: {
  glareX: MotionValue<string>;
  glareY: MotionValue<string>;
}) {
  const background = useTransform(
    [glareX, glareY] as MotionValue<string>[],
    ([gx, gy]: string[]) =>
      `radial-gradient(circle 200px at ${gx} ${gy}, color-mix(in srgb, var(--bg) 65%, transparent), transparent 70%)`,
  );
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background }}
    />
  );
}
