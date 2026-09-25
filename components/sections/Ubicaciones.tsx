"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, VideoCamera } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { brand, contacto, ubicaciones } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

// Sede única por ahora (PDF de ajustes 2026-09-24). El horario sale de lib/copy.ts
// (contacto.horario) y aparece solo cuando esté confirmado.
export function Ubicaciones() {
  const sede = ubicaciones.sedes[0];
  const [principal, ...resto] = sede.fotos;
  const virtualHref = `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hola, quiero coordinar una primera consulta virtual.",
  )}`;

  return (
    <Section id="ubicaciones" tone="subtle">
      <Container>
        <div className="flex flex-col items-center text-center gap-4 mb-12 lg:mb-16">
          <Reveal>
            <Eyebrow>{ubicaciones.eyebrow}</Eyebrow>
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
              {ubicaciones.headline}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Fotos del lugar: la fila de abajo se estira hasta el final de la columna de al lado */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="flex flex-col gap-3 lg:col-span-7 lg:gap-4"
          >
            <figure className="overflow-hidden rounded-[var(--radius-xl)]">
              <img
                src={principal.src}
                alt={principal.alt}
                loading="lazy"
                className="aspect-[2/1] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </figure>
            <div className="grid flex-1 grid-cols-2 gap-3 lg:gap-4">
              {resto.map((f) => (
                <figure key={f.src} className="overflow-hidden rounded-[var(--radius-lg)] lg:h-full">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03] lg:aspect-auto lg:h-full lg:min-h-[200px]"
                  />
                </figure>
              ))}
            </div>
          </motion.div>

          {/* Datos, mapa y consulta virtual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.1, ease: easeEditorial }}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            <article className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                >
                  <MapPin weight="regular" className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(22px, 2.2vw, 30px)",
                      lineHeight: 1.04,
                      letterSpacing: "-0.022em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 48',
                    }}
                  >
                    {sede.nombre}
                  </h3>
                  <p className="body text-[color:var(--ink)]">{sede.calle}, CABA</p>
                  {/* El nombre del espacio se muestra cuando el equipo confirme cómo se escribe */}
                  {contacto.horario && <p className="body-sm text-[color:var(--ink-soft)]">{contacto.horario}</p>}
                </div>
              </div>

              <MapEmbed src={sede.mapa} title={`Mapa de ${sede.calle}, ${sede.nombre}`} />

              <div className="flex flex-wrap gap-3">
                <a
                  href={sede.comoLlegar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink group"
                >
                  Cómo llegar
                  <ArrowUpRight
                    weight="bold"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a href="#contacto" className="btn btn-ghost">
                  Pedir turno
                </a>
              </div>
            </article>

            {/* Consulta virtual (confirmada en las preguntas frecuentes del equipo) */}
            <a
              href={virtualHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[96px_1fr] items-center gap-4 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-3 pr-5 transition-shadow hover:shadow-[var(--shadow-md)] sm:grid-cols-[120px_1fr]"
            >
              <img
                src={ubicaciones.virtual.foto}
                alt=""
                aria-hidden
                loading="lazy"
                className="aspect-square w-full rounded-[var(--radius-lg)] object-cover"
              />
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 font-medium text-[color:var(--ink)]">
                  <VideoCamera weight="regular" className="h-4 w-4 text-[color:var(--accent)]" aria-hidden />
                  {ubicaciones.virtual.titulo}
                </span>
                <span className="body-sm text-[color:var(--ink-soft)]">{ubicaciones.virtual.texto}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--ink)]">
                  Coordinar por WhatsApp
                  <ArrowUpRight
                    weight="bold"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </span>
            </a>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
