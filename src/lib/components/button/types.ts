import { IChildren, IClassName } from "@/lib/types/components-props";
import { MouseEvent, ReactNode } from "react";
import { IStyledBoxStyleProps } from "../structure/styled-box/types";

export interface IButtonProps
  extends Partial<IChildren>,
    Partial<IClassName>,
    Partial<IStyledButtonProps> {
  label?: string;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  rightIcon?: ReactNode;

  onClick?: (evt: MouseEvent) => void;
}

export interface IStyledButtonProps extends IStyledBoxStyleProps {
  size: "xs" | "sm" | "md";
}
