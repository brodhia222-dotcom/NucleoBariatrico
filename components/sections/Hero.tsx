"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { brand, hero } from "@/lib/copy";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      data-nav-tone="light"
      className="relative isolate overflow-hidden bg-[color:var(--bg-elevated)] text-[color:var(--ink)]"
      style={{ paddingTop: "var(--nav-height)" }}
    >
      <div className="grid lg:grid-cols-2" style={{ minHeight: "min(680px, 82vh)" }}>
        {/* Texto — columna izquierda, fondo limpio */}
        <div className="flex items-center">
          <div className="w-full px-6 py-14 sm:px-10 lg:py-20 lg:pl-[max(20px,6vw)] lg:pr-14 xl:pl-[max(20px,8vw)]">
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(42px, 4.6vw, 76px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 144',
                textWrap: "balance",
              }}
            >
              <HeroHeadline reduced={Boolean(reduced)} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="body-lg mt-7 max-w-[54ch] text-[color:var(--ink-soft)]"
            >
              {hero.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href={hero.primary.href} className="btn btn-primary group">
                {hero.primary.label}
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(brand.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <WhatsappLogo weight="fill" className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
            </motion.div>
          </div>
        </div>

        {/* Foto — columna derecha, sin veladuras */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative aspect-[16/11] lg:aspect-auto"
        >
          <img
            src="/images/hero.jpg"
            alt="Antes y después de un proceso bariátrico"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
          {/* Fundido sutil hacia la columna de texto (solo desktop) */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-24 lg:block"
            style={{
              background:
                "linear-gradient(90deg, var(--bg-elevated), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function HeroHeadline({ reduced }: { reduced: boolean }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
      }}
      className="inline-block"
    >
      <span className="block overflow-hidden">
        <motion.span
          variants={
            reduced
              ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
              : {
                  hidden: { y: "108%" },
                  visible: { y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                }
          }
          className="inline-block will-change-transform"
        >
          Tu salud
        </motion.span>
      </span>
      <span className="block overflow-hidden">
        <motion.span
          variants={
            reduced
              ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
              : {
                  hidden: { y: "108%" },
                  visible: { y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                }
          }
          className="inline-block will-change-transform"
        >
          empieza <span className="italic-serif text-[color:var(--accent)]">acá.</span>
        </motion.span>
      </span>
    </motion.span>
  );
}
