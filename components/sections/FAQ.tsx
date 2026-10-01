"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, ChatCircleDots, Plus } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, faq } from "@/lib/copy";
import { scrollA } from "@/lib/scroll";

// Cuántas preguntas se ven antes de "Ver más preguntas"
const LIMITE = 5;

export function FAQ() {
  // Todas las preguntas juntas y sin ningún filtro puesto al entrar (pedido de Fede, 2026-10-01).
  // Se ven las primeras 5 y el resto se abre con "Ver más preguntas". Los 3 temas del equipo quedan
  // como filtro opcional: se prende y se apaga con un clic. Todas cerradas al entrar y al filtrar.
  const [filtro, setFiltro] = useState<number | null>(null);
  const [expandida, setExpandida] = useState(false);
  const [abierta, setAbierta] = useState<string | null>(null);
  const lista = useRef<HTMLDivElement>(null);

  const preguntas = filtro === null ? faq.grupos.flatMap((g) => g.items) : faq.grupos[filtro].items;
  // Con 6 no vale la pena esconder una sola: se recorta recién desde 7
  const recortable = preguntas.length > LIMITE + 1;
  const visibles = recortable && !expandida ? preguntas.slice(0, LIMITE) : preguntas;
  // Debajo de la lista siempre hay una sola acción: ver más, ver menos o sacar el filtro
  const conBoton = filtro !== null || recortable;
  const etiqueta = filtro !== null ? "Ver todas las preguntas" : expandida ? "Ver menos" : "Ver más preguntas";

  const elegirFiltro = (i: number) => {
    setFiltro((actual) => (actual === i ? null : i));
    setExpandida(false);
    setAbierta(null);
  };

  const alternarLista = () => {
    setAbierta(null);
    if (filtro !== null) {
      setFiltro(null);
      setExpandida(true);
      return;
    }
    if (!expandida) {
      setExpandida(true);
      return;
    }
    setExpandida(false);
    // Al achicar la lista, si su comienzo quedó arriba de la pantalla se vuelve a mostrar desde el principio
    requestAnimationFrame(() => {
      const r = lista.current?.getBoundingClientRect();
      if (r && r.top < 96) scrollA(window.scrollY + r.top - 112);
    });
  };

  return (
    <Section id="faq" tone="default">
      <Container>
        <div className="flex flex-col items-center text-center gap-4 mb-8 lg:mb-10">
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

        {/* Temas: filtro opcional, ninguno elegido al entrar */}
        <Reveal delay={0.1}>
          <div
            role="group"
            aria-label="Filtrar las preguntas por tema"
            className="mx-auto mb-7 flex w-fit max-w-full flex-wrap justify-center gap-2 lg:mb-8"
          >
            {faq.grupos.map((g, i) => {
              const activo = i === filtro;
              return (
                <button
                  key={g.titulo}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => elegirFiltro(i)}
                  className={`relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                    activo
                      ? "border-transparent text-[color:var(--ink-inverse)]"
                      : "border-[color:var(--border)] text-[color:var(--ink-soft)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--ink)]"
                  }`}
                >
                  {activo && (
                    <motion.span
                      layoutId="faq-filtro-activo"
                      aria-hidden
                      className="absolute -inset-px rounded-full bg-[color:var(--ink)]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{g.titulo}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* overflow-anchor: mientras la lista se achica, el navegador no corrige el scroll por su cuenta */}
        <div ref={lista} className="mx-auto max-w-4xl [overflow-anchor:none]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={filtro ?? "todas"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul id="faq-lista" className="border-t border-[color:var(--border-strong)]">
                {/* Las que suma "Ver más" entran de a una; las primeras no se vuelven a animar */}
                <AnimatePresence initial={false}>
                  {visibles.map((item, i) => {
                    const isOpen = abierta === item.q;
                    const esUltima = i === visibles.length - 1;
                    return (
                      <motion.li
                        key={item.q}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: Math.max(0, i - LIMITE) * 0.05 },
                        }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.25, ease: [0.65, 0, 0.35, 1] } }}
                        // La última no lleva línea propia cuando abajo va el botón: la línea es la del botón
                        className={`overflow-hidden ${esUltima && conBoton ? "" : "border-b border-[color:var(--border)]"}`}
                      >
                        <button
                          type="button"
                          onClick={() => setAbierta(isOpen ? null : item.q)}
                          className="group flex w-full items-center justify-between gap-6 py-4 lg:py-5 text-left"
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
                              <div className="pb-5 max-w-3xl sm:pr-12">
                                <p className="body-lg text-[color:var(--ink-soft)] leading-relaxed">{item.a}</p>
                                {item.link && (
                                  <a
                                    href={item.link.href}
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--ink)] underline decoration-[color:var(--accent)] underline-offset-4 hover:decoration-2"
                                  >
                                    {item.link.label}
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>

              {/* El cierre de la lista: una línea con el botón en el medio */}
              {conBoton && (
                <div className="flex items-center gap-4 lg:-mt-1.5">
                  <span aria-hidden className="h-px flex-1 bg-[color:var(--border)]" />
                  <button
                    type="button"
                    onClick={alternarLista}
                    aria-expanded={filtro === null ? expandida : undefined}
                    aria-controls="faq-lista"
                    className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] px-5 py-2 text-sm font-medium text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2"
                  >
                    {etiqueta}
                    <CaretDown
                      weight="bold"
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        filtro === null && expandida ? "rotate-180" : "group-hover:translate-y-0.5"
                      }`}
                    />
                  </button>
                  <span aria-hidden className="h-px flex-1 bg-[color:var(--border)]" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
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
