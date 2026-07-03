"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { brand, hero } from "@/lib/copy";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      data-nav-tone="light"
      className="relative isolate flex flex-col items-center justify-center overflow-hidden bg-[color:var(--bg-elevated)] text-[color:var(--ink)]"
      style={{
        paddingTop: "var(--nav-height)",
        minHeight: "min(720px, 86vh)",
      }}
    >
      {/* Foto de fondo — composición antes/después con el centro libre para el texto */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />

      {/* Velo general para que el texto lea bien sobre la foto */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 62%, transparent) 0%, color-mix(in srgb, var(--bg-elevated) 34%, transparent) 45%, color-mix(in srgb, var(--bg-elevated) 72%, transparent) 100%)",
        }}
      />

      {/* Halo central extra sobre la zona del texto */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 55% at 50% 52%, color-mix(in srgb, var(--bg-elevated) 78%, transparent) 0%, color-mix(in srgb, var(--bg-elevated) 45%, transparent) 55%, transparent 100%)",
        }}
      />

      {/* Content */}
      <Container className="relative z-10 py-14 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center lg:gap-10">
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(42px, 6.4vw, 92px)",
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
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
            transition={{ duration: 0.7, delay: 1.1 }}
            className="body-lg max-w-[52ch] text-[color:var(--ink-soft)]"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <a href={hero.primary.href} className="btn btn-primary group">
              {hero.primary.label}
              <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <WhatsappLogo weight="fill" className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </motion.div>
        </div>
      </Container>
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
        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
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
