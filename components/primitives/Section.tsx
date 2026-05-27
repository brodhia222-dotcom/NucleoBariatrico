import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";

type Tone = "default" | "elevated" | "subtle" | "dark";

const toneClass: Record<Tone, string> = {
  default: "bg-[color:var(--bg)] text-[color:var(--ink)]",
  elevated: "bg-[color:var(--bg-elevated)] text-[color:var(--ink)]",
  subtle: "bg-[color:var(--bg-subtle)] text-[color:var(--ink)]",
  dark: "bg-[color:var(--bg-inverse)] text-[color:var(--ink-inverse)]",
};

export type SectionMarker = {
  index: string;
  label: string;
  aside?: string;
};

export function Section({
  id,
  children,
  tone = "default",
  tight = false,
  className,
  marker,
}: {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  tight?: boolean;
  className?: string;
  marker?: SectionMarker;
}) {
  return (
    <section
      id={id}
      data-nav-tone={tone === "dark" ? "dark" : "light"}
      className={cn(
        tight ? "section-tight" : "section",
        toneClass[tone],
        "relative",
        marker && "pt-0",
        className,
      )}
    >
      {marker && <SectionMarkerHeader marker={marker} tone={tone} />}
      {children}
    </section>
  );
}

function SectionMarkerHeader({
  marker,
  tone,
}: {
  marker: SectionMarker;
  tone: Tone;
}) {
  const borderColor =
    tone === "dark"
      ? "color-mix(in srgb, var(--ink-inverse) 38%, transparent)"
      : "color-mix(in srgb, var(--ink) 38%, transparent)";

  return (
    <Container>
      <div
        className="flex items-center justify-between gap-6 mb-10 lg:mb-14"
        style={{
          paddingTop: "clamp(28px, 3.6vw, 44px)",
          paddingBottom: 0,
          borderTop: `1px solid ${borderColor}`,
          marginTop: "0",
        }}
      >
        <div className="flex items-center gap-3 lg:gap-4">
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase tabular">
            {marker.index}
          </span>
          <span aria-hidden className="block h-px w-6 bg-[color:var(--accent)]" />
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase">
            {marker.label}
          </span>
        </div>
        {marker.aside && (
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60 hidden sm:block">
            {marker.aside}
          </span>
        )}
      </div>
    </Container>
  );
}
