"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, Play, Star, X, ImageSquare } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { testimonios } from "@/lib/copy";
import { easeEditorial, viewportOnce } from "@/lib/motion";

type Item = (typeof testimonios)["items"][number];

export function Testimonios() {
  const [open, setOpen] = useState<Item | null>(null);

  return (
    <Section
      id="testimonios"
      tone="default"
      marker={{ index: "05", label: "Testimonios", aside: "Pacientes · 2024 – 2026" }}
    >
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-10 lg:mb-14 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{testimonios.eyebrow}</Eyebrow>
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
                {testimonios.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Multi-media masonry — CSS columns */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonios.items.map((t, i) => (
            <Reveal key={`${t.nombre}-${i}`} delay={i * 0.04}>
              <div className="mb-5 break-inside-avoid">
                <TestimonialCard item={t} index={i} onOpen={() => setOpen(t)} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Modal — video/image preview */}
      <AnimatePresence>
        {open && <MediaModal item={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </Section>
  );
}

/* ============================================================
   Card by type
   ============================================================ */
function TestimonialCard({
  item,
  index,
  onOpen,
}: {
  item: Item;
  index: number;
  onOpen: () => void;
}) {
  if (item.type === "text") {
    return <TextCard item={item} feature={index === 0} />;
  }
  if (item.type === "image") {
    return <ImageCard item={item} onOpen={onOpen} />;
  }
  return <VideoCard item={item} onOpen={onOpen} />;
}

function TextCard({
  item,
  feature,
}: {
  item: Extract<Item, { type: "text" }>;
  feature?: boolean;
}) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: easeEditorial }}
      className={`relative flex flex-col gap-5 rounded-[var(--radius-xl)] p-6 lg:p-7 ${
        feature
          ? "bg-[color:var(--ink)] text-[color:var(--ink-inverse)] overflow-hidden"
          : "border border-[color:var(--border)] bg-[color:var(--bg-elevated)] hover:border-[color:var(--ink)] transition-colors"
      }`}
    >
      {feature && (
        <div
          aria-hidden
          className="absolute inset-0 bg-dots opacity-[0.05]"
          style={{ color: "var(--ink-inverse)" }}
        />
      )}
      <Quotes
        weight={feature ? "fill" : "regular"}
        className={`relative h-7 w-7 ${feature ? "text-[color:var(--accent)]" : "text-[color:var(--accent)]"}`}
        aria-hidden
      />
      <blockquote
        className={`relative font-display ${feature ? "italic-serif" : ""}`}
        style={{
          fontSize: feature ? "clamp(20px, 1.6vw, 24px)" : "16px",
          lineHeight: feature ? 1.35 : 1.5,
          fontWeight: feature ? 300 : 400,
          fontVariationSettings: feature ? '"opsz" 48' : '"opsz" 24',
        }}
      >
        {item.quote}
      </blockquote>
      <Footer
        nombre={item.nombre}
        tiempo={item.tiempo}
        rating={item.rating}
        feature={feature}
      />
    </motion.figure>
  );
}

function ImageCard({
  item,
  onOpen,
}: {
  item: Extract<Item, { type: "image" }>;
  onOpen: () => void;
}) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: easeEditorial }}
      className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)]"
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative block aspect-[4/5] w-full overflow-hidden"
        aria-label={`Ver imagen de ${item.nombre}`}
      >
        <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--bg-inverse) 70%, transparent) 100%)",
          }}
        />
        <span
          aria-hidden
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-mono text-[color:var(--ink)]"
        >
          <ImageSquare weight="regular" className="h-3 w-3" />
          Foto
        </span>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[color:var(--accent)] text-white transition-transform duration-300 group-hover:scale-110"
        >
          <ImageSquare weight="bold" className="h-4 w-4" />
        </span>
      </button>
      <figcaption className="p-5">
        <p className="text-sm text-[color:var(--ink-soft)] mb-3" style={{ maxWidth: "32ch" }}>
          {item.quote}
        </p>
        <Footer nombre={item.nombre} tiempo={item.tiempo} />
      </figcaption>
    </motion.figure>
  );
}

