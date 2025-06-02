import { useMemo } from "react";
import { tv } from "tailwind-variants";

export default function useStyledDashboard() {
  const styledDashboard = useMemo(
    () =>
      tv({
        slots: {
          container: [
            "grid grid-cols-[min-content_minmax(0,10fr)_min-content]",
            "grid-rows-[repeat(3,min-content)]",
          ],
          content: ["col-[2_/_3]", "row-[2_/_3]", "w-full", "h-full"],
          leftDrawer: ["col-[1_/_2]", "row-[2_/_3]"],
          rightDrawer: ["col-[3_/_4]", "row-[2_/_3]"],
        },
      }),
    []
  );

  return styledDashboard;
}
