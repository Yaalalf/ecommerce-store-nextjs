import { useMemo } from "react";
import { tv } from "tailwind-variants";

export default function useStyledNotifications() {
  const styledNotifications = useMemo(
    () =>
      tv({
        base: ["fixed", "z-10000"],
        variants: {
          position: {
            "top-right": ["top-[20px]", "right-[20px]", "items-end"],
            "top-left": ["top-[20px]", "left-[20px]", "items-start"],
            "bottom-right": ["bottom-[20px]", "right-[20px]", "items-end"],
            "bottom-left": ["bottom-[20px]", "left-[20px]", "items-start"],
          },
        },
        defaultVariants: {
          position: "bottom-right",
        },
      }),
    []
  );

  return styledNotifications;
}