function VideoCard({
  item,
  onOpen,
}: {
  item: Extract<Item, { type: "video" }>;
  onOpen: () => void;
}) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: easeEditorial }}
      className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)]"
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative block aspect-video w-full overflow-hidden"
        aria-label={`Reproducir testimonio de ${item.nombre}`}
      >
        <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--bg-inverse) 12%, transparent) 0%, color-mix(in srgb, var(--bg-inverse) 50%, transparent) 100%)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--accent)] text-white shadow-[var(--shadow-lg)] transition-transform duration-300 group-hover:scale-110">
            <Play weight="fill" className="h-6 w-6 translate-x-[2px]" />
          </span>
        </span>
        <span
          aria-hidden
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--bg)]/85 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-mono text-[color:var(--ink)]"
        >
          <Play weight="fill" className="h-3 w-3" />
          Video
        </span>
      </button>
      <figcaption className="p-5">
        <p className="text-sm text-[color:var(--ink-soft)] mb-3" style={{ maxWidth: "32ch" }}>
          {item.quote}
        </p>
        <Footer nombre={item.nombre} tiempo={item.tiempo} />
      </figcaption>
    </motion.figure>
  );
}

function Footer({
  nombre,
  tiempo,
  rating,
  feature,
}: {
  nombre: string;
  tiempo: string;
  rating?: number;
  feature?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        feature ? "border-t border-[color:var(--ink-inverse)]/15 pt-4 relative" : "border-t border-[color:var(--border)] pt-3"
      }`}
    >
      <Avatar name={nombre} inverse={feature} />
      <div className="flex-1 flex flex-col">
        <span className={`text-sm font-medium ${feature ? "" : "text-[color:var(--ink)]"}`}>
          {nombre}
        </span>
        <span className={`text-xs ${feature ? "text-[color:var(--ink-inverse)]/65" : "text-[color:var(--ink-soft)]"}`}>
          {tiempo}
        </span>
      </div>
      {rating ? (
        <span aria-hidden className="flex items-center gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              weight="fill"
              className="h-3.5 w-3.5 text-[color:var(--accent)]"
            />
          ))}
        </span>
      ) : null}
    </div>
  );
}

function Avatar({ name, inverse = false }: { name: string; inverse?: boolean }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <span
      aria-hidden
      className={`grid h-10 w-10 place-items-center rounded-full font-display font-medium text-sm ${
        inverse
          ? "bg-[color:var(--ink-inverse)]/15 text-[color:var(--ink-inverse)]"
          : "bg-[color:var(--accent)]/15 text-[color:var(--accent)]"
      }`}
      style={{ fontVariationSettings: '"opsz" 36' }}
    >
      {initial}
    </span>
  );
}

/* ============================================================
   Modal — image or video preview
   ============================================================ */
function MediaModal({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 14, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 14, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: easeEditorial }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--ink)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-[color:var(--bg-elevated)]/90 backdrop-blur-md text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] transition-colors"
        >
          <X weight="bold" className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <div aria-hidden className="placeholder absolute inset-0" style={{ borderRadius: 0 }} />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center px-6">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[color:var(--ink-soft)]">
                {item.type === "video" ? "Video" : "Foto"} · pendiente
              </span>
              <p
                className="font-display mt-2 text-[color:var(--ink)]"
                style={{ fontSize: "20px", lineHeight: 1.2, fontWeight: 400, fontVariationSettings: '"opsz" 32' }}
              >
                Cuando el cliente entregue el material, va a aparecer acá.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 flex flex-col gap-3">
          <p className="font-display italic-serif" style={{ fontSize: "20px", lineHeight: 1.35, fontVariationSettings: '"opsz" 32' }}>
            “{item.quote}”
          </p>
          <Footer nombre={item.nombre} tiempo={item.tiempo} />
        </div>
      </motion.div>
    </motion.div>
  );
}
