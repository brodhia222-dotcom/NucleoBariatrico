"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { brand, nav } from "@/lib/copy";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("dark"); // hero is dark

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

  // Tone detection — read data-nav-tone of the section overlapping the nav probe line
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id], [data-nav-tone]"),
    );
    if (!sections.length) return;

    const navHeight = 68;
    const probeY = navHeight + 12;

    const compute = () => {
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          const t = (s.getAttribute("data-nav-tone") as Tone | null) ?? "light";
          setTone(t);
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[400] transition-[background,backdrop-filter,border-color,color] duration-500",
          scrolled
            ? isDark
              ? "bg-[color:var(--bg-inverse)]/55 backdrop-blur-xl border-b border-[color:var(--ink-inverse)]/12"
              : "bg-[color:var(--bg)]/75 backdrop-blur-xl border-b border-[color:var(--border)]"
            : "bg-transparent border-b border-transparent",
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container-x flex h-full items-center justify-between">
          {/* Logo */}
          <a href="#top" className="relative flex items-center">
            <img
              src="/logos/logo-indigo.png"
              alt="Nucleo Bariátrico"
              className={cn(
                "h-8 w-auto transition-opacity duration-500",
                isDark ? "opacity-0" : "opacity-100",
              )}
            />
            <img
              src="/logos/logo-blanco.png"
              alt="Nucleo Bariátrico"
              className={cn(
                "absolute inset-0 h-8 w-auto transition-opacity duration-500",
                isDark ? "opacity-100" : "opacity-0",
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
                  isDark
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

          {/* Mobile trigger */}
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
              <img src="/logos/logo-indigo.png" alt="Nucleo Bariátrico" className="h-14 w-auto" />
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
