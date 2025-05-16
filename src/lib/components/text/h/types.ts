import {
  IChildren,
  IPTNode,
  ITextProp,
  ITextStyle,
  ITypeProp,
} from "@/lib/types/components-props";

export interface IHProps
  extends Partial<IChildren>,
    Partial<ITypeProp<HType>>,
    Partial<ITextProp>,
    Partial<ITextStyle>,
    IPTNode {}

export type HType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export enum EHType {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}
