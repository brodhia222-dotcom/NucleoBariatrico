"use client";

import { motion } from "framer-motion";
import {
  ChatCircleText,
  Stethoscope,
  ShieldCheck,
  Heart,
  CalendarCheck,
  type Icon,
} from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { proceso } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

const stepIcons: Icon[] = [ChatCircleText, Stethoscope, ShieldCheck, Heart, CalendarCheck];

export function Proceso() {
  return (
    <Section id="proceso" tone="elevated">
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-16 lg:mb-24 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{proceso.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                  textWrap: "balance",
                  maxWidth: "16ch",
                }}
              >
                {proceso.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <p className="body-sm text-[color:var(--ink-soft)] max-w-prose">{proceso.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Timeline */}
        <ol className="relative">
          {/* Vertical connector line on the left */}
          <span
            aria-hidden
            className="absolute left-[18px] sm:left-[28px] top-2 bottom-2 w-px bg-[color:var(--border-strong)]"
          />

          {proceso.pasos.map((paso, i) => {
            const Icon = stepIcons[i] ?? stepIcons[0];
            return (
              <motion.li
                key={paso.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: i * 0.07, ease: easeEditorial }}
                className="relative pl-12 sm:pl-20 pb-10 lg:pb-14 last:pb-0"
              >
                {/* Bullet with icon */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 grid h-9 w-9 sm:h-14 sm:w-14 place-items-center rounded-full bg-[color:var(--ink)] text-[color:var(--ink-inverse)] shadow-[var(--shadow-sm)]"
                >
                  <Icon weight="regular" className="h-4 w-4 sm:h-6 sm:w-6" />
                </span>

                <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                  {/* Number + title */}
                  <div className="lg:col-span-5 flex flex-col gap-2">
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--accent)]"
                    >
                      Paso {paso.n}
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "clamp(26px, 2.6vw, 36px)",
                        lineHeight: 1.08,
                        letterSpacing: "-0.02em",
                        fontWeight: 300,
                        fontVariationSettings: '"opsz" 48',
                      }}
                    >
                      {paso.titulo}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="lg:col-span-7">
                    <p className="body text-[color:var(--ink-soft)] max-w-prose">{paso.body}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
