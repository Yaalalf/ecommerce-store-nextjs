import { IChildren, ITypeProp } from "@/lib/types/components-props";
import { ITextPTProps } from "../t/types";

export interface IHProps extends Partial<IChildren>, IHPTProps {}

export interface IHPTProps extends Partial<ITypeProp<HType>>, ITextPTProps {}

export type HType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export enum EHType {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}
