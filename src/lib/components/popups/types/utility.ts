export interface IPoint {
  x: number;
  y: number;
}

export interface IDimension {
  width: number;
  height: number;
}

export interface IRect extends IDimension, IPoint {}

/**
 * El pivote de un elemento es un punto de referencia del elemento
 * En este caso puede ser las esquinas del elemento y
 * posiciones mas usadas
 */

export type PivotPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "center"
  | "center-left"
  | "center-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export enum EPivotPosition {
  TOP = "top",
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  CENTER = "center",
  CENTER_LEFT = "center-left",
  CENTER_RIGHT = "center-right",
  BOTTOM = "bottom",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

export type Strategy = "absolute" | "fixed";

export enum EStrategy {
  ABSOLUTE = "absolute",
  FIXED = "fixed",
}
