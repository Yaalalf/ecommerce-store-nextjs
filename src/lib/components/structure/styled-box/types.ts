import {
  IChildren,
  IClassName,
  IElementTag,
} from "@/lib/types/components-props";
import {
  StyledBoxElevation,
  StyledBoxSeverity,
  StyledBoxVariant,
} from "@/lib/types/css";
import { HTMLAttributes } from "react";

export interface IStyledBox
  extends Partial<IChildren>,
    Partial<IClassName>,
    Partial<IElementTag>,
    Partial<IStyledBoxStyleProps>,
    HTMLAttributes<HTMLElement> {}

export interface IStyledBoxStyleProps {
  bordered: boolean;
  dense: boolean;
  variant: StyledBoxVariant;
  severity: StyledBoxSeverity;
  elevation: StyledBoxElevation;
}
