"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { faq } from "@/lib/copy";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="faq" tone="elevated">
      <Container>
        <div className="mb-16 grid gap-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{faq.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md mt-4" style={{ fontVariationSettings: '"opsz" 72' }}>
                {faq.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          {faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={i} delay={i * 0.04} className="border-b border-[color:var(--border)]">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="h4 flex-1 text-[color:var(--ink)]">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--border)] text-[color:var(--ink-soft)]"
                    aria-hidden
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="body pb-7 pr-12 text-[color:var(--ink-soft)] max-w-prose">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
