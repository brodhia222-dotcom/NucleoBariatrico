"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Isotipo } from "@/components/primitives/Isotipo";
import { WipeWords } from "@/components/primitives/WipeWords";
import { hero } from "@/lib/copy";
import { easeEditorial, easeOut } from "@/lib/motion";

// 3D scene loads only on client, after LCP. SVG fallback always renders first.
const IsotipoLive = dynamic(
  () => import("@/components/three/IsotipoLive").then((m) => m.IsotipoLive),
  { ssr: false, loading: () => <IsotipoFallback /> },
);

function IsotipoFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <Isotipo
        className="h-[min(72vh,560px)] w-[min(72vh,560px)] text-[color:var(--ink)]"
        strokeWidth={12}
      />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{ paddingTop: "calc(var(--nav-height) + 24px)", minHeight: "100svh" }}
    >
      {/* Decorative giant isotipo behind, very low opacity (cita del manual oficial) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-end justify-end overflow-hidden opacity-[0.045]"
      >
        <Isotipo
          className="h-[140vh] w-[140vh] translate-x-1/4 translate-y-1/4 text-[color:var(--ink)]"
          strokeWidth={4}
        />
      </div>

      <Container className="relative grid gap-12 lg:grid-cols-12 lg:gap-16 items-center min-h-[calc(100svh-var(--nav-height))] pb-[var(--section-y)]">
        {/* Left: type column */}
        <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>

          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-display-xl)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            <WipeWords text={[hero.headline[0]]} as="span" byLine />
            <WipeWords text={[hero.headline[1]]} as="span" byLine />
            <WipeWords text={[hero.headline[2]]} as="span" byLine wordClassName="italic text-[color:var(--accent)]" />
          </h1>

          <motion.p
            className="body-lg max-w-xl text-[color:var(--ink-soft)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: easeEditorial }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.55, ease: easeEditorial }}
          >
            <a
              href={hero.primary.href}
              className="inline-flex h-12 items-center rounded-[12px] bg-[color:var(--accent)] px-6 text-sm font-medium text-white shadow-[var(--shadow-sm)] hover:bg-[color:var(--accent-hover)] transition-colors"
            >
              {hero.primary.label}
            </a>
            <a
              href={hero.secondary.href}
              className="inline-flex h-12 items-center px-2 text-sm font-medium text-[color:var(--ink)] underline-offset-4 hover:underline"
            >
              {hero.secondary.label}
              <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>

          <motion.div
            className="mt-6 hidden lg:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center gap-6 text-xs text-[color:var(--ink-soft)]">
              <span className="eyebrow opacity-70">Villa del Parque</span>
              <span aria-hidden className="block h-px w-8 bg-[color:var(--border)]" />
              <span className="eyebrow opacity-70">San Isidro</span>
            </div>
          </motion.div>
        </div>

        {/* Right: 3D / SVG isotipo column */}
        <div className="lg:col-span-5 relative aspect-square lg:aspect-auto lg:h-[min(80vh,720px)]">
          <IsotipoLive />
        </div>
      </Container>

      {/* Bottom scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[color:var(--ink-soft)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="eyebrow opacity-70">Bajá</span>
        <span aria-hidden className="block h-8 w-px bg-current opacity-30" />
      </motion.div>
    </section>
  );
}
