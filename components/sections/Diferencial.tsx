"use client";

import { motion } from "framer-motion";
import { Heartbeat, UsersThree, ShieldCheck, MapPinLine } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { diferencial } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

type IconType = ComponentType<{ className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
const icons: IconType[] = [Heartbeat, UsersThree, ShieldCheck, MapPinLine];

export function Diferencial() {
  return (
    <Section id="diferencial" tone="default">
      <Container>
        {/* Editorial header — asymmetric */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{diferencial.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
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
                  maxWidth: "20ch",
                }}
              >
                {diferencial.headline.split(", ").map((part, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="italic-serif text-[color:var(--accent)]">{part}</span>
                    ) : (
                      part
                    )}
                    {i < arr.length - 1 && ", "}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Cards grid — asymmetric: 2 cols on tablet, 4 on desktop with subtle stagger height */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {diferencial.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: i * 0.08, ease: easeEditorial }}
                className="group relative flex flex-col gap-6 rounded-[var(--radius-lg)] bg-[color:var(--bg-elevated)] p-6 lg:p-7 border border-[color:var(--border)] hover:border-[color:var(--ink)] transition-colors duration-300"
                style={{
                  marginTop: i % 2 === 1 ? "var(--space-8)" : 0,
                }}
              >
                {/* Numeral + icon row */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-muted)]"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--bg-subtle)] text-[color:var(--ink)] transition-colors group-hover:bg-[color:var(--ink)] group-hover:text-[color:var(--ink-inverse)]"
                  >
                    <Icon weight="regular" className="h-5 w-5" />
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: "20px",
                    lineHeight: 1.18,
                    letterSpacing: "-0.012em",
                    fontWeight: 400,
                    fontVariationSettings: '"opsz" 32',
                  }}
                >
                  {item.title}
                </h3>

                {/* Body */}
                <p className="body-sm text-[color:var(--ink-soft)] flex-1">{item.body}</p>

                {/* Bottom hairline */}
                <span
                  aria-hidden
                  className="block h-px w-full bg-[color:var(--border)] origin-left transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
