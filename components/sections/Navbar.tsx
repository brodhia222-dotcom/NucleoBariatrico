"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { brand, nav } from "@/lib/copy";
import { useNavStyle } from "@/lib/nav-style-context";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

// Fondo del header por variante. "adaptive" es el comportamiento original
// (transparente arriba, se tiñe al hacer scroll). "black"/"white" son
// siempre sólidas y fijas. "contrast" ahora es un degradado dinámico que
// se resuelve aparte (ver sectionGradients) — acá solo aporta borde/sombra.
function headerBgClass(
  navStyle: "adaptive" | "contrast" | "black" | "white",
  scrolled: boolean,
  useInverseText: boolean,
) {
  if (navStyle === "adaptive") {
    return scrolled
      ? useInverseText
        ? "bg-[color:var(--bg-inverse)]/55 backdrop-blur-xl border-b border-[color:var(--ink-inverse)]/12"
        : "bg-[color:var(--bg)]/75 backdrop-blur-xl border-b border-[color:var(--border)]"
      : "bg-transparent border-b border-transparent";
  }
  if (navStyle === "contrast") {
    return "border-b border-white/10 shadow-[var(--shadow-sm)]";
  }
  if (navStyle === "black") {
    return "bg-[color:var(--color-indigo-950)] border-b border-white/10 shadow-[var(--shadow-sm)]";
  }
  // white
  return "bg-[color:var(--bg-elevated)] border-b border-[color:var(--border)] shadow-[var(--shadow-sm)]";
}

// Degradado dinámico — 2 colores por sección, siempre anclados a
// --color-indigo-950 (tono fijo, nunca lo pisa el ThemePicker) mezclado
// con --accent (que sí sigue la paleta activa). Al mantener el indigo-950
// como base dominante (65%+), el texto claro siempre lee bien sin importar
// qué paleta esté activa. Ángulo y proporción varían por sección para que
// se perciba movimiento real al scrollear, no solo un cambio de tinte.
const GRADIENT_BASE = "var(--color-indigo-950)";
const GRADIENT_ACCENT = "var(--accent)";

function accentMix(pct: number) {
  if (pct <= 0) return GRADIENT_BASE;
  return `color-mix(in srgb, ${GRADIENT_BASE} ${100 - pct}%, ${GRADIENT_ACCENT} ${pct}%)`;
}

function gradient(angle: number, pctStart: number, pctEnd: number) {
  return `linear-gradient(${angle}deg, ${accentMix(pctStart)}, ${accentMix(pctEnd)})`;
}

const sectionGradients: Record<string, string> = {
  top: gradient(135, 0, 28),
  imc: gradient(100, 22, 0),
  diferencial: gradient(160, 0, 35),
  equipo: gradient(120, 30, 0),
  tratamientos: gradient(100, 0, 25),
  proceso: gradient(150, 18, 0),
  "no-estas-solo": gradient(135, 0, 12),
  testimonios: gradient(110, 32, 0),
  "obras-sociales": gradient(140, 0, 30),
  ubicaciones: gradient(100, 20, 0),
  faq: gradient(160, 0, 34),
  contacto: gradient(130, 35, 0),
};

