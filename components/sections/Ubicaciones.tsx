import { MapPin } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { ubicaciones } from "@/lib/copy";

export function Ubicaciones() {
  return (
    <Section id="ubicaciones" tone="default">
      <Container>
        <div className="mb-16 grid gap-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{ubicaciones.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md mt-4" style={{ fontVariationSettings: '"opsz" 72' }}>
                {ubicaciones.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)]">{ubicaciones.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {ubicaciones.sedes.map((sede, i) => (
            <Reveal key={sede.nombre} delay={i * 0.1}>
              <article className="flex flex-col gap-5">
                <MapEmbed src={sede.mapa} title={`Mapa ${sede.nombre}`} />
                <header className="flex items-start gap-4">
                  <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--bg-subtle)] text-[color:var(--ink)]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="h3" style={{ fontVariationSettings: '"opsz" 40' }}>
                      {sede.nombre}
                    </h3>
                    <p className="body-sm text-[color:var(--ink-soft)]">{sede.direccion}</p>
                  </div>
                </header>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
