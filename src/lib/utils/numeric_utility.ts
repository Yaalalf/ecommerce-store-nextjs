export function isEven(value: number) {
  return value % 2 === 0;
}

export function isOdd(value: number) {
  return value % 2 !== 0;
}

/**
 * Restringe un valor para que esté dentro de un rango específico.
 *
 * @param valor El número que quieres restringir.
 * @param minimo El valor mínimo permitido.
 * @param maximo El valor máximo permitido.
 * @returns El valor restringido dentro del rango [minimo, maximo].
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
