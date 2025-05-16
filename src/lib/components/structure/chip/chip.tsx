import "./style/base.css";
import Beside from "../beside";
import { IChipProps } from "./types";
import { IPTNode } from "@/lib/types/components-props";

export default function Chip<T extends IPTNode>({
  className = "",
  tag = "span",
  align = "center",
  justify = "center",
  children,
  gap = "0",
  slotIcon,
  slotAction,
  variant = "filled",
  ...domProps
}: IChipProps<T>) {
  return (
    <Beside
      {...domProps}
      {...{ tag, align, justify, gap }}
      slotAfter={slotIcon}
      slotBefore={slotAction}
      className={`${className} chip text-caption ${variant}`}
    >
      {children}
    </Beside>
  );
}
