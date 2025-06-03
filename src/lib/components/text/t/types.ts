import {
  IChildren,
  IPTNode,
  ITextAlignProp,
  ITextProp,
  ITextSeverityProp,
  ITextSizeProp,
  ITextVariantProp,
  ITypeProp,
} from "@/lib/types/components-props";

export interface ITProps extends Partial<IChildren>, ITPTProps {}

export interface ITPTProps extends Partial<ITypeProp<TType>>, ITextPTProps {}

export interface ITextPTProps
  extends Partial<ITextProp>,
    Partial<ITextAlignProp>,
    Partial<ITextVariantProp>,
    Partial<ITextSeverityProp>,
    Partial<ITextSizeProp>,
    IPTNode {}

export type TType = "p" | "span" | "label";

export enum ETType {
  p = "p",
  span = "span",
}
