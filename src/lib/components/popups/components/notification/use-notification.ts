import {
  useNotificationsContext,
  useNotificationsDispatchContext,
} from "./notification-context";

export const useNotification = () => {
  const context = useNotificationsContext();
  const { addNotification, removeNotification, dispatch } =
    useNotificationsDispatchContext();

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return { addNotification, removeNotification, dispatch };
};
