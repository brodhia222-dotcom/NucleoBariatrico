"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { IMCResultado } from "./imc";

type IMCContextValue = {
  resultado: IMCResultado | null;
  setResultado: (r: IMCResultado | null) => void;
};

const IMCContext = createContext<IMCContextValue | null>(null);

export function IMCProvider({ children }: { children: ReactNode }) {
  const [resultado, setResultadoState] = useState<IMCResultado | null>(null);

  const setResultado = useCallback((r: IMCResultado | null) => {
    setResultadoState(r);
  }, []);

  const value = useMemo(() => ({ resultado, setResultado }), [resultado, setResultado]);

  return <IMCContext.Provider value={value}>{children}</IMCContext.Provider>;
}

export function useIMC() {
  const ctx = useContext(IMCContext);
  if (!ctx) throw new Error("useIMC must be used inside <IMCProvider>");
  return ctx;
}
