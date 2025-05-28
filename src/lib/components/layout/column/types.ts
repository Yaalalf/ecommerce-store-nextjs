import { IPTNode, IReverse } from "@/lib/types/components-props";
import { IFlexProps, IFlexPTProps } from "../flex/types";

export interface IColumnProps<T extends IPTNode, RefType extends HTMLElement>
  extends Omit<IFlexProps<T, RefType>, "direction">,
    Partial<IReverse> {}

export interface IColumnPTProps<RefType extends HTMLElement>
  extends Omit<IFlexPTProps<RefType>, "direction">,
    Partial<IReverse> {}
