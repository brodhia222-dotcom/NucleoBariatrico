import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", className)}>
      <span aria-hidden className="block h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  );
}
