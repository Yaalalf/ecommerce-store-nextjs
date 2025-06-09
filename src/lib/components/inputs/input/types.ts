import { HTMLAttributes, ReactNode } from "react";
import { IBesideSlots } from "../../structure/beside/types";
import { IStyledBoxStyleProps } from "../../structure/styled-box/types";
import { IRef } from "@/lib/types/components-props";

export interface IInputProps
  extends Partial<IInputSlots>,
    Omit<HTMLAttributes<HTMLInputElement>, "onChange">,
    Partial<IStyledBoxStyleProps>,
    Partial<IRef<HTMLElement | null>> {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}

export interface IInputSlots extends IBesideSlots {
  slotLabel: ReactNode;
  slotAppend: ReactNode;
  slotPrepend: ReactNode;
}
