"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Images, Play, VideoCamera, WhatsappLogo, X } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { brand, contacto, ubicaciones, type Sede } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

const whatsapp = (texto: string) =>
  `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(texto)}`;

// Lo que muestra el visor de una sede, en orden: el recorrido en video (si hay), la fachada y el resto de las fotos
type ItemVisor =
  | { tipo: "video"; src: string; poster: string; alt: string; etiqueta: string }
  | { tipo: "foto"; src: string; alt: string; etiqueta: string };

function itemsDe(sede: Sede): ItemVisor[] {
  return [
    ...(sede.recorrido
      ? [
          {
            tipo: "video" as const,
            src: sede.recorrido.src,
            poster: sede.recorrido.poster,
            alt: sede.recorrido.alt,
            etiqueta: sede.recorrido.etiqueta,
          },
        ]
      : []),
    { tipo: "foto" as const, src: sede.foto.completa ?? sede.foto.src, alt: sede.foto.alt, etiqueta: sede.foto.etiqueta },
    ...sede.galeria.map((g) => ({ tipo: "foto" as const, src: g.src, alt: g.alt, etiqueta: g.etiqueta })),
  ];
}

type VisorAbierto = { sede: Sede; indice: number };

// Las 2 sedes a la vista, una al lado de la otra y separadas por una línea (pedido de Fede, 2026-10-01:
// sin pestañas, todo claro y compacto). Las 2 tienen el mismo esqueleto (nombre, dirección, un renglón
// gris, mapa, botones y 3 fotos chicas) y la misma altura: la fachada toma el alto de los datos, así
// quedan parejas. La fachada y las fotos chicas abren el visor con todo el material de la sede.
// En celular y tablet las sedes van una debajo de la otra. La consulta virtual queda debajo.
export function Ubicaciones() {
  const sedes = ubicaciones.sedes;
  const [visor, setVisor] = useState<VisorAbierto | null>(null);
  // Al cerrar el visor, el foco vuelve a lo que lo abrió
  const disparador = useRef<HTMLElement | null>(null);
  const cerrarVisor = useCallback(() => {
    setVisor(null);
    requestAnimationFrame(() => disparador.current?.focus());
  }, []);
  const irA = useCallback((indice: number) => setVisor((v) => (v ? { ...v, indice } : v)), []);

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
                onAbrir={(indice, boton) => {
                  disparador.current = boton;
                  setVisor({ sede, indice });
                }}
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

      <Visor visor={visor} onCerrar={cerrarVisor} onIr={irA} />
    </Section>
  );
}

// Una sede: la fachada a la izquierda (llena el alto de la columna de datos), los datos a la derecha
// y, debajo, 3 fotos chicas del lugar.
function SedeBloque({ sede, onAbrir }: { sede: Sede; onAbrir: (indice: number, boton: HTMLElement) => void }) {
  // En el visor, antes de las fotos chicas van el video (si hay) y la fachada
  const primeraChica = sede.recorrido ? 2 : 1;

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
        {/* La fachada abre el visor: con play si la sede tiene recorrido en video, con "Ver fotos" si no */}
        <button
          type="button"
          onClick={(e) => onAbrir(0, e.currentTarget)}
          aria-haspopup="dialog"
          aria-label={sede.recorrido ? sede.recorrido.titulo : `Ver las fotos de la sede de ${sede.nombre}`}
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
            {sede.recorrido ? (
              <Play weight="fill" className="h-4 w-4 translate-x-px" />
            ) : (
              <Images weight="regular" className="h-[18px] w-[18px]" />
            )}
          </span>
          <span className="relative text-[12px] font-medium sm:text-[13px]">
            {sede.recorrido ? sede.recorrido.boton : ubicaciones.verFotos}
          </span>
        </button>
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

        {/* Mapa desde tablet, con alto fijo para que el pie de Google quede a la vista; en celular
            alcanza con "Cómo llegar" */}
        <MapEmbed
          src={sede.mapa}
          title={`Mapa de ${sede.calle}, ${sede.nombre}`}
          className="hidden sm:block sm:h-[150px] lg:h-[140px]"
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

      {/* Más fotos del lugar: 2 en cada sede, para que queden parejas. Se abren en el visor, que además
          muestra las que no tienen miniatura. */}
      {sede.galeria.some((g) => g.mini) && (
        <ul className="col-span-2 grid grid-cols-2 gap-2 sm:gap-3">
          {sede.galeria.map((g, k) =>
            !g.mini ? null : (
            <li key={g.src}>
              <button
                type="button"
                onClick={(e) => onAbrir(primeraChica + k, e.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`Ampliar la foto: ${g.alt}`}
                className="group block w-full overflow-hidden rounded-[var(--radius-md)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2"
              >
                <img
                  src={g.mini}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] sm:aspect-[5/2] lg:aspect-[2/1]"
                  style={{ objectPosition: g.pos }}
                />
              </button>
            </li>
            ),
          )}
        </ul>
      )}
    </article>
  );
}

