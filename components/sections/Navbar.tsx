"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { brand, nav } from "@/lib/copy";
import { useNavStyle, type NavStyleKey } from "@/lib/nav-style-context";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

// Fondo del header por variante. "adaptive" es el comportamiento original
// (transparente arriba, se tiñe al hacer scroll). Las otras 2 variantes
// ("black"/"white") ahora pintan un color plano por sección (ver
// toneForSection más abajo) vía inline style — acá solo aportan
// borde/sombra, ya que background-color transiciona nativo y suave gracias
// a la clase "transition-[...]" del header (a diferencia de background-image,
// que no cruza de forma confiable entre navegadores).
function headerBgClass(
  navStyle: NavStyleKey,
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
  return useInverseText
    ? "border-b border-white/10 shadow-[var(--shadow-sm)]"
    : "border-b border-[color:var(--border)] shadow-[var(--shadow-sm)]";
}

// Orden real de las secciones en el scroll — determina qué tono de la
// paleta le toca a cada una (por índice, no por nombre).
const SECTION_ORDER = [
  "top",
  "imc",
  "diferencial",
  "equipo",
  "tratamientos",
  "proceso",
  "no-estas-solo",
  "testimonios",
  "obras-sociales",
  "ubicaciones",
  "faq",
  "contacto",
];

// 2 paletas de 5 tonos cada una, ancladas a las escalas fijas de color
// (--color-indigo-*/--color-beige-*, que el ThemePicker nunca pisa) para
// que el contraste de texto quede siempre garantizado sin importar la
// paleta semántica activa. Los tonos de cada paleta fueron elegidos a mano
// (contraste estimado ≥ 4.5:1 contra su texto) — variantes más claras de
// DARK_TONES o más oscuras de LIGHT_TONES quedan afuera por no cumplir AA.
const DARK_TONES = [
  "var(--color-indigo-950)",
  "var(--color-indigo-900)",
  "var(--color-indigo-800)",
  "color-mix(in srgb, var(--color-indigo-950) 82%, var(--accent) 18%)",
  "color-mix(in srgb, var(--color-indigo-900) 78%, var(--accent) 22%)",
];

const LIGHT_TONES = [
  "var(--color-beige-50)",
  "var(--color-beige-100)",
  "var(--color-beige-200)",
  "color-mix(in srgb, var(--color-beige-50) 85%, var(--accent) 15%)",
  "color-mix(in srgb, var(--color-beige-100) 82%, var(--accent) 18%)",
];

function toneForSection(tones: string[], activeId: string) {
  const idx = SECTION_ORDER.indexOf(activeId);
  return tones[(idx < 0 ? 0 : idx) % tones.length];
}

const DEFAULT_SECTION_ID = "top";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("dark"); // hero is dark
  const [activeId, setActiveId] = useState(DEFAULT_SECTION_ID);
  const { navStyle } = useNavStyle();

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

  const isDark = tone === "dark";

  // useInverseText = "el texto/logo de la nav usa la versión clara (ink-inverse)".
  // - adaptive: sigue el tono de la sección, como siempre
  // - black: su paleta (DARK_TONES) es siempre oscura, texto claro fijo
  // - white: su paleta (LIGHT_TONES) es siempre clara, texto oscuro fijo
  const useInverseText = useMemo(() => {
    switch (navStyle) {
      case "adaptive":
        return isDark;
      case "black":
        return true;
      case "white":
        return false;
    }
  }, [navStyle, isDark]);

  // Color plano por sección para las 2 variantes dinámicas. "adaptive" no
  // pinta nada acá — su fondo sale de headerBgClass como siempre.
  const headerBgColor = useMemo(() => {
    switch (navStyle) {
      case "black":
        return toneForSection(DARK_TONES, activeId);
      case "white":
        return toneForSection(LIGHT_TONES, activeId);
      default:
        return undefined;
    }
  }, [navStyle, activeId]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[400] overflow-hidden transition-[background-color,backdrop-filter,border-color,color] duration-500",
          headerBgClass(navStyle, scrolled, useInverseText),
        )}
        style={{
          height: "var(--nav-height)",
          ...(headerBgColor ? { backgroundColor: headerBgColor } : {}),
        }}
      >
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
