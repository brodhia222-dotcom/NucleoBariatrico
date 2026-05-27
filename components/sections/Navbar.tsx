"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { Isotipo } from "@/components/primitives/Isotipo";
import { brand, nav } from "@/lib/copy";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

type Indicator = { left: number; width: number; opacity: number };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("light");
  const [activeHref, setActiveHref] = useState<string>("#top");
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, opacity: 0 });
  const [hovering, setHovering] = useState(false);

  const linksRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll listener for blur backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Tone + active section detection
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id], [data-nav-tone]"),
    );
    if (!sections.length) return;

    const navHeight = 68;
    const probeY = navHeight + 12; // pixels from top to read the section under

    const compute = () => {
      // Find section that overlaps probe line
      let current: HTMLElement | null = null;
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          current = s;
          break;
        }
      }
      if (!current) return;
      const t = (current.getAttribute("data-nav-tone") as Tone | null) ?? "light";
      setTone(t);
      if (current.id) setActiveHref(`#${current.id}`);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Move indicator to a link (or active link)
  const moveToHref = (href: string, instant = false) => {
    const el = linkRefs.current[href];
    const wrap = linksRef.current;
    if (!el || !wrap) return;
    const elRect = el.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const next: Indicator = {
      left: elRect.left - wrapRect.left,
      width: elRect.width,
      opacity: 1,
    };
    if (instant) {
      setIndicator(next);
    } else {
      setIndicator(next);
    }
  };

  // Snap indicator to active when not hovering, on scroll/resize, on activeHref change
  useEffect(() => {
    if (hovering) return;
    // Find a matching link in nav for the active section, otherwise hide
    const knownHrefs = nav.links.map((l) => l.href);
    if (!knownHrefs.includes(activeHref)) {
      setIndicator((i) => ({ ...i, opacity: 0 }));
      return;
    }
    moveToHref(activeHref);
    // also on resize
    const onResize = () => moveToHref(activeHref);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeHref, hovering]);

  const isDark = tone === "dark";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[400] transition-[background,backdrop-filter,border-color,color] duration-500",
          scrolled
            ? isDark
              ? "bg-[color:var(--bg-inverse)]/55 backdrop-blur-xl border-b border-[color:var(--ink-inverse)]/12"
              : "bg-[color:var(--bg)]/72 backdrop-blur-xl border-b border-[color:var(--border)]"
            : "bg-transparent border-b border-transparent",
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container-x flex h-full items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className={cn(
              "flex items-center gap-2.5 transition-colors duration-500",
              isDark ? "text-[color:var(--ink-inverse)]" : "text-[color:var(--ink)]",
            )}
          >
            <Isotipo className="h-7 w-7" strokeWidth={11} />
            <span className="flex items-baseline gap-1.5">
              <span className="font-display text-[17px] tracking-tight" style={{ fontWeight: 400 }}>
                nucleo
              </span>
              <span
                className={cn(
                  "font-body text-[10px] tracking-[0.28em] uppercase transition-colors duration-500",
                  isDark ? "text-[color:var(--ink-inverse)]/65" : "text-[color:var(--ink-soft)]",
                )}
              >
                bariátrico
              </span>
            </span>
          </a>

          {/* Center nav with sliding pill */}
          <nav
            ref={linksRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              // snap back to active
              const knownHrefs = nav.links.map((l) => l.href);
              if (knownHrefs.includes(activeHref)) moveToHref(activeHref);
              else setIndicator((i) => ({ ...i, opacity: 0 }));
            }}
            className="hidden lg:flex relative items-center gap-1 rounded-full px-1.5 py-1.5"
            aria-label="Principal"
            style={{
              background: isDark
                ? "color-mix(in srgb, var(--ink-inverse) 8%, transparent)"
                : "color-mix(in srgb, var(--ink) 5%, transparent)",
              border: isDark
                ? "1px solid color-mix(in srgb, var(--ink-inverse) 16%, transparent)"
                : "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
              transition: "background 500ms, border-color 500ms",
            }}
          >
            {/* Sliding pill */}
            <motion.span
              aria-hidden
              animate={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.6 }}
              className="absolute top-1.5 bottom-1.5 rounded-full"
              style={{
                background: isDark
                  ? "color-mix(in srgb, var(--ink-inverse) 92%, transparent)"
                  : "color-mix(in srgb, var(--ink) 92%, transparent)",
                transition: "background 500ms",
              }}
            />
            {nav.links.map((link) => {
              const isActive = link.href === activeHref;
              return (
                <a
                  key={link.href}
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  href={link.href}
                  onMouseEnter={() => moveToHref(link.href)}
                  className={cn(
                    "relative z-10 px-4 py-1.5 rounded-full text-[13px] font-medium tracking-wide transition-colors duration-300",
                    isDark
                      ? isActive
                        ? "text-[color:var(--bg-inverse)]"
                        : "text-[color:var(--ink-inverse)]/80 hover:text-[color:var(--bg-inverse)]"
                      : isActive
                        ? "text-[color:var(--ink-inverse)]"
                        : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink-inverse)]",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-sm transition-colors px-3 py-2 duration-500",
                isDark
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

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "lg:hidden grid h-10 w-10 place-items-center transition-colors duration-500",
              isDark ? "text-[color:var(--ink-inverse)]" : "text-[color:var(--ink)]",
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
              <Isotipo className="h-7 w-7" strokeWidth={11} />
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
