import { IChildren, IClassName } from "@/lib/types/components-props";
import { IDialogEvents } from "../dialog/types";

export interface IDrawerProps
  extends Partial<IChildren>,
    Partial<IClassName>,
    Partial<IDialogEvents>,
    Partial<IStylesDrawer> {
  open?: boolean;
  triggerParent?: boolean;
}

export interface IStylesDrawer {
  position: DrawerPosition;
}

export type DrawerPosition = "right" | "left";
