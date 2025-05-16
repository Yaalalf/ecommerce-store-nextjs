import {
  IChildren,
  IClassName,
  IPTNode,
  IPTProp,
} from "@/lib/types/components-props";
import { IBoxStyleProps } from "../../layout/box/types";
import { ReactNode } from "react";

export interface ICardProps
  extends Partial<IChildren>,
    Partial<IClassName>,
    Partial<IBoxStyleProps>,
    Partial<ICardSlots>,
    Partial<IPTProp<IPTCard>> {
  separator?: boolean;
  separator_header?: boolean;
  separator_footer?: boolean;
}
export interface ICardSlots {
  slotHeader: ReactNode;
  slotFooter: ReactNode;
}

interface IPTCard {
  root?: IPTNode;
  header?: IPTNode;
  body?: IPTNode;
  footer?: IPTNode;
}
