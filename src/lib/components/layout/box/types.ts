import {
  IChildren,
  IClassName,
  IElementTag,
} from "@/lib/types/components-props";
import { HTMLAttributes } from "react";

export interface IBox
  extends Partial<IChildren>,
    Partial<IClassName>,
    Partial<IElementTag>,
    Partial<IBoxStyleProps>,
    HTMLAttributes<HTMLElement> {}

export interface IBoxStyleProps {
  bordered: boolean;
  flatted: boolean;
  shadowed: boolean;
  dense: boolean;
}
