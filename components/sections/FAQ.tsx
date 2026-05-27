"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChatCircleDots } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, faq } from "@/lib/copy";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <Section id="faq" tone="default">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{faq.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="font-display mt-4"
                style={{
                  fontSize: "clamp(36px, 4.6vw, 64px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 72',
                  textWrap: "balance",
                  maxWidth: "14ch",
                }}
              >
                {faq.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
            <Reveal delay={0.1}>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-fit"
              >
                <ChatCircleDots weight="regular" className="h-4 w-4" />
                Hacer una pregunta
              </a>
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-[color:var(--border-strong)]">
          {faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={i} delay={i * 0.04}>
                <li className="border-b border-[color:var(--border)]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 lg:py-9 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex flex-1 items-baseline">
                      <span
                        className="font-display text-[color:var(--ink)] transition-opacity duration-300 group-hover:opacity-70"
                        style={{
                          fontSize: "clamp(20px, 2vw, 28px)",
                          lineHeight: 1.18,
                          letterSpacing: "-0.015em",
                          fontWeight: 300,
                          fontVariationSettings: '"opsz" 48',
                        }}
                      >
                        {item.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                      className="shrink-0 text-[color:var(--ink)]"
                      aria-hidden
                    >
                      <Plus weight="thin" className="h-6 w-6" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-0 lg:pl-[calc(11px+2.5rem)] pr-12 pb-8 max-w-3xl">
                          <p className="body-lg text-[color:var(--ink-soft)] leading-relaxed">
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
      </Container>
    </Section>
  );
}
