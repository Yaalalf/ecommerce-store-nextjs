import {
  IAlignItems,
  IChildren,
  IDirection,
  IGap,
  IJustifyContent,
  IPTNode,
  ITagNode,
} from "@/lib/types/components-props";

export interface IFlexProps<T extends IPTNode>
  extends Partial<IChildren>,
    Partial<ITagNode<T>>,
    Partial<IDirection>,
    Partial<IJustifyContent>,
    Partial<IAlignItems>,
    Partial<IGap>,
    IPTNode {}
