import { IPTNode } from "@/lib/types/components-props";
import Flex from "../flex";
import { IColumnProps } from "./types";

export default function Column<T extends IPTNode>({
  children,
  className = "",
  tag,
  justify,
  align,
  gap,
  wrap,
  reverse = false,
  ...domProps
}: IColumnProps<T>) {
  return (
    <Flex
      {...{
        tag,
        justify,
        align,
        gap,
        wrap,
        ...domProps,
        direction: reverse ? "column-reverse" : "column",
      }}
      className={`column ${className}`}
    >
      {children}
    </Flex>
  );
}
