"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Hairline({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  if (!animated) {
    return <span className={cn("block h-px w-full bg-[color:var(--border)]", className)} />;
  }
  return (
    <motion.span
      className={cn("block h-px w-full bg-[color:var(--border-strong)] origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: "all" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}
