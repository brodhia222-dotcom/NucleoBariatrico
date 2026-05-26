"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Isotipo } from "@/components/primitives/Isotipo";
import { brand, nav } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[400] transition-[background,backdrop-filter,border-color] duration-300",
          scrolled
            ? "bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--border)]"
            : "bg-transparent border-b border-transparent",
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container-x flex h-full items-center justify-between">
          <a href="#top" className="flex items-center gap-3 text-[color:var(--ink)]">
            <Isotipo className="h-7 w-7" strokeWidth={14} />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-tight" style={{ fontWeight: 400 }}>
                nucleo
              </span>
              <span className="font-body text-[10px] tracking-[0.3em] opacity-70">bariátrico</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="body-sm text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors relative group"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="body-sm text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={nav.cta.href}
              className="inline-flex h-11 items-center rounded-[12px] bg-[color:var(--accent)] px-5 text-sm font-medium text-white shadow-[var(--shadow-sm)] hover:bg-[color:var(--accent-hover)] transition-colors"
            >
              {nav.cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden grid h-11 w-11 place-items-center text-[color:var(--ink)]"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

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
              <Isotipo className="h-7 w-7" strokeWidth={14} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center text-[color:var(--ink)]"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
              className="container-x flex flex-col gap-6 pt-12"
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
                className="mt-8 inline-flex h-12 w-fit items-center rounded-[12px] bg-[color:var(--accent)] px-6 font-medium text-white"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {nav.cta.label}
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
