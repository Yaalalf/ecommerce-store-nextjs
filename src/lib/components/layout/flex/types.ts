import {
  IAlignItems,
  IChildren,
  IClassName,
  IDirection,
  IGap,
  IJustifyContent,
  ITag,
} from "@/lib/types/components-props";
import { HTMLAttributes } from "react";

export interface IFlexProps
  extends Partial<IChildren>,
    Partial<ITag>,
    Partial<IClassName>,
    Partial<IDirection>,
    Partial<IJustifyContent>,
    Partial<IAlignItems>,
    Partial<IGap>,
    HTMLAttributes<HTMLElement> {}
