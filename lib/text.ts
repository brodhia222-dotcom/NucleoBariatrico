/**
 * Ajustes tipográficos para que ningún renglón corte en un lugar raro.
 * Se aplica una sola vez, al definir cada string en copy.ts, así todos los
 * componentes que consumen ese texto quedan arreglados automáticamente.
 * Los párrafos usan "text-wrap: pretty" (en globals.css); esto lo complementa.
 *
 * 1) Palabras de hasta 3 letras (el, la, de, un, con, sin...) nunca quedan
 *    solas al final de un renglón: se pegan con espacio duro a la siguiente.
 * 2) Una conjunción de una letra (y, o, e, u) entre dos palabras que forman una
 *    sola idea ("bariátrica y metabólica") se pega también a la anterior, para
 *    que el par no se parta. Si antes hay una coma o después arranca otra frase
 *    ("formulario y un profesional"), no: ese corte es natural.
 * 3) La última palabra del párrafo nunca queda sola en el último renglón.
 * 4) Los bloques pegados de más de 3 palabras y más de 22 caracteres se
 *    achican soltando palabras de 3 letras: los bloques largos no se pueden
 *    cortar y dejaban renglones muy desparejos (revisión 2026-09-15).
 */
const NBSP = String.fromCharCode(160);
const CONJUNCTIONS = new Set(["y", "o", "e", "u"]);
const MAX_BLOQUE = 22;

function core(word: string): string {
  return word.replace(/^[¿¡"'(«]+|[.,;:!?"')»]+$/g, "").toLowerCase();
}

export function noOrphans(text: string): string {
  const words = text.split(" ");
  const n = words.length;
  if (n < 2) return text;

  const cores = words.map(core);
  const corta = (i: number) => cores[i].length > 0 && cores[i].length <= 3;
  const pegar = new Array<boolean>(n - 1).fill(false);

  for (let i = 0; i < n - 1; i++) {
    // Después de una coma o un punto el corte es natural: no se pega ("UBA, especialista")
    if (corta(i) && !/[,;:.]$/.test(words[i])) pegar[i] = true;
    const conj = i + 1;
    if (
      CONJUNCTIONS.has(cores[conj]) &&
      conj < n - 1 &&
      !/[,;:.]$/.test(words[i]) &&
      !corta(conj + 1)
    ) {
      pegar[i] = true;
    }
  }

  if (n >= 3) pegar[n - 2] = true;

  // 4) Achicar los bloques largos. Solo se sueltan palabras de 3 letras ("con", "que"):
  // las de 1 o 2 letras ("y", "el", "de") y la última palabra no quedan nunca sueltas.
  let inicio = 0;
  for (let i = 0; i < n; i++) {
    if (i < n - 1 && pegar[i]) continue;
    let desde = inicio;
    for (let k = inicio; k < i; k++) {
      const palabras = i - desde + 1;
      const largo = words.slice(desde, i + 1).join(" ").length;
      if (palabras <= 3 || largo <= MAX_BLOQUE) break;
      if (k < n - 2 && cores[k].length === 3 && !CONJUNCTIONS.has(cores[k])) {
        pegar[k] = false;
        desde = k + 1;
      }
    }
    inicio = i + 1;
  }

  return words.reduce((out, word, i) => (i === 0 ? word : out + (pegar[i - 1] ? NBSP : " ") + word), "");
}
