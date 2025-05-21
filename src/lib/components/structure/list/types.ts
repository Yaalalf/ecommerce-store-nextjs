import {
  IAlignItems,
  IClassName,
  IDirection,
  IGapProp,
  IJustifyContent,
  IListTag,
  IPTNode,
  IWrap,
} from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface IListProps<T>
  extends Partial<IClassName>,
    Partial<IListTag>,
    Partial<IDirection>,
    Partial<IGapProp>,
    Partial<IWrap>,
    Partial<IJustifyContent>,
    Partial<IAlignItems> {
  data: T[];
  propKey?: keyof T;
  unwrap?: boolean;
  children: (item: T, index: number) => ReactNode;
  slotItems?: Record<string, (item: T, index: number) => ReactNode>;
  pt?: IPTList;
}

interface IPTList {
  root?: IPTNode;
  item?: IPTNode;
  items?: Record<string, IPTNode>;
}
