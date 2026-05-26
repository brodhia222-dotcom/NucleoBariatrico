import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { obrasSociales } from "@/lib/copy";

export function ObrasSociales() {
  return (
    <Section id="obras-sociales" tone="default">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Reveal>
              <Eyebrow>{obrasSociales.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="display-md"
                style={{ fontVariationSettings: '"opsz" 72', maxWidth: "14ch" }}
              >
                {obrasSociales.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)]">{obrasSociales.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={obrasSociales.cta.href}
                className="mt-2 inline-flex h-12 w-fit items-center rounded-[12px] bg-[color:var(--ink)] px-6 text-sm font-medium text-white hover:bg-[color:var(--color-indigo-900)] transition-colors"
              >
                {obrasSociales.cta.label}
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <div className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-8">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="h4 mb-1">{obrasSociales.badge}</p>
                    <p className="caption">{obrasSociales.logosPendiente}</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      aria-hidden
                      className="aspect-[2/1] rounded-[var(--radius-sm)] border border-dashed border-[color:var(--border)] bg-transparent"
                    />
                  ))}
                </div>

                <p className="caption mt-6 leading-relaxed">{obrasSociales.notaEfector}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
