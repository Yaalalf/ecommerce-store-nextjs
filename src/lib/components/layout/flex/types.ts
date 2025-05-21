import {
  IAlignItems,
  IChildren,
  IDirection,
  IGapProp,
  IJustifyContent,
  IPTNode,
  IReverse,
  ITagNode,
  IWrap,
} from "@/lib/types/components-props";

export interface IFlexProps<T extends IPTNode>
  extends Partial<IChildren>,
    Partial<ITagNode<T>>,
    IFlexPTProps {}

export interface IFlexPTProps
  extends Partial<IDirection>,
    Partial<IWrap>,
    Partial<IJustifyContent>,
    Partial<IAlignItems>,
    Partial<IGapProp>,
    Partial<IReverse>,
    IPTNode {}
