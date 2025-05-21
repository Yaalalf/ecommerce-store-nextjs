import {
  IChildren,
  IPTNode,
  ITextAlignProp,
  ITextProp,
  ITextVariantProp,
  ITypeProp,
} from "@/lib/types/components-props";

export interface ITProps extends Partial<IChildren>, ITPTProps {}

export interface ITPTProps
  extends ITypeProp<TType>,
    Partial<ITextProp>,
    Partial<ITextAlignProp>,
    Partial<ITextVariantProp>,
    IPTNode {}

export type TType = "p" | "span";

export enum ETType {
  p = "p",
  span = "span",
}
