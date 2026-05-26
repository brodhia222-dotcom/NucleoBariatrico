export type IMCCategoria =
  | "Bajo peso"
  | "Normal"
  | "Sobrepeso"
  | "Obesidad I"
  | "Obesidad II"
  | "Obesidad III";

export type IMCResultado = {
  imc: number;
  categoria: IMCCategoria;
  peso: number;
  alturaCm: number;
  /** true cuando IMC ≥ 35 (criterio bariátrico habitual con comorbilidad o ≥40). */
  esCandidatoQuirurgico: boolean;
};

export function calcularIMC(pesoKg: number, alturaCm: number): IMCResultado | null {
  if (!Number.isFinite(pesoKg) || !Number.isFinite(alturaCm)) return null;
  if (pesoKg <= 0 || pesoKg > 400) return null;
  if (alturaCm <= 80 || alturaCm > 260) return null;

  const alturaM = alturaCm / 100;
  const imc = pesoKg / (alturaM * alturaM);
  const imcRedondeado = Math.round(imc * 10) / 10;

  return {
    imc: imcRedondeado,
    categoria: clasificar(imcRedondeado),
    peso: pesoKg,
    alturaCm,
    esCandidatoQuirurgico: imcRedondeado >= 35,
  };
}

export function clasificar(imc: number): IMCCategoria {
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidad I";
  if (imc < 40) return "Obesidad II";
  return "Obesidad III";
}
