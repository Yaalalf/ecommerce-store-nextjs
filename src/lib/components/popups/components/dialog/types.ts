import { IChildren, IPTProp, IRef } from "@/lib/types/components-props";
import { HTMLAttributes, RefObject } from "react";

export interface IDialogProps
  extends Partial<IChildren>,
    Partial<IRef<{ close(): void }>>,
    Partial<IStylesDialog>,
    Partial<IPTProp<IPTDialog>>,
    Partial<IDialogEvents> {
  open?: boolean;
  canTriggerParent?: boolean;
  triggerElement?: RefObject<HTMLElement | { ref: HTMLElement } | null>;
  onChange?: (value: boolean) => void;
}

export interface IDialogEvents {
  onClose: () => void;
}

export interface IStylesDialog {
  position: DialogPosition;
}

interface IPTDialog {
  container?: HTMLAttributes<HTMLDivElement>;
  content?: HTMLAttributes<HTMLDivElement>;
  overlay?: HTMLAttributes<HTMLDivElement>;
  close_area?: HTMLAttributes<HTMLDivElement>;
}

export type DialogPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "center";
