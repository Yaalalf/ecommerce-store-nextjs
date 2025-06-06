import { tv } from "tailwind-variants";

export default function useStyledPopover({
  position = "absolute",
}: {
  position?: "absolute" | "fixed";
}) {
  const styledPopover = tv({
    slots: {
      cl_popover_empty_action: ["absolute"],
      cl_container: [
        "w-screen",
        "h-screen",
        "fixed",
        "top-0",
        "left-0",
        "z-10000",
      ],
      cl_overlay: ["w-full", "h-full", "flex", "relative", "bg-black/40"],
      cl_close_area: ["w-full h-full absolute top-0 left-0 z-0"],
      cl_content: ["relative", "z-1", "h-fit", "w-fit"],
    },
    variants: {
      position: {
        absolute: { cl_content: ["absolute"] },
        fixed: {
          cl_content: ["fixed"],
        },
      },
    },
  });

  return styledPopover({ position });
}
