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

        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {equipo.miembros.map((m, i) => (
            <Reveal key={m.nombre} delay={i * 0.12}>
              <article className="group grid grid-cols-[auto_1fr] items-start gap-6 md:gap-8">
                <div
                  className="placeholder shrink-0"
                  data-label="Foto"
                  style={{ width: "clamp(120px, 22vw, 180px)", aspectRatio: "4 / 5" }}
                />
                <div className="flex flex-col gap-2 pt-2">
                  <span className="eyebrow">{m.rol}</span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(28px, 3vw, 40px)",
                      letterSpacing: "-0.02em",
                      fontWeight: 300,
                      lineHeight: 1.1,
                      fontVariationSettings: '"opsz" 56',
                    }}
                  >
                    {m.nombre}
                  </h3>
                  <p className="body mt-2 text-[color:var(--ink-soft)] max-w-md">{m.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
