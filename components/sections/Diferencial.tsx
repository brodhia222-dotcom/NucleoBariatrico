"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heartbeat, UsersThree, ShieldCheck, MapPinLine, ArrowUpRight } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { diferencial } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

type IconType = ComponentType<{ className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
const icons: IconType[] = [UsersThree, Heartbeat, ShieldCheck, MapPinLine];

export function Diferencial() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="diferencial" tone="elevated">
      <Container>
        {/* Header — título debajo del eyebrow */}
        <div className="flex flex-col gap-4 mb-12 lg:mb-16">
          <Reveal>
            <Eyebrow>{diferencial.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(36px, 4.6vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 72',
                textWrap: "balance",
                maxWidth: "22ch",
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

        {/* Expanding cards — todas cerradas por default */}
        <Reveal>
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-3 lg:h-[520px]">
            {diferencial.items.map((item, i) => {
              const Icon = icons[i] ?? icons[0];
              const isActive = i === active;
              return (
                <ExpandingCard
                  key={item.title}
                  index={i}
                  isActive={isActive}
                  onActivate={() => setActive(isActive ? null : i)}
                  item={item}
                  Icon={Icon}
                />
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ExpandingCard({
  index,
  isActive,
  onActivate,
  item,
  Icon,
}: {
  index: number;
  isActive: boolean;
  onActivate: () => void;
  item: (typeof diferencial)["items"][number];
  Icon: IconType;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-expanded={isActive}
      animate={{ flexGrow: isActive ? 4 : 1 }}
      transition={{ duration: 0.85, ease: easeEditorial }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={viewportOnce}
      style={{ flexBasis: 0 }}
      className="group relative flex min-h-[240px] basis-0 overflow-hidden rounded-[var(--radius-xl)] text-left text-[color:var(--ink-inverse)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 lg:min-h-0"
    >
      {/* Imagen placeholder */}
      <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) ${
            index % 2 === 0 ? 28 : 38
          }%, transparent) 0%, color-mix(in srgb, var(--bg-inverse) 88%, transparent) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-between gap-6 p-6 lg:p-8">
        {/* Top — icono */}
        <div className="flex items-start justify-end">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ink-inverse)]/12 backdrop-blur-md text-[color:var(--ink-inverse)] transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-white"
          >
            <Icon weight="regular" className="h-5 w-5" />
          </span>
        </div>

        {/* Bottom */}
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-1 items-end lg:items-center"
            >
              <h3
                className="font-display lg:[writing-mode:vertical-rl] lg:rotate-180"
                style={{
                  fontSize: "22px",
                  lineHeight: 1.08,
                  fontWeight: 300,
                  letterSpacing: "0.005em",
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {item.title}
              </h3>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: easeEditorial }}
              className="flex flex-col gap-4 max-w-[44ch]"
            >
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(26px, 3vw, 40px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.022em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                  textWrap: "balance",
                }}
              >
                {item.title}
              </h3>
              <p className="body-sm opacity-85">{item.body}</p>
              <a
                href={item.href}
                className="mt-2 inline-flex items-center gap-2 text-xs font-medium tracking-wide"
              >
                <span className="block h-px w-8 bg-[color:var(--accent)]" />
                {item.cta}
                <ArrowUpRight weight="bold" className="h-3.5 w-3.5 opacity-80" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
