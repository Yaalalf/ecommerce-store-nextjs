import { IClassName } from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface INColumnProps<T> extends Partial<IClassName> {
  data: T[];
  propKey?: keyof T;
  children: (item: T, index: number) => ReactNode;
}