const DEFAULT_SECTION_ID = "top";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("dark"); // hero is dark
  const [activeId, setActiveId] = useState(DEFAULT_SECTION_ID);
  const { navStyle } = useNavStyle();

  // Dos capas de degradado que se cruzan en opacidad — mismo truco que el
  // crossfade de los 2 logos, generalizado a un background-image cualquiera
  // (los gradientes no animan en transición directa entre sí de forma
  // confiable entre navegadores, pero el fundido de opacidad sí).
  const [gradLayers, setGradLayers] = useState({
    a: sectionGradients[DEFAULT_SECTION_ID],
    b: sectionGradients[DEFAULT_SECTION_ID],
    front: "a" as "a" | "b",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Detección de sección activa: lee data-nav-tone + id de la sección que
  // está bajo la nav.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id], [data-nav-tone]"),
    );
    if (!sections.length) return;

    const navHeight = 80;
    const probeY = navHeight + 12;

    const compute = () => {
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          const t = (s.getAttribute("data-nav-tone") as Tone | null) ?? "light";
          setTone(t);
          if (s.id) setActiveId(s.id);
          return;
        }
      }
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Cuando cambia la sección activa (y el estilo es "contrast"), escribe el
  // nuevo degradado en la capa de atrás y la trae al frente con un fundido.
  useEffect(() => {
    if (navStyle !== "contrast") return;
    const next = sectionGradients[activeId] ?? sectionGradients[DEFAULT_SECTION_ID];
    setGradLayers((prev) => {
      const current = prev.front === "a" ? prev.a : prev.b;
      if (current === next) return prev;
      return prev.front === "a"
        ? { ...prev, b: next, front: "b" }
        : { ...prev, a: next, front: "a" };
    });
  }, [activeId, navStyle]);

  const isDark = tone === "dark";

  // useInverseText = "el texto/logo de la nav usa la versión clara (ink-inverse)".
  // - adaptive: sigue el tono de la sección, como siempre
  // - contrast: el degradado dinámico siempre queda oscuro (ver arriba), así
  //   que el texto claro es seguro en todos los casos
  // - black/white: fijo, no depende de la sección
  const useInverseText = useMemo(() => {
    switch (navStyle) {
      case "adaptive":
        return isDark;
      case "contrast":
        return true;
      case "black":
        return true;
      case "white":
        return false;
    }
  }, [navStyle, isDark]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[400] overflow-hidden transition-[background,backdrop-filter,border-color,color] duration-500",
          headerBgClass(navStyle, scrolled, useInverseText),
        )}
        style={{ height: "var(--nav-height)" }}
      >
        {navStyle === "contrast" && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ backgroundImage: gradLayers.a, opacity: gradLayers.front === "a" ? 1 : 0 }}
            />
            <div
              aria-hidden
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ backgroundImage: gradLayers.b, opacity: gradLayers.front === "b" ? 1 : 0 }}
            />
          </>
        )}

        <div className="relative z-10 flex h-full items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <a href="#top" className="relative flex items-center">
            <img
              src="/logos/logo-indigo.png"
              alt="Nucleo Bariátrico"
              className={cn(
                "h-16 w-auto transition-opacity duration-500",
                useInverseText ? "opacity-0" : "opacity-100",
              )}
            />
            <img
              src="/logos/logo-blanco.png"
              alt="Nucleo Bariátrico"
              className={cn(
                "absolute inset-0 h-16 w-auto transition-opacity duration-500",
                useInverseText ? "opacity-100" : "opacity-0",
              )}
            />
          </a>

          {/* Center links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Principal">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-medium transition-colors duration-300 relative group",
                  useInverseText
                    ? "text-[color:var(--ink-inverse)]/80 hover:text-[color:var(--ink-inverse)]"
                    : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--accent)] transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-[13px] transition-colors px-3 py-2 duration-500",
                useInverseText
                  ? "text-[color:var(--ink-inverse)]/75 hover:text-[color:var(--ink-inverse)]"
                  : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]",
              )}
            >
              WhatsApp
            </a>
            <a href={nav.cta.href} className="btn btn-primary group">
              {nav.cta.label}
              <ArrowUpRight
                weight="bold"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "lg:hidden grid h-10 w-10 place-items-center transition-colors duration-500",
              useInverseText ? "text-[color:var(--ink-inverse)]" : "text-[color:var(--ink)]",
            )}
            aria-label="Abrir menú"
          >
            <List weight="regular" className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[500] bg-[color:var(--bg)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-x flex h-[var(--nav-height)] items-center justify-between">
              <img src="/logos/logo-indigo.png" alt="Nucleo Bariátrico" className="h-16 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center text-[color:var(--ink)]"
                aria-label="Cerrar menú"
              >
                <X weight="regular" className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
              className="container-x flex flex-col gap-5 pt-10"
              aria-label="Mobile"
            >
              {nav.links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display-md text-[color:var(--ink)]"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="mt-8 btn btn-primary w-fit"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {nav.cta.label}
                <ArrowUpRight weight="bold" className="h-4 w-4" />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
