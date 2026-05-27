"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { viewportOnce } from "@/lib/motion";

export function Manifiesto() {
  return (
    <Section id="manifiesto" tone="default">
      <Container>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-10 lg:mb-14"
          >
            <span aria-hidden className="block h-px w-10 bg-[color:var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[color:var(--ink-soft)]">
              Manifiesto
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(34px, 4.6vw, 68px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 96',
              textWrap: "balance",
            }}
          >
            La cirugía bariátrica no es estética.{" "}
            <span className="text-[color:var(--ink-soft)]">
              Es un tratamiento médico para personas que conviven con obesidad y quieren recuperar su salud, sin sentirse solas en el camino.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 lg:mt-16 grid gap-6 sm:grid-cols-3 border-t border-[color:var(--border)] pt-8"
          >
            <Stat value="100%" label="Cobertura PMO" sublabel="con efector autorizado" />
            <Stat value="12 m" label="Seguimiento" sublabel="post-quirúrgico incluido" />
            <Stat value="2" label="Sedes" sublabel="Villa del Parque · San Isidro" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

function Stat({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-display tabular text-[color:var(--ink)]"
        style={{
          fontSize: "clamp(30px, 3.4vw, 44px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontWeight: 300,
          fontVariationSettings: '"opsz" 48',
        }}
      >
        {value}
      </span>
      <span className="eyebrow leading-tight mt-2">{label}</span>
      <span className="caption leading-tight">{sublabel}</span>
    </div>
  );
}
