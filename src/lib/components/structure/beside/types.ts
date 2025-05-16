import { ReactNode } from "react";
import { IFlexProps } from "../../layout/flex/types";
import { IPTNode } from "@/lib/types/components-props";

export interface IBeside<T extends IPTNode>
  extends IFlexProps<T>,
    Partial<IBesideSlots> {}

export interface IBesideSlots {
  slotBefore: ReactNode;
  slotAfter: ReactNode;
}
