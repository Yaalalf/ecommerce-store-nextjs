import { IClassName } from "@/lib/types/components-props";
import { TailwindGap } from "@/lib/types/css";
import { ReactNode } from "react";

export interface INColumnProps<T> extends Partial<IClassName> {
  data: T[];
  propKey?: keyof T;
  children: (item: T, index: number) => ReactNode;
  columnsGap?: TailwindGap;
  itemsGap?: TailwindGap;
  columns: number;
}
