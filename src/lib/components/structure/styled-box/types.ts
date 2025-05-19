import {
  IChildren,
  IClassName,
  IElementTag,
} from "@/lib/types/components-props";
import { HTMLAttributes } from "react";

export interface IStyledBox
  extends Partial<IChildren>,
    Partial<IClassName>,
    Partial<IElementTag>,
    Partial<IStyledBoxStyleProps>,
    HTMLAttributes<HTMLElement> {}

export interface IStyledBoxStyleProps {
  bordered: boolean;
  flatted: boolean;

  dense: boolean;
  variant: StyledBoxVariant;
  severity: StyledBoxSeverity;
  elevation: StyledBoxElevation;
}

export type StyledBoxVariant =
  | "surface"
  | "outlined"
  | "flatted"
  | "elevated"
  | "ghost"
  | "outlined-ghost";
export type StyledBoxSeverity =
  | "base"
  | "primary"
  | "primary-container"
  | "error"
  | "error-container";
export type StyledBoxElevation =
  | "level-0"
  | "level-1"
  | "level-2"
  | "level-3"
  | "level-4";
