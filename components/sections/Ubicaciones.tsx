"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Pause, Play, VideoCamera, WhatsappLogo, X } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { brand, contacto, ubicaciones, type MediaSede, type Sede } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

const whatsapp = (texto: string) =>
  `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(texto)}`;

type Recorrido = NonNullable<Sede["recorrido"]>;

// Dos sedes con pestañas (como las de Preguntas frecuentes). Cada sede muestra a la izquierda dos
// piezas verticales (fotos o un video corto en loop) y a la derecha dirección, mapa y botones.
// La consulta virtual queda fija debajo, para las dos sedes.
export function Ubicaciones() {
  const sedes = ubicaciones.sedes;
  const [activa, setActiva] = useState(0);
  const [recorrido, setRecorrido] = useState<Recorrido | null>(null);
  const reducir = useReducedMotion();
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const sede = sedes[activa];
  // Al cerrar el recorrido, el foco vuelve al botón que lo abrió
  const disparador = useRef<HTMLElement | null>(null);
  const cerrarRecorrido = useCallback(() => {
    setRecorrido(null);
    requestAnimationFrame(() => disparador.current?.focus());
  }, []);

  const virtualHref = whatsapp("Hola, quiero coordinar una primera consulta virtual.");

  // Los links con data-sede (en el pie) abren la pestaña de esa sede al bajar a la sección
  useEffect(() => {
    const alHacerClic = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[data-sede]");
      if (!link) return;
      const i = sedes.findIndex((s) => s.id === link.getAttribute("data-sede"));
      if (i >= 0) setActiva(i);
    };
    document.addEventListener("click", alHacerClic);
    return () => document.removeEventListener("click", alHacerClic);
  }, [sedes]);

  // Flechas izquierda y derecha para moverse entre pestañas
  const onTeclas = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const siguiente = (activa + (e.key === "ArrowRight" ? 1 : -1) + sedes.length) % sedes.length;
    setActiva(siguiente);
    pestanas.current[siguiente]?.focus();
  };

  const cambio = {
    initial: reducir ? { opacity: 1 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reducir ? { opacity: 1 } : { opacity: 0, y: -6 },
    transition: { duration: reducir ? 0 : 0.28, ease: easeEditorial },
  };

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

        {sedes.length > 1 && (
          <div
            role="tablist"
            aria-label={ubicaciones.pestanas}
            onKeyDown={onTeclas}
            className="mx-auto mb-8 flex w-fit max-w-full flex-wrap justify-center gap-2 lg:mb-10"
          >
            {sedes.map((s, i) => {
              const on = i === activa;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    pestanas.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`sede-tab-${s.id}`}
                  aria-selected={on}
                  aria-controls="sede-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActiva(i)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    on
                      ? "text-[color:var(--ink-inverse)]"
                      : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] border border-[color:var(--border)]"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="sede-tab-activa"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-[color:var(--ink)]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{s.nombre}</span>
                </button>
              );
            })}
          </div>
        )}

        <motion.div
          id="sede-panel"
          role={sedes.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={sedes.length > 1 ? `sede-tab-${sede.id}` : undefined}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeEditorial }}
          className="grid gap-6 lg:grid-cols-12 lg:gap-8"
        >
          {/* Piezas del lugar: verticales, lado a lado. En compu no aportan alto propio (van en absolute):
              la altura la marca la columna de datos y las piezas la llenan, así nunca queda un hueco */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`piezas-${sede.id}`} {...cambio} className="grid grid-cols-2 gap-3 lg:col-span-7 lg:gap-4">
              {sede.media.map((m) => (
                <figure key={m.src} className="relative overflow-hidden rounded-[var(--radius-xl)] lg:h-full">
                  {m.tipo === "foto" ? (
                    <img
                      src={m.src}
                      alt={m.alt}
                      loading="lazy"
                      className="aspect-[9/16] w-full object-cover transition-transform duration-700 hover:scale-[1.02] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                      style={{ objectPosition: m.pos }}
                    />
                  ) : (
                    <VideoLoop
                      pieza={m}
                      recorrido={sede.recorrido}
                      onRecorrido={
                        sede.recorrido
                          ? (boton) => {
                              disparador.current = boton;
                              setRecorrido(sede.recorrido!);
                            }
                          : undefined
                      }
                    />
                  )}
                </figure>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Datos, mapa y consulta virtual */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={`datos-${sede.id}`}
                {...cambio}
                className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 lg:p-8"
              >
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
                    <p className="body text-[color:var(--ink)]">{sede.lineaDireccion}</p>
                    {sede.espacio && <p className="body-sm text-[color:var(--ink-soft)]">{sede.espacio}</p>}
                    {contacto.horario && <p className="body-sm text-[color:var(--ink-soft)]">{contacto.horario}</p>}
                  </div>
                </div>

                <MapEmbed key={sede.id} src={sede.mapa} title={`Mapa de ${sede.calle}, ${sede.nombre}`} />

                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsapp(sede.turno)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pedir turno en la sede de ${sede.nombre} por WhatsApp`}
                    className="btn btn-ink"
                  >
                    <WhatsappLogo weight="regular" className="h-4 w-4" />
                    Pedir turno
                  </a>
                  <a
                    href={sede.comoLlegar}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cómo llegar a la sede de ${sede.nombre} (abre Google Maps)`}
                    className="btn btn-ghost group"
                  >
                    Cómo llegar
                    <ArrowUpRight
                      weight="bold"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Consulta virtual (confirmada en las preguntas frecuentes del equipo) */}
            <a
              href={virtualHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 transition-shadow hover:shadow-[var(--shadow-md)] lg:p-8"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
              >
                <VideoCamera weight="regular" className="h-5 w-5" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-medium text-[color:var(--ink)]">{ubicaciones.virtual.titulo}</span>
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
          </div>
        </motion.div>
      </Container>

      <RecorridoVentana recorrido={recorrido} onCerrar={cerrarRecorrido} />
    </Section>
  );
}

