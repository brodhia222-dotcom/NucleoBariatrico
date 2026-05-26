"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { noEstasSolo } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

export function NoEstasSolo() {
  return (
    <section
      id="no-estas-solo"
      className="relative overflow-hidden bg-[color:var(--color-indigo-900)]"
      style={{ paddingBlock: "clamp(120px, 16vw, 200px)" }}
    >
      {/* Subtle dot pattern background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dots opacity-[0.06]"
        style={{ color: "var(--ink-inverse)" }}
      />
      {/* Radial vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(29,23,57,0.55) 75%, rgba(29,23,57,0.85) 100%)",
        }}
      />

      <Container className="relative z-10 grid place-items-center text-center text-[color:var(--ink-inverse)]">
        <div className="flex flex-col items-center gap-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="block h-px w-10 bg-[color:var(--accent)]" />
            <Eyebrow className="text-[color:var(--ink-inverse)]/70">{noEstasSolo.eyebrow}</Eyebrow>
            <span aria-hidden className="block h-px w-10 bg-[color:var(--accent)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.0, delay: 0.3, ease: easeEditorial }}
            className="font-display"
            style={{
              fontSize: "clamp(48px, 8vw, 104px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 144',
              textWrap: "balance",
            }}
          >
            {noEstasSolo.headline.replace(".", "")}
            <span className="italic-serif text-[color:var(--accent)]">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="body-lg max-w-md text-[color:var(--ink-inverse)]/80"
          >
            {noEstasSolo.body}
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-inverse)]/55 mt-6"
          >
            — Equipo Nucleo Bariátrico
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
