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
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 lg:mb-16">
          <Reveal>
            <Eyebrow>{diferencial.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 3.6vw, 46px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 72',
                textWrap: "balance",
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
    // Toda la tarjeta navega a su sección; hover/focus la expande
    <motion.a
      href={item.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      animate={{ flexGrow: isActive ? 4 : 1 }}
      transition={{ duration: 0.85, ease: easeEditorial }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={viewportOnce}
      style={{ flexBasis: 0 }}
      className="group relative flex min-h-[240px] basis-0 cursor-pointer overflow-hidden rounded-[var(--radius-xl)] text-left text-[color:var(--ink-inverse)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 lg:min-h-0"
    >
      {/* Imagen de fondo: textura tenue colapsada, revelada al expandir */}
      {item.foto ? (
        <img
          src={item.foto}
          alt=""
          aria-hidden
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ${
            isActive ? "opacity-100 scale-100" : "opacity-30 scale-105"
          }`}
        />
      ) : (
        <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />
      )}

      {/* Dark overlay — más denso colapsada para que la foto sea textura, no recorte raro */}
      <div
        aria-hidden
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isActive
            ? "linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) 25%, transparent) 0%, color-mix(in srgb, var(--bg-inverse) 88%, transparent) 100%)"
            : `linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) ${
                index % 2 === 0 ? 62 : 72
              }%, transparent) 0%, color-mix(in srgb, var(--bg-inverse) 94%, transparent) 100%)`,
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
                  fontSize: "clamp(22px, 2.4vw, 32px)",
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
              {/* La tarjeta entera es el link; esto es solo indicador visual */}
              <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium tracking-wide">
                <span className="block h-px w-8 bg-[color:var(--accent)] transition-all duration-300 group-hover:w-12" />
                {item.cta}
                <ArrowUpRight weight="bold" className="h-3.5 w-3.5 opacity-80" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
}
