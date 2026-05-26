"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Isotipo } from "@/components/primitives/Isotipo";
import { brand, footer, nav } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[color:var(--color-indigo-900)] text-[color:var(--ink-inverse)]">
      {/* Top CTA block */}
      <div className="border-b border-[color:var(--ink-inverse)]/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-end py-16 lg:py-24"
          >
            <div className="lg:col-span-8">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65 mb-5 block">
                ¿Listo para empezar?
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 88px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 96',
                  textWrap: "balance",
                  maxWidth: "16ch",
                }}
              >
                Empezá tu recorrido <span className="italic-serif text-[color:var(--accent)]">hoy</span>.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="#contacto"
                className="flex items-center justify-between gap-4 border border-[color:var(--ink-inverse)]/20 hover:border-[color:var(--ink-inverse)]/60 transition-colors px-6 py-5 rounded-full group"
              >
                <span className="font-medium text-base">Pedir turno</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--accent)] text-white">
                  <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 border border-[color:var(--ink-inverse)]/20 hover:border-[color:var(--ink-inverse)]/60 transition-colors px-6 py-5 rounded-full group"
              >
                <span className="font-medium text-base">Hablar por WhatsApp</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-whatsapp)] text-white">
                  <WhatsappLogo weight="fill" className="h-4 w-4" />
                </span>
              </a>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Main footer */}
      <Container>
        <div className="py-14 lg:py-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand block */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Isotipo className="h-10 w-10" strokeWidth={11} />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl tracking-tight" style={{ fontWeight: 400 }}>
                  nucleo
                </span>
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase opacity-65">
                  bariátrico
                </span>
              </div>
            </div>
            <p
              className="font-display italic text-[color:var(--ink-inverse)]/85 max-w-[28ch]"
              style={{ fontSize: "22px", lineHeight: 1.3, fontWeight: 300, fontVariationSettings: '"opsz" 36' }}
            >
              {footer.tagline}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--ink-inverse)]/15 hover:bg-[color:var(--color-whatsapp)] hover:border-[color:var(--color-whatsapp)] transition-colors"
              >
                <WhatsappLogo weight="regular" className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--ink-inverse)]/15 hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
              >
                <InstagramLogo weight="regular" className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Sitio */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65">Sitio</p>
            <ul className="flex flex-col gap-2.5">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[color:var(--ink-inverse)]/85 hover:text-[color:var(--ink-inverse)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65">Contacto</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[color:var(--ink-inverse)]/85 hover:text-[color:var(--ink-inverse)] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footer.contacto.email}`}
                  className="text-sm text-[color:var(--ink-inverse)]/85 hover:text-[color:var(--ink-inverse)] transition-colors break-all"
                >
                  {footer.contacto.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Ubicaciones */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65">Ubicaciones</p>
            <ul className="flex flex-col gap-4">
              {footer.sedes.map((s) => (
                <li key={s.nombre}>
                  <p className="text-sm font-medium text-[color:var(--ink-inverse)]">{s.nombre}</p>
                  <p className="caption text-[color:var(--ink-inverse)]/60 mt-0.5">{s.direccion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-[color:var(--ink-inverse)]/10 py-6 grid gap-4 md:grid-cols-[1fr_auto] items-start">
          <p className="caption text-[color:var(--ink-inverse)]/65 max-w-prose">{footer.legal}</p>
          <p className="caption text-[color:var(--ink-inverse)]/45 md:text-right">{footer.copyright}</p>
        </div>
      </Container>

      {/* Giant brand mark — bottom watermark */}
      <div className="relative h-32 lg:h-48 overflow-hidden" aria-hidden>
        <span
          className="absolute -bottom-8 lg:-bottom-16 left-1/2 -translate-x-1/2 font-display whitespace-nowrap opacity-[0.06] text-[color:var(--ink-inverse)] select-none"
          style={{
            fontSize: "clamp(120px, 22vw, 320px)",
            letterSpacing: "-0.04em",
            fontWeight: 300,
            lineHeight: 0.9,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          nucleo
        </span>
      </div>
    </footer>
  );
}
