import {
  IChildren,
  IClassName,
  ITextProp,
  ITypeProp,
} from "@/lib/types/components-props";
import { HTMLAttributes } from "react";

export interface IHProps
  extends Partial<IClassName>,
    Partial<IChildren>,
    ITypeProp<HType>,
    Partial<ITextProp>,
    HTMLAttributes<HTMLElement> {}

export type HType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export enum EHType {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}
