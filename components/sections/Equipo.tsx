import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { equipo } from "@/lib/copy";

export function Equipo() {
  return (
    <Section id="equipo" tone="subtle">
      <Container>
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{equipo.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="display-md mt-4"
                style={{ fontVariationSettings: '"opsz" 72', maxWidth: "16ch" }}
              >
                {equipo.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)]">{equipo.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {equipo.miembros.map((m, i) => (
            <Reveal key={m.nombre} delay={i * 0.12}>
              <article className="group">
                <div className="placeholder mb-6" data-label={`Foto · ${m.nombre} · 3:4`} style={{ aspectRatio: "3 / 4" }} />
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="h2" style={{ fontVariationSettings: '"opsz" 48' }}>
                    {m.nombre}
                  </h3>
                  <span className="eyebrow whitespace-nowrap">{m.rol}</span>
                </div>
                <p className="body mt-3 text-[color:var(--ink-soft)] max-w-md">{m.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
