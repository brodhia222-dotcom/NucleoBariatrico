"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChatCircleDots } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, faq } from "@/lib/copy";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="faq" tone="elevated">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-start">
          {/* Sticky left column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-5">
            <Reveal>
              <Eyebrow>{faq.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                  textWrap: "balance",
                  maxWidth: "12ch",
                }}
              >
                {faq.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body text-[color:var(--ink-soft)] max-w-prose mt-2">
                ¿No encontrás tu pregunta? Escribinos por WhatsApp y te respondemos en menos de 24 horas hábiles.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-fit mt-2"
              >
                <ChatCircleDots weight="regular" className="h-4 w-4" />
                Hacer una pregunta
              </a>
            </Reveal>
          </aside>

          {/* Right column — accordion */}
          <div className="lg:col-span-8">
            <ul className="border-t border-[color:var(--border-strong)]">
              {faq.items.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <Reveal key={i} delay={i * 0.04}>
                    <li className="border-b border-[color:var(--border)]">
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="flex w-full items-start justify-between gap-6 py-6 lg:py-7 text-left group"
                        aria-expanded={isOpen}
                      >
                        <span className="flex-1 flex items-start gap-5">
                          <span
                            className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-muted)] pt-1.5 tabular shrink-0"
                            aria-hidden
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="font-display text-[color:var(--ink)]"
                            style={{
                              fontSize: "clamp(18px, 1.6vw, 22px)",
                              lineHeight: 1.25,
                              letterSpacing: "-0.012em",
                              fontWeight: 400,
                              fontVariationSettings: '"opsz" 32',
                            }}
                          >
                            {item.q}
                          </span>
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color:var(--border-strong)] text-[color:var(--ink)] group-hover:bg-[color:var(--ink)] group-hover:text-[color:var(--ink-inverse)] group-hover:border-[color:var(--ink)] transition-colors"
                          aria-hidden
                        >
                          {isOpen ? <Minus weight="bold" className="h-4 w-4" /> : <Plus weight="bold" className="h-4 w-4" />}
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-10 pr-12 pb-7">
                              <p className="body text-[color:var(--ink-soft)] max-w-prose leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
