import { IPTNode, IReverse } from "@/lib/types/components-props";
import { IFlexProps, IFlexPTProps } from "../flex/types";

export interface IColumnProps<T extends IPTNode>
  extends Omit<IFlexProps<T>, "direction">,
    Partial<IReverse> {}

export interface IColumnPTProps
  extends Omit<IFlexPTProps, "direction">,
    Partial<IReverse> {}
