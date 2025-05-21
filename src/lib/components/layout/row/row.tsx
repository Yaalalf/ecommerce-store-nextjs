import { IPTNode } from "@/lib/types/components-props";
import Flex from "../flex";
import { IRowProps } from "./types";

export default function Row<T extends IPTNode>({
  children,
  className = "",
  tag,
  justify,
  align,
  gap,
  wrap,
  reverse,
  ...domProps
}: IRowProps<T>) {
  return (
    <Flex
      {...{ tag, justify, align, gap, wrap, reverse, ...domProps }}
      className={`row ${className}`}
    >
      {children}
    </Flex>
  );
}
