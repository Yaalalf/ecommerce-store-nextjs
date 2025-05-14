import { IChildren, IClassName, IPTNode } from "@/lib/types/components-props";
import { IBoxStyleProps } from "../../layout/box/types";
import { ReactNode } from "react";

export interface ICardProps
  extends Partial<IChildren>,
    Partial<IClassName>,
    Partial<IBoxStyleProps>,
    Partial<ISlots> {
  separator?: boolean;
  separator_header?: boolean;
  separator_footer?: boolean;
  pt?: IPTCard;
}
export interface ISlots {
  slotHeader: ReactNode;
  slotFooter: ReactNode;
}

interface IPTCard {
  root?: IPTNode;
  header?: IPTNode;
  body?: IPTNode;
  footer?: IPTNode;
}
