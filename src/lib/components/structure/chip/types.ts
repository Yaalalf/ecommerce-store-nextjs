import { IPTNode } from "@/lib/types/components-props";
import { ReactNode } from "react";
import { IFlexProps } from "../../layout/flex/types";

export interface IChipProps<T extends IPTNode, RefType extends HTMLElement>
  extends Omit<IFlexProps<T, RefType>, "direction">,
    Partial<IChipSlots> {
  variant?: ChipVariant;
}

export interface IChipSlots {
  slotIcon: ReactNode;
  slotAction: ReactNode;
}

export type ChipVariant =
  | "filled"
  | "outlined"
  | "elevated"
  | "ghost"
  | "outlined-ghost";
