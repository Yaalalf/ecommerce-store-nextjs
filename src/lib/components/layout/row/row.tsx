import { IPTNode } from "@/lib/types/components-props";
import Flex from "../flex";
import { IRowProps } from "./types";
import { clsx } from "clsx";

export default function Row<T extends IPTNode>({
  children,
  className = "",
  tag,
  justify,
  align,
  gap,
  wrap,
  reverse = false,
  ...domProps
}: IRowProps<T>) {
  const rowClassName = clsx("row", className);

  return (
    <Flex
      {...{
        tag,
        justify,
        align,
        gap,
        wrap,
        direction: reverse ? "row-reverse" : "row",
        ...domProps,
      }}
      className={rowClassName}
    >
      {children}
    </Flex>
  );
}
