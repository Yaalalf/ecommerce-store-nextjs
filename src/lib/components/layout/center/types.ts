import { IPTNode } from "@/lib/types/components-props";
import { IFlexProps } from "../flex/types";

export type ICenterProps<T extends IPTNode> = Omit<
  IFlexProps<T>,
  "direction" | "align" | "justify"
>;
