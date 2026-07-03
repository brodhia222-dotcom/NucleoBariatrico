import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow inline-flex items-center", className)}>{children}</span>;
}
