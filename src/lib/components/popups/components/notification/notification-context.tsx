"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";
import {
  INotificationItemProps,
  NotificationPosition,
  NotificationType,
} from "./types";
import NotificationsReducer, {
  NotificationActions,
  NotificationActionsType,
} from "./notification-reducer";
import Notifications from "./notifications";

export interface IDispatchNotificationContext {
  dispatch: Dispatch<NotificationActions>;
  addNotification: ({
    type,
    duration,
    title,
    subtitle,
    icon,
    children,
    onClose,
  }: Omit<INotificationItemProps, "notifyType" | "id"> & {
    type?: NotificationType;
  }) => void;
  removeNotification: (id: string) => void;
}

const NotificationsContext = createContext<INotificationItemProps[]>([]);

const NotificationsDispatchContext =
  createContext<IDispatchNotificationContext | null>(null);

export function NotificationProvider({
  children,
  position,
}: {
  children: ReactNode;
  position?: NotificationPosition;
}) {
  const [notifications, dispatch] = useReducer(NotificationsReducer, []);

  const addNotification = useCallback(
    ({
      title,
      type = "info",
      duration = false,
      children,
      icon,
      onClose,
      subtitle,
    }: Omit<INotificationItemProps, "notifyType" | "id"> & {
      type?: NotificationType;
    }) => {
      dispatch({
        type: NotificationActionsType.ADD,
        title,
        notifyType: type,
        duration,
        children,
        icon,
        onClose,
        subtitle,
      });
    },
    [dispatch]
  );

  const removeNotification = useCallback(
    (id: string) => {
      dispatch({ type: NotificationActionsType.DELETE, id: id });
    },
    [dispatch]
  );

  return (
    <NotificationsContext value={notifications}>
      <NotificationsDispatchContext
        value={{ dispatch, addNotification, removeNotification }}
      >
        {children}
        {notifications.length > 0 && (
          <Notifications
            notifications={notifications}
            position={position}
            removeNotification={removeNotification}
          />
        )}
      </NotificationsDispatchContext>
    </NotificationsContext>
  );
}
export function useNotificationsContext() {
  return useContext(NotificationsContext);
}

export function useNotificationsDispatchContext() {
  return useContext(
    NotificationsDispatchContext
  ) as IDispatchNotificationContext;
}
