import { HTMLAttributes } from "react";
import { IStyledBoxStyleProps } from "../../structure/styled-box/types";

export interface ITextareaProps
  extends HTMLAttributes<HTMLTextAreaElement>,
    Partial<IStyledBoxStyleProps> {
  value: string;
  onValueChange: (value: string) => void;
}
