import { useMemo } from "react";
import { tv } from "tailwind-variants";

export default function useStyledNotificationsItem() {
  const styledNotificationsItem = useMemo(
    () =>
      tv({
        slots: {
          notificationContainer: [
            "relative",
            "overflow-hidden",
            "max-w-[400px]",
          ],
          notificationIconContainer: [
            "self-center",
            "w-10",
            "h-10",
            "shrink-0",
            "text-2xl",
          ],
        },
        variants: {
          shadow: {
            primary: { notificationContainer: "shadow-primary" },
            info: { notificationContainer: "shadow-info" },
            warning: { notificationContainer: "shadow-warning" },
            error: { notificationContainer: "shadow-error" },
            success: { notificationContainer: "shadow-success" },
          },
        },

        defaultVariants: {},
      }),
    []
  );

  return styledNotificationsItem;
}
