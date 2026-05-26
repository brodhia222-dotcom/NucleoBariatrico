"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { ubicaciones } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

const sedeMeta: { area: string; horario: string; transporte: string }[] = [
  { area: "CABA", horario: "Lun a Vie · 09 – 19hs", transporte: "Subte B · Línea Mitre" },
  { area: "Zona Norte", horario: "Lun a Vie · 09 – 19hs", transporte: "Tren Mitre · Estación San Isidro" },
];

export function Ubicaciones() {
  return (
    <Section id="ubicaciones" tone="default">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{ubicaciones.eyebrow}</Eyebrow>
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
                }}
              >
                {ubicaciones.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <p className="body-sm text-[color:var(--ink-soft)] max-w-prose">{ubicaciones.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {ubicaciones.sedes.map((sede, i) => {
            const meta = sedeMeta[i] ?? sedeMeta[0];
            return (
              <motion.article
                key={sede.nombre}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: i * 0.1, ease: easeEditorial }}
                className="group flex flex-col gap-6 overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--bg-elevated)] border border-[color:var(--border)]"
              >
                {/* Placeholder of the space */}
                <div className="placeholder relative aspect-[16/10] rounded-none">
                  <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between text-[color:var(--ink-soft)]">
                    <div className="flex items-center gap-2">
                      <MapPin weight="fill" className="h-4 w-4 text-[color:var(--accent)]" aria-hidden />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                        Sede / {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-80">
                      {meta.area}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="px-6 lg:px-8 flex flex-col gap-4">
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(26px, 2.6vw, 36px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 48',
                    }}
                  >
                    {sede.nombre}
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[color:var(--border)] pt-4">
                    <Detail label="Dirección" value={sede.direccion} />
                    <Detail label="Horario" value={meta.horario} />
                    <Detail label="Cómo llegar" value={meta.transporte} fullWidth />
                  </dl>
                </div>

                {/* Map */}
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <MapEmbed src={sede.mapa} title={`Mapa ${sede.nombre}`} />
                </div>

                {/* Footer link */}
                <a
                  href={`#contacto`}
                  className="group/cta flex items-center justify-between gap-3 border-t border-[color:var(--border)] px-6 lg:px-8 py-5 text-sm font-medium text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] transition-colors"
                >
                  Pedir turno en {sede.nombre}
                  <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function Detail({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="body-sm text-[color:var(--ink)]">{value}</dd>
    </div>
  );
}
