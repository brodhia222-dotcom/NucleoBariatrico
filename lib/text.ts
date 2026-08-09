/**
 * Ajustes tipográficos para que ningún renglón corte en un lugar raro.
 * Se aplica una sola vez, al definir cada string en copy.ts, así todos los
 * componentes que consumen ese texto quedan arreglados automáticamente.
 * "text-wrap: balance" (en globals.css) pareja el largo de las líneas, pero
 * no evita ninguno de estos dos casos puntuales — son técnicas complementarias.
 *
 * 1) Palabras de 1 a 3 letras (el, la, de, un, con, que...) nunca quedan
 *    solas al final de un renglón: se pegan con espacio duro a la palabra
 *    siguiente.
 * 2) Las conjunciones de una sola letra (y, o, e, u) además se pegan a la
 *    palabra ANTERIOR, no solo a la siguiente. Sin esto, un par como
 *    "bariátrica y metabólica" puede partirse "bariátrica" / "y metabólica"
 *    en renglones distintos — válido para balance/orphans, pero se lee raro
 *    porque son dos palabras que describen una sola idea en conjunto.
 */
const NBSP = String.fromCharCode(160);
const CONJUNCTIONS = new Set(["y", "o", "e", "u"]);

function core(word: string): string {
  return word.replace(/^[¿¡"'(«]+|[.,;:!?"')»]+$/g, "").toLowerCase();
}

export function noOrphans(text: string): string {
  const words = text.split(" ");
  const glueToNext = new Array<boolean>(words.length).fill(false);

  words.forEach((word, i) => {
    const c = core(word);
    if (c.length > 0 && c.length <= 3 && i < words.length - 1) {
      glueToNext[i] = true;
    }
    if (CONJUNCTIONS.has(c) && i > 0) {
      glueToNext[i - 1] = true;
    }
  });

  return words.reduce((out, word, i) => {
    if (i === 0) return word;
    return out + (glueToNext[i - 1] ? NBSP : " ") + word;
  }, "");
}
