"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { calcularIMC } from "@/lib/imc";
import { useIMC } from "@/lib/imc-context";
import { imcCalc } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function IMCCalculator() {
  const { resultado, setResultado } = useIMC();
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Animated count-up for the IMC value.
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
    <Section id="imc" tone="elevated">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Reveal>
            <Eyebrow>{imcCalc.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-md max-w-md" style={{ fontVariationSettings: '"opsz" 80' }}>
              {imcCalc.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg max-w-md text-[color:var(--ink-soft)]">{imcCalc.body}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-4">
            <div className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg)] p-6">
              <p className="eyebrow mb-4">Referencia OMS</p>
              <ul className="space-y-1.5">
                {imcCalc.categories.map((cat) => (
                  <li
                    key={cat.label}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
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
                    <span className="text-[color:var(--ink-soft)] font-mono">{cat.range}</span>
                  </li>
                ))}
              </ul>
              <p className="caption mt-4">{imcCalc.labels.nota}</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <form
              onSubmit={onCalcular}
              className="rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-8 lg:p-10 shadow-[var(--shadow-md)]"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label={imcCalc.labels.peso}
                  value={peso}
                  onChange={setPeso}
                  suffix="kg"
                  inputMode="decimal"
                  placeholder="80"
                />
                <Field
                  label={imcCalc.labels.altura}
                  value={altura}
                  onChange={setAltura}
                  suffix="cm"
                  inputMode="decimal"
                  placeholder="165"
                />
              </div>

              {error && (
                <p className="mt-4 text-sm text-[color:var(--color-error)]">{error}</p>
              )}

              <button
                type="submit"
                className="mt-6 inline-flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-[12px] bg-[color:var(--ink)] px-6 text-sm font-medium text-white hover:bg-[color:var(--color-indigo-900)] transition-colors"
              >
                {imcCalc.labels.calcular}
              </button>

              <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-end">
                <div>
                  <p className="eyebrow mb-2">{imcCalc.labels.resultado}</p>
                  <span
                    className="font-display block tabular-nums"
                    style={{
                      fontSize: "clamp(72px, 11vw, 128px)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: resultado
                        ? resultado.esCandidatoQuirurgico
                          ? "var(--accent)"
                          : "var(--ink)"
                        : "var(--ink-muted)",
                      fontVariationSettings: '"opsz" 144',
                      fontWeight: 300,
                    }}
                  >
                    {resultado ? <motion.span>{motionImcDisplay}</motion.span> : "—"}
                  </span>
                </div>
                <div className="md:pb-4">
                  <p className="eyebrow mb-2">{imcCalc.labels.categoria}</p>
                  <p
                    className="text-xl font-medium"
                    style={{
                      color: resultado
                        ? resultado.esCandidatoQuirurgico
                          ? "var(--accent)"
                          : "var(--ink)"
                        : "var(--ink-muted)",
                    }}
                  >
                    {resultado ? resultado.categoria : "—"}
                  </p>
                  {resultado?.esCandidatoQuirurgico && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="mt-4 max-w-md text-sm text-[color:var(--ink-soft)] italic font-display"
                      style={{ fontSize: "18px", lineHeight: 1.4 }}
                    >
                      {imcCalc.highIMCMessage}
                    </motion.p>
                  )}
                </div>
              </div>

              {resultado && (
                <motion.a
                  href="#contacto"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-8 inline-flex h-12 items-center rounded-[12px] bg-[color:var(--accent)] px-6 text-sm font-medium text-white hover:bg-[color:var(--accent-hover)] transition-colors"
                >
                  {imcCalc.labels.enviar} →
                </motion.a>
              )}
            </form>
          </Reveal>
        </div>
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
          className="h-14 w-full rounded-[12px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 pr-12 text-lg font-medium text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)]"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-sm text-[color:var(--ink-soft)]">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}
