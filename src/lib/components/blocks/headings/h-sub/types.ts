import { IColumnPTProps } from "@/lib/components/layout/column/types";
import { IHPTProps } from "@/lib/components/text/h/types";
import {
  IClassName,
  IGapProp,
  IPTProp,
  IReverse,
  ITextAlignProp,
} from "@/lib/types/components-props";
import { ReactNode } from "react";

export default interface IHSubProps
  extends IHSubSlots,
    Partial<IClassName>,
    Partial<IPTProp<IPTHSub>>,
    Partial<IGapProp>,
    Partial<ITextAlignProp>,
    Partial<IReverse> {}

export interface IHSubSlots {
  heading: ReactNode;
  subheading: ReactNode;
}

interface IPTHSub {
  container?: IColumnPTProps;
  heading?: IHPTProps;
  subheading?: IHPTProps;
}
