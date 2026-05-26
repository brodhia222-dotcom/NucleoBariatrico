"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { noEstasSolo } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

const NucleoOrbitas = dynamic(
  () => import("@/components/three/NucleoOrbitas").then((m) => m.NucleoOrbitas),
  { ssr: false, loading: () => null },
);

export function NoEstasSolo() {
  return (
    <Section id="no-estas-solo" tone="dark" className="relative overflow-hidden">
      {/* Orbitas 3D detrás — silenciosas, baja opacidad */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <NucleoOrbitas />
      </div>

      {/* Veil vertical para asegurar legibilidad del texto centrado */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(42,35,73,0.55) 0%, rgba(42,35,73,0.1) 60%, transparent 100%)",
        }}
      />

      <Container className="relative grid place-items-center min-h-[78svh] py-[var(--space-20)] text-center text-[color:var(--ink-inverse)]">
        <div className="flex flex-col items-center gap-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Eyebrow className="opacity-70">{noEstasSolo.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.0, delay: 0.3, ease: easeEditorial }}
            className="font-display"
            style={{
              fontSize: "clamp(56px, 10vw, 132px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144',
              textWrap: "balance",
            }}
          >
            {noEstasSolo.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="body-lg max-w-md text-[color:var(--ink-inverse)]/75"
          >
            {noEstasSolo.body}
          </motion.p>
        </div>
      </Container>
    </Section>
  );
}