// Visor de una sede: el recorrido en video y las fotos, de a uno, a pantalla casi completa.
// Flechas (o deslizar con el dedo) para pasar, Escape o el fondo para cerrar. Retiene el foco
// y frena el scroll de la página de atrás.
function Visor({
  visor,
  onCerrar,
  onIr,
}: {
  visor: VisorAbierto | null;
  onCerrar: () => void;
  onIr: (indice: number) => void;
}) {
  const ventana = useRef<HTMLDivElement>(null);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const sede = visor?.sede ?? null;
  const items = useMemo(() => (sede ? itemsDe(sede) : []), [sede]);
  const total = items.length;
  const i = visor?.indice ?? 0;
  const item = items[i];
  const abierto = visor !== null;

  const pasar = useCallback(
    (delta: number) => {
      if (total > 1) onIr((i + delta + total) % total);
    },
    [i, total, onIr],
  );

  useEffect(() => {
    if (!abierto) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      // Con el foco en el video, las flechas son del video (adelantar y retroceder)
      const enVideo = document.activeElement?.tagName === "VIDEO";
      if (e.key === "ArrowRight" && !enVideo) pasar(1);
      if (e.key === "ArrowLeft" && !enVideo) pasar(-1);
      if (e.key === "Tab" && ventana.current) {
        const enfocables = [...ventana.current.querySelectorAll<HTMLElement>("button, video[controls]")];
        if (!enfocables.length) return;
        e.preventDefault();
        const actual = enfocables.indexOf(document.activeElement as HTMLElement);
        const siguiente = e.shiftKey
          ? actual <= 0
            ? enfocables.length - 1
            : actual - 1
          : (actual + 1) % enfocables.length;
        enfocables[siguiente].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto, onCerrar, pasar]);

  // Las fotos de al lado se van cargando para que pasar sea inmediato
  useEffect(() => {
    if (!abierto || total < 2) return;
    for (const k of [i + 1, i - 1]) {
      const vecino = items[(k + total) % total];
      if (vecino.tipo === "foto") new Image().src = vecino.src;
    }
  }, [abierto, i, items, total]);

  return (
    <AnimatePresence>
      {sede && item && (
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
            aria-label={`${sede.recorrido ? "Video y fotos" : "Fotos"} de la sede de ${sede.nombre}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: easeEditorial }}
            className="relative z-10 flex flex-col gap-3"
          >
            {/* Arriba del marco, para no tapar la foto ni el video: qué se está viendo, cuántas hay y cerrar */}
            <div className="flex w-0 min-w-full items-center justify-between gap-3">
              <p
                aria-live="polite"
                className="min-w-0 truncate rounded-full bg-[color:var(--bg-elevated)] px-3.5 py-2.5 text-[13px] font-medium leading-none text-[color:var(--ink)] shadow-[var(--shadow-sm)]"
              >
                <span className="tabular text-[color:var(--ink-soft)]">
                  {i + 1} / {total}
                </span>
                <span aria-hidden className="mx-2 text-[color:var(--border-strong)]">
                  ·
                </span>
                {item.etiqueta}
              </p>
              <button
                type="button"
                onClick={onCerrar}
                aria-label="Cerrar"
                autoFocus
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--bg-elevated)] text-[color:var(--ink)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)]"
              >
                <X weight="bold" className="h-4 w-4" />
              </button>
            </div>

            <div
              className="relative aspect-[9/16] h-[min(calc(88dvh_-_3rem),calc((100vw_-_2rem)*16/9))] overflow-hidden rounded-[var(--radius-2xl)] bg-black shadow-[var(--shadow-lg)]"
              onTouchStart={(e) => {
                toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
              }}
              onTouchEnd={(e) => {
                const inicio = toque.current;
                toque.current = null;
                // En el video no se desliza: el dedo es para sus controles
                if (!inicio || item.tipo === "video") return;
                const dx = e.changedTouches[0].clientX - inicio.x;
                const dy = e.changedTouches[0].clientY - inicio.y;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) pasar(dx < 0 ? 1 : -1);
              }}
            >
              {/* Al pasar, la nueva aparece encima de la anterior, que se queda hasta que termina: no se ve el fondo negro */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {item.tipo === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      aria-label={item.alt}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <img src={item.src} alt={item.alt} className="h-full w-full object-contain" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Anterior y siguiente: sobre los bordes en celular, afuera del marco desde tablet */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => pasar(-1)}
                  aria-label="Anterior"
                  className="absolute left-2 top-[calc(50%_+_1.5rem)] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[color:var(--bg-elevated)] text-[color:var(--ink)] shadow-[var(--shadow-md)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] sm:-left-14 sm:h-11 sm:w-11"
                >
                  <ArrowLeft weight="bold" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => pasar(1)}
                  aria-label="Siguiente"
                  className="absolute right-2 top-[calc(50%_+_1.5rem)] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[color:var(--bg-elevated)] text-[color:var(--ink)] shadow-[var(--shadow-md)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] sm:-right-14 sm:h-11 sm:w-11"
                >
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
