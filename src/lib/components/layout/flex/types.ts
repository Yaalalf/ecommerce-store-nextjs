import {
  IAlignItems,
  IChildren,
  IDirection,
  IDomRef,
  IGapProp,
  IJustifyContent,
  IPTNode,
  ITagNode,
  IWrap,
} from "@/lib/types/components-props";

export interface IFlexProps<T extends IPTNode, RefType extends HTMLElement>
  extends Partial<IChildren>,
    Partial<ITagNode<T>>,
    IFlexPTProps<RefType> {}

export interface IFlexPTProps<RefType extends HTMLElement>
  extends Partial<IDirection>,
    Partial<IWrap>,
    Partial<IJustifyContent>,
    Partial<IAlignItems>,
    Partial<IGapProp>,
    Partial<IDomRef<RefType>>,
    IPTNode {}
