/**
 * Evita que palabras de 1 a 3 letras (el, la, de, y, un, con, que...) queden
 * solas al final de un renglón: reemplaza el espacio que las sigue por un
 * espacio duro, así el navegador nunca puede cortar la línea justo ahí.
 * "text-wrap: balance" (en globals.css) pareja el largo de las líneas, pero
 * no evita este caso puntual — son dos técnicas complementarias.
 *
 * Se aplica una sola vez, al definir cada string en copy.ts, así todos los
 * componentes que consumen ese texto quedan arreglados automáticamente.
 */
const NBSP = String.fromCharCode(160);

export function noOrphans(text: string): string {
  return text.replace(/(?<=^|\s)(\S{1,3})\s+(?=\S)/g, `$1${NBSP}`);
}
