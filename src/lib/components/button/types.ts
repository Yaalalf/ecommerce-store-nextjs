import { ButtonHTMLAttributes, MouseEvent, ReactNode, RefObject } from "react";
import { IStyledBoxStyleProps } from "../structure/styled-box/types";

export interface IButtonProps
  extends Partial<IStyledButtonProps>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  rightIcon?: ReactNode;
  ref?: RefObject<HTMLButtonElement | null>;

  onClick?: (evt: MouseEvent) => void;
}

export interface IStyledButtonProps extends IStyledBoxStyleProps {
  size: "xs" | "sm" | "md";
}
