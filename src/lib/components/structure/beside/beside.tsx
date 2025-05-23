import { IPTNode } from "@/lib/types/components-props";
import { Flex } from "../../layout";
import { IBeside } from "./types";

export default function Beside<T extends IPTNode>({
  slotAfter,
  slotBefore,
  tag,
  align,
  justify,
  direction,
  children,

  className = "",
  ...domProps
}: IBeside<T>) {
  return (
    <Flex
      {...domProps}
      {...{ align, justify, direction, tag, gap: "gap-[8px]" }}
      className={`${className} beside`}
    >
      {slotBefore}
      {children}
      {slotAfter}
    </Flex>
  );
}
