import {
  IChildren,
  IClassName,
  ITextProp,
  ITextStyle,
  ITypeProp,
} from "@/lib/types/components-props";
import { HTMLAttributes } from "react";

export interface ITProps
  extends Partial<IClassName>,
    Partial<IChildren>,
    ITypeProp<TType>,
    Partial<ITextProp>,
    Partial<ITextStyle>,
    HTMLAttributes<HTMLElement> {}

export type TType = "p" | "span";

export enum ETType {
  p = "p",
  span = "span",
}
