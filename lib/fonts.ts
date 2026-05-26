import { Fraunces, Manrope } from "next/font/google";

// Fraunces: variable font with optical sizing axis. When using `axes`,
// the `weight` property must be omitted (or "variable").
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

// Manrope: variable font, full weight range.
export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});
