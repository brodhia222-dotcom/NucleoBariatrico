"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from "framer-motion";
import { ArrowRight, Scales, Sparkle } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { calcularIMC } from "@/lib/imc";
import { useIMC } from "@/lib/imc-context";
import { imcCalc } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { easeEditorial } from "@/lib/motion";

function imcToPercent(imc: number): number {
  const clamped = Math.max(15, Math.min(50, imc));
  return ((clamped - 15) / (50 - 15)) * 100;
}

export function IMCCalculator() {
  const { resultado, setResultado } = useIMC();
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);

  const motionImc = useMotionValue(0);
  const motionImcDisplay = useTransform(motionImc, (v) => v.toFixed(1));
  const prevImcRef = useRef<number>(0);

  useEffect(() => {
    if (!resultado) {
      prevImcRef.current = 0;
      motionImc.set(0);
      return;
    }
    const controls = animate(motionImc, resultado.imc, {
      from: prevImcRef.current,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    prevImcRef.current = resultado.imc;
    return () => controls.stop();
  }, [resultado, motionImc]);

  const markerPercent = useMemo(
    () => (resultado ? imcToPercent(resultado.imc) : null),
    [resultado],
  );

  const onCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const p = parseFloat(peso.replace(",", "."));
    const a = parseFloat(altura.replace(",", "."));
    if (!Number.isFinite(p) || !Number.isFinite(a)) {
      setError("Ingresá un peso y altura válidos.");
      setResultado(null);
      return;
    }
    setCalculating(true);
    // Brief shimmer to make the action feel deliberate
    setTimeout(() => {
      const r = calcularIMC(p, a);
      if (!r) {
        setError("Los valores ingresados están fuera de rango.");
        setResultado(null);
        setCalculating(false);
        return;
      }
      setResultado(r);
      setCalculating(false);
    }, 420);
  };

  return (
    <Section
      id="imc"
      tone="default"
      className="relative"
      marker={{ index: "02", label: "Calculadora", aside: "Referencia OMS" }}
    >
      <Container>
        {/* Editorial header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-10 lg:mb-14 items-end">
          <div className="lg:col-span-3 flex items-center gap-3">
            <Reveal>
              <span
                className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ink)] text-[color:var(--ink-inverse)]"
                aria-hidden
              >
                <Scales weight="regular" className="h-5 w-5" />
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <Eyebrow>{imcCalc.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal delay={0.08}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 56',
                  textWrap: "balance",
                  maxWidth: "22ch",
                }}
              >
                {imcCalc.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Main card */}
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--border)] lg:grid-cols-[5fr_7fr] shadow-[var(--shadow-md)]">
            {/* LEFT — cinematic dark panel */}
            <div className="relative flex flex-col justify-between gap-8 bg-[color:var(--ink)] p-8 lg:p-10 text-[color:var(--ink-inverse)] min-h-[520px] overflow-hidden">
              {/* Background dots */}
              <div
                aria-hidden
                className="absolute inset-0 bg-dots opacity-[0.06]"
                style={{ color: "var(--ink-inverse)" }}
              />
              {/* Soft halo */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 h-[280px] w-[280px] rounded-full opacity-[0.18]"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--accent) 80%, transparent), transparent 70%)",
                }}
              />

              {/* Top: result label */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="eyebrow text-[color:var(--ink-inverse)]/70">
                  {imcCalc.labels.resultado}
                </span>
                <AnimatePresence>
                  {resultado?.esCandidatoQuirurgico && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent)] px-3 py-1 text-[10px] tracking-[0.18em] uppercase font-mono text-white shadow-[var(--shadow-accent)]"
                    >
                      <Sparkle weight="fill" className="h-3 w-3" />
                      Conversemos
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Center: big number */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <span
                    className={cn(
                      "font-display tabular block transition-colors duration-700",
                      calculating ? "opacity-50" : "opacity-100",
                    )}
                    style={{
                      fontSize: "clamp(120px, 17vw, 200px)",
                      lineHeight: 0.85,
                      letterSpacing: "-0.05em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 144',
                      color: resultado
                        ? resultado.esCandidatoQuirurgico
                          ? "var(--accent)"
                          : "var(--ink-inverse)"
                        : "color-mix(in srgb, var(--ink-inverse) 35%, transparent)",
                    }}
                  >
                    {resultado ? <motion.span>{motionImcDisplay}</motion.span> : "—"}
                  </span>
                  {/* Shimmer overlay while calculating */}
                  {calculating && (
                    <motion.span
                      aria-hidden
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 0.42, ease: "linear" }}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, color-mix(in srgb, var(--ink-inverse) 24%, transparent), transparent)",
                      }}
                    />
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={resultado?.categoria ?? "empty"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: easeEditorial }}
                    className="font-display italic-serif"
                    style={{
                      fontSize: "20px",
                      lineHeight: 1.2,
                      fontWeight: 400,
                      color: resultado?.esCandidatoQuirurgico ? "var(--accent)" : "var(--ink-inverse)",
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {resultado ? resultado.categoria : "Esperando datos…"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* OMS gradient bar */}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="relative h-2 rounded-full bg-[color:var(--ink-inverse)]/15 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 right-0"
                    style={{
                      background:
                        "linear-gradient(90deg, color-mix(in srgb, var(--ink-inverse) 50%, transparent) 0%, color-mix(in srgb, var(--ink-inverse) 65%, transparent) 26%, color-mix(in srgb, var(--ink-inverse) 65%, transparent) 42%, color-mix(in srgb, var(--accent) 70%, transparent) 50%, color-mix(in srgb, var(--accent) 90%, transparent) 65%, var(--accent) 85%)",
                    }}
                  />
                  {markerPercent !== null && (
                    <motion.div
                      initial={{ left: "0%", opacity: 0 }}
                      animate={{ left: `${markerPercent}%`, opacity: 1 }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-[color:var(--ink-inverse)]"
                      style={{ boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 35%, transparent)" }}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="flex justify-between text-[10px] tracking-[0.16em] uppercase text-[color:var(--ink-inverse)]/55 font-mono">
                  <span>15</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                </div>
              </div>

              {resultado?.esCandidatoQuirurgico && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative z-10 italic-serif text-[15px] leading-[1.45] text-[color:var(--accent)] max-w-[28ch]"
                >
                  {imcCalc.highIMCMessage}
                </motion.p>
              )}
            </div>

            {/* RIGHT — form + reference */}
            <div className="relative bg-[color:var(--bg-elevated)] p-8 lg:p-10 overflow-hidden">
              {/* Decorative corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-[0.08]"
                style={{
                  background:
                    "radial-gradient(circle, var(--ink), transparent 70%)",
                }}
              />

              <form onSubmit={onCalcular} className="relative flex flex-col gap-6">
                <p className="body-sm text-[color:var(--ink-soft)] max-w-[44ch]">
                  {imcCalc.body}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label={imcCalc.labels.peso}
                    value={peso}
                    onChange={setPeso}
                    suffix="kg"
                    placeholder="80"
                    inputMode="decimal"
                  />
                  <Field
                    label={imcCalc.labels.altura}
                    value={altura}
                    onChange={setAltura}
                    suffix="cm"
                    placeholder="165"
                    inputMode="decimal"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm text-[color:var(--color-error)]"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={calculating}
                    className="btn btn-ink disabled:opacity-60"
                  >
                    {calculating ? "Calculando…" : imcCalc.labels.calcular}
                  </button>
                  <AnimatePresence>
                    {resultado && !calculating && (
                      <motion.a
                        href="#contacto"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.4 }}
                        className="btn btn-primary group"
                      >
                        {imcCalc.labels.enviar}
                        <ArrowRight
                          weight="bold"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </motion.a>
                    )}
                  </AnimatePresence>
                </div>

                <hr className="border-[color:var(--border)] mt-2" />

                {/* OMS reference */}
                <div className="flex flex-col gap-3">
                  <span className="eyebrow">Referencia OMS</span>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {imcCalc.categories.map((cat) => {
                      const isCurrent = resultado?.categoria === cat.label;
                      return (
                        <li
                          key={cat.label}
                          className={cn(
                            "flex items-baseline justify-between gap-4 rounded-md px-2 py-1 -mx-2 transition-colors",
                            isCurrent && "bg-[color:var(--accent-soft)]",
                          )}
                        >
                          <span
                            className={cn(
                              "font-medium flex items-center gap-2",
                              cat.color === "orange"
                                ? "text-[color:var(--accent)]"
                                : "text-[color:var(--ink)]",
                            )}
                          >
                            {isCurrent && (
                              <motion.span
                                layoutId="imc-current"
                                aria-hidden
                                className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                              />
                            )}
                            {cat.label}
                          </span>
                          <span className="text-[color:var(--ink-soft)] font-mono text-xs tabular">
                            {cat.range}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="caption mt-1">{imcCalc.labels.nota}</p>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   Field — floating-label input
   ============================================================ */
function Field({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const [focused, setFocused] = useState(false);
  const has = value.length > 0;
  const floated = focused || has;

  return (
    <label className="relative flex flex-col">
      <span className="relative">
        <span
          className={cn(
            "pointer-events-none absolute left-4 transition-all duration-200 origin-left",
            floated
              ? "top-2 text-[10px] tracking-[0.18em] uppercase text-[color:var(--ink-soft)] font-mono"
              : "top-1/2 -translate-y-1/2 text-[15px] text-[color:var(--ink-soft)]",
          )}
        >
          {label}
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={floated ? placeholder : ""}
          inputMode={inputMode}
          className={cn(
            "h-16 w-full rounded-[var(--radius-md)] border bg-[color:var(--bg)] px-4 pt-5 pb-1.5 pr-12 text-[18px] font-medium tabular text-[color:var(--ink)] outline-none transition-all duration-300",
            focused
              ? "border-[color:var(--ink)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--ink)_8%,transparent)]"
              : "border-[color:var(--border-strong)]",
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-xs text-[color:var(--ink-muted)] font-mono tracking-wider">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}