// Video corto del lugar: mudo, en loop, arranca solo cuando se ve y se frena al salir de pantalla.
// Tiene botón de pausa (se mueve más de 5 s) y con movimiento reducido queda quieto en el póster.
function VideoLoop({
  pieza,
  recorrido,
  onRecorrido,
}: {
  pieza: Extract<MediaSede, { tipo: "video" }>;
  recorrido?: Recorrido;
  onRecorrido?: (boton: HTMLButtonElement) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducir = useReducedMotion();
  const pausadoPorUsuario = useRef(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reducir) {
      v.pause();
      pausadoPorUsuario.current = true;
      setPausado(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !pausadoPorUsuario.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reducir]);

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      pausadoPorUsuario.current = false;
      setPausado(false);
      v.play().catch(() => {});
    } else {
      pausadoPorUsuario.current = true;
      setPausado(true);
      v.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={pieza.poster}
        aria-label={pieza.alt}
        className="aspect-[9/16] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
        style={{ objectPosition: pieza.pos }}
      >
        <source src={pieza.src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={alternar}
        aria-label={pausado ? "Reproducir el video" : "Pausar el video"}
        className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--bg-elevated)] text-[color:var(--ink)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] sm:right-3 sm:top-3"
      >
        {pausado ? <Play weight="fill" className="h-3.5 w-3.5" /> : <Pause weight="fill" className="h-3.5 w-3.5" />}
      </button>

      {recorrido && onRecorrido && (
        <button
          type="button"
          onClick={(e) => onRecorrido(e.currentTarget)}
          aria-haspopup="dialog"
          className="absolute bottom-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--bg-elevated)] px-3.5 py-2 text-[13px] font-medium text-[color:var(--ink)] shadow-[var(--shadow-md)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)] sm:bottom-3 sm:px-4 sm:text-sm"
        >
          <Play weight="fill" className="h-3.5 w-3.5 text-[color:var(--accent)]" />
          {recorrido.boton}
        </button>
      )}
    </>
  );
}

// Recorrido completo en una ventana, con los controles del navegador. Escape o el fondo la cierran.
function RecorridoVentana({ recorrido, onCerrar }: { recorrido: Recorrido | null; onCerrar: () => void }) {
  useEffect(() => {
    if (!recorrido) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
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
        <div className="fixed inset-0 z-[900] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCerrar}
            aria-hidden
            className="absolute inset-0 bg-[color:var(--bg-inverse)]/70 backdrop-blur-md"
          />
          <motion.div
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
