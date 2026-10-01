"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, VideoCamera, WhatsappLogo, X } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { brand, contacto, ubicaciones, type Sede } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

const whatsapp = (texto: string) =>
  `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(texto)}`;

type Recorrido = NonNullable<Sede["recorrido"]>;

// Las 2 sedes a la vista, una al lado de la otra y separadas por una línea (pedido de Fede, 2026-10-01:
// sin pestañas, todo claro y compacto). Las 2 tienen el mismo esqueleto (nombre, dirección, un renglón
// gris, mapa y botones) y la misma altura: la foto toma el alto de los datos y los botones van al pie,
// así quedan parejas. En celular y tablet van una debajo de la otra. La consulta virtual queda debajo.
export function Ubicaciones() {
  const sedes = ubicaciones.sedes;
  const [recorrido, setRecorrido] = useState<Recorrido | null>(null);
  // Al cerrar el recorrido, el foco vuelve al botón que lo abrió
  const disparador = useRef<HTMLElement | null>(null);
  const cerrarRecorrido = useCallback(() => {
    setRecorrido(null);
    requestAnimationFrame(() => disparador.current?.focus());
  }, []);

  const virtualHref = whatsapp("Hola, quiero coordinar una primera consulta virtual.");

  return (
    <Section id="ubicaciones" tone="subtle">
      <Container>
        <div className="flex flex-col items-center text-center gap-4 mb-8 lg:mb-10">
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeEditorial }}
          className="grid gap-5 rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 sm:gap-6 sm:p-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-7 lg:p-7 xl:gap-10 xl:p-8"
        >
          {sedes.map((sede, i) => (
            <Fragment key={sede.id}>
              {/* La barra que separa las sedes: vertical en compu, horizontal en celular y tablet */}
              {i > 0 && (
                <div aria-hidden className="h-0.5 rounded-full bg-[color:var(--border-strong)] lg:h-auto lg:w-0.5" />
              )}
              <SedeBloque
                sede={sede}
                onRecorrido={
                  sede.recorrido
                    ? (boton) => {
                        disparador.current = boton;
                        setRecorrido(sede.recorrido!);
                      }
                    : undefined
                }
              />
            </Fragment>
          ))}
        </motion.div>

        {/* Consulta virtual (confirmada en las preguntas frecuentes del equipo), para las 2 sedes */}
        <a
          href={virtualHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 flex items-start gap-4 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 transition-shadow hover:shadow-[var(--shadow-md)] sm:items-center sm:p-5 lg:px-7 xl:px-8"
        >
          <span
            aria-hidden
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
          >
            <VideoCamera weight="regular" className="h-5 w-5" />
          </span>
          <span className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-[color:var(--ink)]">{ubicaciones.virtual.titulo}</span>
              <span className="body-sm text-[color:var(--ink-soft)]">{ubicaciones.virtual.texto}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[color:var(--ink)]">
              Coordinar por WhatsApp
              <ArrowUpRight
                weight="bold"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </span>
        </a>
      </Container>

      <RecorridoVentana recorrido={recorrido} onCerrar={cerrarRecorrido} />
    </Section>
  );
}

