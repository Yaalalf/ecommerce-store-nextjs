import { IPTNode } from "@/lib/types/components-props";
import { IFlexProps } from "../flex/types";

export type ICenterProps<T extends IPTNode, RefType extends HTMLElement> = Omit<
  IFlexProps<T, RefType>,
  "direction" | "align" | "justify"
>;
