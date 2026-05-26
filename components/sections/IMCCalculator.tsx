"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { ArrowRight, Scales } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { calcularIMC, type IMCCategoria } from "@/lib/imc";
import { useIMC } from "@/lib/imc-context";
import { imcCalc } from "@/lib/copy";
import { cn } from "@/lib/utils";

// Posiciones aproximadas en la barra (% del ancho) para cada categoría OMS.
const CATEGORY_POSITIONS: { category: IMCCategoria; min: number; max: number; center: number }[] = [
  { category: "Bajo peso", min: 0, max: 18.5, center: 9 },
  { category: "Normal", min: 18.5, max: 25, center: 21.75 },
  { category: "Sobrepeso", min: 25, max: 30, center: 27.5 },
  { category: "Obesidad I", min: 30, max: 35, center: 32.5 },
  { category: "Obesidad II", min: 35, max: 40, center: 37.5 },
  { category: "Obesidad III", min: 40, max: 50, center: 45 },
];

function imcToPercent(imc: number): number {
  // Escala visual: 15 → 0%, 50+ → 100%. Lineal.
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

  const markerPercent = useMemo(() => (resultado ? imcToPercent(resultado.imc) : null), [resultado]);

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
    <Section id="imc" tone="default" className="relative">
      <Container>
        {/* Editorial header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-12 lg:mb-16 items-end">
          <div className="lg:col-span-3 flex items-center gap-3">
            <Reveal>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ink)] text-[color:var(--ink-inverse)]" aria-hidden>
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

        {/* Main split-screen card */}
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--border)] lg:grid-cols-[5fr_7fr] shadow-[var(--shadow-md)]">
            {/* LEFT: visual + context */}
            <div className="relative flex flex-col justify-between gap-8 bg-[color:var(--ink)] p-8 lg:p-10 text-[color:var(--ink-inverse)] min-h-[460px]">
              {/* Decorative background dots */}
              <div
                aria-hidden
                className="absolute inset-0 bg-dots opacity-[0.06]"
                style={{ color: "var(--ink-inverse)" }}
              />

              <div className="relative z-10 flex flex-col gap-5">
                <span className="eyebrow text-[color:var(--ink-inverse)]/70">{imcCalc.labels.resultado}</span>
                <div className="flex items-end gap-4">
                  <span
                    className="font-display tabular block"
                    style={{
                      fontSize: "clamp(96px, 13vw, 160px)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.045em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 144',
                      color: resultado
                        ? resultado.esCandidatoQuirurgico
                          ? "var(--accent)"
                          : "var(--ink-inverse)"
                        : "rgba(245,241,224,0.35)",
                    }}
                  >
                    {resultado ? <motion.span>{motionImcDisplay}</motion.span> : "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="eyebrow text-[color:var(--ink-inverse)]/70">{imcCalc.labels.categoria}</span>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "22px",
                      lineHeight: 1.2,
                      fontWeight: 400,
                      color: resultado?.esCandidatoQuirurgico ? "var(--accent)" : "var(--ink-inverse)",
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {resultado ? resultado.categoria : "Esperando datos…"}
                  </p>
                </div>
              </div>

              {/* OMS gradient bar with marker */}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="relative h-2 rounded-full bg-[color:var(--ink-inverse)]/15 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 right-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(245,241,224,0.5) 0%, rgba(245,241,224,0.65) 26%, rgba(245,241,224,0.65) 42%, rgba(223,126,53,0.7) 50%, rgba(223,126,53,0.9) 65%, #df7e35 85%)",
                    }}
                  />
                  {markerPercent !== null && (
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: `${markerPercent}%` }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-white shadow-[0_0_0_4px_rgba(223,126,53,0.35)]"
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

            {/* RIGHT: form + reference table */}
            <div className="bg-[color:var(--bg-elevated)] p-8 lg:p-10">
              <form onSubmit={onCalcular} className="flex flex-col gap-6">
                <p className="body-sm text-[color:var(--ink-soft)] max-w-[44ch]">{imcCalc.body}</p>

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

                {error && <p className="text-sm text-[color:var(--color-error)]">{error}</p>}

                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn btn-ink">
                    {imcCalc.labels.calcular}
                  </button>
                  {resultado && (
                    <motion.a
                      href="#contacto"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="btn btn-primary group"
                    >
                      {imcCalc.labels.enviar}
                      <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </motion.a>
                  )}
                </div>

                <hr className="border-[color:var(--border)] mt-2" />

                {/* OMS reference — inline list, not a card */}
                <div className="flex flex-col gap-3">
                  <span className="eyebrow">Referencia OMS</span>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {imcCalc.categories.map((cat) => (
                      <li key={cat.label} className="flex items-baseline justify-between gap-4">
                        <span
                          className={cn(
                            "font-medium",
                            cat.color === "orange"
                              ? "text-[color:var(--accent)]"
                              : "text-[color:var(--ink)]",
                          )}
                        >
                          {cat.label}
                        </span>
                        <span className="text-[color:var(--ink-soft)] font-mono text-xs tabular">
                          {cat.range}
                        </span>
                      </li>
                    ))}
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
          className="h-12 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 pr-10 text-[17px] font-medium text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--ink)]"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 grid place-items-center text-xs text-[color:var(--ink-muted)] font-mono tracking-wider">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}
