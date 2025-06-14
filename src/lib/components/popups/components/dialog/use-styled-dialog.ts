import { tv } from "tailwind-variants";
import { IStylesDialog } from "./types";

export default function useStyledDialog({ position }: IStylesDialog) {
  const styledDialog = tv({
    slots: {
      cl_dialog_empty_action: ["absolute"],
      cl_container: [
        "w-screen",
        "h-screen",
        "fixed",
        "top-0",
        "left-0",
        "z-1000000",
      ],
      cl_overlay: ["w-full", "h-full", "flex", "relative", "bg-black/20"],
      cl_close_area: ["w-full h-full absolute top-0 left-0 z-0"],
      cl_content: ["relative", "z-1"],
    },
    variants: {
      position: {
        top: { cl_overlay: ["justify-center", "items-start"] },
        "top-left": { cl_overlay: ["justify-start", "items-start"] },
        "top-right": { cl_overlay: ["justify-end", "items-start"] },
        right: { cl_overlay: ["justify-end", "items-center"] },
        bottom: { cl_overlay: ["justify-center", "items-end"] },
        "bottom-left": { cl_overlay: ["justify-start", "items-end"] },
        "bottom-right": { cl_overlay: ["justify-end", "items-end"] },
        left: { cl_overlay: ["justify-start", "items-center"] },
        center: { cl_overlay: ["justify-center", "items-center"] },
      },
    },
    defaultVariants: {
      position: "center",
    },
  });

  return styledDialog({ position });
}
