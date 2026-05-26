"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Isotipo } from "@/components/primitives/Isotipo";
import { WipeWords } from "@/components/primitives/WipeWords";
import { hero } from "@/lib/copy";
import { easeEditorial, easeOut } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{ paddingTop: "calc(var(--nav-height) + 32px)" }}
    >
      <Container className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-20 pb-[calc(var(--section-y)*0.6)] lg:min-h-[calc(100svh-var(--nav-height))]">
        {/* Left: type column */}
        <div className="lg:col-span-7 flex flex-col gap-7 lg:gap-9">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(56px, 9vw, 128px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            <WipeWords text={["Tu salud"]} as="span" byLine />
            <WipeWords
              text={["empieza acá."]}
              as="span"
              byLine
              wordClassName=""
              delayChildren={0.18}
            />
          </h1>

          <motion.p
            className="body-lg max-w-xl text-[color:var(--ink-soft)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easeEditorial }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 mt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: easeEditorial }}
          >
            <a
              href={hero.primary.href}
              className="inline-flex h-12 items-center rounded-[12px] bg-[color:var(--accent)] px-6 text-sm font-medium text-white shadow-[var(--shadow-sm)] hover:bg-[color:var(--accent-hover)] transition-colors"
            >
              {hero.primary.label}
            </a>
            <a
              href={hero.secondary.href}
              className="inline-flex h-12 items-center px-3 text-sm font-medium text-[color:var(--ink)] underline-offset-4 hover:underline"
            >
              {hero.secondary.label}
              <span aria-hidden className="ml-2">→</span>
            </a>
          </motion.div>
        </div>

        {/* Right: large SVG isotype, fluid line. */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <HeroIsotipo />
        </div>
      </Container>

      {/* Bottom anchor row — only visible after the hero copy, low key */}
      <div className="container-x">
        <div className="flex items-center gap-6 border-t border-[color:var(--border)] py-6 text-[color:var(--ink-soft)]">
          <span className="eyebrow">Consultorios</span>
          <span aria-hidden className="block h-px w-8 bg-[color:var(--border)]" />
          <span className="text-sm">Villa del Parque</span>
          <span aria-hidden className="block h-px w-4 bg-[color:var(--border)]" />
          <span className="text-sm">San Isidro</span>
        </div>
      </div>
    </section>
  );
}

function HeroIsotipo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const y = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      setTilt({ x: x * 6, y: -y * 6 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-[520px]" style={{ perspective: "1000px" }}>
      {/* Soft warm halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(223,126,53,0.10), transparent 60%)",
        }}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: tilt.y,
          rotateY: tilt.x,
        }}
        transition={{
          opacity: { duration: 1.0, ease: easeEditorial },
          scale: { duration: 1.0, ease: easeEditorial },
          rotateX: { type: "spring", stiffness: 90, damping: 20 },
          rotateY: { type: "spring", stiffness: 90, damping: 20 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <SVGIsotipoDrawn />
      </motion.div>
    </div>
  );
}

function SVGIsotipoDrawn() {
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-[78%] w-[78%] text-[color:var(--ink)] drop-shadow-[0_24px_48px_rgba(63,53,110,0.18)]"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M 22 80 L 22 36 A 14 14 0 0 1 50 36 L 50 80 A 14 14 0 0 0 78 80 L 78 22"
        stroke="currentColor"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: easeEditorial, delay: 0.2 }}
      />
    </svg>
  );
}