// Una sede: la fachada a la izquierda (llena el alto de la columna de datos) y los datos a la derecha.
function SedeBloque({ sede, onRecorrido }: { sede: Sede; onRecorrido?: (boton: HTMLButtonElement) => void }) {
  return (
    <article className="grid grid-cols-[100px_1fr] gap-4 sm:grid-cols-[150px_1fr] sm:gap-6 lg:grid-cols-[170px_1fr] lg:gap-5 xl:gap-6">
      <figure className="relative min-h-[180px] overflow-hidden rounded-[var(--radius-lg)]">
        <img
          src={sede.foto.src}
          alt={sede.foto.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: sede.foto.pos }}
        />
        {/* El recorrido se abre desde la misma foto: play al centro abajo, como la miniatura de un video */}
        {sede.recorrido && onRecorrido && (
          <button
            type="button"
            onClick={(e) => onRecorrido(e.currentTarget)}
            aria-haspopup="dialog"
            aria-label={sede.recorrido.titulo}
            className="group absolute inset-0 flex flex-col items-center justify-end gap-1.5 pb-3 text-[color:var(--ink-inverse)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--accent)]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--bg-inverse) 82%, transparent) 100%)",
              }}
            />
            <span
              aria-hidden
              className="relative grid h-10 w-10 place-items-center rounded-full bg-[color:var(--bg-elevated)] text-[color:var(--accent)] shadow-[var(--shadow-md)] transition-transform duration-300 group-hover:scale-110"
            >
              <Play weight="fill" className="h-4 w-4 translate-x-px" />
            </span>
            <span className="relative text-[12px] font-medium sm:text-[13px]">{sede.recorrido.boton}</span>
          </button>
        )}
      </figure>

      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-1">
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(21px, 1.9vw, 27px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 48',
              textWrap: "balance",
            }}
          >
            {sede.nombre}
          </h3>
          <p className="body text-[color:var(--ink)]" style={{ textWrap: "balance" }}>
            {sede.lineaDireccion}
          </p>
          <p className="body-sm text-[color:var(--ink-soft)]" style={{ textWrap: "balance" }}>
            {sede.detalle}
          </p>
          {contacto.horario && <p className="body-sm text-[color:var(--ink-soft)]">{contacto.horario}</p>}
        </div>

        {/* Mapa desde tablet: crece para llenar el alto; en celular alcanza con "Cómo llegar" */}
        <MapEmbed
          src={sede.mapa}
          title={`Mapa de ${sede.calle}, ${sede.nombre}`}
          className="hidden min-h-[120px] flex-1 sm:block sm:max-h-[160px] lg:max-h-none"
        />

        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:gap-3 lg:flex-col lg:gap-2">
          <a
            href={whatsapp(sede.turno)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pedir turno en la sede de ${sede.nombre} por WhatsApp`}
            className="btn btn-ink w-full justify-center sm:w-auto lg:w-full"
          >
            <WhatsappLogo weight="regular" className="h-4 w-4" />
            Pedir turno
          </a>
          <a
            href={sede.comoLlegar}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cómo llegar a la sede de ${sede.nombre} (abre Google Maps)`}
            className="btn btn-ghost group w-full justify-center sm:w-auto lg:w-full"
          >
            Cómo llegar
            <ArrowUpRight
              weight="bold"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

// Recorrido completo en una ventana, con los controles del navegador. Escape o el fondo la cierran,
// retiene el foco y frena el scroll de la página de atrás.
function RecorridoVentana({ recorrido, onCerrar }: { recorrido: Recorrido | null; onCerrar: () => void }) {
  const ventana = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!recorrido) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      if (e.key === "Tab" && ventana.current) {
        const enfocables = [...ventana.current.querySelectorAll<HTMLElement>("button, video[controls]")];
        if (!enfocables.length) return;
        e.preventDefault();
        const i = enfocables.indexOf(document.activeElement as HTMLElement);
        const siguiente = e.shiftKey ? (i <= 0 ? enfocables.length - 1 : i - 1) : (i + 1) % enfocables.length;
        enfocables[siguiente].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [recorrido, onCerrar]);

  return (
    <AnimatePresence>
      {recorrido && (
        <div data-lenis-prevent className="fixed inset-0 z-[900] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCerrar}
            aria-hidden
            className="absolute inset-0 bg-[color:var(--bg-inverse)]/70 backdrop-blur-md"
          />
          <motion.div
            ref={ventana}
            role="dialog"
            aria-modal="true"
            aria-label={recorrido.titulo}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: easeEditorial }}
            className="relative z-10 aspect-[9/16] h-[min(88dvh,calc((100vw_-_2rem)*16/9))] overflow-hidden rounded-[var(--radius-2xl)] bg-black shadow-[var(--shadow-lg)]"
          >
            <video
              src={recorrido.src}
              poster={recorrido.poster}
              aria-label={recorrido.alt}
              controls
              autoPlay
              muted
              playsInline
              className="h-full w-full object-contain"
            />
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar"
              autoFocus
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--bg-elevated)] text-[color:var(--ink)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)]"
            >
              <X weight="bold" className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
