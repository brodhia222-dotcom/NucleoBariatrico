"use client";

// WipeWords · word-by-word reveal inside a container with cascading variants.
// Critical: variants must be on the container, not on each motion.span — otherwise
// whileInView fails because the bounding rect of the wrapped span confuses the
// IntersectionObserver (initial transform translateY(110%) ends up outside the
// expected viewport).

import { motion, type Variants } from "framer-motion";
import { easeEditorial, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.95, ease: easeEditorial },
  },
};

type Props = {
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  wordClassName?: string;
  /** If true, splits into lines (one motion line per array entry). Default: split words within a single line. */
  byLine?: boolean;
  delayChildren?: number;
};

export function WipeWords({
  text,
  as = "h2",
  className,
  wordClassName,
  byLine = false,
  delayChildren,
}: Props) {
  const lines = Array.isArray(text) ? text : [text];

  const Tag = motion[as] as typeof motion.h2;

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={
        delayChildren !== undefined
          ? {
              ...containerVariants,
              visible: {
                transition: { staggerChildren: 0.06, delayChildren },
              },
            }
          : containerVariants
      }
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {byLine ? (
            <span className="overflow-hidden inline-block leading-[1.1] align-bottom">
              <motion.span
                variants={wordVariants}
                className={cn("inline-block will-change-transform", wordClassName)}
              >
                {line}
              </motion.span>
            </span>
          ) : (
            line.split(" ").map((word, wIdx) => (
              <span
                key={`${lineIdx}-${wIdx}`}
                className="overflow-hidden inline-block leading-[1.1] align-bottom"
                style={{ marginRight: word.endsWith(".") || word.endsWith(",") ? "0.05em" : "0.3em" }}
              >
                <motion.span
                  variants={wordVariants}
                  className={cn("inline-block will-change-transform", wordClassName)}
                >
                  {word}
                </motion.span>
              </span>
            ))
          )}
        </span>
      ))}
    </Tag>
  );
}
