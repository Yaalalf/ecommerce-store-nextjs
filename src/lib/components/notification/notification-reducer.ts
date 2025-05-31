import { INotificationItemProps } from "./types";
import { v4 as uuidv4 } from "uuid";

export default function NotificationsReducer(
  state: INotificationItemProps[],
  action: NotificationActions
): INotificationItemProps[] {
  switch (action.type) {
    case NotificationActionsType.ADD:
      return [
        ...state,
        {
          id: uuidv4(),
          title: action.title,
          duration: action.duration,
          notifyType: action.notifyType,
          children: action.children,
          icon: action.icon,
          onClose: action.onClose,
          subtitle: action.subtitle,
        },
      ];
    case NotificationActionsType.DELETE:
      return state.filter((notification) => notification.id !== action.id);
  }
}

export type NotificationActions =
  | ({
      type: NotificationActionsType.ADD;
    } & Omit<INotificationItemProps, "id">)
  | {
      type: NotificationActionsType.DELETE;
      id: string;
    };

export enum NotificationActionsType {
  ADD = "add",
  DELETE = "delete",
}
