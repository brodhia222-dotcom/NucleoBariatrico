import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "default" | "elevated" | "subtle" | "dark";

const toneClass: Record<Tone, string> = {
  default: "bg-bg text-ink",
  elevated: "bg-bg-elevated text-ink",
  subtle: "bg-bg-subtle text-ink",
  dark: "bg-indigo-700 text-ink-inverse",
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
