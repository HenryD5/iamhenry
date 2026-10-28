// Limpieza previa a la validación. Funciones puras: no validan, solo
// normalizan; el schema decide después si el valor limpio es aceptable.

// Controles C0 (salvo \t, \n y \r, que se tratan aparte), DEL y C1.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

// Formato invisible: marcas y sobrescrituras bidi, ancho cero, separadores
// de línea/párrafo Unicode, BOM, guion blando (U+00AD), CGJ (U+034F),
// rellenos Hangul (U+115F, U+1160, U+3164, U+FFA0) y U+180E.
const INVISIBLE_FORMAT_CHARS =
  /[\u00AD\u034F\u061C\u115F\u1160\u180E\u200B-\u200F\u2028\u2029\u202A-\u202E\u2060-\u2064\u2066-\u2069\u3164\uFEFF\uFFA0]/g;

const TAB = /\t/g;
const CARRIAGE_RETURNS = /\r\n?/g;
const SPACE_SEPARATORS = /\p{Zs}/gu;
// Tres o más saltos seguidos (con líneas en blanco de espacios Unicode o tabuladores).
const EXCESS_LINE_BREAKS = /\n(?:[\t\p{Zs}]*\n){2,}/gu;

export const MAX_CONSECUTIVE_LINE_BREAKS = 2;

const stripInvisible = (value: string): string =>
  value.replace(CONTROL_CHARS, "").replace(INVISIBLE_FORMAT_CHARS, "");

/**
 * Campos de una línea (nombre, correo, token). Quita controles, tabuladores y
 * formato invisible, unifica espacios Unicode y normaliza a NFC. Conserva
 * `\r` y `\n` para que el schema rechace el valor en lugar de unir líneas
 * (inyección de cabeceras).
 */
export function sanitizeSingleLine(value: string): string {
  return stripInvisible(value)
    .replace(TAB, "")
    .replace(SPACE_SEPARATORS, " ")
    .normalize("NFC");
}

/**
 * Mensaje multilínea. Unifica saltos a `\n`, conserva `\n` y `\t`, quita el
 * resto de controles y el formato invisible, normaliza a NFC y colapsa las
 * series de más de dos saltos seguidos a dos.
 */
export function sanitizeMultiline(value: string): string {
  return stripInvisible(value.replace(CARRIAGE_RETURNS, "\n"))
    .normalize("NFC")
    .replace(EXCESS_LINE_BREAKS, "\n".repeat(MAX_CONSECUTIVE_LINE_BREAKS));
}
