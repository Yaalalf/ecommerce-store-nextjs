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
  reverse,
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
        reverse,
        ...domProps,
        direction: "column",
      }}
      className={`column ${className}`}
    >
      {children}
    </Flex>
  );
}
