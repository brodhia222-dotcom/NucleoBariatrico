import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "default" | "elevated" | "subtle" | "dark";

const toneClass: Record<Tone, string> = {
  default: "bg-[color:var(--bg)] text-[color:var(--ink)]",
  elevated: "bg-[color:var(--bg-elevated)] text-[color:var(--ink)]",
  subtle: "bg-[color:var(--bg-subtle)] text-[color:var(--ink)]",
  dark: "bg-[color:var(--bg-inverse)] text-[color:var(--ink-inverse)]",
};

export function Section({
  id,
  children,
  tone = "default",
  tight = false,
  className,
}: {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  tight?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        tight ? "section-tight" : "section",
        toneClass[tone],
        "relative",
        className,
      )}
    >
      {children}
    </section>
  );
}
