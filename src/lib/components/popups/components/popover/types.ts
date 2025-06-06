import { IChildren, IRef } from "@/lib/types/components-props";
import { HTMLAttributes, RefObject } from "react";
import { IUseClickOnWindowProps } from "../../hooks/useClickOnWindow";
import { PivotPosition, Strategy } from "../../types/utility";

export interface IPopoverProps
  extends Partial<IChildren>,
    Partial<IRef<{ close(): void }>>,
    Partial<IStylesPopover>,
    Partial<IPopoverEvents> {
  overlay?: boolean;
  open?: boolean;
  offset?: [number, number];
  canTriggerParent?: boolean;
  triggerElement?: RefObject<HTMLElement | { ref: HTMLElement } | null>;
}
export interface IPopoverEvents {
  onClose: () => void;
}
export interface IStylesPopover {
  anchor: PivotPosition;
  pivot: PivotPosition;
  strategy: Strategy;
  fill: boolean;
}

/***************************************************/
export interface IPopoverWrapperProps
  extends HTMLAttributes<HTMLDivElement>,
    IRef<HTMLDivElement | null>,
    IUseClickOnWindowProps {}
