import {
  IClassName,
  IDirection,
  IGap,
  IListTag,
  IPTNode,
} from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface IListProps<T>
  extends Partial<IClassName>,
    Partial<IListTag>,
    Partial<IDirection>,
    Partial<IGap> {
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
