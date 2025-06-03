import { HTMLAttributes, ReactNode } from "react";
import { IBesideSlots } from "../../structure/beside/types";
import { IStyledBoxStyleProps } from "../../structure/styled-box/types";

export interface IInputProps
  extends Partial<IInputSlots>,
    HTMLAttributes<HTMLInputElement>,
    Partial<IStyledBoxStyleProps> {
  value: string;
  onValueChange: (value: string) => void;
  type?: "text" | "number";
}

export interface IInputSlots extends IBesideSlots {
  slotLabel: ReactNode;
  slotAppend: ReactNode;
  slotPrepend: ReactNode;
}
