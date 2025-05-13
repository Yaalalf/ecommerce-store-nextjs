import { ReactNode } from "react";
import { IFlexProps } from "../../layout/flex/types";

export interface IBeside extends IFlexProps {
  before?: ReactNode;
  after?: ReactNode;
}
