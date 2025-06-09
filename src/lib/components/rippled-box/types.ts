import { IChildren, IPTProp } from "@/lib/types/components-props";
import { HTMLAttributes } from "react";

export interface IRippledBoxProps
  extends Partial<IChildren>,
    Partial<IPTProp<IPTRippledBox>> {}

interface IPTRippledBox {
  root?: HTMLAttributes<HTMLDivElement>;
  ripple?: HTMLAttributes<HTMLDivElement>;
}
