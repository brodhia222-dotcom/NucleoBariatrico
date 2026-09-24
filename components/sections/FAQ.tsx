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
  // 3 grupos del equipo (tratamientos, cobertura, consultas): uno a la vista por vez para que la
  // sección no se vuelva una lista de 11 preguntas. Todas cerradas al entrar y al cambiar de grupo.
  const [grupo, setGrupo] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const actual = faq.grupos[grupo];

  const elegirGrupo = (i: number) => {
    setGrupo(i);
    setOpenIdx(null);
  };

  return (
    <Section id="faq" tone="default">
      <Container>
        <div className="flex flex-col items-center text-center gap-4 mb-10 lg:mb-14">
          <Reveal>
            <Eyebrow>{faq.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 3.6vw, 46px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 72',
                textWrap: "balance",
              }}
            >
              {faq.headline}
            </h2>
          </Reveal>
        </div>

        {/* Grupos */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Temas de las preguntas"
            className="mx-auto mb-8 flex w-fit max-w-full flex-wrap justify-center gap-2 lg:mb-10"
          >
            {faq.grupos.map((g, i) => {
              const activo = i === grupo;
              return (
                <button
                  key={g.titulo}
                  type="button"
                  role="tab"
                  id={`faq-tab-${i}`}
                  aria-selected={activo}
                  aria-controls="faq-panel"
                  onClick={() => elegirGrupo(i)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    activo
                      ? "text-[color:var(--ink-inverse)]"
                      : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] border border-[color:var(--border)]"
                  }`}
                >
                  {activo && (
                    <motion.span
                      layoutId="faq-tab-activa"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-[color:var(--ink)]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {g.titulo}
                    <span className={`ml-2 tabular ${activo ? "opacity-70" : "opacity-60"}`}>{g.items.length}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${grupo}`} className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={actual.titulo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[color:var(--border-strong)]"
            >
              {actual.items.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <li key={item.q} className="border-b border-[color:var(--border)]">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 lg:py-7 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="font-display text-[color:var(--ink)] transition-opacity duration-300 group-hover:opacity-70"
                        style={{
                          fontSize: "clamp(18px, 1.7vw, 23px)",
                          lineHeight: 1.18,
                          letterSpacing: "-0.015em",
                          fontWeight: 300,
                          fontVariationSettings: '"opsz" 48',
                          textWrap: "balance",
                        }}
                      >
                        {item.q}
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
                          <div className="pr-12 pb-7 max-w-3xl">
                            <p className="body-lg text-[color:var(--ink-soft)] leading-relaxed">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="body-sm text-[color:var(--ink-soft)]">¿No encontraste tu pregunta?</p>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-fit"
              >
                <ChatCircleDots weight="regular" className="h-4 w-4" />
                Hacer una pregunta
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
