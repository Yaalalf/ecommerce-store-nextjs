import Dialog from "../dialog";
import { StyledBox } from "../../../structure";
import { IDrawerProps } from "./types";
import { tv } from "tailwind-variants";

export default function Drawer({
  open,
  children,
  className,
  position = "left",
  canTriggerParent = false,
  onClose,
}: IDrawerProps) {
  const cl_drawer = tv({
    base: ["h-screen"],
    variants: {
      position: { left: ["rounded-l-none"], right: ["rounded-r-none"] },
    },
  })({ position, className: className });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      position={position}
      canTriggerParent={canTriggerParent}
    >
      <StyledBox dense className={cl_drawer}>
        {children}
      </StyledBox>
    </Dialog>
  );
}
