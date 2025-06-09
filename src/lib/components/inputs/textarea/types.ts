import { HTMLAttributes } from "react";
import { IStyledBoxStyleProps } from "../../structure/styled-box/types";

export interface ITextareaProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, "onChange">,
    Partial<IStyledBoxStyleProps> {
  value: string;
  onChange: (value: string) => void;
}
