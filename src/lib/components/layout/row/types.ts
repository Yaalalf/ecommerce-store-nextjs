import { IPTNode, IReverse } from "@/lib/types/components-props";
import { IFlexProps, IFlexPTProps } from "../flex/types";

export interface IRowProps<T extends IPTNode>
  extends Omit<IFlexProps<T>, "direction">,
    Partial<IReverse> {}

export interface IRowPTProps
  extends Omit<IFlexPTProps, "direction">,
    Partial<IReverse> {}
