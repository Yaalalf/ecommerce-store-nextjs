import { useMemo } from "react";
import { tv } from "tailwind-variants";

export default function useStyledDashboard() {
  const styledDashboard = useMemo(
    () =>
      tv({
        slots: {
          cl_container: [
            "grid grid-cols-[min-content_minmax(0,10fr)_min-content]",
            "grid-rows-[repeat(3,min-content)]",
          ],
          cl_header: [
            "col-[1_/_3]",
            "row-[1_/_2]",
            "w-full",
            "sticky",
            "top-0",
            "left-0",
            "z-9000",
          ],
          cl_content: ["col-[2_/_3]", "row-[2_/_3]"],
          cl_left_drawer: ["col-[1_/_2]", "row-[2_/_3]"],
          cl_right_drawer: ["col-[3_/_4]", "row-[2_/_3]"],
        },
      }),
    []
  );

  return styledDashboard;
}
