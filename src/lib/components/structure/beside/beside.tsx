import { IPTNode } from "@/lib/types/components-props";
import { Flex } from "../../layout";
import { IBeside } from "./types";
import { clsx } from "clsx";

export default function Beside<T extends IPTNode, RefType extends HTMLElement>({
  slotAfter,
  slotBefore,
  tag,
  justify,
  align,
  direction,
  gap,
  wrap,
  children,
  className = "",
  ...domProps
}: IBeside<T, RefType>) {
  const besideClassName = clsx("beside", className);

  return (
    <Flex
      {...domProps}
      {...{ align, justify, direction, tag, gap, wrap }}
      className={besideClassName}
    >
      {slotBefore}
      {children}
      {slotAfter}
    </Flex>
  );
}
