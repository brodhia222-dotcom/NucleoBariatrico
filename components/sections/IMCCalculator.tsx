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

/** Color del resultado según el nivel clínico del IMC. */
function nivelColor(nivel: "normal" | "alerta" | "critico" | undefined): string {
  if (nivel === "critico") return "var(--color-error)";
  if (nivel === "alerta") return "var(--accent)";
  return "var(--ink)";
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
        <div className="flex flex-col items-center text-center gap-4 mb-12 lg:mb-16">
          <Reveal>
            <Eyebrow>{imcCalc.eyebrow}</Eyebrow>
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
              {imcCalc.headline}
            </h2>
          </Reveal>
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
                    const labelColor = isCurrent
                      ? nivelColor(resultado?.nivel)
                      : cat.color === "orange"
                        ? "var(--accent)"
                        : "var(--ink)";
                    return (
                      <li
                        key={cat.label}
                        className="flex items-baseline justify-between gap-4 transition-colors duration-500"
                      >
                        <span
                          className="font-medium transition-colors duration-500"
                          style={{ color: labelColor }}
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

            {/* RIGHT — result panel con fondo vivo:
                idle = ciclo lento entre tintes de marca;
                con resultado = tono de la barra OMS en la posición del IMC */}
            <div
              className={cn(
                "imc-bg flex flex-col justify-between gap-10 p-8 lg:p-12",
                !resultado && "imc-bg-idle",
              )}
              style={
                resultado && markerPercent !== null
                  ? {
                      backgroundColor: `color-mix(in srgb, color-mix(in srgb, var(--accent) ${Math.round(
                        markerPercent,
                      )}%, var(--ink)) 26%, var(--bg))`,
                    }
                  : undefined
              }
            >
              <span className="eyebrow">{imcCalc.labels.resultado}</span>

              <div className="flex flex-col items-start gap-4">
                <span
                  className="font-display tabular block transition-colors duration-500"
                  style={{
                    fontSize: "clamp(72px, 9.5vw, 120px)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.05em",
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 144',
                    color: resultado
                      ? nivelColor(resultado.nivel)
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
                    className="font-display italic-serif transition-colors duration-500"
                    style={{
                      fontSize: "20px",
                      lineHeight: 1.2,
                      fontWeight: 400,
                      color:
                        resultado && resultado.nivel !== "normal"
                          ? nivelColor(resultado.nivel)
                          : "var(--ink-soft)",
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {resultado ? resultado.categoria : "Ingresá tus datos para calcular"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* OMS gradient bar — con marco propio para que no se funda con el fondo vivo */}
              <div className="flex flex-col gap-2.5">
                <div className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)] p-2 shadow-[var(--shadow-sm)]">
                  <div className="relative h-2 rounded-full overflow-hidden">
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
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[color:var(--ink)] border-2 border-[color:var(--bg-elevated)]"
                        style={{ boxShadow: "0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent)" }}
                        aria-hidden
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-between px-2 text-[10px] tracking-[0.16em] uppercase text-[color:var(--ink-soft)] font-mono tabular">
                  <span>15</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {resultado && resultado.nivel !== "normal" && (
                  <motion.div
                    key={resultado.nivel}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45 }}
                    className="flex items-start gap-3 max-w-[36ch]"
                  >
                    <span
                      aria-hidden
                      className="mt-1 block h-2 w-2 shrink-0 rounded-full transition-colors duration-500"
                      style={{ background: nivelColor(resultado.nivel) }}
                    />
                    <p
                      className="italic-serif transition-colors duration-500"
                      style={{
                        fontSize: "17px",
                        lineHeight: 1.4,
                        fontVariationSettings: '"opsz" 24',
                        color: nivelColor(resultado.nivel),
                      }}
                    >
                      {resultado.nivel === "critico"
                        ? imcCalc.messages.critico
                        : imcCalc.messages.alerta}
                    </p>
                  </motion.div>
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
