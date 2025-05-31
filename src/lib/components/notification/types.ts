import { IChildren } from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface INotificationProps {
  notifications: INotificationItemProps[];
  removeNotification?: (id: string) => void;
  position?: NotificationPosition;
}

export interface INotificationItemProps extends Partial<IChildren> {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  notifyType?: string;
  duration?: number | false;
  onClose?: (id: string) => void;
  id: string;
}

export type NotificationPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export type NotificationType = "success" | "warning" | "error" | "info";
