"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { WipeWords } from "@/components/primitives/WipeWords";
import { Isotipo } from "@/components/primitives/Isotipo";
import { noEstasSolo } from "@/lib/copy";
import { viewportOnce } from "@/lib/motion";

// Phase 5 will replace this with a pinned 3D orbits scene.
const NucleoOrbitas = dynamic(
  () => import("@/components/three/NucleoOrbitas").then((m) => m.NucleoOrbitas),
  { ssr: false, loading: () => null },
);

export function NoEstasSolo() {
  return (
    <Section id="no-estas-solo" tone="dark" className="relative overflow-hidden">
      {/* Decorative orbit canvas in the background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <NucleoOrbitas />
      </div>

      {/* Faded isotipo behind */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid place-items-center opacity-[0.08]"
      >
        <Isotipo
          className="h-[min(110vh,1000px)] w-[min(110vh,1000px)] text-[color:var(--ink-inverse)]"
          strokeWidth={2}
        />
      </div>

      <Container className="relative grid place-items-center min-h-[80vh] text-center text-[color:var(--ink-inverse)]">
        <div className="flex flex-col items-center gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Eyebrow className="opacity-70">{noEstasSolo.eyebrow}</Eyebrow>
          </motion.div>

          <WipeWords
            text={noEstasSolo.headline}
            as="h2"
            className="font-display"
            wordClassName=""
            byLine={false}
            // text styles via inline style
          />

          <style>{`
            #no-estas-solo h2 {
              font-size: clamp(64px, 11vw, 140px);
              line-height: 1.02;
              letter-spacing: -0.035em;
              font-weight: 300;
              font-variation-settings: "opsz" 144;
              max-width: 14ch;
            }
          `}</style>

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
