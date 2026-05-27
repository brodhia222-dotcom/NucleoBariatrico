"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { calcularIMC } from "@/lib/imc";
import { useIMC } from "@/lib/imc-context";
import { imcCalc } from "@/lib/copy";
import { cn } from "@/lib/utils";

function imcToPercent(imc: number): number {
  const clamped = Math.max(15, Math.min(50, imc));
  return ((clamped - 15) / (50 - 15)) * 100;
}

export function IMCCalculator() {
  const { resultado, setResultado } = useIMC();
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
      duration: 1.1,
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
    const r = calcularIMC(p, a);
    if (!r) {
      setError("Los valores ingresados están fuera de rango.");
      setResultado(null);
      return;
    }
    setResultado(r);
  };

  return (
    <Section id="imc" tone="default">
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-12 lg:mb-16 items-end">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>{imcCalc.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal delay={0.05}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(36px, 4.6vw, 64px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 72',
                  textWrap: "balance",
                  maxWidth: "22ch",
                }}
              >
                {imcCalc.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Card */}
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--border)] lg:grid-cols-2 shadow-[var(--shadow-sm)]">
            {/* LEFT — form */}
            <div className="flex flex-col gap-7 bg-[color:var(--bg-elevated)] p-8 lg:p-12">
              <p className="body text-[color:var(--ink-soft)] max-w-[44ch]">{imcCalc.body}</p>

              <form onSubmit={onCalcular} className="flex flex-col gap-5">
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
                  <button type="submit" className="btn btn-ink">
                    {imcCalc.labels.calcular}
                  </button>
                  <AnimatePresence>
                    {resultado && (
                      <motion.a
                        href="#contacto"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="btn btn-primary group"
                      >
                        {imcCalc.labels.enviar}
                        <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </motion.a>
                    )}
                  </AnimatePresence>
                </div>
              </form>

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
                          "flex items-baseline justify-between gap-4 transition-colors",
                          isCurrent && "text-[color:var(--accent)]",
                        )}
                      >
                        <span
                          className={cn(
                            "font-medium",
                            cat.color === "orange"
                              ? "text-[color:var(--accent)]"
                              : isCurrent
                                ? "text-[color:var(--accent)]"
                                : "text-[color:var(--ink)]",
                          )}
                        >
                          {cat.label}
                        </span>
                        <span className="font-mono text-xs tabular text-[color:var(--ink-soft)]">
                          {cat.range}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="caption mt-1">{imcCalc.labels.nota}</p>
              </div>
            </div>

            {/* RIGHT — result panel */}
            <div className="flex flex-col justify-between gap-10 bg-[color:var(--bg)] p-8 lg:p-12">
              <span className="eyebrow">{imcCalc.labels.resultado}</span>

              <div className="flex flex-col items-start gap-4">
                <span
                  className="font-display tabular block"
                  style={{
                    fontSize: "clamp(96px, 14vw, 168px)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.05em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 144',
                    color: resultado
                      ? resultado.esCandidatoQuirurgico
                        ? "var(--accent)"
                        : "var(--ink)"
                      : "color-mix(in srgb, var(--ink) 22%, transparent)",
                  }}
                >
                  {resultado ? <motion.span>{motionImcDisplay}</motion.span> : "—"}
                </span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={resultado?.categoria ?? "empty"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="font-display italic-serif"
                    style={{
                      fontSize: "20px",
                      lineHeight: 1.2,
                      fontWeight: 400,
                      color: resultado?.esCandidatoQuirurgico ? "var(--accent)" : "var(--ink-soft)",
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {resultado ? resultado.categoria : "Ingresá tus datos para calcular"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* OMS gradient bar */}
              <div className="flex flex-col gap-3">
                <div className="relative h-1.5 rounded-full bg-[color:var(--border-strong)] overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 right-0"
                    style={{
                      background:
                        "linear-gradient(90deg, color-mix(in srgb, var(--ink) 40%, transparent) 0%, color-mix(in srgb, var(--ink) 60%, transparent) 42%, color-mix(in srgb, var(--accent) 80%, transparent) 60%, var(--accent) 90%)",
                    }}
                  />
                  {markerPercent !== null && (
                    <motion.div
                      initial={{ left: "0%", opacity: 0 }}
                      animate={{ left: `${markerPercent}%`, opacity: 1 }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[color:var(--ink)] border-2 border-[color:var(--bg)]"
                      style={{ boxShadow: "0 0 0 3px color-mix(in srgb, var(--accent) 28%, transparent)" }}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="flex justify-between text-[10px] tracking-[0.16em] uppercase text-[color:var(--ink-soft)] font-mono tabular">
                  <span>15</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                </div>
              </div>

              <AnimatePresence>
                {resultado?.esCandidatoQuirurgico && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="italic-serif text-[color:var(--accent)] max-w-[32ch]"
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.4,
                      fontVariationSettings: '"opsz" 24',
                    }}
                  >
                    {imcCalc.highIMCMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

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
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <span className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          className="h-12 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 pr-12 text-[17px] font-medium tabular text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--ink)]"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-xs text-[color:var(--ink-soft)] font-mono tracking-wider">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}
