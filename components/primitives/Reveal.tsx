"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3" | "h4";
}) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={defaultVariants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
