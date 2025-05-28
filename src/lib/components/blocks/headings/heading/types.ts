import { IColumnPTProps } from "@/lib/components/layout/column/types";
import { IHPTProps } from "@/lib/components/text/h/types";
import { IClassName, IPTNode, IPTProp } from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface IHeadingProps
  extends Partial<IHeadingSlots>,
    Partial<IPTProp<IHeadingPT>>,
    Partial<IClassName> {
  heading: string;
  subheading?: string;
}

export interface IHeadingSlots {
  slotHeading: ReactNode;
  slotSubHeading: ReactNode;
  slotBefore: ReactNode;
  slotAfter: ReactNode;
}

interface IHeadingPT {
  root?: IPTNode;
  headingContainer?: IColumnPTProps<HTMLElement>;
  heading?: IHPTProps;
  subheading?: IHPTProps;
}
