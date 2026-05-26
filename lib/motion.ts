import type { Variants } from "framer-motion";

export const easeEditorial = [0.65, 0, 0.35, 1] as const;
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeIn = [0.7, 0, 0.84, 0] as const;
export const easeSnappy = [0.34, 1.56, 0.64, 1] as const;

export const viewportOnce = { once: true, amount: "some" as const, margin: "-10% 0px -5% 0px" };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeEditorial } },
};

export const stagger = (delay = 0.06, initial = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: initial },
  },
});

// WipeWords pattern — container with variants in cascade.
// Use this for word-by-word reveal of typographic lines.
// See [[project_modocasa_medicos_landing]] for the bug context.
export const wipeContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

export const wipeWord: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: easeEditorial },
  },
};
