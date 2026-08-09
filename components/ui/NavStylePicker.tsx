"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Browser, X, Check } from "@phosphor-icons/react";
import { navStyleOptions, useNavStyle } from "@/lib/nav-style-context";

export function NavStylePicker() {
  const [open, setOpen] = useState(false);
  const { navStyle, setNavStyle } = useNavStyle();

  return (
    <>
      {/* Floating trigger — arriba a la derecha, debajo de la nav, lejos de
          Paleta (abajo-izq) y WhatsApp (abajo-der) para que ningún panel
          se superponga */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Probar estilos de navegación"
        className="fixed z-[600] flex items-center gap-2 rounded-full bg-[color:var(--ink)] text-[color:var(--ink-inverse)] px-4 py-3 shadow-[var(--shadow-lg)] hover:scale-105 active:scale-95 transition-transform"
        style={{ top: "calc(var(--nav-height) + 16px)", right: "24px" }}
      >
        <Browser weight="regular" className="h-4 w-4" />
        <span className="text-xs font-medium tracking-wide hidden sm:inline">Nav</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[598] bg-black/20 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.aside
              initial={{ opacity: 0, x: 16, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 16, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[599] w-[320px] max-w-[calc(100vw-3rem)] rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] shadow-[var(--shadow-xl)]"
              style={{ top: "calc(var(--nav-height) + 72px)", right: "24px" }}
              role="dialog"
              aria-label="Selector de estilo de navegación"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-[color:var(--border)]">
                <div>
                  <p className="eyebrow mb-1">Modo demo</p>
                  <h3 className="h4 text-[color:var(--ink)]">Estilo de la nav</h3>
                  <p className="caption mt-1 leading-snug">
                    Probá distintos patrones de contraste para el header.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[color:var(--ink-soft)] hover:bg-[color:var(--bg-subtle)] hover:text-[color:var(--ink)] transition-colors"
                >
                  <X weight="regular" className="h-4 w-4" />
                </button>
              </div>

              {/* Options */}
              <ul className="p-2.5">
                {navStyleOptions.map((o) => {
                  const isActive = o.key === navStyle;
                  return (
                    <li key={o.key}>
                      <button
                        type="button"
                        onClick={() => setNavStyle(o.key)}
                        className={`flex w-full items-center gap-4 rounded-[var(--radius-md)] p-3 text-left transition-colors ${
                          isActive
                            ? "bg-[color:var(--bg-subtle)]"
                            : "hover:bg-[color:var(--bg-subtle)]/55"
                        }`}
                        aria-pressed={isActive}
                      >
                        <span className="flex flex-1 flex-col">
                          <span className="text-sm font-medium text-[color:var(--ink)]">
                            {o.name}
                          </span>
                          <span className="caption leading-tight">{o.description}</span>
                        </span>
                        {isActive && (
                          <span
                            aria-hidden
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--accent)] text-white"
                          >
                            <Check weight="bold" className="h-3 w-3" />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
