import { IClassName, IPTNode, IPTProp } from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface IPageProps
  extends Partial<IClassName>,
    IPageSlots,
    Partial<IPTProp<IPagePT>> {}

export interface IPageSlots {
  slotHeader?: ReactNode;
  slotBody?: ReactNode;
  slotFooter?: ReactNode;
}

interface IPagePT {
  root?: IPTNode;
  header?: IPTNode;
  body?: IPTNode;
  footer?: IPTNode;
}
